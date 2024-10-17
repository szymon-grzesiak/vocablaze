"use client";

import { Fragment, useCallback, useMemo } from "react";

import { WordSet } from "@/hooks/useWordProgress";

import { ScrollArea } from "@/components/ui/scroll-area";

import WordProgressDisplay from "./WordProgressDisplay";
import { Divider, Progress, Select, SelectItem } from "@nextui-org/react";
import { Word } from "@prisma/client";
import { ArrowRight, BookIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = WordSet & {
  words: Word[];
};

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

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", value);
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const wordSetProgressSum = sortedWords.reduce(
    (acc, word) => acc + word.progress,
    0
  );

  const wordSetProgressValue = useMemo(
    () => Math.floor((wordSetProgressSum / sortedWords.length) * 100),
    [wordSetProgressSum, sortedWords.length]
  );

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
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
        <div className="rounded-lg bg-black/5 py-4 pl-2 backdrop-blur-xl dark:bg-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <BookIcon className="size-8 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Details
                </h3>
              </div>
              <div className="flex items-center justify-center gap-3">
                <p className="rounded-xl bg-black/10 px-2 py-1 font-semibold">
                  {wordSet?.firstLanguage?.name}
                </p>
                <ArrowRight className="text-blue-400" />{" "}
                <p className="rounded-xl bg-black/10 px-2 py-1 font-semibold">
                  {wordSet?.secondLanguage?.name}
                </p>
              </div>
            </div>

            <WordProgressDisplay progress={wordSetProgressValue / 100} />
          </div>
          <Divider className="h-[2px]" />
          <ScrollArea className="h-[400px] px-6">
            {sortedWords.map((word, index) => (
              <Fragment key={index}>
                <div className="flex justify-between rounded-lg py-4">
                  <div className="w-1/2 sm:w-full sm:max-w-lg">
                    <p className="font-bold  text-gray-900 dark:text-gray-100">
                      {word.originalWord}
                    </p>
                    <p className="truncate text-gray-800 dark:text-gray-400">
                      {word.translatedWord}
                    </p>
                  </div>
                  <div className="flex w-1/2 gap-2  max-sm:flex-col sm:w-full">
                    <Progress
                      label={`${Math.floor(word.progress * 100)} %`}
                      className="w-full"
                      value={word.progress * 100}
                      classNames={{ track: "bg-gray-400" }}
                    />
                  </div>
                </div>
                {index !== sortedWords.length - 1 && sortedWords.length > 1 && (
                  <Divider className="h-px" />
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
