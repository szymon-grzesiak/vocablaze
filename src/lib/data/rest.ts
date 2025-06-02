import { cache } from "react";
import { startOfYear, endOfYear } from 'date-fns';

import db from "@/lib/db";

import { currentUser } from "../sessionData";
import { CalendarDatum } from "@nivo/calendar";

export const getLanguages = cache(async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to view folders");
  }

  try {
    return await db.language.findMany();
  } catch (error) {
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
      include: {
        folders: true,
      },
    });
    return { wordSets };
  } catch (error) {
    return { error: "An error occurred while fetching the word sets" };
  }
});

interface ResultFormat {
  date: Date;
  wordCount: number;
}

export const getDataToCalendar = cache(async (): Promise<CalendarDatum[]> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to view this data");
  }

  try {
    const userId = user.id;

   const startDate = startOfYear(new Date());
   const endDate = endOfYear(new Date());

   const result: ResultFormat[] = await db.$queryRaw`
       SELECT 
         DATE("answerDate") AS "date",
         COUNT(*) AS "wordCount"
       FROM 
         "ProgressWordHistory"
       WHERE 
         "userId" = ${userId} AND
         "answerDate" BETWEEN ${startDate} AND ${endDate}
       GROUP BY 
         DATE("answerDate")
       ORDER BY 
         DATE("answerDate");
     `;

    const formattedResult: CalendarDatum[] = result.map(
      (entry: { date: Date; wordCount: number }) => ({
        day: entry.date.toISOString().split("T")[0],
        value: Number(entry.wordCount),
      })
    );

    return formattedResult;
  } catch (error) {
    throw new Error("An error occurred while fetching the words");
  }
});
export const getWordSetById = async (id: string, userId: string) => {
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
        folders: true,
        firstLanguage: true,
        secondLanguage: true,
      },
    });
    if (!wordSet) {
      return { error: "Word set not found" };
    }
    return { wordSet };
  } catch (error) {
    return { error: "An error occurred while fetching the word set" };
  }
};

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
    throw new Error("An error occurred while fetching the display order");
  }
});

export const get5lastMonthsWordsLearned = async (userId: string) => {
  try {
    const result = await db.$queryRaw<
      { nameOfMonth: string; wordCount: bigint }[]
    >`
    WITH months AS (
      SELECT DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' * generate_series(0, 4) AS month
  )
  SELECT
      TO_CHAR(months.month, 'FMMonth') AS "nameOfMonth",
      COALESCE(COUNT("ProgressWordHistory"."id"), 0) AS "wordCount"
  FROM
      months
  LEFT JOIN
      "ProgressWordHistory"
  ON
      DATE_TRUNC('month', "ProgressWordHistory"."answerDate") = months.month
      AND "ProgressWordHistory"."userId" = ${userId}
  GROUP BY
      months.month
  ORDER BY
      months.month DESC;
    `;

    // Konwertuj wordCount z BigInt na Number
    const formattedResult = result.map((row) => ({
      nameOfMonth: row.nameOfMonth,
      wordCount: Number(row.wordCount),
    }));

    return formattedResult;
  } catch (error) {
    throw new Error("An error occurred while fetching the words");
  }
};

export const getWordSetsAmountForUser = async (userId: string) => {
  if (!userId) {
    throw new Error("You must be logged in to view this data");
  }

  try {
    const wordSetsAmount = await db.wordSet.count({
      where: { userId },
    });

    return wordSetsAmount;
  } catch (error) {
    throw new Error("An error occurred while fetching the data");
  }
}
