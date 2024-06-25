import { cache } from "react";

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
