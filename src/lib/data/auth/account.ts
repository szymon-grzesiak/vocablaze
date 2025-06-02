import { cache } from "react";

import db from "@/lib/db";

export const getAccountByUserId = cache(async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    return null;
  }
});
