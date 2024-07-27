"use client";

// Indicates that the component is client-side
import { useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

import { Word } from "./WordFlashcards";

const Matching = ({ words }: { words: Word[] }) => {
  const [selectedSize, setSelectedSize] = useState(5);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    [number, number]
  >([0, 10]);
  const [shuffledWords, setShuffledWords] = useState<
    { id: string; originalWord: string; translatedWord: string }[]
  >([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      updateShuffledWords();
    }
  }, [selectedSize, selectedDifficulty, gameStarted]);

  const updateShuffledWords = () => {
    const filteredWords = words.filter((word) => {
      const progress = word.progress * 100;
      return (
        progress >= selectedDifficulty[0] && progress <= selectedDifficulty[1]
      );
    });

    const availableWords =
      filteredWords.length >= selectedSize
        ? selectedSize
        : filteredWords.length;
    const shuffled = filteredWords
      .sort(() => 0.5 - Math.random())
      .slice(0, availableWords);
    const flattened = shuffled.flatMap((word) => [
      {
        id: word.id + "_original",
        originalWord: word.originalWord,
        translatedWord: word.translatedWord,
      },
      {
        id: word.id + "_translated",
        originalWord: word.originalWord,
        translatedWord: word.translatedWord,
      },
    ]);
    setShuffledWords(flattened.sort(() => 0.5 - Math.random()));
    setSelectedWords([]);
    setMatches([]);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(parseInt(e.target.value));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split("-").map(Number) as [number, number];
    setSelectedDifficulty(value);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShuffledWords([]);
    setSelectedWords([]);
    setMatches([]);
  };

  const difficultyRanges = [
    [0, 25],
    [26, 50],
    [51, 75],
    [76, 100],
  ];

  const handleWordClick = (wordId: string) => {
    if (selectedWords.includes(wordId) || matches.includes(wordId)) return;
    const newSelectedWords = [...selectedWords, wordId];
    setSelectedWords(newSelectedWords);

    if (newSelectedWords.length === 2) {
      const [firstWordId, secondWordId] = newSelectedWords;
      const firstWord = shuffledWords.find((word) => word.id === firstWordId);
      const secondWord = shuffledWords.find((word) => word.id === secondWordId);

      if (
        firstWord &&
        secondWord &&
        firstWord.originalWord === secondWord.originalWord
      ) {
        setMatches([...matches, firstWordId, secondWordId]);
      }
      setTimeout(() => {
        setSelectedWords([]);
      }, 1000);
    }
  };

  const availableWordsInRange = words.filter((word) => {
    const progress = word.progress * 100;
    return (
      progress >= selectedDifficulty[0] && progress <= selectedDifficulty[1]
    );
  }).length;

  const sizeRange = [3, 4, 5, 6, 7, 8, 9, 10];

  const disabledSizes = sizeRange.filter(
    (size) => size > availableWordsInRange
  );

  return (
    <div>
      {!gameStarted ? (
        <div>
          <div>
            <span>Select number of words: </span>
            <Select
              selectedKeys={[selectedSize]}
              disabledKeys={disabledSizes}
              onChange={handleSizeChange}
            >
              {sizeRange.map((size) => (
                <SelectItem key={size}>
                  {size} {size > availableWordsInRange && "(Not enough words)"}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <span>Select difficulty range: </span>
            <select
              onChange={handleDifficultyChange}
              value={selectedDifficulty.join("-")}
            >
              {difficultyRanges.map((range) => {
                const rangeLabel = `${range[0]}% - ${range[1]}%`;
                const wordsInRange = words.filter((word) => {
                  const progress = word.progress * 100;
                  return progress >= range[0] && progress <= range[1];
                }).length;
                return (
                  <option
                    key={rangeLabel}
                    value={range.join("-")}
                    disabled={wordsInRange < selectedSize}
                  >
                    {rangeLabel} (
                    {wordsInRange >= selectedSize
                      ? "Available"
                      : "Not enough words"}
                    )
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={startGame}
            disabled={availableWordsInRange < selectedSize}
          >
            Start the game
          </button>
        </div>
      ) : (
        <div>
          <button onClick={resetGame}>Back to settings</button>
          <div className="word-grid">
            {shuffledWords.map((word) => (
              <button
                key={word.id}
                onClick={() => handleWordClick(word.id)}
                disabled={matches.includes(word.id)}
                className={selectedWords.includes(word.id) ? "selected" : ""}
              >
                {word.id.endsWith("_original")
                  ? word.originalWord
                  : word.translatedWord}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Matching;
