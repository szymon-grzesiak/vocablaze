import React from "react";

import { getWordSetWithProgress } from "@/lib/actions/action";
import { WordProgress } from "@/components/shared/word-progress";
import WordFlashcards from "@/components/shared/WordFlashcards";

const Flashcards = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative bg-white/80 shadow-xl backdrop-blur-2xl mx-auto p-4 w-full max-w-[550px] dark:bg-slate-900/90 rounded-[2rem] full-screen-card">
      <p>Zestaw</p>
      <WordFlashcards wordSet={wordSet} />
    </div>
  );
};

export default Flashcards;
