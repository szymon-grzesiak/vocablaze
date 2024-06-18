"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AddFolderSchema, AddWordSetSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import * as z from "zod";

import { db } from "../db";
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
