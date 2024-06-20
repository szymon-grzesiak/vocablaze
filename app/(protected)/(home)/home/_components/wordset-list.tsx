import Link from "next/link";

import { getAllWordSets } from "@/lib/actions/action";

const WordSetsList = async () => {
  const { wordSets, error } = await getAllWordSets();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-[500px] overflow-y-auto">
      <ul className="flex flex-col gap-4">
        {wordSets?.map((wordSet) => (
          <Link href={`/wordset/${wordSet.id}`} key={wordSet.id}>
            <li
              key={wordSet.id}
              className="p-3 flex justify-center banner-custom items-center"
            >
              <h1 className="text-2xl font-bold [text-shadow:_1px_1px_1px_rgb(0_0_255_/_20%)]">{wordSet.title}</h1>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default WordSetsList;
