import { getWordSetWithProgress } from "@/lib/actions/action";
import WordFlashcards from "@/components/shared/WordFlashcards";

const Flashcards = async ({ params }: { params: { id: string } }) => {
  const wordSet = await getWordSetWithProgress(params.id);
  console.log(wordSet);

  return (
    <div className="relative w-full h-full">
      <WordFlashcards wordSet={wordSet}  />
    </div>
  );
};

export default Flashcards;