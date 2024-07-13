import React from "react";

import { WordProgress } from "@/components/shared/word-progress";

const Flashcards = () => {
  return (
    <div className="bg-white/80 shadow-xl backdrop-blur-2xl mx-auto p-4 w-full max-w-[550px] dark:bg-slate-900/90 rounded-lg flex flex-col justify-center items-center">
      Zestaw
      <WordProgress />
    </div>
  );
};

export default Flashcards;
