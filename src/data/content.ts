export const letters = [
 ['A','a','ABELHA','🐝'],['B','b','BOLA','⚽'],['C','c','CASA','🏠'],['D','d','DADO','🎲'],['E','e','ELEFANTE','🐘'],['F','f','FLOR','🌼'],['G','g','GATO','🐱'],['M','m','MACACO','🐒'],['P','p','PATO','🦆'],['S','s','SAPO','🐸']
] as const;
export const syllables = ['BA','BE','BI','BO','BU','CA','CE','CI','CO','CU','MA','ME','MI','MO','MU','PA','PE','PI','PO','PU'];
export const wordQuestions = [
 {emoji:'🏠', pattern:'C _ S A', options:['A','T','M'], answer:'A', word:'CASA'},
 {emoji:'🐱', pattern:'G A _ O', options:['T','P','S'], answer:'T', word:'GATO'},
 {emoji:'⚽', pattern:'B O _ A', options:['L','R','M'], answer:'L', word:'BOLA'}
];
export const readingQuestions = [
 {emoji:'🍌', options:['BANANA','BOLA','CASA'], answer:'BANANA'},
 {emoji:'🐱', options:['PATO','GATO','SAPO'], answer:'GATO'},
 {emoji:'🏠', options:['CASA','MALA','DADO'], answer:'CASA'}
];
