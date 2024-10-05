"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { AddFolderSchema, AddWordSetSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import * as z from "zod";
import db from "../db";
import { currentUser } from "../sessionData";
import stripe from "../stripe";

export const addWordSet = async (values: z.infer<typeof AddWordSetSchema>) => {
  const validatedFields = AddWordSetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    title,
    description,
    firstLanguageId,
    secondLanguageId,
    folderId,
    words,
  } = validatedFields.data;

  const user = await currentUser();

  if (!user) {
    return { error: "You must be logged in to add a word set" };
  }

  const userId = user.id as string;

  try {
    const newWordSet = await db.wordSet.create({
      data: {
        title,
        description: description ?? "",
        firstLanguageId,
        secondLanguageId,
        userId: userId,
        isShared: false,
        folderId,
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
    console.error("Error adding word set:", error);
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

    const folder = await db.folder.create({
      data: {
        name: validatedFields.data.name,
        color: validatedFields.data.color,
        userId: userId,
      },
    });
    return folder;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateWordSet = async (
  id: string,
  values: z.infer<typeof AddWordSetSchema>
) => {
  const validatedFields = AddWordSetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    title,
    description,
    firstLanguageId,
    secondLanguageId,
    folderId,
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
        folderId,
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
              order: index,  // Ustawienie kolejności
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
    revalidatePath("/home");
    return { success: "Word set updated successfully!" };
  } catch (error) {
    console.error("Error updating word set:", error);
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
    console.error("Error deleting word set:", error);
    return { error: "An error occurred while deleting the word set" };
  } finally {
    revalidatePath("/home");
    redirect("/home");
  }
};

export const getWordSetsByFolder = unstable_cache(async (folderId: string) => {
  const user = await currentUser();

  if (!user) {
    console.log("User not logged in");
  }
  try {
    const wordSet = await db.wordSet.findMany({
      where: {
        folderId: folderId,
      },
    });
    return wordSet;
  } catch (error) {
    console.error("Error fetching word sets by folder:", error);
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

export const saveDisplayOrder = async (wordSetId: string, showTranslatedFirst: boolean) => {
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


export async function createCheckoutSession({
  userEmail,
}: {
  userEmail: string;
}) {
    const user = await currentUser();

    if (!user) {
      throw new Error('User not found');
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `http://localhost:3000/profile`,
      cancel_url: `http://localhost:3000/profile?canceled=true`,
      payment_method_types: ['card', 'paypal', 'blik'],
      mode: 'payment',
      customer_email: userEmail,
      metadata: {
        userEmail,
      },
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Premium Plan',
              description: 'Access to the premium features',
            },
            unit_amount: 9999,
          },
          quantity: 1,
        }
      ],
    });

    redirect(stripeSession?.url as string);
}
