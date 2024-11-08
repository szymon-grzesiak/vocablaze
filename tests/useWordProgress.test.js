import { useWordProgress } from '@/hooks/useWordProgress';
import { act, renderHook } from '@testing-library/react';

jest.mock('../lib/actions/action', () => ({
  updateProgress: jest.fn(),
}));

const mockWordSet = {
  id: '1',
  title: 'Test Set',
  displayTranslatedFirst: false,
  words: [
    {
      id: 'word1',
      originalWord: 'Hello',
      translatedWord: 'Cześć',
      progress: 0.5,
      progressHistory: [],
    },
    {
      id: 'word2',
      originalWord: 'World',
      translatedWord: 'Świat',
      progress: 0.2,
      progressHistory: [],
    },
  ],
};

test('Czy słowa o niższym progresie są częściej wybierane?', () => {
  const extendedWordSet = {
    id: '1',
    title: 'Extended Test Set',
    displayTranslatedFirst: false,
    words: [
      { id: 'word1', originalWord: 'Word1', translatedWord: 'Słowo1', progress: 0.1, progressHistory: [] },
      { id: 'word2', originalWord: 'Word2', translatedWord: 'Słowo2', progress: 0.3, progressHistory: [] },
      { id: 'word3', originalWord: 'Word3', translatedWord: 'Słowo3', progress: 0.5, progressHistory: [] },
      { id: 'word4', originalWord: 'Word4', translatedWord: 'Słowo4', progress: 0.7, progressHistory: [] },
      { id: 'word5', originalWord: 'Word5', translatedWord: 'Słowo5', progress: 0.9, progressHistory: [] },
    ],
  };

  const { result } = renderHook(() => useWordProgress(extendedWordSet));

  const selectionCount = {};
  const iterations = 10000;

  extendedWordSet.words.forEach((word) => {
    selectionCount[word.originalWord] = 0;
  });

  for (let i = 0; i < iterations; i++) {
    act(() => {
      result.current.setCurrentWord(result.current.selectRandomWord());
    });
    const selectedWord = result.current.currentWord;
    selectionCount[selectedWord]++;
  }

  console.log('Częstotliwość wyboru słów:', selectionCount);

  expect(selectionCount['Word1']).toBeGreaterThan(selectionCount['Word2']);
  expect(selectionCount['Word2']).toBeGreaterThan(selectionCount['Word3']);
  expect(selectionCount['Word3']).toBeGreaterThan(selectionCount['Word4']);
  expect(selectionCount['Word4']).toBeGreaterThan(selectionCount['Word5']);
});

test('Czy poprawnie oblicza zwiększenie progresu?', async () => {
  const { result } = renderHook(() => useWordProgress(mockWordSet));

  const originalWord = 'Hello';
  const currentProgress = 0.5;
  act(() => {
    result.current.words[originalWord].progress = currentProgress;
  });

  const expectedProgress = Math.min(currentProgress + 0.1, 1);

  await act(async () => {
    await result.current.handleKnowWord(originalWord);
  });

  const updatedProgress = result.current.words[originalWord].progress;
  expect(updatedProgress).toBeCloseTo(expectedProgress, 5);
});

test('Czy poprawnie oblicza zmniejszenie progresu?', async () => {
  const { result } = renderHook(() => useWordProgress(mockWordSet));

  const originalWord = 'Hello';
  const currentProgress = 0.5;
  act(() => {
    result.current.words[originalWord].progress = currentProgress;
  });

  const expectedDecrease = Math.max(0.1, 0.05 + currentProgress * 0.4);
  const expectedProgress = Math.max(currentProgress - expectedDecrease, 0);

  await act(async () => {
    await result.current.handleDontKnowWord(originalWord);
  });

  const updatedProgress = result.current.words[originalWord].progress;
  expect(updatedProgress).toBeCloseTo(expectedProgress, 5);
});
