import { CircularProgress } from "@nextui-org/react";
import { WordProgress } from "./word-progress";

interface WordProgressDisplayProps {
  loading?: boolean;
  progress: number;
}

const WordProgressDisplay: React.FC<WordProgressDisplayProps> = ({ loading, progress }) => {
  return (
    <div className="absolute top-0 right-0 p-2 z-20">
      {loading ? (
        <CircularProgress size="lg" />
      ) : (
        <WordProgress progress={progress * 100} />
      )}
    </div>
  );
};

export default WordProgressDisplay;
