import { cache } from "react";

import db from "@/lib/db";

export const getTwoFactorConfirmationByUserId = cache(async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
});
