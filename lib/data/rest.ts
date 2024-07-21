import { cache } from "react";
import { unstable_cache } from "next/cache";

import db from "@/lib/db";

import { currentUser } from "../sessionData";

export const getLanguages = cache(async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to view folders");
  }

  try {
    return await db.language.findMany();
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw new Error("An error occurred while fetching the languages");
  }
});

export const getFolders = cache(async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to view folders");
  }

  try {
    const folders = await db.folder.findMany({
      where: { userId: user.id as string },
    });
    return folders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("An error occurred while fetching the folders");
  }
});

export const getAllWordSets = cache(async () => {
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
});

export const getWordSetById = unstable_cache(
  async (id: string, userId: string) => {
    const user = await currentUser();

    if (!user) {
      return { error: "You must be logged in to view this word set" };
    }
    if (user.id !== userId) {
      return { error: "You do not have permission to view this word set" };
    }

    try {
      const wordSet = await db.wordSet.findUnique({
        where: { id: id, userId: userId },
        include: {
          words: {
            include: {
              progressHistory: true,
            },
          },
        },
      });
      if (!wordSet) {
        return { error: "Word set not found" };
      }
      console.log("WORDSET", wordSet);
      return { wordSet };
    } catch (error) {
      console.error("Error fetching word set:", error);
      return { error: "An error occurred while fetching the word set" };
    }
  }
);

export const getDisplayOrder = cache(async (wordSetId: string) => {
  try {
    const wordSet = await db.wordSet.findUnique({
      where: { id: wordSetId },
      select: { displayTranslatedFirst: true },
    });

    if (!wordSet) {
      throw new Error("WordSet not found");
    }

    return wordSet.displayTranslatedFirst;
  } catch (error) {
    console.error("Error fetching display order:", error);
    throw new Error("An error occurred while fetching the display order");
  }
});