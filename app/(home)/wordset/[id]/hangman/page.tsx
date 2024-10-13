import { LucideGamepad2 } from "lucide-react";

import { getWordSetWithProgress } from "@/lib/actions/action";
import { currentUser } from "@/lib/sessionData";
import HangmanGame from "@/components/shared/hangman";
import NotFound from "@/components/shared/NotFound";

const Hangman = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();

  if (currUser?.role !== "PRO") {
    return <NotFound message="Purchase premium version to access this game" />;
  }
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative h-full w-full px-6 pb-6 pt-0 flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-3">
          <LucideGamepad2 className="text-indigo-500 w-16 h-16" />
          <h1 className="font-bold text-4xl [text-shadow:_2px_2px_2px_rgb(0_0_190_/_40%)]">
            Hangman game
          </h1>
        </div>

        <p className="text-lg pb-2 md:w-1/2">
          Guess the translation of the word before the hangman is drawn. You can guess the word by
          entering a letter or by clicking on the buttons.
        </p>
      </div>
      <HangmanGame wordSet={wordSet} />
    </div>
  );
};

export default Hangman;
