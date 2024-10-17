import React from "react";

import { CardComponent } from "@/components/shared/card/Card";
import { getFolders, getLanguages } from "@/lib/data/rest";

const Add = async () => {
  const languages = getLanguages();
  const folders = getFolders();

  const [lang, fold] = await Promise.all([languages, folders]);

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
