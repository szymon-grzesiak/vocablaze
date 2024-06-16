"use server";

import { AddWordSetSchema } from "@/schemas";
import * as z from "zod";

import { db } from "../db";
import { currentUser } from "../sessionData";

export const addWordSet = async (values: z.infer<typeof AddWordSetSchema>) => {
  const validatedFields = AddWordSetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, firstLanguageId, secondLanguageId, words } =
    validatedFields.data;

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

    return { success: "Word set added successfully!" };
  } catch (error) {
    console.error("Error adding word set:", error);
    return { error: "An error occurred while adding the word set" };
  }
};
