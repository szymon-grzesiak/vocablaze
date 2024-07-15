import React from "react";

import { getInitialWords } from "@/lib/actions/action";
import { WordProgress } from "@/components/shared/word-progress";

import WordFlashcards from "../../../../../components/shared/WordFlashcards";

const Flashcards = async ({ params }: { params: { id: string } }) => {
  const initialWords = await getInitialWords(params.id);

  return (
    <div className="relative bg-white/80 shadow-xl backdrop-blur-2xl mx-auto p-4 w-full max-w-[550px] dark:bg-slate-900/90 rounded-lg flex flex-col justify-center items-center">
      <p>Zestaw</p>
      <div className="absolute top-0 right-0 p-2">
        <WordProgress />
      </div>
      <WordFlashcards initialWords={initialWords} />
    </div>
  );
};

export default Flashcards;
