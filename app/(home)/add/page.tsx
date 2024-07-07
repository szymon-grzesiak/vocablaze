import React from "react";

import { getFolders, getLanguages } from "@/lib/data/rest";
import { CardComponent } from "@/components/shared/card/card";

const Add = async () => {
  const languages = getLanguages();
  const folders = getFolders();

  const [lang, fold] = await Promise.all([languages, folders]);

  return (
    <div className="border-none flex justify-center">
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
