import db from "@/lib/db";
import { cache } from "react";

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
  try {
    const folders = await db.folder.findMany();
    return folders;
  } catch (error) {
    console.log(error);
    return [];
  }
});
