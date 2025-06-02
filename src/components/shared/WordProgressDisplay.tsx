import React from "react";

import { WordProgress } from "./WordProgress";
import { CircularProgress } from "@nextui-org/react";
interface WordProgressDisplayProps {
  loading?: boolean;
  progress: number;
}

const WordProgressDisplay: React.FC<WordProgressDisplayProps> = ({
  loading,
  progress,
}) => {
  return (
    <div className="absolute right-0 top-0 z-20 p-2">
      {loading ? (
        <CircularProgress size="lg" />
      ) : (
        <WordProgress progress={progress * 100} />
      )}
    </div>
  );
};

export default WordProgressDisplay;
