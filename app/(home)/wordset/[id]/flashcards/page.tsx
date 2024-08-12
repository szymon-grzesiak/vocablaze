import { getWordSetWithProgress } from "@/lib/actions/action";
import WordFlashcards from "@/components/shared/WordFlashcards";
import { Button } from "@nextui-org/button";
import Link from "next/link";

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