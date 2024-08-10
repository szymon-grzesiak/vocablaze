"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";

import { useWordProgress, WordSet } from "@/hooks/useWordProgress";
import {HangmanDrawing, CheckIcon} from "@/components/shared/hangman-drawing";

import { WordProgress } from "./word-progress";
import { getCharacterSet } from "@/helpers/file";


const HangmanGame = ({ wordSet }: { wordSet: WordSet }) => {
  const pathname = usePathname().split("/")[2];
  const { words, currentWord, loading, handleDontKnowWord, handleKnowWord } =
    useWordProgress(wordSet);

  const [nWrong, setNWrong] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [manualGuess, setManualGuess] = useState<string>("");

  const guessedWord = useCallback(() => {
    return currentWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  }, [currentWord, guessedLetters]);

  useEffect(() => {
    console.log("Game state updated");
    console.log("nWrong:", nWrong);
    console.log("guessedWord:", guessedWord());
    console.log("currentWord:", currentWord);

    if (nWrong >= 6) {
      setGameState("lost");
    } else if (currentWord && guessedWord().replace(/ /g, "") === currentWord) {
      setGameState("won");
    }
  }, [nWrong, guessedLetters, currentWord, guessedWord]);

  const handleNextWord = () => {
    setGameState("playing");
    setGuessedLetters([]);
    setNWrong(0);
  };

  const handleGuess = (letter: string) => {
    setGuessedLetters((prev) => [...prev, letter]);

    if (!currentWord.includes(letter)) {
      setNWrong((prev) => prev + 1);
    }
  };

  const handleManualGuess = () => {
    if (manualGuess) {
      handleGuess(manualGuess);
      setManualGuess("");
    }
  };

  const Buttons = () => {
    const characterSet = getCharacterSet(wordSet?.secondLanguage?.name || "English");
    return characterSet.map((letter) => (
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

  const isLatin = getCharacterSet(wordSet?.secondLanguage?.name as string).length > 0;

  return (
    <div className="content bg-white/80 shadow-xl backdrop-blur-2xl mx-auto w-full max-w-[550px] dark:bg-slate-900/90 rounded-[2rem] full-screen-card overflow-hidden p-4">
      <div className="absolute top-0 right-0 p-2 z-20">
        <WordProgress progress={words[currentWord]?.progress * 100} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress size="lg" />
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-between ">
          <Button className="text-xl rounded-full cursor-pointer absolute top-[10px] left-[10px]">
            <ArrowLeft />
            <Link href={`/wordset/${pathname}`}>Back</Link>
          </Button>
          {gameState === "playing" && (
            <>
              <h1>{guessedWord()}</h1>
              <p>Guessed wrong: {nWrong}</p>
              <HangmanDrawing nWrong={nWrong} />
              <div className="flex flex-wrap gap-2 justify-center items-center">
                {isLatin ? <Buttons /> : (
                  <div className="flex gap-4 items-center">
                    <Input
                      value={manualGuess}
                      onChange={(e) => setManualGuess(e.target.value)}
                      placeholder="Enter a letter"
                    />
                    <Button onClick={handleManualGuess}>Check</Button>
                  </div>
                )}
              </div>
            </>
          )}
          {gameState === "won" && (
            <>
              <h1>You Win!</h1>
              <p>The word was: {currentWord}</p>
              <CheckIcon/>
              <Button
                onClick={async () => {
                  await handleKnowWord(currentWord);
                  handleNextWord();
                }}
              >
                Next Word
              </Button>
            </>
          )}
          {gameState === "lost" && (
            <>
              <h1>Game Over</h1>
              <p>The word was: {currentWord}</p>
              <HangmanDrawing nWrong={7} />{" "}
              {/* Show full drawing on game over */}
              <Button
                onClick={async () => {
                  await handleDontKnowWord(currentWord);
                  handleNextWord();
                }}
              >
                Next Word
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HangmanGame;