"use client";

import React, { useState } from "react";

import { useWordProgress, WordSet } from "@/hooks/useWordProgress";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import WordProgressDisplay from "./WordProgressDisplay";
import { Button, CircularProgress, Switch } from "@nextui-org/react";
import { WordSet as PrismaWordSetType } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowLeft, EllipsisVertical, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface WordFlashcardsProps {
  wordSet: WordSet | PrismaWordSetType;
}

const WordFlashcards: React.FC<WordFlashcardsProps> = ({ wordSet }) => {
  const {
    words,
    currentWord,
    loading,
    showTranslatedFirst,
    handleDontKnowWord,
    handleKnowWord,
    handleToggleOrder,
  } = useWordProgress(wordSet as WordSet);

  const router = useRouter();
  const [flipped, setFlipped] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const pathname = usePathname().split("/")[2];

  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotateY = useMotionValue(0);

  const xInput = [-100, 0, 100];

  const background = useTransform(x, xInput, [
    "linear-gradient(90deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(90deg, #ffff 0%, #fff 100%)",
    "linear-gradient(90deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);

  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  const handleCardClick = () => {
    if (!isDragging) {
      setFlipped(!flipped);
      controls.start({
        rotateY: flipped ? 0 : 180,
        transition: { duration: 0.5 },
      });
    }
  };

  return (
    <div className="content full-screen-card mx-auto w-full max-w-[650px] overflow-hidden rounded-[2rem] bg-white/80 p-8 shadow-xl backdrop-blur-2xl dark:bg-slate-900/90">
      <Popover>
        <PopoverTrigger className={`absolute left-0 top-0 ml-2 mt-5`}>
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <Switch
            isSelected={showTranslatedFirst}
            onValueChange={handleToggleOrder}
            color="success"
            size="lg"
            className="flex flex-col-reverse items-center gap-3 font-semibold"
          >
            Reverse order
          </Switch>
        </PopoverContent>
      </Popover>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <CircularProgress size="lg" />
        </div>
      ) : (
        currentWord && (
          <div className="content flex h-full flex-col items-center justify-between">
            <WordProgressDisplay
              loading={loading}
              progress={words[currentWord]?.progress}
            />
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
              <motion.div
                className="card-content text-2xl font-bold dark:text-black"
                onClick={handleCardClick}
                animate={{ rotateY: rotateY.get() }}
                transition={{ duration: 0.5 }}
              >
                <div className="front z-10 bg-black/5 dark:bg-slate-700/50">
                  <div>
                    {showTranslatedFirst
                      ? words[currentWord].translatedWord
                      : currentWord}
                  </div>
                </div>
                <div className="back z-10 bg-black/5 dark:bg-slate-700/50">
                  <div>
                    {showTranslatedFirst
                      ? currentWord
                      : words[currentWord].translatedWord}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <svg className="progress-icon" viewBox="0 0 50 50">
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
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Button
                  className="cursor-pointer rounded-full text-xl"
                  onClick={() => {
                    router.push(`/wordset/${pathname}`);
                    router.refresh();
                  }}
                >
                  <ArrowLeft />
                  <Link href={`/wordset/${pathname}`}>Back</Link>
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  color="danger"
                  onClick={() => handleDontKnowWord(currentWord)}
                  isIconOnly
                  size="lg"
                  className="rounded-lg text-white"
                >
                  <XIcon className="size-10" />
                </Button>
                <Button
                  className="rounded-lg text-white "
                  color="success"
                  onClick={() => handleKnowWord(currentWord)}
                  size="lg"
                  isIconOnly
                >
                  <CheckIcon className="size-10" />
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WordFlashcards;
