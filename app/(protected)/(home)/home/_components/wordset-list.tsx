import Link from "next/link";

import { getAllWordSets } from "@/lib/data/rest";
import { ScrollArea } from "@/components/ui/scroll-area";

const WordSetsList = async () => {
  const { wordSets, error } = await getAllWordSets();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ScrollArea className="h-[500px]">
      <ul className="flex flex-col gap-4 mb-5">
        {wordSets?.map((wordSet) => (
          <Link href={`/wordset/${wordSet.id}`} key={wordSet.id}>
            <li
              key={wordSet.id}
              className="p-3 flex justify-start flex-col hover:opacity-80 mx-6 rounded-md cursor-pointer backdrop-blur-xl bg-transparent"
            >
              <div className="text-xl font-bold [text-shadow:_1px_1px_1px_rgb(0_0_255_/_20%)]">
                {wordSet.title}
              </div>
              <p className="text-black/80 text-md">{wordSet.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default WordSetsList;
