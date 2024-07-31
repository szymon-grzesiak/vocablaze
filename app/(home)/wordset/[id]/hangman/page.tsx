
import HangmanGame from "@/components/shared/hangman";
import { getWordSetWithProgress } from "@/lib/actions/action";

const Hangman = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative content bg-white/80 shadow-xl backdrop-blur-2xl mx-auto p-4 w-full max-w-[550px] dark:bg-slate-900/90 rounded-[2rem] full-screen-card overflow-hidden">
      <HangmanGame wordSet={wordSet} />
    </div>
  );
};

export default Hangman;