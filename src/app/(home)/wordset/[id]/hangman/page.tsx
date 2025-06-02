import HangmanGame from "@/components/shared/Hangman";
import NotFound from "@/components/shared/NotFound";
import { getWordSetWithProgress } from "@/lib/actions/action";
import { currentUser } from "@/lib/sessionData";

import { LucideGamepad2 } from "lucide-react";

const Hangman = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();

  if (currUser?.role !== "PRO") {
    return <NotFound message="Purchase premium version to access this game" />;
  }
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative flex size-full flex-col gap-3 px-6 pb-6 pt-0">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <LucideGamepad2 className="size-16 text-indigo-500" />
          <h1 className="text-4xl font-bold [text-shadow:_2px_2px_2px_rgb(0_0_190_/_40%)]">
            Hangman game
          </h1>
        </div>

        <p className="pb-2 text-lg md:w-1/2">
          Guess the translation of the word before the hangman is drawn. You can guess the word by
          entering a letter or by clicking on the buttons.
        </p>
      </div>
      <HangmanGame wordSet={wordSet} />
    </div>
  );
};

export default Hangman;
