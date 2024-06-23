import db from "@/lib/db";
import { cache } from "react";
import { currentUser } from "../sessionData";

export const getLanguages = cache(async () => {
  try {
    const languages = await db.language.findMany();
    return languages;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const getFolders = cache(async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "You must be logged in to view folders" };
  }

  try {
    const folders = await db.folder.findMany({
      where: { userId: user.id as string },
    });
    return { folders };
  } catch (error) {
    console.error("Error fetching folders:", error);
    return { error: "An error occurred while fetching the folders" };
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