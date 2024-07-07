"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import { AddFolderSchema, AddWordSetSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import * as z from "zod";

import db from "../db";
import { currentUser } from "../sessionData";
import { redirect } from "next/navigation";
import { cache } from "react";

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
      words.map(({ originalWord, translatedWord }) =>
        db.word.create({
          data: {
            originalWord: originalWord,
            translatedWord: translatedWord,
            wordSetId: updatedWordSet.id,
          },
        })
      )
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
