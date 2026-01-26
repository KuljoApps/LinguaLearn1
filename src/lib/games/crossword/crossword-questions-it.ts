
import type { CrosswordPuzzle } from '../crossword-data';

export const crosswordPuzzlesIt: CrosswordPuzzle[] = [
  {
    id: 1,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Nauczyciel', answer: 'MAESTRO', options: ['MAESTRO', 'ALUNNO', 'MEDICO'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Uczyć się', answer: 'STUDIARE', options: ['STUDIARE', 'LEGGERE', 'SCRIVERE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Książka', answer: 'LIBRO', options: ['LIBRO', 'QUADERNO', 'FOGLIO'], x: 0, y: 3, direction: 'across' },
      { number: 4, clue: 'Czytać', answer: 'LEGGERE', options: ['LEGGERE', 'SCRIVERE', 'PARLARE'], x: 4, y: 1, direction: 'down' },
      { number: 5, clue: 'Klasa', answer: 'CLASSE', options: ['CLASSE', 'AULA', 'SCUOLA'], x: 0, y: 5, direction: 'across' },
      { number: 6, clue: 'Szkoła', answer: 'SCUOLA', options: ['SCUOLA', 'CLASSE', 'LIBRO'], x: 6, y: 0, direction: 'down' },
    ],
  },
  {
    id: 2,
    gridSize: 7,
    gridHeight: 8,
    clues: [
      { number: 1, clue: 'Kuchnia', answer: 'CUCINA', options: ['CUCINA', 'BAGNO', 'STANZA'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Jeść', answer: 'MANGIARE', options: ['MANGIARE', 'BERE', 'DORMIRE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Widelec', answer: 'FORCHETTA', options: ['FORCHETTA', 'CUCCHIAIO', 'COLTELLO'], x: 4, y: 1, direction: 'down' },
      { number: 4, clue: 'Nóż', answer: 'COLTELLO', options: ['COLTELLO', 'FORCHETTA', 'CUCCHIAIO'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Talerz', answer: 'PIATTO', options: ['PIATTO', 'BICCHIERE', 'TAZZA'], x: 0, y: 5, direction: 'across' },
      { number: 6, clue: 'Sól', answer: 'SALE', options: ['SALE', 'ZUCCHERO', 'PEPE'], x: 6, y: 4, direction: 'down' },
    ],
  },
  {
    id: 3,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Lato', answer: 'ESTATE', options: ['ESTATE', 'INVERNO', 'PRIMAVERA'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Deszcz', answer: 'PIOGGIA', options: ['PIOGGIA', 'NEVE', 'VENTO'], x: 1, y: 3, direction: 'across' },
      { number: 3, clue: 'Słońce', answer: 'SOLE', options: ['SOLE', 'LUNA', 'STELLA'], x: 1, y: 1, direction: 'down' },
      { number: 4, clue: 'Wiatr', answer: 'VENTO', options: ['VENTO', 'TEMPESTA', 'NEBBIA'], x: 5, y: 0, direction: 'down' },
      { number: 5, clue: 'Zimno', answer: 'FREDDO', options: ['FREDDO', 'CALDO', 'TIEPIDO'], x: 0, y: 5, direction: 'across' },
      { number: 6, clue: 'Gorąco', answer: 'CALDO', options: ['CALDO', 'FREDDO', 'FRESCO'], x: 3, y: 5, direction: 'down' },
    ],
  },
  {
    id: 4,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Świat', answer: 'MONDO', options: ['MONDO', 'TERRA', 'PAESE'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Podróż', answer: 'VIAGGIO', options: ['VIAGGIO', 'GITA', 'PASSEGGIATA'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Rzym', answer: 'ROMA', options: ['ROMA', 'PARIGI', 'LONDRA'], x: 0, y: 3, direction: 'across' },
      { number: 4, clue: 'Paryż', answer: 'PARIGI', options: ['PARIGI', 'LONDRA', 'MADRID'], x: 0, y: 5, direction: 'across' },
      { number: 5, clue: 'Morze', answer: 'MARE', options: ['MARE', 'OCEANO', 'LAGO'], x: 5, y: 3, direction: 'down' },
      { number: 6, clue: 'Mapa', answer: 'MAPPA', options: ['MAPPA', 'CARTA', 'PIANO'], x: 3, y: 5, direction: 'down' },
    ],
  },
  {
    id: 5,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Dom', answer: 'CASA', options: ['CASA', 'ABITAZIONE', 'APPARTAMENTO'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Pokój', answer: 'STANZA', options: ['STANZA', 'SALA', 'CUCINA'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Drzwi', answer: 'PORTA', options: ['PORTA', 'FINESTRA', 'MURO'], x: 0, y: 3, direction: 'across' },
      { number: 4, clue: 'Stół', answer: 'TAVOLO', options: ['TAVOLO', 'SEDIA', 'SCRIVANIA'], x: 0, y: 5, direction: 'across' },
      { number: 5, clue: 'Łóżko', answer: 'LETTO', options: ['LETTO', 'DIVANO', 'SEDIA'], x: 5, y: 3, direction: 'down' },
      { number: 6, clue: 'Okno', answer: 'FINESTRA', options: ['FINESTRA', 'PORTA', 'TETTO'], x: 6, y: 0, direction: 'down' },
    ],
  },
];
