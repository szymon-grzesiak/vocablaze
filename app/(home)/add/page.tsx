import React from "react";

import CardComponent from "@/components/shared/card";
import { getFolders, getLanguages, getWordSetsAmountForUser } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";

import { redirect } from "next/navigation";

const Add = async () => {
  const languages = getLanguages();
  const folders = getFolders();
  const userReq = currentUser();

  const [lang, fold, user] = await Promise.all([languages, folders, userReq]);

  const wordSetsAmount = await getWordSetsAmountForUser(String(user?.id));

  const isDisabled = wordSetsAmount >= 3 && user?.role === 'USER';

  if(isDisabled) {
    redirect("/home");
  }

  return (
    <div className="flex w-full justify-center border-none">
      <CardComponent
        mode="add"
        languages={lang}
        folders={fold}
        text="Create a new word set"
      />
    </div>
  );
};

export default Add;
