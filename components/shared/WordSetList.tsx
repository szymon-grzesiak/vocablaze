"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { TiArrowRightThick } from "react-icons/ti";

const WordSetsList = ({
  wordSets,
  error,
  className,
  searchParams,
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
  searchParams: { [key: string]: string };
  liStyle?: string;
}) => {

  if (error) {
    return <div>Error: {error}</div>;
  }

  const query = searchParams.sets || "";

  const filteredWordSets = wordSets?.filter((wordSet) =>
    wordSet.title.toLowerCase().includes(query.toLowerCase()) ||  wordSet?.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollArea className={cn("h-3/4 overflow-auto", className)}>
      <ul className="mb-5 flex flex-col gap-4">
        {filteredWordSets?.map((wordSet) => (
          <Link href={`/wordset/${wordSet.id}`} key={wordSet.id}>
            <li
              key={wordSet.id}
              className={cn(
                "p-3 flex justify-start items-center gap-4 hover:opacity-80 mx-6 rounded-md cursor-pointer backdrop-blur-xl bg-transparent dark:hover:bg-white/10",
                liStyle
              )}
            >
              <TiArrowRightThick className="size-6 shrink-0 text-blue-400" />
              <div>
                <p className="text-xl font-bold [text-shadow:_1px_1px_1px_rgb(0_0_255_/_20%)]">
                  {wordSet.title}
                </p>
                <p className="text-medium text-black/80 dark:text-gray-500">
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
