import React from "react";
import { z } from "zod";

import { getWordSetById } from "@/lib/data/rest";
import { getFolders, getLanguages } from "@/lib/data/rest";
import { CardComponent } from "@/components/shared/card/card";
import NotFound from "@/components/shared/NotFound";
import { currentUser } from "@/lib/sessionData";

const Edit = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();
  const { wordSet } = await getWordSetById(params.id, currUser?.id as string);
  const languagesPromise = getLanguages();
  const foldersPromise = getFolders();

  const [wordSetPromise, languages, folders] = await Promise.all([
    wordSet,
    languagesPromise,
    foldersPromise,
  ]);

  if (!wordSet) return <NotFound />;
  return (
    <div className="border-none flex justify-center">
      <CardComponent
        mode="edit"
        text="Edit word set"
        wordSets={wordSetPromise}
        languages={languages}
        folders={folders}
      />
    </div>
  );
};

export default Edit;
