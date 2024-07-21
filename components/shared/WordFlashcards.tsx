"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, CircularProgress, Switch } from "@nextui-org/react";

import { saveDisplayOrder, updateProgress } from "@/lib/actions/action";

import { WordProgress } from "./word-progress";

type Word = {
  id: string;
  originalWord: string;
  translatedWord: string;
  progress: number;
  progressHistory: {
    progressValue: number;
  }[];
};

type WordSet = {
  id: string;
  title: string;
  words: Word[];
};

const WordFlashcards = ({
  wordSet,
  order,
}: {
  wordSet: WordSet;
  order: boolean;
}) => {
  const initialWords = wordSet.words.reduce(
    (acc, word) => {
      acc[word.originalWord] = {
        progress: word.progress,
        id: word.id,
        translatedWord: word.translatedWord,
      };

      return acc;
    },
    {} as {
      [key: string]: {
        progress: number;
        id: string;
        translatedWord: string;
      };
    }
  );

  const [words, setWords] = useState(initialWords);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [showTranslatedFirst, setShowTranslatedFirst] =
    useState<boolean>(order);

  const selectRandomWord = useCallback(() => {
    const wordList = Object.entries(words).map(
      ([originalWord, { progress }]) => ({
        originalWord,
        weight: Math.max(1 - progress, 0.1),
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
    setCurrentWord(selectRandomWord());
  }, [selectRandomWord]);

  const handleDontKnowWord = async (originalWord: string) => {
    setLoading(true);
    const wordId = words[originalWord].id;
    const decreaseAmount = Math.max(0.1, 1 - words[originalWord].progress);
    const newProgress = Math.max(
      words[originalWord].progress - decreaseAmount,
      0
    );

    setWords((prevWords) => ({
      ...prevWords,
      [originalWord]: {
        ...prevWords[originalWord],
        progress: newProgress,
      },
    }));

    await updateProgress(wordId, newProgress);
    handleNextWord();
    setLoading(false);
  };

  const handleKnowWord = async (originalWord: string) => {
    setLoading(true);
    const wordId = words[originalWord].id;
    const newProgress = Math.min(words[originalWord].progress + 0.1, 1);

    setWords((prevWords) => ({
      ...prevWords,
      [originalWord]: {
        ...prevWords[originalWord],
        progress: newProgress,
      },
    }));

    await updateProgress(wordId, newProgress);
    handleNextWord();
  };

  const handleNextWord = () => {
    setLoading(true);
    setCurrentWord(selectRandomWord());
    setFlipped(false);
    setLoading(false);
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleToggleOrder = async () => {
    const newOrder = !showTranslatedFirst;
    setShowTranslatedFirst(newOrder);
    await saveDisplayOrder(wordSet.id, newOrder);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress size="lg" />
        </div>
      ) : (
        currentWord && (
          <div className="h-full flex flex-col items-center justify-between content">
            <div className="absolute top-0 right-0 p-2">
              {!loading && (
                <WordProgress
                  progress={words[currentWord]?.progress * 100}
                />
              )}
            </div>
            <div
              className={`card ${flipped ? "flipped" : ""}`}
              onClick={handleCardClick}
            >
              <div className="front">
                <div>
                  {showTranslatedFirst
                    ? words[currentWord].translatedWord
                    : currentWord}
                </div>
              </div>
              <div className="back">
                <div>
                  {showTranslatedFirst
                    ? currentWord
                    : words[currentWord].translatedWord}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Switch
                checked={showTranslatedFirst}
                onChange={handleToggleOrder}
                color="success"
                size="sm"
              >
                Reverse order
              </Switch>
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
