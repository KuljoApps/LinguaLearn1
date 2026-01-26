
import type { CrosswordPuzzle } from '../crossword-data';

export const crosswordPuzzlesEn: CrosswordPuzzle[] = [
  {
    id: 1,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Nauczyciel', answer: 'TEACHER', options: ['TEACHER', 'STUDENT', 'DOCTOR'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Uczyć się', answer: 'LEARN', options: ['LEARN', 'READ', 'WRITE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Książka', answer: 'BOOK', options: ['BOOK', 'NOTE', 'PAPER'], x: 0, y: 3, direction: 'across' },
      { number: 4, clue: 'Czytać', answer: 'READ', options: ['READ', 'WRITE', 'SPEAK'], x: 4, y: 1, direction: 'down' },
      { number: 5, clue: 'Klasa', answer: 'CLASS', options: ['CLASS', 'ROOM', 'SCHOOL'], x: 0, y: 5, direction: 'across' },
      { number: 6, clue: 'Szkoła', answer: 'SCHOOL', options: ['SCHOOL', 'CLASS', 'BOOK'], x: 6, y: 0, direction: 'down' },
    ],
  },
  {
    id: 2,
    gridSize: 7,
    gridHeight: 8,
    clues: [
      { number: 1, clue: 'Kuchnia', answer: 'KITCHEN', options: ['KITCHEN', 'BATHROOM', 'BEDROOM'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Jeść', answer: 'EAT', options: ['EAT', 'DRINK', 'SLEEP'], x: 1, y: 0, direction: 'down' },
      { number: 3, clue: 'Widelec', answer: 'FORK', options: ['FORK', 'SPOON', 'KNIFE'], x: 3, y: 1, direction: 'down' },
      { number: 4, clue: 'Nóż', answer: 'KNIFE', options: ['KNIFE', 'SPOON', 'FORK'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Talerz', answer: 'PLATE', options: ['PLATE', 'BOWL', 'GLASS'], x: 0, y: 5, direction: 'across' },
      { number: 6, clue: 'Sól', answer: 'SALT', options: ['SALT', 'SUGAR', 'PEPPER'], x: 5, y: 4, direction: 'down' },
    ],
  },
  {
    id: 3,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Lato', answer: 'SUMMER', options: ['SUMMER', 'WINTER', 'AUTUMN'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Deszcz', answer: 'RAIN', options: ['RAIN', 'SNOW', 'WIND'], x: 1, y: 3, direction: 'across' },
      { number: 3, clue: 'Słońce', answer: 'SUN', options: ['SUN', 'MOON', 'STAR'], x: 1, y: 1, direction: 'down' },
      { number: 4, clue: 'Wiatr', answer: 'WIND', options: ['WIND', 'STORM', 'FOG'], x: 5, y: 0, direction: 'down' },
      { number: 5, clue: 'Zimno', answer: 'COLD', options: ['COLD', 'HOT', 'WARM'], x: 0, y: 5, direction: 'across' },
      { number: 6, clue: 'Gorąco', answer: 'HOT', options: ['HOT', 'COLD', 'COOL'], x: 3, y: 5, direction: 'down' },
    ],
  },
  {
    id: 4,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Świat', answer: 'WORLD', options: ['WORLD', 'EARTH', 'COUNTRY'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Podróż', answer: 'TRIP', options: ['TRIP', 'JOURNEY', 'TRAVEL'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Rzym', answer: 'ROME', options: ['ROME', 'PARIS', 'LONDON'], x: 0, y: 3, direction: 'across' },
      { number: 4, clue: 'Paryż', answer: 'PARIS', options: ['PARIS', 'LONDON', 'MADRID'], x: 0, y: 5, direction: 'across' },
      { number: 5, clue: 'Morze', answer: 'SEA', options: ['SEA', 'OCEAN', 'LAKE'], x: 5, y: 3, direction: 'down' },
      { number: 6, clue: 'Mapa', answer: 'MAP', options: ['MAP', 'CARD', 'PLAN'], x: 3, y: 5, direction: 'down' },
    ],
  },
  {
    id: 5,
    gridSize: 7,
    gridHeight: 7,
    clues: [
      { number: 1, clue: 'Dom', answer: 'HOUSE', options: ['HOUSE', 'HOME', 'FLAT'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Pokój', answer: 'ROOM', options: ['ROOM', 'HALL', 'KITCHEN'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Drzwi', answer: 'DOOR', options: ['DOOR', 'WINDOW', 'WALL'], x: 0, y: 3, direction: 'across' },
      { number: 4, clue: 'Stół', answer: 'TABLE', options: ['TABLE', 'CHAIR', 'DESK'], x: 0, y: 5, direction: 'across' },
      { number: 5, clue: 'Łóżko', answer: 'BED', options: ['BED', 'SOFA', 'CHAIR'], x: 5, y: 3, direction: 'down' },
      { number: 6, clue: 'Okno', answer: 'WINDOW', options: ['WINDOW', 'DOOR', 'ROOF'], x: 6, y: 0, direction: 'down' },
    ],
  },
];
