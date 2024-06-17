import { db } from "@/lib/db";

export const getLanguages = async () => {
  try {
    const languages = await db.language.findMany();
    return languages;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFolders = async () => {
  try {
    const folders = await db.folder.findMany();
    return folders;
  } catch (error) {
    console.log(error);
    return [];
  }
};
