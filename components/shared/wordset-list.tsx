"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TiArrowRightThick } from "react-icons/ti";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const WordSetsList = ({
  wordSets,
  error,
  className,
  liStyle,
}: {
  wordSets:
    | {
        id: string;
        title: string;
        description: string | null;
        firstLanguageId: string;
        secondLanguageId: string;
        isShared: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string;
        folders: {
          id: string;
          color: string | null;
          name: string;
          userId: string;
        }[];
      }[]
    | undefined;
  error?: string;
  className?: string;
  liStyle?: string;
}) => {
  const sets = useSearchParams();
  const query = sets.get("sets") || "";

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredWordSets = wordSets?.filter((wordSet) =>
    wordSet.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollArea className={cn("h-3/4 overflow-auto", className)}>
      <ul className="flex flex-col gap-4 mb-5">
        {filteredWordSets?.map((wordSet) => (
          <Link href={`/wordset/${wordSet.id}`} key={wordSet.id}>
            <li
              key={wordSet.id}
              className={cn(
                "p-3 flex justify-start items-center gap-4 hover:opacity-80 mx-6 rounded-md cursor-pointer backdrop-blur-xl bg-transparent dark:hover:bg-white/10",
                liStyle
              )}
            >
              <TiArrowRightThick className="shrink-0 text-blue-400 w-6 h-6" />
              <div>
                <p className="text-xl font-bold [text-shadow:_1px_1px_1px_rgb(0_0_255_/_20%)]">
                  {wordSet.title}
                </p>
                <p className="text-black/80 dark:text-gray-500 text-md">
                  {wordSet.description}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default WordSetsList;
