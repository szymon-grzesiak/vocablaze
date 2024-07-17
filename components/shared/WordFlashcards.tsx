"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, CircularProgress } from "@nextui-org/react";

import { updateProgress } from "@/lib/actions/action";

import { WordProgress } from "./word-progress";

type Word = {
  id: string;
  originalWord: string;
  translatedWord: string;
  progressWords: {
    progressValue: number;
  }[];
};

type WordSet = {
  id: string;
  title: string;
  words: Word[];
};

const WordFlashcards = ({ wordSet }: { wordSet: WordSet }) => {
  const initialWords = wordSet.words.reduce(
    (acc, word) => {
      acc[word.originalWord] = {
        progressValue:
          word.progressWords.length > 0
            ? word.progressWords[0].progressValue
            : 0,
        id: word.id,
      };

      return acc;
    },
    {} as { [key: string]: { progressValue: number; id: string } }
  );

  const [words, setWords] = useState(initialWords);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const selectRandomWord = useCallback(() => {
    const wordList = Object.entries(words).map(
      ([originalWord, { progressValue }]) => ({
        originalWord,
        weight: Math.max(1 - progressValue, 0.1),
      })
    );

    const totalWeight = wordList.reduce((acc, { weight }) => acc + weight, 0);

    let randomIndex = Math.random() * totalWeight;

    const selectedEntry = wordList.find(({ weight }) => {
      randomIndex -= weight;
      return randomIndex <= 0;
    });

    return selectedEntry
      ? selectedEntry.originalWord
      : wordList[0].originalWord;
  }, [words]);

  useEffect(() => {
    setCurrentWord(selectRandomWord);
  }, [selectRandomWord]);

  const handleDontKnowWord = async (originalWord: string) => {
    setLoading(true);
    const wordId = words[originalWord].id;
    const decreaseAmount = Math.max(0.1, 1 - words[originalWord].progressValue);
    const newProgress = Math.max(
      words[originalWord].progressValue - decreaseAmount,
      0
    );

    setWords((prevWords) => ({
      ...prevWords,
      [originalWord]: {
        ...prevWords[originalWord],
        progressValue: newProgress,
      },
    }));

    await updateProgress(wordId, newProgress);
    handleNextWord();
    setLoading(false);
  };

  const handleKnowWord = async (originalWord: string) => {
    setLoading(true);
    const wordId = words[originalWord].id;
    const newProgress = Math.min(words[originalWord].progressValue + 0.1, 1);

    setWords((prevWords) => ({
      ...prevWords,
      [originalWord]: {
        ...prevWords[originalWord],
        progressValue: newProgress,
      },
    }));

    await updateProgress(wordId, newProgress);
    handleNextWord();
  };

  const handleNextWord = () => {
    setLoading(true);
    setCurrentWord(selectRandomWord());
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress size="lg" />
        </div>
      ) : (
        currentWord && (
          <div className="h-full flex flex-col items-center justify-between">
            <div className="absolute top-0 right-0 p-2">
              {!loading && (
                <WordProgress
                  progress={words[currentWord]?.progressValue * 100}
                />
              )}
            </div>
            <div/>
            <div>
              <div>Current word: </div>
              <div className="text-3xl font-bold">{currentWord}</div>
            </div>
            <div className="flex gap-4 mb-10">
              <Button
                className="text-white"
                color="success"
                onClick={() => handleKnowWord(currentWord)}
              >
                Znam
              </Button>
              <Button
                color="danger"
                onClick={() => handleDontKnowWord(currentWord)}
              >
                Nie znam
              </Button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default WordFlashcards;
