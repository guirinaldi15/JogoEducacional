import { wordBank } from './wordBank';

export const findLetterPool =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const shuffle = <T,>(items: T[]): T[] => {
  return [...items].sort(() => Math.random() - 0.5);
};

const randomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const normalizeWord = (word: string) =>
  word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z]/gi, '')
    .toUpperCase();

/* =====================================================
   PALAVRAS POR LETRA
===================================================== */

export const letterWords: Record<string, string[]> =
  findLetterPool.reduce((result, letter) => {
    result[letter] = wordBank
      .map((item) => item.word)
      .filter((word) =>
        normalizeWord(word).startsWith(letter)
      );

    return result;
  }, {} as Record<string, string[]>);

/* =====================================================
   IMAGEM + PALAVRA
===================================================== */

export type CombineGame = {
  id: string;
  emoji: string;
  answer: string;
  options: string[];
};

const generateCombineGames = (): CombineGame[] => {
  return wordBank
    .filter((item) => Boolean(item.emoji))
    .map((item, index) => {
      const wrongOptions = shuffle(
        wordBank
          .filter(
            (other) =>
              other.word !== item.word
          )
          .map((other) => other.word)
      ).slice(0, 2);

      return {
        id: `combine-${index}-${normalizeWord(item.word)}`,
        emoji: item.emoji ?? '📝',
        answer: item.word,
        options: shuffle([
          item.word,
          ...wrongOptions
        ])
      };
    });
};

export const combineGames =
  generateCombineGames();

/* =====================================================
   ORGANIZAR PALAVRA
===================================================== */

export const organizeWords =
  wordBank.map((item) => item.word);

/* =====================================================
   COMPLETAR PALAVRA
===================================================== */

export type CompleteWordGame = {
  id: string;
  emoji: string;
  pattern: string;
  answer: string;
  options: string[];
  word: string;
};

const alphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const createCompleteExercise = (
  word: string,
  emoji: string,
  index: number
): CompleteWordGame | null => {
  const normalized =
    normalizeWord(word);

  if (normalized.length < 3) {
    return null;
  }

  const removablePositions =
    normalized
      .split('')
      .map((_, position) => position)
      .filter(
        (position) =>
          position > 0 &&
          position < normalized.length - 1
      );

  if (removablePositions.length === 0) {
    return null;
  }

  const missingIndex =
    randomItem(removablePositions);

  const answer =
    normalized[missingIndex];

  const wrongLetters = shuffle(
    alphabet.filter(
      (letter) => letter !== answer
    )
  ).slice(0, 2);

  const pattern = normalized
    .split('')
    .map((letter, position) =>
      position === missingIndex
        ? '_'
        : letter
    )
    .join(' ');

  return {
    id: `complete-${index}-${normalized}-${missingIndex}`,
    emoji,
    pattern,
    answer,
    options: shuffle([
      answer,
      ...wrongLetters
    ]),
    word
  };
};

const generateCompleteWordGames =
  (): CompleteWordGame[] => {
    return wordBank
      .map((item, index) =>
        createCompleteExercise(
          item.word,
          item.emoji ?? '📝',
          index
        )
      )
      .filter(
        (
          item
        ): item is CompleteWordGame =>
          item !== null
      );
  };

export const completeWordGames =
  generateCompleteWordGames();

/* =====================================================
   MATEMÁTICA
===================================================== */

export type MathGame = {
  id?: string;
  type:
    | 'count'
    | 'add'
    | 'subtract';
  question: string;
  visual?: string;
  answer: number;
  options: number[];
};

const makeMathOptions = (
  answer: number
): number[] => {
  const options =
    new Set<number>();

  options.add(answer);

  while (options.size < 3) {
    const difference =
      Math.floor(Math.random() * 5) - 2;

    const option =
      Math.max(
        0,
        answer + difference
      );

    options.add(option);
  }

  return shuffle([...options]);
};

const countVisuals = [
  '🍎',
  '⭐',
  '⚽',
  '🐟',
  '🚗',
  '🌼',
  '🐱',
  '🦆',
  '🍌',
  '❤️',
  '🐸',
  '🐶'
];

const generateCountGames =
  (): MathGame[] => {
    const games: MathGame[] = [];

    countVisuals.forEach(
      (emoji, emojiIndex) => {
        for (
          let amount = 2;
          amount <= 10;
          amount++
        ) {
          games.push({
            id:
              `count-${emojiIndex}-${amount}`,
            type: 'count',
            question:
              'QUANTOS OBJETOS TEM AQUI?',
            visual:
              Array(amount)
                .fill(emoji)
                .join(' '),
            answer: amount,
            options:
              makeMathOptions(amount)
          });
        }
      }
    );

    return games;
  };

const generateAdditionGames =
  (): MathGame[] => {
    const games: MathGame[] = [];

    for (
      let first = 1;
      first <= 15;
      first++
    ) {
      for (
        let second = 1;
        second <= 15;
        second++
      ) {
        const answer =
          first + second;

        games.push({
          id:
            `add-${first}-${second}`,
          type: 'add',
          question:
            `QUANTO É ${first} + ${second}?`,
          answer,
          options:
            makeMathOptions(answer)
        });
      }
    }

    return games;
  };

const generateSubtractGames =
  (): MathGame[] => {
    const games: MathGame[] = [];

    for (
      let first = 2;
      first <= 25;
      first++
    ) {
      for (
        let second = 1;
        second < first;
        second++
      ) {
        const answer =
          first - second;

        games.push({
          id:
            `subtract-${first}-${second}`,
          type: 'subtract',
          question:
            `QUANTO É ${first} - ${second}?`,
          answer,
          options:
            makeMathOptions(answer)
        });
      }
    }

    return games;
  };

export const mathGames: MathGame[] = [
  ...generateCountGames(),
  ...generateAdditionGames(),
  ...generateSubtractGames()
];