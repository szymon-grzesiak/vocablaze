"use server";

import { AddFolderSchema, AddWordSetSchema } from "@/schemas";

import { getWordSetsAmountForUser } from "../data/rest";
import db from "../db";
import { currentUser } from "../sessionData";
import stripe from "../stripe";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export const addWordSet = async (values: z.infer<typeof AddWordSetSchema>) => {
  const user = await currentUser();
  const wordSetsAmount = await getWordSetsAmountForUser(String(user?.id));

  const isDisabled = wordSetsAmount >= 3 && user?.role === 'USER';

  if(isDisabled) {
    return { error: "You can have maximum of 3 word sets, upgrade your plan to have it more" };
  }

  if (!user) {
    return { error: "You must be logged in to add a word set" };
  }

  const userId = user.id as string;
  const validatedFields = AddWordSetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  const {
    title,
    description,
    firstLanguageId,
    secondLanguageId,
    folders,
    words,
  } = validatedFields.data;

  try {
    const newWordSet = await db.wordSet.create({
      data: {
        title,
        description: description ?? "",
        firstLanguageId,
        secondLanguageId,
        userId: userId,
        isShared: false,
        folders: folders
          ? {
              connect: folders.map((folderId: string) => ({ id: folderId })),
            }
          : undefined,
      },
      include: {
        folders: true,
      },
    });

    await Promise.all(
      words.map(({ originalWord, translatedWord }) =>
        db.word.create({
          data: {
            originalWord: originalWord,
            translatedWord: translatedWord,
            wordSetId: newWordSet.id,
          },
        })
      )
    );
    revalidatePath("/home");
    return { success: "Word set added successfully!" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "The word set title has already been used" };
      }
    }

    return { error: "An error occurred while adding the word set" };
  }
};
export const addFolder = async (values: z.infer<typeof AddFolderSchema>) => {
  const validatedFields = AddFolderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "You must be logged in to add a word set" };
    }

    const userId = user.id as string;

    await db.folder.create({
      data: {
        name: validatedFields.data.name,
        color: validatedFields.data.color,
        userId: userId,
      },
    });
  } catch (error) {
    return { error: "An error occurred while adding the folder" };
  } finally {
    revalidatePath("/home");
  }
};

export const updateWordSet = async (
  id: string,
  values: z.infer<typeof AddWordSetSchema>
) => {
  const validatedFields = AddWordSetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  const {
    title,
    description,
    firstLanguageId,
    secondLanguageId,
    folders,
    words,
  } = validatedFields.data;

  try {
    const updatedWordSet = await db.wordSet.update({
      where: { id },
      data: {
        title,
        description: description ?? "",
        firstLanguageId,
        secondLanguageId,
        folders: folders
          ? {
              connect: folders.map((folderId: string) => ({ id: folderId })),
            }
          : undefined,
      },
      include: {
        folders: true,
      },
    });

    await Promise.all(
      words.map((word, index) => {
        if (word.id) {
          // Aktualizacja istniejącego słowa
          return db.word.update({
            where: { id: word.id },
            data: {
              originalWord: word.originalWord,
              translatedWord: word.translatedWord,
              id: word.id,
              order: index, // Ustawienie kolejności
            },
          });
        } else {
          // Tworzenie nowego słowa
          return db.word.create({
            data: {
              originalWord: word.originalWord,
              translatedWord: word.translatedWord,
              wordSetId: updatedWordSet.id,
              order: index,
            },
          });
        }
      })
    );
    revalidatePath(`/wordset/${id}`);
    return { success: "Word set updated successfully!" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "The word set title has already been used" };
      }
    }

    return { error: "An error occurred while updating the word set" };
  }
};

export const deleteWordSet = async (id: string) => {
  try {
    await db.wordSet.delete({
      where: { id },
    });
  } catch (error) {
    return { error: "An error occurred while deleting the word set" };
  } finally {
    revalidatePath("/home");
    redirect("/home");
  }
};

export const getWordSetsByFolder = unstable_cache(async (folderId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to view this folder");
  }
    
  try {
    const wordSets = await db.wordSet.findMany({
      where: {
        folders: {
          some: {
            id: folderId,
          },
        },
      },
    });
    return wordSets;
  } catch (error) {
   throw new Error("An error occurred while fetching the word sets");
  }
});

export interface Word {
  id: string;
  originalWord: string;
  translatedWord: string;
  wordSetId: string;
  ProgressWord: ProgressWord | null;
}

export interface ProgressWord {
  id: string;
  isCorrectAnswer: boolean;
  answerDate: Date;
  wordId: string;
  progressSetId: string;
}

export async function getInitialWords(wordSetId: string) {
  const words = await db.word.findMany({
    where: { wordSetId },
    include: {
      progressHistory: true,
    },
  });

  return words;
}

export const getWordSetWithProgress = async (wordSetId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to fetch progress");
  }

  const wordSet = await db.wordSet.findUnique({
    where: { id: wordSetId },
    include: {
      words: {
        include: {
          progressHistory: true,
        },
      },
      firstLanguage: true,
      secondLanguage: true,
    },
  });

  if (!wordSet) {
    throw new Error("Word set not found");
  }

  return wordSet;
};

export const updateProgress = async (wordId: string, progressValue: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to update progress");
  }

  return await db.$transaction(async (prisma) => {
    const word = await prisma.word.update({
      where: { id: wordId },
      data: {
        progress: progressValue,
        updatedAt: new Date(),
      },
    });

    await prisma.progressWordHistory.create({
      data: {
        userId: user.id as string,
        wordId: word.id,
        progressValue,
        answerDate: new Date(),
      },
    });

    return word;
  });
};

export const saveDisplayOrder = async (
  wordSetId: string,
  showTranslatedFirst: boolean
) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to save display order");
  }

  await db.wordSet.update({
    where: { id: wordSetId },
    data: {
      displayTranslatedFirst: showTranslatedFirst,
    },
  });
};

export async function createCheckoutSession({ userEmail }: { userEmail: string }) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `https://www.hgfhkmfgklmdslkr665464fdsf.space/profile`,
    cancel_url: `https://www.hgfhkmfgklmdslkr665464fdsf.space/profile?canceled=true`,
    payment_method_types: ["card", "paypal", "blik"],
    mode: "payment",
    customer_email: userEmail,
    metadata: { userEmail },
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: "Premium Plan",
            description: "Access to the premium features",
          },
          unit_amount: 9999,
        },
        quantity: 1,
      },
    ],
  });

  return { url: stripeSession.url };
}


export async function deleteFolder(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to save display order");
  }

  try {
    await db.folder.delete({
      where: { id },
    });
  } catch (error) {
    return { error: "An error occurred while deleting the folder" };
  } finally {
    revalidatePath("/home");
    redirect("/home");
  }
}

export async function updateFolder({
  id,
  name,
  color,
  wordSets,
}: {
  id: string;
  name: string;
  color: string;
  wordSets: string[];
}) {

  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to save display order");
  }
  
  try {
    await db.folder.update({
      where: { id, userId: user.id as string },
      data: {
        name,
        color,
        wordSets: {
          set: wordSets.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    return { success: false, error: "An error occurred while updating the folder" };
  }
}