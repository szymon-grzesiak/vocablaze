import { useCallback, useEffect, useState } from "react";
import { updateProgress, saveDisplayOrder } from "@/lib/actions/action";

export type Word = {
  id: string;
  originalWord: string;
  translatedWord: string;
  progress: number;
  updatedAt?: Date;
  progressHistory: {
    progressValue: number;
  }[];
  order?: number | null | undefined;
};

export type WordSet = {
  id: string;
  title: string;
  displayTranslatedFirst: boolean;
  firstLanguage?: {
    name: string;
  };
  secondLanguage?: {
    name: string;
  };
  words: Word[];
};

type WordsState = {
  [key: string]: {
    progress: number;
    id: string;
    translatedWord: string;
    originalWord?: string;
  };
};

export const useWordProgress = (wordSet: (WordSet )) => {
  const initialWords = wordSet.words.reduce((acc, word) => {
    acc[word.originalWord] = {
      progress: word.progress,
      id: word.id,
      translatedWord: word.translatedWord,
      originalWord: word.originalWord,
    };
    return acc;
  }, {} as WordsState);

  const [words, setWords] = useState<WordsState>(initialWords);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTranslatedFirst, setShowTranslatedFirst] = useState<boolean>(
    wordSet.displayTranslatedFirst
  );

  const selectRandomWord = useCallback((): string => {
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

    return selectedEntry ? selectedEntry.originalWord : wordList[0].originalWord;
  }, [words]);

  useEffect(() => {
    setCurrentWord(selectRandomWord());
  }, [selectRandomWord]);

  
  const handleDontKnowWord = async (originalWord: string) => {
    setLoading(true);
    const wordId = words[originalWord].id;
    const currentProgress = words[originalWord].progress;
  
    // Bazowy spadek 0.05 plus 40% aktualnego progresu
    const decreaseAmount = Math.max(0.1,  0.05 + currentProgress * 0.4);
    const newProgress = Math.max(currentProgress - decreaseAmount, 0);
  
    setWords((prevWords) => ({
      ...prevWords,
      [originalWord]: {
        ...prevWords[originalWord],
        progress: newProgress,
      },
    }));
  
    await updateProgress(wordId, newProgress);
    setCurrentWord(selectRandomWord());
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
    setCurrentWord(selectRandomWord());
    setLoading(false);
  };

  const handleToggleOrder = async () => {
    const newOrder = !showTranslatedFirst;
    setShowTranslatedFirst(newOrder);
    await saveDisplayOrder(wordSet.id, newOrder);
  };

  return {
    words,
    currentWord,
    setCurrentWord,
    loading,
    showTranslatedFirst,
    selectRandomWord,
    handleDontKnowWord,
    handleKnowWord,
    handleToggleOrder,
    setLoading,
  };
};
