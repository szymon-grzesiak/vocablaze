import React from "react";

import { CardComponent } from "@/components/shared/card/Card";
import NotFound from "@/components/shared/NotFound";
import { getFolders, getLanguages, getWordSetById } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";


const Edit = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();
  const wordsetPromise = getWordSetById(params.id, currUser?.id as string);
  const languagesPromise = getLanguages();
  const foldersPromise = getFolders();

  const [wordSetPromise, languages, folders] = await Promise.all([
    wordsetPromise,
    languagesPromise,
    foldersPromise,
  ]);

  const wordSet = wordSetPromise.wordSet;

  if (!wordSet) return <NotFound />;
  return (
    <div className="flex w-full justify-center border-none">
      <CardComponent
        mode="edit"
        text="Edit word set"
        wordSet={wordSet}
        languages={languages}
        folders={folders}
      />
    </div>
  );
};

export default Edit;
