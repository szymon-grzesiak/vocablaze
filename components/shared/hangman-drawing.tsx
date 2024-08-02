import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    };
  }
};

const HangmanDrawing = ({ nWrong }: { nWrong: number }) => {
  return (
    <motion.svg
      width="250"
      height="400"
      viewBox="0 0 250 400"
      initial="hidden"
      animate="visible"
    >
      {nWrong > 0 && (
        <motion.line
          x1="50"
          y1="350"
          x2="150"
          y2="350"
          stroke="#000"
          strokeWidth="4"
          variants={draw}
        />
      )}
      {nWrong > 1 && (
        <motion.line
          x1="100"
          y1="350"
          x2="100"
          y2="50"
          stroke="#000"
          strokeWidth="4"
          variants={draw}
        />
      )}
      {nWrong > 2 && (
        <motion.line
          x1="100"
          y1="50"
          x2="200"
          y2="50"
          stroke="#000"
          strokeWidth="4"
          variants={draw}
        />
      )}
      {nWrong > 3 && (
        <motion.line
          x1="200"
          y1="50"
          x2="200"
          y2="100"
          stroke="#000"
          strokeWidth="4"
          variants={draw}
        />
      )}
      {nWrong > 4 && (
        <motion.circle
          cx="200"
          cy="120"
          r="20"
          fill="none"
          stroke="#000"
          strokeWidth="4"
          variants={draw}
        />
      )}
      {nWrong > 5 && (
        <motion.line
          x1="200"
          y1="140"
          x2="200"
          y2="200"
          stroke="#000"
          strokeWidth="4"
          variants={draw}
        />
      )}
      {nWrong > 6 && (
        <>
          <motion.line
            x1="200"
            y1="160"
            x2="180"
            y2="180"
            stroke="#000"
            strokeWidth="4"
            variants={draw}
          />
          <motion.line
            x1="200"
            y1="160"
            x2="220"
            y2="180"
            stroke="#000"
            strokeWidth="4"
            variants={draw}
          />
          <motion.line
            x1="200"
            y1="200"
            x2="180"
            y2="240"
            stroke="#000"
            strokeWidth="4"
            variants={draw}
            custom={2}
          />
          <motion.line
            x1="200"
            y1="200"
            x2="220"
            y2="240"
            stroke="#000"
            strokeWidth="4"
            variants={draw}
          />
        </>
      )}
    </motion.svg>
  );
};

export default HangmanDrawing;
