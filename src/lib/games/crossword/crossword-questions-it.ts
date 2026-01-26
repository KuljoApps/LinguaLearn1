
import type { CrosswordPuzzle } from '../crossword-data';

export const crosswordPuzzlesIt: CrosswordPuzzle[] = [
  {
    id: 1,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Nauczyciel', answer: 'MAESTRO', options: ['MAESTRO', 'ALUNNO', 'MEDICO'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Uczyć się', answer: 'STUDIARE', options: ['STUDIARE', 'LEGGERE', 'SCRIVERE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Szkoła', answer: 'SCUOLA', options: ['SCUOLA', 'CLASSE', 'LIBRO'], x: 6, y: 0, direction: 'down' },
      { number: 4, clue: 'Uczeń', answer: 'ALUNNO', options: ['ALUNNO', 'MAESTRO', 'BAMBINO'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Książka', answer: 'LIBRO', options: ['LIBRO', 'QUADERNO', 'FOGLIO'], x: 0, y: 3, direction: 'down' },
      { number: 6, clue: 'Klasa', answer: 'CLASSE', options: ['CLASSE', 'AULA', 'SCUOLA'], x: 2, y: 5, direction: 'across' },
      { number: 7, clue: 'Czytać', answer: 'LEGGERE', options: ['LEGGERE', 'SCRIVERE', 'PARLARE'], x: 0, y: 7, direction: 'across' },
    ],
  },
  {
    id: 2,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Kuchnia', answer: 'CUCINA', options: ['CUCINA', 'BAGNO', 'STANZA'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Jeść', answer: 'MANGIARE', options: ['MANGIARE', 'BERE', 'DORMIRE'], x: 1, y: 0, direction: 'down' },
      { number: 3, clue: 'Widelec', answer: 'FORCHETTA', options: ['FORCHETTA', 'CUCCHIAIO', 'COLTELLO'], x: 5, y: 0, direction: 'down' },
      { number: 4, clue: 'Obiad', answer: 'PRANZO', options: ['PRANZO', 'CENA', 'COLAZIONE'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Nóż', answer: 'COLTELLO', options: ['COLTELLO', 'FORCHETTA', 'CUCCHIAIO'], x: 1, y: 3, direction: 'down' },
      { number: 6, clue: 'Łyżka', answer: 'CUCCHIAIO', options: ['CUCCHIAIO', 'FORCHETTA', 'PIATTO'], x: 0, y: 5, direction: 'across' },
      { number: 7, clue: 'Talerz', answer: 'PIATTO', options: ['PIATTO', 'BICCHIERE', 'TAZZA'], x: 0, y: 7, direction: 'across' },
    ],
  },
  {
    id: 3,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Zima', answer: 'INVERNO', options: ['INVERNO', 'ESTATE', 'PRIMAVERA'], x: 0, y: 0, direction: 'across' },
      { number: 2, clue: 'Słońce', answer: 'SOLE', options: ['SOLE', 'LUNA', 'STELLA'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Wiosna', answer: 'PRIMAVERA', options: ['PRIMAVERA', 'AUTUNNO', 'INVERNO'], x: 6, y: 0, direction: 'down' },
      { number: 4, clue: 'Deszcz', answer: 'PIOGGIA', options: ['PIOGGIA', 'NEVE', 'VENTO'], x: 0, y: 2, direction: 'across' },
      { number: 5, clue: 'Lato', answer: 'ESTATE', options: ['ESTATE', 'INVERNO', 'AUTUNNO'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Śnieg', answer: 'NEVE', options: ['NEVE', 'PIOGGIA', 'GHIACCIO'], x: 0, y: 4, direction: 'down' },
      { number: 7, clue: 'Jesień', answer: 'AUTUNNO', options: ['AUTUNNO', 'PRIMAVERA', 'ESTATE'], x: 2, y: 6, direction: 'across' },
    ],
  },
  {
    id: 4,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Lekarz', answer: 'MEDICO', options: ['MEDICO', 'INFERMIERE', 'PAZIENTE'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Chory', answer: 'MALATO', options: ['MALATO', 'SANO', 'BENE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Pomoc', answer: 'AIUTO', options: ['AIUTO', 'DOLORE', 'CURA'], x: 5, y: 0, direction: 'down' },
      { number: 4, clue: 'Zdrowie', answer: 'SALUTE', options: ['SALUTE', 'MALATTIA', 'DOLORE'], x: 0, y: 2, direction: 'across' },
      { number: 5, clue: 'Ból', answer: 'DOLORE', options: ['DOLORE', 'FERITA', 'MALE'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Apteka', answer: 'FARMACIA', options: ['FARMACIA', 'OSPEDALE', 'CLINICA'], x: 3, y: 4, direction: 'down' },
    ],
  },
  {
    id: 5,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Świat', answer: 'MONDO', options: ['MONDO', 'TERRA', 'PAESE'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Podróż', answer: 'VIAGGIO', options: ['VIAGGIO', 'GITA', 'PASSEGGIATA'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Rzym', answer: 'ROMA', options: ['ROMA', 'PARIGI', 'LONDRA'], x: 0, y: 2, direction: 'across' },
      { number: 4, clue: 'Madryt', answer: 'MADRID', options: ['MADRID', 'BERLINO', 'ROMA'], x: 6, y: 2, direction: 'down' },
      { number: 5, clue: 'Paryż', answer: 'PARIGI', options: ['PARIGI', 'LONDRA', 'MADRID'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Londyn', answer: 'LONDRA', options: ['LONDRA', 'PARIGI', 'BERLINO'], x: 0, y: 6, direction: 'across' },
      { number: 7, clue: 'Berlin', answer: 'BERLINO', options: ['BERLINO', 'ROMA', 'LONDRA'], x: 4, y: 4, direction: 'down' },
    ],
  },
];

    