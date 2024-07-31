"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, CircularProgress } from "@nextui-org/react";

import { updateProgress } from "@/lib/actions/action";

import { WordProgress } from "./word-progress";

import img0 from '@/public/assets/images/0.jpg'
import img1 from '@/public/assets/images/1.jpg'
import img2 from '@/public/assets/images/2.jpg'
import img3 from '@/public/assets/images/3.jpg'
import img4 from '@/public/assets/images/4.jpg'
import img5 from '@/public/assets/images/5.jpg'
import img6 from '@/public/assets/images/6.jpg'
import Image from "next/image";

export type Word = {
  id: string;
  originalWord: string;
  translatedWord: string;
  progress: number;
  progressHistory: {
    progressValue: number;
  }[];
};

export type WordSet = {
  id: string;
  title: string;
  displayTranslatedFirst: boolean;
  words: Word[];
};


const images = [img0, img1, img2, img3, img4, img5, img6];

const HangmanGame = ({ wordSet }: { wordSet: WordSet }) => {
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
  const [nWrong, setNWrong] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [words, setWords] = useState(initialWords);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );

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

  const guessedWord = useCallback(() => {
    return currentWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"));
  }, [currentWord, guessedLetters]);

  useEffect(() => {
    if (nWrong >= 6) {
      setGameState("lost");
    } else if (currentWord && guessedWord().join("") === currentWord) {
      setGameState("won");
    }
  }, [nWrong, guessedLetters, currentWord, guessedWord]);

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
    setGameState("playing");
    setGuessedLetters([]);
    setNWrong(0);
    setCurrentWord(selectRandomWord());
    setLoading(false);
  };

  const handleGuess = (letter: string) => {
    setGuessedLetters((prev) => [...prev, letter]);

    if (!currentWord.includes(letter)) {
      setNWrong((prev) => prev + 1);
    }
  };

  const Buttons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <Button
        key={letter}
        onClick={() => handleGuess(letter)}
        isDisabled={guessedLetters.includes(letter)}
        variant="shadow"
        className="font-bold text-white bg-indigo-400"
      >
        {letter}
      </Button>
    ));
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress size="lg" />
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-between">
          {gameState === "playing" && (
            <>
              <div className="absolute top-0 right-0 p-2 z-20">
                <WordProgress progress={words[currentWord]?.progress * 100} />
              </div>
              <h1>{guessedWord().join(" ")}</h1>
              <p>Guessed wrong: {nWrong}</p>
              <Image src={images[nWrong]} alt="hangman" />
              <div className="flex flex-wrap gap-2 justify-center items-center">
                <Buttons />
              </div>
            </>
          )}
          {gameState === "won" && (
            <>
              <h1>You Win!</h1>
              <p>The word was: {currentWord}</p>
              <Button onClick={() => handleKnowWord(currentWord)}>
                Next Word
              </Button>
            </>
          )}
          {gameState === "lost" && (
            <>
              <h1>Game Over</h1>
              <p>The word was: {currentWord}</p>
              <Button onClick={() => handleDontKnowWord(currentWord)}>
                Next Word
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HangmanGame;
