export const letters = [
  ['A', 'a', 'ABELHA', '🐝'],
  ['B', 'b', 'BOLA', '⚽'],
  ['C', 'c', 'CASA', '🏠'],
  ['D', 'd', 'DADO', '🎲'],
  ['E', 'e', 'ELEFANTE', '🐘'],
  ['F', 'f', 'FLOR', '🌼'],
  ['G', 'g', 'GATO', '🐱'],
  ['H', 'h', 'HIPOPÓTAMO', '🦛'],
  ['I', 'i', 'ILHA', '🏝️'],
  ['J', 'j', 'JACARÉ', '🐊'],
  ['K', 'k', 'KIWI', '🥝'],
  ['L', 'l', 'LEÃO', '🦁'],
  ['M', 'm', 'MACACO', '🐒'],
  ['N', 'n', 'NAVIO', '🚢'],
  ['O', 'o', 'OVO', '🥚'],
  ['P', 'p', 'PATO', '🦆'],
  ['Q', 'q', 'QUEIJO', '🧀'],
  ['R', 'r', 'RATO', '🐭'],
  ['S', 's', 'SAPO', '🐸'],
  ['T', 't', 'TATU', '🐢'],
  ['U', 'u', 'UVA', '🍇'],
  ['V', 'v', 'VACA', '🐄'],
  ['W', 'w', 'WIFI', '📶'],
  ['X', 'x', 'XÍCARA', '☕'],
  ['Y', 'y', 'YOGA', '🧘'],
  ['Z', 'z', 'ZEBRA', '🦓']
] as const;

export const syllables = [
  'BA', 'BE', 'BI', 'BO', 'BU',
  'CA', 'CE', 'CI', 'CO', 'CU',
  'DA', 'DE', 'DI', 'DO', 'DU',
  'FA', 'FE', 'FI', 'FO', 'FU',
  'GA', 'GE', 'GI', 'GO', 'GU',
  'JA', 'JE', 'JI', 'JO', 'JU',
  'LA', 'LE', 'LI', 'LO', 'LU',
  'MA', 'ME', 'MI', 'MO', 'MU',
  'NA', 'NE', 'NI', 'NO', 'NU',
  'PA', 'PE', 'PI', 'PO', 'PU',
  'RA', 'RE', 'RI', 'RO', 'RU',
  'SA', 'SE', 'SI', 'SO', 'SU',
  'TA', 'TE', 'TI', 'TO', 'TU',
  'VA', 'VE', 'VI', 'VO', 'VU',
  'ZA', 'ZE', 'ZI', 'ZO', 'ZU'
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
  },
  {
    emoji: '🍇',
    pattern: '_ V A',
    options: ['U', 'O', 'A'],
    answer: 'U',
    word: 'UVA'
  },
  {
    emoji: '🥚',
    pattern: 'O _ O',
    options: ['V', 'B', 'D'],
    answer: 'V',
    word: 'OVO'
  },
  {
    emoji: '🦁',
    pattern: 'L E _ O',
    options: ['Ã', 'A', 'O'],
    answer: 'Ã',
    word: 'LEÃO'
  },
  {
    emoji: '🚢',
    pattern: 'N A _ I O',
    options: ['V', 'B', 'F'],
    answer: 'V',
    word: 'NAVIO'
  },
  {
    emoji: '🦓',
    pattern: 'Z E _ R A',
    options: ['B', 'P', 'D'],
    answer: 'B',
    word: 'ZEBRA'
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
  },
  {
    emoji: '🐄',
    options: ['VACA', 'RATO', 'PATO'],
    answer: 'VACA'
  },
  {
    emoji: '🐢',
    options: ['TATU', 'SAPO', 'GATO'],
    answer: 'TATU'
  },
  {
    emoji: '🍇',
    options: ['UVA', 'OVO', 'BOLA'],
    answer: 'UVA'
  },
  {
    emoji: '🥚',
    options: ['OVO', 'UVA', 'CASA'],
    answer: 'OVO'
  },
  {
    emoji: '🦁',
    options: ['LEÃO', 'LOBO', 'GATO'],
    answer: 'LEÃO'
  },
  {
    emoji: '🚢',
    options: ['NAVIO', 'MAPA', 'MOTO'],
    answer: 'NAVIO'
  },
  {
    emoji: '🦓',
    options: ['ZEBRA', 'VACA', 'SAPO'],
    answer: 'ZEBRA'
  }
];
