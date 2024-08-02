
import HangmanGame from "@/components/shared/hangman";
import { getWordSetWithProgress } from "@/lib/actions/action";

const Hangman = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative h-full w-full">
      <HangmanGame wordSet={wordSet} />
    </div>
  );
};

export default Hangman;