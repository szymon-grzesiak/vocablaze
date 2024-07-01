import React from "react";
import { z } from "zod";

import { getWordSetById } from "@/lib/actions/action";
import { getFolders, getLanguages } from "@/lib/data/rest";
import { CardComponent } from "@/components/ui/Card/Card";

const Edit = async ({ params }: { params: { id: string } }) => {
  const wordSetPromise = await getWordSetById(params.id);
  const languagesPromise = getLanguages();
  const foldersPromise = getFolders();

  const [wordSet, languages, folders] = await Promise.all([
    wordSetPromise,
    languagesPromise,
    foldersPromise,
  ]);

  return (
    <div className="drop-shadow-lg border-none flex justify-center">
      <CardComponent
        mode="edit"
        text="Edit word set"
        wordSets={wordSet}
        languages={languages}
        folders={folders}
      />
    </div>
  );
};

export default Edit;
