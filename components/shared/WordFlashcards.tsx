"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, CircularProgress, Switch } from "@nextui-org/react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { saveDisplayOrder, updateProgress } from "@/lib/actions/action";
import { WordProgress } from "./word-progress";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

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

const WordFlashcards = ({ wordSet }: { wordSet: WordSet }) => {
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
  const [showTranslatedFirst, setShowTranslatedFirst] = useState<boolean>(
    wordSet.displayTranslatedFirst
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotateY = useMotionValue(0);

  const xInput = [-100, 0, 100];

  const background = useTransform(x, xInput, [
    "linear-gradient(90deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(90deg, #ffff 0%, #fff 100%)",
    "linear-gradient(90deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
  ]);

  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

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
    controls.start({ x: 0, transition: { duration: 0.5 } });
    setCurrentWord(selectRandomWord());
    setFlipped(false);
    setLoading(false);
  };

  const handleCardClick = () => {
    if (!isDragging) {
      setFlipped(!flipped);
      controls.start({
        rotateY: flipped ? 0 : 180,
        transition: { duration: 0.5 },
      });
    }
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
            <div className="absolute top-0 right-0 p-2 z-20">
              {!loading && (
                <WordProgress progress={words[currentWord]?.progress * 100} />
              )}
            </div>
            <motion.div
              className="card"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => {
                controls.stop();
                setIsDragging(true);
              }}
              onDragEnd={(event, info) => {
                setIsDragging(false);
                if (info.offset.x > 200) {
                  handleKnowWord(currentWord);
                } else if (info.offset.x < -200) {
                  handleDontKnowWord(currentWord);
                } 
              }}
              animate={controls}
              style={{ x, background }}
            >
              <svg className="progress-icon absolute" viewBox="0 0 50 50">
                <motion.path />
                <motion.path
                  fill="none"
                  strokeWidth="2"
                  stroke={color}
                  d="M14,26 L 22,33 L 35,16"
                  strokeDasharray="0 1"
                  style={{ pathLength: tickPath }}
                />
                <motion.path
                  fill="none"
                  strokeWidth="2"
                  stroke={color}
                  d="M17,17 L33,33"
                  strokeDasharray="0 1"
                  style={{ pathLength: crossPathA }}
                />
                <motion.path
                  fill="none"
                  strokeWidth="2"
                  stroke={color}
                  d="M33,17 L17,33"
                  strokeDasharray="0 1"
                  style={{ pathLength: crossPathB }}
                />
              </svg>
              <motion.div
                className="card-content"
                onClick={handleCardClick}
                animate={{ rotateY: rotateY.get() }}
                transition={{ duration: 0.5 }}
              >
                <div className="front z-10">
                  <div>
                    {showTranslatedFirst
                      ? words[currentWord].translatedWord
                      : currentWord}
                  </div>
                </div>
                <div className="back z-10">
                  <div>
                    {showTranslatedFirst
                      ? currentWord
                      : words[currentWord].translatedWord}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <div className="flex justify-between gap-4 mt-4 w-full">
              <Switch
                isSelected={showTranslatedFirst}
                onValueChange={handleToggleOrder}
                color="success"
                size="sm"
              >
                Reverse order
              </Switch>
              <div className="flex gap-6">
              <Button
                color="danger"
                onClick={() => handleDontKnowWord(currentWord)}
                isIconOnly
                className="text-white rounded-lg"
              >
                <XIcon className="w-8 h-8" />
              </Button>
              <Button
                className="text-white rounded-lg"
                color="success"
                onClick={() => handleKnowWord(currentWord)}
                isIconOnly
              >
                <CheckIcon className="w-8 h-8" />
              </Button>
              </div>
             
            </div>
          </div>
        )
      )}
    </>
  );
};

export default WordFlashcards;