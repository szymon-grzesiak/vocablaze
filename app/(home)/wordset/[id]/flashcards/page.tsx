import WordFlashcards from "@/components/shared/WordFlashcards";
import { getWordSetWithProgress } from "@/lib/actions/action";

const Flashcards = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);

  return (
    <div className="relative size-full">
      <WordFlashcards wordSet={wordSet}  />
    </div>
  );
};

export default Flashcards;