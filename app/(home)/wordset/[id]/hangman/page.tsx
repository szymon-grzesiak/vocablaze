import { getWordSetWithProgress } from "@/lib/actions/action";
import { currentUser } from "@/lib/sessionData";
import HangmanGame from "@/components/shared/hangman";
import NotFound from "@/components/shared/NotFound";

const Hangman = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();

  if (currUser?.role !== "PRO") {
    return <NotFound message="Purchase premium version to access this game"/>;
  }
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative h-full w-full">
      <HangmanGame wordSet={wordSet} />
    </div>
  );
};

export default Hangman;
