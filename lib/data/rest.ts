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
