"use client"; // Wskazuje, że komponent jest renderowany po stronie klienta

import { useState } from "react"; // Importuje useState z Reacta, aby zarządzać stanem
import { Word } from './WordFlashcards'; // Importuje typ Word z pliku WordFlashcards

const Matching = ({ words }: { words: Word[] }) => {
  // Deklaruje stan, który przechowuje wybraną liczbę słów do gry
  const [selectedSize, setSelectedSize] = useState(5); 
  
  // Stan przechowujący przetasowane słowa; każde słowo będzie miało dwie reprezentacje: oryginał i tłumaczenie jako osobne elementy
  const [shuffledWords, setShuffledWords] = useState<{ id: string, originalWord: string, translatedWord: string }[]>([]);

  // Stan przechowujący aktualnie zaznaczone przez użytkownika słowa
  const [selectedWords, setSelectedWords] = useState<string[]>([]); 
  
  // Stan przechowujący poprawnie dopasowane słowa, które nie mogą być ponownie wybrane
  const [matches, setMatches] = useState<string[]>([]);

  /**
   * Funkcja handleSizeChange:
   * Celem tej funkcji jest aktualizacja rozmiaru zestawu słów na podstawie wyboru użytkownika oraz przetasowanie i przygotowanie nowej listy słów do gry.
   * Funkcja ta wykonuje kilka kroków:
   * 1. Odczytuje nową wartość rozmiaru z wybranego elementu radio.
   * 2. Ustawia nowy rozmiar w stanie komponentu.
   * 3. Przetasowuje listę słów i wybiera pierwsze `newSize` słów z listy.
   * 4. Spłaszcza listę wybranych słów na pary: każda para składa się z oryginału i tłumaczenia jako osobne elementy.
   * 5. Ponownie przetasowuje spłaszczoną listę i ustawia ją w stanie komponentu.
   * 6. Resetuje zaznaczone słowa i dopasowania, aby przygotować nową grę.
   */
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value); // Odczytuje nowy rozmiar z wartości inputa
    setSelectedSize(newSize); // Ustawia nowy rozmiar w stanie
    const shuffled = words.sort(() => 0.5 - Math.random()).slice(0, newSize); // Przetasowuje i wybiera pierwsze newSize słów
    const flattened = shuffled.flatMap(word => [
      { id: word.id + "_original", originalWord: word.originalWord, translatedWord: word.translatedWord },
      { id: word.id + "_translated", originalWord: word.originalWord, translatedWord: word.translatedWord }
    ]); // Spłaszcza listę słów na oryginalne i przetłumaczone jako osobne elementy
    setShuffledWords(flattened.sort(() => 0.5 - Math.random())); // Przetasowuje przetworzoną listę słów i ustawia ją w stanie
    setSelectedWords([]); // Resetuje zaznaczone słowa
    setMatches([]); // Resetuje dopasowania
  };

  /**
   * Funkcja handleWordClick:
   * Celem tej funkcji jest obsługa kliknięć na słowa przez użytkownika oraz logika dopasowywania słów.
   * Funkcja ta wykonuje kilka kroków:
   * 1. Sprawdza, czy kliknięte słowo nie jest już zaznaczone lub dopasowane. Jeśli jest, przerywa działanie.
   * 2. Dodaje kliknięte słowo do listy zaznaczonych słów.
   * 3. Jeśli zaznaczone są dwa słowa, sprawdza, czy są one parą (oryginał-tłumaczenie) poprzez porównanie wartości `originalWord`.
   * 4. Jeśli słowa są parą, dodaje je do listy dopasowanych słów.
   * 5. Po krótkim czasie (1 sekunda) resetuje zaznaczone słowa, aby użytkownik mógł kontynuować grę.
   */
  const handleWordClick = (wordId: string) => {
    if (selectedWords.includes(wordId) || matches.includes(wordId)) return; // Jeśli słowo jest już zaznaczone lub dopasowane, funkcja kończy działanie

    const newSelectedWords = [...selectedWords, wordId]; // Dodaje kliknięte słowo do listy zaznaczonych słów
    setSelectedWords(newSelectedWords); // Ustawia nową listę zaznaczonych słów

    if (newSelectedWords.length === 2) { // Jeśli zaznaczone są dwa słowa
      const [firstWordId, secondWordId] = newSelectedWords; // Odczytuje identyfikatory zaznaczonych słów
      const firstWord = shuffledWords.find((word) => word.id === firstWordId); // Znajduje pierwsze zaznaczone słowo
      const secondWord = shuffledWords.find((word) => word.id === secondWordId); // Znajduje drugie zaznaczone słowo

      if (firstWord && secondWord && firstWord.originalWord === secondWord.originalWord) { // Jeśli słowa są parą (oryginał-tłumaczenie)
        setMatches([...matches, firstWordId, secondWordId]); // Dodaje słowa do listy dopasowanych słów
      }
      setTimeout(() => {
        setSelectedWords([]); // Po krótkim czasie resetuje zaznaczone słowa
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
                checked={selectedSize === size} // Sprawdza, czy aktualnie wybrany rozmiar jest zaznaczony
                onChange={handleSizeChange} // Ustawia nowy rozmiar po zmianie
              />
              {size}
            </label>
          ))}
        </label>
      </div>
      <div className="word-grid">
        {shuffledWords.map((word) => (
          <button
            key={word.id} // Ustawia unikalny klucz dla każdego przycisku
            onClick={() => handleWordClick(word.id)} // Ustawia funkcję wywoływaną po kliknięciu na słowo
            disabled={matches.includes(word.id)} // Dezaktywuje przycisk, jeśli słowo jest już dopasowane
            className={selectedWords.includes(word.id) ? "selected" : ""} // Dodaje klasę "selected" jeśli słowo jest zaznaczone
          >
            {word.id.endsWith("_original") ? word.originalWord : word.translatedWord} {/* Wyświetla odpowiednie słowo */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Matching;