"use client";

import { Fragment, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Divider, Progress } from "@nextui-org/react";
import { BookIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectItem } from "@nextui-org/react";
import { WordSet } from "@/hooks/useWordProgress";
import { Word } from "@prisma/client";
import WordProgressDisplay from "./WordProgressDisplay";

type Props = WordSet & {
  words: Word[];
}

const ClientWordSet = ({ wordSet }: { wordSet: Props }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const sortCriterion = searchParams.get("sort") || "order";

  const sortedWords = useMemo(() => {
    let sorted = [...wordSet.words];

    if (sortCriterion === "progress") {
      sorted.sort((a, b) => b.progress - a.progress);
    } else if (sortCriterion === "date") {
      sorted.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateA - dateB;
      });
    } else if (sortCriterion === "order") {
      sorted.sort((a, b) => (b.order as number) - (a.order as number));
    }

    return sorted;
  }, [sortCriterion, wordSet.words]);

  const handleSortChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const wordSetProgressSum = sortedWords.reduce(
    (acc, word) => acc + word.progress,
    0
  );

  const wordSetProgressValue = useMemo(() => Math.floor(
    (wordSetProgressSum / sortedWords.length) * 100
  ), [wordSetProgressSum, sortedWords.length]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Select
          label="Sort by"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortCriterion}
          className="max-w-xs"
          variant="faded"
        >
          <SelectItem key="progress" value="progress">
            Progress
          </SelectItem>
          <SelectItem key="date" value="date">
            Date
          </SelectItem>
          <SelectItem key="order" value="order">
            Your own order
          </SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-black/5 backdrop-blur-xl dark:bg-gray-800 rounded-lg pl-2 py-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <BookIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Details
              </h3>
            </div>

             <WordProgressDisplay
              progress={wordSetProgressValue / 100}
            />
          </div>
          <Divider className="h-[2px]" />
          <ScrollArea className="h-[400px] px-6">
            {sortedWords.map((word, index) => (
              <Fragment key={index}>
                <div className="flex justify-between rounded-lg py-4">
                  <div className="w-full max-w-lg">
                    <p className="text-gray-900 font-bold dark:text-gray-100">
                      {word.originalWord}
                    </p>
                    <p className="text-gray-800 dark:text-gray-400">
                      {word.translatedWord}
                    </p>
                  </div>
                  <div className="flex gap-2 max-sm:flex-col w-full">
                    <Progress
                      label={`${Math.floor(word.progress * 100)} %`}
                      className="w-full"
                      value={word.progress * 100}
                      classNames={{ track: "bg-gray-400" }}
                    />
                  </div>
                </div>
                {index !== sortedWords.length - 1 &&
                  sortedWords.length > 1 && (
                    <Divider className="h-[1px]" />
                  )}
              </Fragment>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default ClientWordSet;
