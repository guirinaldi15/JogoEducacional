export const letters = [
  ['A', 'a', 'ABELHA', '🐝'],
  ['B', 'b', 'BOLA', '⚽'],
  ['C', 'c', 'CASA', '🏠'],
  ['D', 'd', 'DADO', '🎲'],
  ['E', 'e', 'ELEFANTE', '🐘'],
  ['F', 'f', 'FLOR', '🌼'],
  ['G', 'g', 'GATO', '🐱'],
  ['M', 'm', 'MACACO', '🐒'],
  ['P', 'p', 'PATO', '🦆'],
  ['S', 's', 'SAPO', '🐸']
] as const;

export const syllables = [
  'BA', 'BE', 'BI', 'BO', 'BU',
  'CA', 'CE', 'CI', 'CO', 'CU',
  'MA', 'ME', 'MI', 'MO', 'MU',
  'PA', 'PE', 'PI', 'PO', 'PU'
];

export const wordQuestions = [
  {
    emoji: '🏠',
    pattern: 'C _ S A',
    options: ['A', 'T', 'M'],
    answer: 'A',
    word: 'CASA'
  },
  {
    emoji: '🐱',
    pattern: 'G A _ O',
    options: ['T', 'P', 'S'],
    answer: 'T',
    word: 'GATO'
  },
  {
    emoji: '⚽',
    pattern: 'B O _ A',
    options: ['L', 'R', 'M'],
    answer: 'L',
    word: 'BOLA'
  },
  {
    emoji: '🦆',
    pattern: 'P _ T O',
    options: ['A', 'E', 'I'],
    answer: 'A',
    word: 'PATO'
  },
  {
    emoji: '🐸',
    pattern: 'S A _ O',
    options: ['P', 'T', 'L'],
    answer: 'P',
    word: 'SAPO'
  },
  {
    emoji: '🧳',
    pattern: 'M _ L A',
    options: ['A', 'O', 'U'],
    answer: 'A',
    word: 'MALA'
  },
  {
    emoji: '🎲',
    pattern: 'D A _ O',
    options: ['D', 'T', 'P'],
    answer: 'D',
    word: 'DADO'
  },
  {
    emoji: '👄',
    pattern: 'B O _ A',
    options: ['C', 'L', 'T'],
    answer: 'C',
    word: 'BOCA'
  },
  {
    emoji: '🐄',
    pattern: 'V A _ A',
    options: ['C', 'T', 'P'],
    answer: 'C',
    word: 'VACA'
  },
  {
    emoji: '🐭',
    pattern: 'R _ T O',
    options: ['A', 'E', 'I'],
    answer: 'A',
    word: 'RATO'
  },
  {
    emoji: '🔪',
    pattern: 'F A _ A',
    options: ['C', 'T', 'L'],
    answer: 'C',
    word: 'FACA'
  },
  {
    emoji: '🏍️',
    pattern: 'M O _ O',
    options: ['T', 'P', 'L'],
    answer: 'T',
    word: 'MOTO'
  },
  {
    emoji: '🥫',
    pattern: 'L A _ A',
    options: ['T', 'P', 'C'],
    answer: 'T',
    word: 'LATA'
  },
  {
    emoji: '🪁',
    pattern: 'P I _ A',
    options: ['P', 'T', 'M'],
    answer: 'P',
    word: 'PIPA'
  },
  {
    emoji: '🥾',
    pattern: 'B _ T A',
    options: ['O', 'A', 'E'],
    answer: 'O',
    word: 'BOTA'
  },
  {
    emoji: '🛏️',
    pattern: 'C A _ A',
    options: ['M', 'S', 'T'],
    answer: 'M',
    word: 'CAMA'
  },
  {
    emoji: '🐺',
    pattern: 'L O _ O',
    options: ['B', 'T', 'P'],
    answer: 'B',
    word: 'LOBO'
  },
  {
    emoji: '🗺️',
    pattern: 'M A _ A',
    options: ['P', 'L', 'T'],
    answer: 'P',
    word: 'MAPA'
  },
  {
    emoji: '🧃',
    pattern: 'S U _ O',
    options: ['C', 'P', 'T'],
    answer: 'C',
    word: 'SUCO'
  },
  {
    emoji: '🐢',
    pattern: 'T A _ U',
    options: ['T', 'P', 'C'],
    answer: 'T',
    word: 'TATU'
  }
];

export const readingQuestions = [
  {
    emoji: '🍌',
    options: ['BANANA', 'BOLA', 'CASA'],
    answer: 'BANANA'
  },
  {
    emoji: '🐱',
    options: ['PATO', 'GATO', 'SAPO'],
    answer: 'GATO'
  },
  {
    emoji: '🏠',
    options: ['CASA', 'MALA', 'DADO'],
    answer: 'CASA'
  }
];
