
import type { CrosswordPuzzle } from '../crossword-data';

export const crosswordPuzzlesEn: CrosswordPuzzle[] = [
  {
    id: 1,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Nauczyciel', answer: 'TEACHER', options: ['TEACHER', 'STUDENT', 'DOCTOR'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Uczyć się', answer: 'LEARN', options: ['LEARN', 'READ', 'WRITE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Szkoła', answer: 'SCHOOL', options: ['SCHOOL', 'CLASS', 'BOOK'], x: 6, y: 0, direction: 'down' },
      { number: 4, clue: 'Student', answer: 'STUDENT', options: ['STUDENT', 'TEACHER', 'PUPIL'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Książka', answer: 'BOOK', options: ['BOOK', 'NOTE', 'PAPER'], x: 0, y: 3, direction: 'down' },
      { number: 6, clue: 'Klasa', answer: 'CLASS', options: ['CLASS', 'ROOM', 'SCHOOL'], x: 2, y: 5, direction: 'across' },
      { number: 7, clue: 'Czytać', answer: 'READ', options: ['READ', 'WRITE', 'SPEAK'], x: 0, y: 7, direction: 'across' },
    ],
  },
  {
    id: 2,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Kuchnia', answer: 'KITCHEN', options: ['KITCHEN', 'BATHROOM', 'BEDROOM'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Jeść', answer: 'EAT', options: ['EAT', 'DRINK', 'SLEEP'], x: 1, y: 0, direction: 'down' },
      { number: 3, clue: 'Widelec', answer: 'FORK', options: ['FORK', 'SPOON', 'KNIFE'], x: 5, y: 0, direction: 'down' },
      { number: 4, clue: 'Obiad', answer: 'DINNER', options: ['DINNER', 'LUNCH', 'BREAKFAST'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Nóż', answer: 'KNIFE', options: ['KNIFE', 'SPOON', 'FORK'], x: 1, y: 3, direction: 'down' },
      { number: 6, clue: 'Łyżka', answer: 'SPOON', options: ['SPOON', 'FORK', 'KNIFE'], x: 3, y: 5, direction: 'across' },
      { number: 7, clue: 'Drugie śniadanie', answer: 'LUNCH', options: ['LUNCH', 'DINNER', 'SNACK'], x: 0, y: 7, direction: 'across' },
    ],
  },
  {
    id: 3,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Zima', answer: 'WINTER', options: ['WINTER', 'SUMMER', 'SPRING'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Słońce', answer: 'SUN', options: ['SUN', 'MOON', 'STAR'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Wiosna', answer: 'SPRING', options: ['SPRING', 'AUTUMN', 'WINTER'], x: 6, y: 0, direction: 'down' },
      { number: 4, clue: 'Deszcz', answer: 'RAIN', options: ['RAIN', 'SNOW', 'WIND'], x: 0, y: 2, direction: 'across' },
      { number: 5, clue: 'Lato', answer: 'SUMMER', options: ['SUMMER', 'WINTER', 'AUTUMN'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Śnieg', answer: 'SNOW', options: ['SNOW', 'RAIN', 'ICE'], x: 0, y: 4, direction: 'down' },
      { number: 7, clue: 'Jesień', answer: 'AUTUMN', options: ['AUTUMN', 'SPRING', 'SUMMER'], x: 2, y: 6, direction: 'across' },
    ],
  },
  {
    id: 4,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Lekarz', answer: 'DOCTOR', options: ['DOCTOR', 'NURSE', 'PATIENT'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Chory', answer: 'SICK', options: ['SICK', 'HEALTHY', 'WELL'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Pomoc', answer: 'HELP', options: ['HELP', 'PAIN', 'CARE'], x: 5, y: 0, direction: 'down' },
      { number: 4, clue: 'Zdrowie', answer: 'HEALTH', options: ['HEALTH', 'ILLNESS', 'SICKNESS'], x: 0, y: 2, direction: 'across' },
      { number: 5, clue: 'Ból', answer: 'PAIN', options: ['PAIN', 'HURT', 'ACHE'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Pielęgniarka', answer: 'NURSE', options: ['NURSE', 'DOCTOR', 'SURGEON'], x: 3, y: 4, direction: 'down' },
    ],
  },
  {
    id: 5,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Świat', answer: 'WORLD', options: ['WORLD', 'EARTH', 'COUNTRY'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Podróż', answer: 'TRAVEL', options: ['TRAVEL', 'JOURNEY', 'TRIP'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Rzym', answer: 'ROME', options: ['ROME', 'PARIS', 'LONDON'], x: 0, y: 2, direction: 'across' },
      { number: 4, clue: 'Madryt', answer: 'MADRID', options: ['MADRID', 'BERLIN', 'ROME'], x: 6, y: 2, direction: 'down' },
      { number: 5, clue: 'Paryż', answer: 'PARIS', options: ['PARIS', 'LONDON', 'MADRID'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Londyn', answer: 'LONDON', options: ['LONDON', 'PARIS', 'BERLIN'], x: 0, y: 6, direction: 'across' },
      { number: 7, clue: 'Berlin', answer: 'BERLIN', options: ['BERLIN', 'ROME', 'LONDON'], x: 4, y: 4, direction: 'down' },
    ],
  },
];

    