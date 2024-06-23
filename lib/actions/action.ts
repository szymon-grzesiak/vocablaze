"use server";

import { revalidatePath } from "next/cache";
import { AddFolderSchema, AddWordSetSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import * as z from "zod";

import db from "../db";
import { currentUser } from "../sessionData";

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
      words.map(({ original_word, translated_word }) =>
        db.word.create({
          data: {
            originalWord: original_word,
            translatedWord: translated_word,
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
        userId: userId,
      },
    });
    return folder;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllWordSets = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "You must be logged in to view word sets" };
  }

  try {
    const wordSets = await db.wordSet.findMany({
      where: { userId: user.id as string },
    });
    return { wordSets };
  } catch (error) {
    console.error("Error fetching word sets:", error);
    return { error: "An error occurred while fetching the word sets" };
  }
};


export const getWordSetById = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "You must be logged in to view this word set" };
  }

  try {
    const wordSet = await db.wordSet.findUnique({
      where: { id: id },
      include: {
        words: true,
      },
    });
    if (!wordSet) {
      return { error: "Word set not found" };
    }
    return { wordSet };
  } catch (error) {
    console.error("Error fetching word set:", error);
    return { error: "An error occurred while fetching the word set" };
  }
};

export const updateWordSet = async (id: string, values: z.infer<typeof AddWordSetSchema>) => {
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

    await db.word.deleteMany({
      where: { wordSetId: id },
    });

    await Promise.all(
      words.map(({ original_word, translated_word }) =>
        db.word.create({
          data: {
            originalWord: original_word,
            translatedWord: translated_word,
            wordSetId: updatedWordSet.id,
          },
        })
      )
    );

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