"use client";

import { useState } from "react";
import { Word } from './WordFlashcards';

const Matching = ({ words }: { words: Word[] }) => {
  const [selectedSize, setSelectedSize] = useState(5);
  const [shuffledWords, setShuffledWords] = useState<{ id: string, originalWord: string, translatedWord: string }[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setSelectedSize(newSize);
    const shuffled = words.sort(() => 0.5 - Math.random()).slice(0, newSize);
    const flattened = shuffled.flatMap(word => [
      { id: word.id + "_original", originalWord: word.originalWord, translatedWord: word.translatedWord },
      { id: word.id + "_translated", originalWord: word.originalWord, translatedWord: word.translatedWord }
    ]);
    setShuffledWords(flattened.sort(() => 0.5 - Math.random()));
    setSelectedWords([]);
    setMatches([]);
  };

  const handleWordClick = (wordId: string) => {
    if (selectedWords.includes(wordId) || matches.includes(wordId)) return;

    const newSelectedWords = [...selectedWords, wordId];
    setSelectedWords(newSelectedWords);

    if (newSelectedWords.length === 2) {
      const [firstWordId, secondWordId] = newSelectedWords;
      const firstWord = shuffledWords.find((word) => word.id === firstWordId);
      const secondWord = shuffledWords.find((word) => word.id === secondWordId);

      if (firstWord && secondWord && firstWord.originalWord === secondWord.originalWord) {
        setMatches([...matches, firstWordId, secondWordId]);
      }
      setTimeout(() => {
        setSelectedWords([]);
      }, 1000);
    }
  };

  return (
    <div>
      <div>
        <label>
          Select number of words: 
          {[5, 6, 7, 8, 9, 10].map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={handleSizeChange}
              />
              {size}
            </label>
          ))}
        </label>
      </div>
      <div className="word-grid">
        {shuffledWords.map((word) => (
          <button
            key={word.id}
            onClick={() => handleWordClick(word.id)}
            disabled={matches.includes(word.id)}
            className={selectedWords.includes(word.id) ? "selected" : ""}
          >
            {word.id.endsWith("_original") ? word.originalWord : word.translatedWord}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Matching;
