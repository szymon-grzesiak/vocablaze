import React from "react";

import { getWordSetWithProgress } from "@/lib/actions/action";
import WordFlashcards from "@/components/shared/WordFlashcards";
import FlipCard from "@/components/shared/flip-card";

const Flashcards = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative content bg-white/80 shadow-xl backdrop-blur-2xl mx-auto p-4 w-full max-w-[550px] dark:bg-slate-900/90 rounded-[2rem] full-screen-card overflow-hidden">
     <FlipCard>
      <WordFlashcards wordSet={wordSet} />
     </FlipCard>
    </div>
  );
};

export default Flashcards;
