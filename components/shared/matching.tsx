"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { ArrowLeft, LucideGamepad2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfettiStars } from "@/components/shared/confetti-stars";

import { Word } from "./WordFlashcards";

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
    <div className="mx-auto flex justify-center items-center flex-col gap-10 w-full h-full">
      <div className="flex flex-row justify-center items-center gap-4">
        <LucideGamepad2 className="text-indigo-500 w-16 h-16" />
        <h1 className="font-bold text-4xl [text-shadow:_2px_2px_2px_rgb(0_0_190_/_40%)]">
          Matching game
        </h1>
      </div>
      {!gameStarted ? (
        <>
          <div className="w-full flex items-center justify-center flex-col">
            <Select onValueChange={(value) => setSelectedSize(Number(value))}>
              <SelectTrigger className="w-1/2 p-10 rounded-full text-xl border-4 border-gray-300">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="rounded-3xl">
                {sizeRange.map((size) => (
                  <SelectItem
                    className="p-6 rounded-full flex justify-center"
                    key={size}
                    value={String(size)}
                    disabled={size > maxAvailableWords + 1}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex items-center justify-center flex-col gap-6">
            <Select
              onValueChange={(value) =>
                setSelectedDifficulty(
                  value.split("-").map(Number) as [number, number]
                )
              }
            >
              <SelectTrigger className="w-1/2 p-10 rounded-full text-xl border-4 border-gray-300">
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
                      className="p-6 rounded-full flex justify-center"
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
            <div className="flex gap-6">
              <Button className="px-12 py-6 text-xl rounded-full cursor-pointer">
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
                className="px-12 py-6 text-xl rounded-full cursor-pointer bg-indigo-500 text-white"
              >
                Start the game
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-[600px] flex justify-start flex-col items-center gap-10">
          <Button
            startContent={<ArrowLeft />}
            variant="flat"
            onClick={resetGame}
            className="px-12 py-6 text-xl rounded-full cursor-pointer bg-indigo-500 text-white"
          >
            Reset game
          </Button>
          <div className="flex flex-wrap gap-4 w-1/2">
            {shuffledWords.map((word) => (
              <button
                key={word.id}
                onClick={() => handleWordClick(word.id)}
                disabled={matches.includes(word.id)}
                className={`matchButton bg-[#e9f1f7] text-lg font-bold text-indigo-900 border-4 border-gray-300 rounded-2xl shadow-xl p-10 ${selectedWords.includes(word.id) ? "selected" : ""}`}
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
