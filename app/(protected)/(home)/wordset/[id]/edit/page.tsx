import React from "react";
import { z } from "zod";

import { getWordSetById } from "@/lib/actions/action";
import { getFolders, getLanguages } from "@/lib/data/rest";

import { CardComponent } from "@/components/ui/Card/Card";

const Edit = async ({ params }: { params: { id: string } }) => {
  const wordSetPromise = await getWordSetById(params.id);
  const languagesPromise = getLanguages();
  const foldersPromise = getFolders();

  const [wordSet, languages, folders] = await Promise.all([wordSetPromise, languagesPromise, foldersPromise]);

  return (
    <div>
      <CardComponent mode="edit" wordSets={wordSet} languages={languages} folders={folders} />
    </div>
  );
};

export default Edit;
