"use client";

import { Fragment, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Divider, Progress } from "@nextui-org/react";
import { BookIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectItem } from "@nextui-org/react";
import { WordSet } from "@/hooks/useWordProgress";

const ClientWordSet = ({ wordSet }: { wordSet: WordSet }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sortedWords, setSortedWords] = useState(wordSet.words);

  const sortCriterion = searchParams.get("sort") || "order";

  useEffect(() => {
    let sorted = [...wordSet.words];
    if (sortCriterion === "progress") {
      sorted.sort((a, b) => b.progress - a.progress);
    } else if (sortCriterion === "date") {
      sorted.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateA - dateB;
      });
    }
    setSortedWords(sorted);
  }, [sortCriterion, wordSet.words]);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  const wordSetProgressSum = sortedWords.reduce(
    (acc, word) => acc + word.progress,
    0
  );

  const wordSetProgressValue = Math.floor(
    (wordSetProgressSum / sortedWords.length) * 100
  );

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
                Word Set Details
              </h3>
            </div>
            <Progress
              classNames={{ track: "bg-gray-400" }}
              label={`${wordSetProgressValue} %`}
              color="success"
              className="w-32"
              value={wordSetProgressValue}
            />
          </div>
          <Divider className="h-[2px]" />
          <ScrollArea className="h-[400px]">
            {sortedWords.map((word, index) => (
              <Fragment key={index}>
                <div
                  className="flex items-center justify-between max-sm:flex-col max-sm:justify-start max-sm:items-start rounded-lg p-4"
                >
                  <div>
                    <p className="text-gray-900 font-bold dark:text-gray-100">
                      {word.originalWord}
                    </p>
                    <p className="text-gray-800 dark:text-gray-400">
                      {word.translatedWord}
                    </p>
                  </div>
                  <div className="flex gap-2 max-sm:flex-col">
                    <Progress
                      label={`${Math.floor(word.progress * 100)} %`}
                      className="w-32"
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
