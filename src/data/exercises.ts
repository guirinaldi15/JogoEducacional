export const findLetterPool =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const letterWords: Record<string, string[]> = {
  A: ['ABELHA', 'AVIÃO', 'ANEL', 'ÁRVORE', 'AMOR'],
  B: ['BOLA', 'BOCA', 'BOTA', 'BANANA', 'BONECA'],
  C: ['CASA', 'CAMA', 'COPO', 'CAVALO', 'CAMISA'],
  D: ['DADO', 'DENTE', 'DOCE', 'DEDO', 'DINOSSAURO'],
  E: ['ELEFANTE', 'ESCADA', 'ESTRELA', 'ESCOLA', 'ESPELHO'],
  F: ['FACA', 'FOCA', 'FLOR', 'FOGO', 'FADA'],
  G: ['GATO', 'GALO', 'GIRAFA', 'GELO', 'GOL'],
  H: ['HIPOPÓTAMO', 'HOTEL', 'HOMEM', 'HORTA', 'HELICÓPTERO'],
  I: ['ILHA', 'IGREJA', 'IOIÔ', 'IRMÃO', 'ÍMÃ'],
  J: ['JACARÉ', 'JANELA', 'JOGO', 'JARRA', 'JARDIM'],
  K: ['KIWI', 'KARATÊ', 'KETCHUP'],
  L: ['LEÃO', 'LATA', 'LOBO', 'LIVRO', 'LÁPIS'],
  M: ['MALA', 'MAPA', 'MOTO', 'MACACO', 'MESA'],
  N: ['NAVIO', 'NINHO', 'NARIZ', 'NUVEM', 'NOVE'],
  O: ['OVO', 'OLHO', 'ONÇA', 'ORELHA', 'ÓCULOS'],
  P: ['PATO', 'PIPA', 'PANELA', 'PÉ', 'PEIXE'],
  Q: ['QUEIJO', 'QUADRO', 'QUATI', 'QUARTO'],
  R: ['RATO', 'REDE', 'RODA', 'RUA', 'REI'],
  S: ['SAPO', 'SUCO', 'SINO', 'SAPATO', 'SOL'],
  T: ['TATU', 'TOMATE', 'TIGRE', 'TREM', 'TOCA'],
  U: ['UVA', 'URSO', 'UNHA', 'UM', 'UNIFORME'],
  V: ['VACA', 'VELA', 'VASO', 'VOVÓ', 'VIOLÃO'],
  W: ['WIFI', 'WEB', 'WAFFLE'],
  X: ['XÍCARA', 'XADREZ', 'XALE', 'XAROPE'],
  Y: ['YOGA', 'YAKISOBA', 'YOUTUBE'],
  Z: ['ZEBRA', 'ZERO', 'ZÍPER', 'ZANGÃO']
};

export const combineGames = [
  { emoji: '🐱', answer: 'GATO', options: ['PATO', 'GATO', 'BOLA'] },
  { emoji: '🐄', answer: 'VACA', options: ['VACA', 'CASA', 'SAPO'] },
  { emoji: '🦆', answer: 'PATO', options: ['MALA', 'PATO', 'RATO'] },
  { emoji: '⚽', answer: 'BOLA', options: ['BOTA', 'BOLA', 'BOCA'] },
  { emoji: '🏠', answer: 'CASA', options: ['CASA', 'MALA', 'MAPA'] },
  { emoji: '🐸', answer: 'SAPO', options: ['SAPO', 'SINO', 'SUCO'] },
  { emoji: '🐭', answer: 'RATO', options: ['GATO', 'RATO', 'PATO'] },
  { emoji: '🦁', answer: 'LEÃO', options: ['LOBO', 'LEÃO', 'GATO'] },
  { emoji: '🐺', answer: 'LOBO', options: ['LEÃO', 'LOBO', 'RATO'] },
  { emoji: '🍇', answer: 'UVA', options: ['UVA', 'OVO', 'SUCO'] },
  { emoji: '🥚', answer: 'OVO', options: ['UVA', 'OVO', 'BOLA'] },
  { emoji: '🚢', answer: 'NAVIO', options: ['MAPA', 'MOTO', 'NAVIO'] },
  { emoji: '🦓', answer: 'ZEBRA', options: ['VACA', 'ZEBRA', 'GIRAFA'] },
  { emoji: '🧀', answer: 'QUEIJO', options: ['QUEIJO', 'DOCE', 'BOLO'] },
  { emoji: '☕', answer: 'XÍCARA', options: ['COPO', 'XÍCARA', 'VASO'] },
  { emoji: '🌼', answer: 'FLOR', options: ['FLOR', 'FACA', 'FOCA'] },
  { emoji: '🐝', answer: 'ABELHA', options: ['ABELHA', 'AVIÃO', 'ANEL'] },
  { emoji: '🐊', answer: 'JACARÉ', options: ['JANELA', 'JACARÉ', 'GIRAFA'] },
  { emoji: '🐻', answer: 'URSO', options: ['URSO', 'GATO', 'LOBO'] },
  { emoji: '🐯', answer: 'TIGRE', options: ['LEÃO', 'TIGRE', 'ZEBRA'] },
  { emoji: '🍅', answer: 'TOMATE', options: ['TOMATE', 'QUEIJO', 'UVA'] },
  { emoji: '🥝', answer: 'KIWI', options: ['UVA', 'KIWI', 'TOMATE'] },
  { emoji: '👃', answer: 'NARIZ', options: ['BOCA', 'NARIZ', 'OLHO'] },
  { emoji: '👁️', answer: 'OLHO', options: ['OLHO', 'BOCA', 'UNHA'] },
  { emoji: '🦷', answer: 'DENTE', options: ['DENTE', 'NARIZ', 'BOCA'] },
  { emoji: '🕯️', answer: 'VELA', options: ['VASO', 'VELA', 'REDE'] },
  { emoji: '🪁', answer: 'PIPA', options: ['PIPA', 'MAPA', 'MALA'] },
  { emoji: '🎲', answer: 'DADO', options: ['DADO', 'DOCE', 'DENTE'] },
  { emoji: '🍌', answer: 'BANANA', options: ['BANANA', 'TOMATE', 'UVA'] },
  { emoji: '🐵', answer: 'MACACO', options: ['MACACO', 'GATO', 'PATO'] },
  { emoji: '🐴', answer: 'CAVALO', options: ['CAVALO', 'VACA', 'TIGRE'] },
  { emoji: '👟', answer: 'SAPATO', options: ['SAPATO', 'CAMISA', 'BOTA'] },
  { emoji: '📖', answer: 'LIVRO', options: ['LIVRO', 'QUADRO', 'MAPA'] },
  { emoji: '✏️', answer: 'LÁPIS', options: ['LÁPIS', 'LIVRO', 'DADO'] },
  { emoji: '☀️', answer: 'SOL', options: ['SOL', 'FLOR', 'MAR'] },
  { emoji: '🐟', answer: 'PEIXE', options: ['PEIXE', 'GATO', 'PATO'] },
  { emoji: '🌳', answer: 'ÁRVORE', options: ['ÁRVORE', 'FLOR', 'CASA'] },
  { emoji: '🚗', answer: 'CARRO', options: ['CARRO', 'MOTO', 'NAVIO'] },
  { emoji: '🚲', answer: 'BICICLETA', options: ['BICICLETA', 'MOTO', 'CARRO'] },
  { emoji: '🚂', answer: 'TREM', options: ['TREM', 'NAVIO', 'CARRO'] },
  { emoji: '🚌', answer: 'ÔNIBUS', options: ['ÔNIBUS', 'TREM', 'MOTO'] },
  { emoji: '🍎', answer: 'MAÇÃ', options: ['MAÇÃ', 'UVA', 'BANANA'] },
  { emoji: '🍉', answer: 'MELANCIA', options: ['MELANCIA', 'BANANA', 'UVA'] },
  { emoji: '🍓', answer: 'MORANGO', options: ['MORANGO', 'TOMATE', 'MAÇÃ'] },
  { emoji: '🥕', answer: 'CENOURA', options: ['CENOURA', 'TOMATE', 'BANANA'] },
  { emoji: '🌽', answer: 'MILHO', options: ['MILHO', 'ARROZ', 'QUEIJO'] },
  { emoji: '🐶', answer: 'CACHORRO', options: ['CACHORRO', 'GATO', 'LOBO'] },
  { emoji: '🐰', answer: 'COELHO', options: ['COELHO', 'GATO', 'URSO'] },
  { emoji: '🐘', answer: 'ELEFANTE', options: ['ELEFANTE', 'GIRAFA', 'CAVALO'] },
  { emoji: '🦒', answer: 'GIRAFA', options: ['GIRAFA', 'ZEBRA', 'VACA'] }
];

export const organizeWords = [
  'CASA',
  'BOLA',
  'PATO',
  'SAPO',
  'MALA',
  'GATO',
  'VACA',
  'TATU',
  'RATO',
  'MAPA',
  'DADO',
  'BOCA',
  'MOTO',
  'LATA',
  'PIPA',
  'BOTA',
  'CAMA',
  'LOBO',
  'SUCO',
  'UVA',
  'OVO',
  'LEÃO',
  'NAVIO',
  'ZEBRA',
  'FLOR',
  'FOCA',
  'URSO',
  'VELA',
  'VASO',
  'RODA',
  'SINO',
  'REDE',
  'UNHA',
  'OLHO',
  'NARIZ',
  'TIGRE',
  'DOCE',
  'COPO',
  'ANEL',
  'JOGO',
  'BANANA',
  'MACACO',
  'CAVALO',
  'PANELA',
  'JANELA',
  'CAMISA',
  'SAPATO',
  'BONECA',
  'ESCOLA',
  'LIVRO',
  'LÁPIS',
  'PEIXE',
  'CARRO',
  'TREM',
  'MILHO',
  'MAÇÃ',
  'MORANGO',
  'COELHO',
  'ABELHA',
  'JACARÉ',
  'QUEIJO',
  'TOMATE',
  'GIRAFA',
  'ELEFANTE',
  'ESCADA',
  'ESTRELA',
  'JARDIM',
  'QUADRO',
  'NUVEM',
  'ORELHA',
  'SAPATO',
  'VIOLÃO',
  'XÍCARA',
  'ZÍPER'
];

export const completeWordGames = [
  { emoji: '🐱', pattern: 'G _ T O', answer: 'A', options: ['A', 'O', 'U'], word: 'GATO' },
  { emoji: '🏠', pattern: 'C A _ A', answer: 'S', options: ['S', 'T', 'P'], word: 'CASA' },
  { emoji: '⚽', pattern: 'B O _ A', answer: 'L', options: ['L', 'R', 'M'], word: 'BOLA' },
  { emoji: '🐸', pattern: 'S A _ O', answer: 'P', options: ['P', 'T', 'L'], word: 'SAPO' },
  { emoji: '🐄', pattern: 'V A _ A', answer: 'C', options: ['C', 'T', 'P'], word: 'VACA' },
  { emoji: '🐭', pattern: 'R A _ O', answer: 'T', options: ['T', 'P', 'D'], word: 'RATO' },
  { emoji: '🍇', pattern: '_ V A', answer: 'U', options: ['U', 'O', 'A'], word: 'UVA' },
  { emoji: '🥚', pattern: 'O _ O', answer: 'V', options: ['V', 'B', 'D'], word: 'OVO' },
  { emoji: '🦓', pattern: 'Z E _ R A', answer: 'B', options: ['B', 'P', 'D'], word: 'ZEBRA' },
  { emoji: '🚢', pattern: 'N A _ I O', answer: 'V', options: ['V', 'B', 'F'], word: 'NAVIO' },
  { emoji: '🌼', pattern: 'F L _ R', answer: 'O', options: ['O', 'A', 'E'], word: 'FLOR' },
  { emoji: '🐻', pattern: 'U R _ O', answer: 'S', options: ['S', 'T', 'P'], word: 'URSO' },
  { emoji: '🐯', pattern: 'T I _ R E', answer: 'G', options: ['G', 'C', 'D'], word: 'TIGRE' },
  { emoji: '👃', pattern: 'N A R _ Z', answer: 'I', options: ['I', 'A', 'O'], word: 'NARIZ' },
  { emoji: '🕯️', pattern: 'V E _ A', answer: 'L', options: ['L', 'R', 'M'], word: 'VELA' },

  { emoji: '🍌', pattern: 'B A _ A N A', answer: 'N', options: ['N', 'M', 'L'], word: 'BANANA' },
  { emoji: '🐵', pattern: 'M A _ A C O', answer: 'C', options: ['C', 'G', 'P'], word: 'MACACO' },
  { emoji: '🐴', pattern: 'C A V A _ O', answer: 'L', options: ['L', 'R', 'M'], word: 'CAVALO' },
  { emoji: '📖', pattern: 'L I _ R O', answer: 'V', options: ['V', 'B', 'F'], word: 'LIVRO' },
  { emoji: '🐟', pattern: 'P E I _ E', answer: 'X', options: ['X', 'S', 'Z'], word: 'PEIXE' },
  { emoji: '🚗', pattern: 'C A _ R O', answer: 'R', options: ['R', 'L', 'T'], word: 'CARRO' },
  { emoji: '🚂', pattern: 'T R _ M', answer: 'E', options: ['E', 'A', 'I'], word: 'TREM' },
  { emoji: '🐝', pattern: 'A B E _ H A', answer: 'L', options: ['L', 'R', 'M'], word: 'ABELHA' },
  { emoji: '🐊', pattern: 'J A C A _ É', answer: 'R', options: ['R', 'L', 'T'], word: 'JACARÉ' },
  { emoji: '🧀', pattern: 'Q U E _ J O', answer: 'I', options: ['I', 'A', 'E'], word: 'QUEIJO' },
  { emoji: '🍅', pattern: 'T O M A _ E', answer: 'T', options: ['T', 'P', 'D'], word: 'TOMATE' },
  { emoji: '🦒', pattern: 'G I R A _ A', answer: 'F', options: ['F', 'V', 'P'], word: 'GIRAFA' },
  { emoji: '🦷', pattern: 'D E _ T E', answer: 'N', options: ['N', 'M', 'L'], word: 'DENTE' },
  { emoji: '👁️', pattern: 'O L _ O', answer: 'H', options: ['H', 'R', 'N'], word: 'OLHO' },
  { emoji: '🪁', pattern: 'P I _ A', answer: 'P', options: ['P', 'B', 'T'], word: 'PIPA' }
];

export type MathGame = {
  type: 'count' | 'add' | 'subtract';
  question: string;
  visual?: string;
  answer: number;
  options: number[];
};

const makeOptions = (answer: number): number[] => {
  const values = new Set<number>();

  values.add(answer);

  if (answer > 0) {
    values.add(answer - 1);
  }

  values.add(answer + 1);

  let extra = answer + 2;

  while (values.size < 3) {
    values.add(extra);
    extra++;
  }

  return [...values].sort((a, b) => a - b);
};

const visualCountGames: MathGame[] = [
  {
    type: 'count',
    question: 'QUANTAS MAÇÃS TEM AQUI?',
    visual: '🍎 🍎 🍎',
    answer: 3,
    options: [2, 3, 4]
  },
  {
    type: 'count',
    question: 'QUANTAS ESTRELAS TEM AQUI?',
    visual: '⭐ ⭐ ⭐ ⭐ ⭐',
    answer: 5,
    options: [4, 5, 6]
  },
  {
    type: 'count',
    question: 'QUANTAS BOLAS TEM AQUI?',
    visual: '⚽ ⚽ ⚽ ⚽',
    answer: 4,
    options: [3, 4, 5]
  },
  {
    type: 'count',
    question: 'QUANTOS PEIXES TEM AQUI?',
    visual: '🐟 🐟 🐟 🐟 🐟 🐟',
    answer: 6,
    options: [5, 6, 7]
  },
  {
    type: 'count',
    question: 'QUANTOS CARROS TEM AQUI?',
    visual: '🚗 🚗 🚗 🚗 🚗 🚗 🚗',
    answer: 7,
    options: [6, 7, 8]
  },
  {
    type: 'count',
    question: 'QUANTAS FLORES TEM AQUI?',
    visual: '🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼',
    answer: 8,
    options: [7, 8, 9]
  },
  {
    type: 'count',
    question: 'QUANTOS GATOS TEM AQUI?',
    visual: '🐱 🐱 🐱 🐱',
    answer: 4,
    options: [3, 4, 5]
  },
  {
    type: 'count',
    question: 'QUANTOS PATOS TEM AQUI?',
    visual: '🦆 🦆 🦆 🦆 🦆',
    answer: 5,
    options: [4, 5, 6]
  },
  {
    type: 'count',
    question: 'QUANTAS BANANAS TEM AQUI?',
    visual: '🍌 🍌 🍌 🍌 🍌 🍌',
    answer: 6,
    options: [5, 6, 7]
  },
  {
    type: 'count',
    question: 'QUANTOS CORAÇÕES TEM AQUI?',
    visual: '❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️',
    answer: 7,
    options: [6, 7, 8]
  }
];

const additionGames: MathGame[] = [];

for (let first = 1; first <= 10; first++) {
  for (let second = 1; second <= 10; second++) {
    const answer = first + second;

    additionGames.push({
      type: 'add',
      question: `QUANTO É ${first} + ${second}?`,
      answer,
      options: makeOptions(answer)
    });
  }
}

const subtractionGames: MathGame[] = [];

for (let first = 2; first <= 20; first++) {
  for (let second = 1; second < first; second++) {
    const answer = first - second;

    subtractionGames.push({
      type: 'subtract',
      question: `QUANTO É ${first} - ${second}?`,
      answer,
      options: makeOptions(answer)
    });
  }
}

export const mathGames: MathGame[] = [
  ...visualCountGames,
  ...additionGames,
  ...subtractionGames
];