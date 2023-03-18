export type WordsType = Record<string, string[]>;
export const trainingWords: WordsType = {
  q: ['queue', 'quick', 'quite', 'queen', 'equality', 'acquire'],
  w: ['worst', 'word', 'world'],
  e: ['express', 'suggest'],
};
// Function that returns array of words in random order
export const shuffleWords = (words: WordsType): string[] => {
  let arrayOfWords: string[] = [];
  for (const key in words) {
    arrayOfWords = [...arrayOfWords, ...words[key]];
  }

  return arrayOfWords.sort(() => Math.random() - 0.5);
};
