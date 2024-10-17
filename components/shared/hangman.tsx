"use client";

import { useCallback, useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useWordProgress, WordSet } from "@/hooks/useWordProgress";

import { CheckIcon, HangmanDrawing } from "@/components/shared/HangmanDrawing";
import { getCharacterSet } from "@/helpers/file";

import { WordProgress } from "./WordProgress";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { WordSet as PrismaWordSetType } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HangmanGame = ({ wordSet }: { wordSet: WordSet | PrismaWordSetType }) => {
  const pathname = usePathname().split("/")[2];
  const { words, currentWord, loading, handleDontKnowWord, handleKnowWord } =
    useWordProgress(wordSet as WordSet);
  const mediaQuery = useMediaQuery("(min-width: 768px)");

  const [nWrong, setNWrong] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [manualGuess, setManualGuess] = useState<string>("");

  // Normalize currentWord to lowercase for comparison
  const lowerCurrentWord = currentWord.toLowerCase();

  const guessedWord = useCallback(() => {
    return currentWord
      .split("")
      .map((letter) =>
        guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
      )
      .join(" ");
  }, [currentWord, guessedLetters]);

  useEffect(() => {
    if (nWrong >= 6) {
      setGameState("lost");
    } else if (
      currentWord &&
      guessedWord().replace(/ /g, "").toLowerCase() === lowerCurrentWord
    ) {
      setGameState("won");
    }
  }, [nWrong, guessedLetters, currentWord, guessedWord, lowerCurrentWord]);

  const handleNextWord = () => {
    setGameState("playing");
    setGuessedLetters([]);
    setNWrong(0);
  };

  const handleGuess = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizedLetter)) return; // Prevent duplicate guesses

    setGuessedLetters((prev) => [...prev, normalizedLetter]);

    if (!lowerCurrentWord.includes(normalizedLetter)) {
      setNWrong((prev) => prev + 1);
    }
  };

  const handleManualGuess = () => {
    if (manualGuess) {
      handleGuess(manualGuess[0]); // Take only the first character
      setManualGuess("");
    }
  };

  const Buttons = () => {
    const characterSet = getCharacterSet(
      (wordSet as WordSet)?.firstLanguage?.name || "English"
    );
    return characterSet.map((letter) => (
      <Button
        key={letter}
        onClick={() => handleGuess(letter)}
        isDisabled={guessedLetters.includes(letter.toLowerCase())}
        variant="shadow"
        size={mediaQuery ? "md" : "sm"}
        className="bg-indigo-400 p-0 font-bold text-white"
      >
        {letter}
      </Button>
    ));
  };

  const isLatin =
    getCharacterSet((wordSet as WordSet)?.firstLanguage?.name as string)
      .length > 0;

  return (
    <div className="content mx-auto w-full max-w-[850px] overflow-hidden rounded-[2rem] bg-white/80 px-2 py-6 shadow-xl backdrop-blur-2xl dark:bg-slate-900/90 md:px-6">
      <div className="absolute right-0 top-0 z-20 p-2">
        <WordProgress progress={words[currentWord]?.progress * 100} />
      </div>
      {loading ? (
        <div className="flex min-h-[656px] items-center justify-center">
          <CircularProgress size="lg" />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-between ">
          <Button
            isIconOnly
            className="absolute left-[10px] top-[10px] max-w-[40px] cursor-pointer rounded-full p-0"
          >
            <Link href={`/wordset/${pathname}`}>
              <ArrowLeft />
            </Link>
          </Button>
          {gameState === "playing" && (
            <>
              <div>
                <p className="pr-4">
                  {(wordSet as WordSet)?.secondLanguage?.name} word:{" "}
                  <strong>{words[currentWord]?.translatedWord}</strong>
                </p>
                <p>
                  Translate it to{" "}
                  <strong>{(wordSet as WordSet)?.firstLanguage?.name}</strong>
                </p>
                <p className="pr-4">
                  Guessed wrong: <strong>{nWrong}</strong>
                </p>
              </div>
              <h1 className="flex w-[90%] flex-wrap justify-center pt-5 text-xl">
                {guessedWord()}
              </h1>
              <HangmanDrawing nWrong={nWrong} />
              <div className="flex flex-wrap items-center justify-center gap-2">
                {isLatin ? (
                  <Buttons />
                ) : (
                  <div className="flex items-center gap-4">
                    <Input
                      value={manualGuess}
                      onChange={(e) => setManualGuess(e.target.value)}
                      placeholder="Enter a letter"
                      maxLength={1} // Ensure only one letter is entered
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
              <div className="mx-auto flex w-full flex-col items-center justify-center gap-3 pt-5 ">
                <p>The word was:</p>
                <p>{currentWord}</p>
              </div>
              <CheckIcon />
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
              <div className="mx-auto flex w-full flex-col items-center justify-center gap-3 pt-5 ">
                <p>The word was:</p>
                <p>{currentWord}</p>
              </div>
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
