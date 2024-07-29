"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  useEffect(() => {
    const updateShuffledWords = () => {
      const filteredWords = words.filter((word) => {
        const progress = word.progress * 100;
        return (
          progress >= selectedDifficulty[0] && progress <= selectedDifficulty[1]
        );
      });

      const availableWords =
        filteredWords.length >= selectedSize
          ? selectedSize
          : filteredWords.length;
      const shuffled = filteredWords
        .sort(() => 0.5 - Math.random())
        .slice(0, availableWords);
      const flattened = shuffled.flatMap((word) => [
        {
          id: word.id + "_original",
          originalWord: word.originalWord,
          translatedWord: word.translatedWord,
        },
        {
          id: word.id + "_translated",
          originalWord: word.originalWord,
          translatedWord: word.translatedWord,
        },
      ]);
      setShuffledWords(flattened.sort(() => 0.5 - Math.random()));
      setSelectedWords([]);
      setMatches([]);
    };
    if (gameStarted) {
      updateShuffledWords();
    }
  }, [gameStarted, selectedDifficulty, selectedSize, words]);

  const handleSizeChange = (value: string) => {
    setSelectedSize(Number(value));
  };

  const handleDifficultyChange = (value: string) => {
    const range = value.split("-").map(Number) as [number, number];
    setSelectedDifficulty(range);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShuffledWords([]);
    setSelectedWords([]);
    setMatches([]);
    setSelectedSize(0);
    setSelectedDifficulty([0, 10]);
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
      }
      setTimeout(() => {
        setSelectedWords([]);
      }, 1000);
    }
  };

  const difficultyRanges = [
    [0, 25],
    [26, 50],
    [51, 75],
    [76, 100],
  ];

  const availableWordsInRange = words.filter((word) => {
    const progress = word.progress * 100;
    return (
      progress >= selectedDifficulty[0] && progress <= selectedDifficulty[1]
    );
  }).length;

  const sizeRange = [3, 4, 5, 6, 7, 8, 9, 10];
  const stringifiedSizeRange = sizeRange.map(String);

  const disabledSizes = sizeRange.filter(
    (size) => size > availableWordsInRange
  );

  return (
    <div className="mx-auto flex justify-center items-center flex-col w-full h-full">
      {!gameStarted ? (
        <>
          <h1>Settings</h1>

          <div className="w-full flex items-center justify-center flex-col">
            <Select onValueChange={handleSizeChange}>
              <SelectTrigger className="w-1/2 p-10 rounded-full text-xl">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="rounded-3xl">
                {stringifiedSizeRange.map((size) => (
                  <SelectItem
                    className="p-6 rounded-full flex justify-center"
                    key={size}
                    value={size}
                    disabled={disabledSizes.includes(Number(size))}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex items-center justify-center flex-col gap-6">
            <Select
              onValueChange={handleDifficultyChange}
            >
              <SelectTrigger className="w-1/2 p-10 rounded-full text-xl">
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
              <Button
                color="primary"
                variant="shadow"
                onClick={startGame}
                disabled={
                  availableWordsInRange < selectedSize ||
                  !selectedSize || !selectedDifficulty
                }
                className="px-12 py-6 text-xl rounded-full"
              >
                Start the game
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <button onClick={resetGame}>Back to settings</button>
          <div className="word-grid">
            {shuffledWords.map((word) => (
              <button
                key={word.id}
                onClick={() => handleWordClick(word.id)}
                disabled={matches.includes(word.id)}
                className={`matchButton ${selectedWords.includes(word.id) ? "selected" : ""}`}
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
