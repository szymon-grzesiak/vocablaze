'use client';

import { useState, useEffect, useCallback } from 'react';
import { saveProgress, Word } from '@/lib/actions/action';

interface WordFlashcardsProps {
  initialWords: Word[];
}

const WordFlashcards: React.FC<WordFlashcardsProps> = ({ initialWords }) => {
  const [words, setWords] = useState<Word[]>(initialWords);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  const selectRandomWord = () => {
    const wordList = words.map(({ id, ProgressWord, originalWord }) => ({
      id,
      word: originalWord,
      progress: ProgressWord ? ProgressWord.isCorrectAnswer : 0,
      weight: Math.max(1 - (ProgressWord ? ProgressWord.isCorrectAnswer / 100 : 0), 0.1),
    }));

    const totalWeight = wordList.reduce((acc, { weight }) => acc + weight, 0);

    let randomIndex = Math.random() * totalWeight;

    const selectedEntry = wordList.find(({ weight }) => {
      randomIndex -= weight;
      return randomIndex <= 0;
    });

    return selectedEntry ? selectedEntry : wordList[0];
  };

  const handleNextWord = () => {
    setCurrentWord(selectRandomWord());
  };

  const handleDontKnowWord = async (wordId: string) => {
    setWords((prevWords) => {
      return prevWords.map((item) => {
        if (item.id === wordId) {
          const newProgress = Math.max((item.ProgressWord?.isCorrectAnswer ?? 0) - 1, 0);
          saveProgress(wordId, false); // Save progress to the database
          return { ...item, ProgressWord: { ...item.ProgressWord, isCorrectAnswer: newProgress } };
        }
        return item;
      });
    });
    handleNextWord();
  };

  const handleKnowWord = async (wordId: string) => {
    setWords((prevWords) => {
      return prevWords.map((item) => {
        if (item.id === wordId) {
          const newProgress = Math.min((item.ProgressWord?.isCorrectAnswer ?? 0) + 1, 100);
          saveProgress(wordId, true); // Save progress to the database
          return { ...item, ProgressWord: { ...item.ProgressWord, isCorrectAnswer: newProgress } };
        }
        return item;
      });
    });
    handleNextWord();
  };

  useEffect(() => {
    handleNextWord(); // Select the first word on component mount
  }, []);

  console.log(currentWord)
  return (
    <div>
      {currentWord && (
        <div>
          <p>Current word: {currentWord.word}</p>
          <p>Progress: {words.find(({ id }) => id === currentWord.id)?.ProgressWord?.isCorrectAnswer ?? 0}</p>
          <button onClick={() => handleKnowWord(currentWord.id)}>I know</button>
          <button onClick={() => handleDontKnowWord(currentWord.id)}>I don't know</button>
        </div>
      )}
    </div>
  );
};

export default WordFlashcards;
