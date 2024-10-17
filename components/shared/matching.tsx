"use client";

import { useEffect, useState } from "react";

import { ConfettiStars } from "@/components/shared/ConfettiStars";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@nextui-org/button";
import { Word } from "@prisma/client";
import { ArrowLeft, LucideGamepad2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Matching = ({ words }: { words: Word[] }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    [number | null, number | null]
  >([null, null]);
  const [shuffledWords, setShuffledWords] = useState<
    { id: string; originalWord: string; translatedWord: string }[]
  >([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const pathname = usePathname().split("/")[2];

  const { triggerConfetti } = ConfettiStars();

  useEffect(() => {
    if (matches.length > 0 && matches.length === shuffledWords.length) {
      triggerConfetti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, shuffledWords.length]);

  const startGame = () => {
    if (selectedSize === 0 || selectedDifficulty[0] === null) {
      return;
    }

    const filteredWords = words.filter((word) => {
      const progress = word.progress * 100;
      if (selectedDifficulty[0] !== null && selectedDifficulty[1] !== null) {
        return (
          progress >= selectedDifficulty[0] && progress <= selectedDifficulty[1]
        );
      }
    });

    const shuffled = filteredWords
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(selectedSize, filteredWords.length))
      .flatMap((word) => [
        {
          id: `${word.id}_original`,
          originalWord: word.originalWord,
          translatedWord: word.translatedWord,
        },
        {
          id: `${word.id}_translated`,
          originalWord: word.originalWord,
          translatedWord: word.translatedWord,
        },
      ]);

    setShuffledWords(shuffled.sort(() => 0.5 - Math.random()));
    setSelectedWords([]);
    setMatches([]);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShuffledWords([]);
    setSelectedWords([]);
    setMatches([]);
    setSelectedSize(0);
    setSelectedDifficulty([null, null]);
  };

  const handleWordClick = (wordId: string) => {
    if (selectedWords.includes(wordId) || matches.includes(wordId)) return;

    const newSelectedWords = [...selectedWords, wordId];
    setSelectedWords(newSelectedWords);

    if (newSelectedWords.length === 2) {
      const [firstWordId, secondWordId] = newSelectedWords;
      const firstWord = shuffledWords.find((word) => word.id === firstWordId);
      const secondWord = shuffledWords.find((word) => word.id === secondWordId);

      if (
        firstWord &&
        secondWord &&
        firstWord.originalWord === secondWord.originalWord
      ) {
        setMatches([...matches, firstWordId, secondWordId]);
        setSelectedWords([]);
      } else {
        setTimeout(() => setSelectedWords([]), 500);
      }
    }
  };

  const difficultyRanges = [
    [0, 25],
    [26, 50],
    [51, 75],
    [76, 100],
  ];

  const sizeRange = [3, 4, 5, 6, 7, 8, 9, 10];
  const maxAvailableWords = words.length;

  return (
    <div className="mx-auto flex size-full flex-col items-center justify-start gap-6 p-6">
      <div className="flex flex-row items-center justify-center gap-4">
        <LucideGamepad2 className="size-16 text-indigo-500" />
        <h1 className="text-4xl font-bold [text-shadow:_2px_2px_2px_rgb(0_0_190_/_40%)]">
          Matching game
        </h1>
      </div>
      {!gameStarted ? (
        <>
          <div className="flex w-full flex-col items-center justify-center">
            <Select onValueChange={(value) => setSelectedSize(Number(value))}>
              <SelectGroup>
                <SelectLabel className="text-xl font-bold">
                  Select the size of the game
                </SelectLabel>
              </SelectGroup>

              <SelectTrigger className="w-full rounded-full border-4 border-gray-300 p-10 text-xl dark:border-slate-500 md:w-1/2">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="rounded-3xl">
                {sizeRange.map((size) => (
                  <SelectItem
                    className="flex justify-center rounded-full p-6"
                    key={size}
                    value={String(size)}
                    disabled={size > maxAvailableWords + 1}
                  >
                    {size} words
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <Select
              onValueChange={(value) =>
                setSelectedDifficulty(
                  value.split("-").map(Number) as [number, number]
                )
              }
            >
              <SelectGroup>
                <SelectLabel className="text-xl font-bold">
                  Select the difficulty
                </SelectLabel>
              </SelectGroup>
              <SelectTrigger className="w-full rounded-full border-4 border-gray-300 p-10 text-xl dark:border-slate-500 md:w-1/2">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyRanges.map((range) => {
                  const rangeLabel = `${range[0]}% - ${range[1]}%`;
                  const wordsInRange = words.filter((word) => {
                    const progress = word.progress * 100;
                    return progress >= range[0] && progress <= range[1];
                  }).length;
                  return (
                    <SelectItem
                      className="flex justify-center rounded-full p-6"
                      key={rangeLabel}
                      value={range.join("-")}
                      disabled={wordsInRange < selectedSize}
                    >
                      {rangeLabel} (
                      {wordsInRange >= selectedSize
                        ? "Available"
                        : "Not enough words"}
                      )
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap-reverse justify-center gap-6 pt-6">
              <Button className="cursor-pointer rounded-full px-12 py-6 text-xl">
                <Link href={`/wordset/${pathname}`}>Back to details</Link>
              </Button>
              <Button
                variant="shadow"
                onClick={startGame}
                disabled={
                  maxAvailableWords < selectedSize ||
                  selectedSize === 0 ||
                  selectedDifficulty[0] === null
                }
                className="cursor-pointer rounded-full bg-indigo-500 px-12 py-6 text-xl text-white"
              >
                Start the game
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-[600px] w-full flex-col items-center justify-start gap-3">
            <p className="w-1/2 pb-5 text-lg">
              Match the original word with its translation. Start by clicking on
              a word. If you find a match, the words will turn green, otherwise
              they will come back to their original color.
            </p>
            <Button
              startContent={<ArrowLeft />}
              variant="flat"
              onClick={resetGame}
              className="cursor-pointer rounded-full bg-indigo-500 px-12 py-6 text-xl text-white"
            >
              Reset game
            </Button>
            <div className="flex flex-wrap justify-center gap-4 p-6">
            {shuffledWords.map((word) => (
              <button
                key={word.id}
                onClick={() => handleWordClick(word.id)}
                disabled={matches.includes(word.id)}
                className={`matchButton rounded-2xl border-4 border-gray-300 bg-[#e9f1f7] p-10 text-lg font-bold text-indigo-900 shadow-xl dark:border-slate-500 dark:bg-slate-700 dark:text-white ${selectedWords.includes(word.id) ? "selected" : ""}`}
              >
                {word.id.endsWith("_original")
                  ? word.originalWord
                  : word.translatedWord}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Matching;
