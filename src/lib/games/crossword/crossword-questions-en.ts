import type { CrosswordPuzzle } from '../crossword-data';

export const crosswordPuzzlesEn: CrosswordPuzzle[] = [
  {
    id: 1,
    gridSize: 6, // Maksymalnie 6 kolumn
    gridHeight: 8, // 6-9 wierszy
    clues: [
      // Across (poziome) - poprawnie skrzyżowane
      { 
        number: 1, 
        clue: 'Nauczyciel', 
        answer: 'TEACHER', 
        options: ['TEACHER', 'TRAINER', 'TURTLER'], // Ta sama długość, ta sama pierwsza litera
        x: 0, y: 1, 
        direction: 'across' 
      },
      { 
        number: 3, 
        clue: 'Książka', 
        answer: 'BOOK', 
        options: ['BOOK', 'BALL', 'BANK'], // Ta sama długość, ta sama pierwsza litera
        x: 0, y: 4, 
        direction: 'across' 
      },
      { 
        number: 5, 
        clue: 'Klasa', 
        answer: 'CLASS', 
        options: ['CLASS', 'CLOWN', 'CLOUD'], // Ta sama długość, ta sama pierwsza litera
        x: 0, y: 7, 
        direction: 'across' 
      },
      
      // Down (pionowe) - poprawnie skrzyżowane
      { 
        number: 2, 
        clue: 'Uczyć się', 
        answer: 'LEARN', 
        options: ['LEARN', 'LEAVE', 'LEMON'], // Ta sama długość, ta sama pierwsza litera
        x: 2, y: 0, 
        direction: 'down' 
      },
      { 
        number: 4, 
        clue: 'Czytać', 
        answer: 'READ', 
        options: ['READ', 'RACE', 'RAIN'], // Ta sama długość, ta sama pierwsza litera
        x: 4, y: 1, 
        direction: 'down' 
      },
      { 
        number: 6, 
        clue: 'Szkoła', 
        answer: 'SCHOOL', 
        options: ['SCHOOL', 'SCREW', 'SCOPE'], // Ta sama długość, ta sama pierwsza litera
        x: 5, y: 2, 
        direction: 'down' 
      },
    ],
  },
  {
    id: 2,
    gridSize: 6,
    gridHeight: 7,
    clues: [
      // Across - poprawne skrzyżowania
      { 
        number: 1, 
        clue: 'Dom', 
        answer: 'HOUSE', 
        options: ['HOUSE', 'HORSE', 'HONEY'], // 5 liter, zaczyna się na H
        x: 0, y: 1, 
        direction: 'across' 
      },
      { 
        number: 3, 
        clue: 'Okno', 
        answer: 'WINDOW', 
        options: ['WINDOW', 'WINTER', 'WISDOM'], // 6 liter, zaczyna się na W
        x: 1, y: 3, 
        direction: 'across' 
      },
      { 
        number: 5, 
        clue: 'Drzwi', 
        answer: 'DOOR', 
        options: ['DOOR', 'DARK', 'DEEP'], // 4 litery, zaczyna się na D
        x: 2, y: 5, 
        direction: 'across' 
      },
      
      // Down - poprawne skrzyżowania
      { 
        number: 2, 
        clue: 'Pokój', 
        answer: 'ROOM', 
        options: ['ROOM', 'ROAD', 'ROCK'], // 4 litery, zaczyna się na R
        x: 1, y: 1, 
        direction: 'down' 
      },
      { 
        number: 4, 
        clue: 'Łóżko', 
        answer: 'BED', 
        options: ['BED', 'BAG', 'BAT'], // 3 litery, zaczyna się na B
        x: 3, y: 3, 
        direction: 'down' 
      },
      { 
        number: 6, 
        clue: 'Stół', 
        answer: 'TABLE', 
        options: ['TABLE', 'TALES', 'TASTE'], // 5 liter, zaczyna się na T
        x: 4, y: 2, 
        direction: 'down' 
      },
    ],
  },
  {
    id: 3,
    gridSize: 6,
    gridHeight: 9,
    clues: [
      // Across - poprawne skrzyżowania
      { 
        number: 1, 
        clue: 'Słońce', 
        answer: 'SUN', 
        options: ['SUN', 'SON', 'SAD'], // 3 litery, zaczyna się na S
        x: 0, y: 2, 
        direction: 'across' 
      },
      { 
        number: 3, 
        clue: 'Deszcz', 
        answer: 'RAIN', 
        options: ['RAIN', 'RACE', 'RISE'], // 4 litery, zaczyna się na R
        x: 0, y: 4, 
        direction: 'across' 
      },
      { 
        number: 5, 
        clue: 'Wiatr', 
        answer: 'WIND', 
        options: ['WIND', 'WINE', 'WAVE'], // 4 litery, zaczyna się na W
        x: 0, y: 6, 
        direction: 'across' 
      },
      { 
        number: 7, 
        clue: 'Zimno', 
        answer: 'COLD', 
        options: ['COLD', 'COAL', 'COAT'], // 4 litery, zaczyna się na C
        x: 2, y: 8, 
        direction: 'across' 
      },
      
      // Down - poprawne skrzyżowania
      { 
        number: 2, 
        clue: 'Lato', 
        answer: 'SUMMER', 
        options: ['SUMMER', 'SUPPER', 'SUNDAY'], // 6 liter, zaczyna się na S
        x: 2, y: 1, 
        direction: 'down' 
      },
      { 
        number: 4, 
        clue: 'Woda', 
        answer: 'WATER', 
        options: ['WATER', 'WHEAT', 'WORLD'], // 5 liter, zaczyna się na W
        x: 4, y: 0, 
        direction: 'down' 
      },
      { 
        number: 6, 
        clue: 'Gorąco', 
        answer: 'HOT', 
        options: ['HOT', 'HIT', 'HAT'], // 3 litery, zaczyna się na H
        x: 5, y: 6, 
        direction: 'down' 
      },
    ],
  },
  {
    id: 4,
    gridSize: 6,
    gridHeight: 8,
    clues: [
      // Across - poprawne skrzyżowania
      { 
        number: 1, 
        clue: 'Pies', 
        answer: 'DOG', 
        options: ['DOG', 'DAD', 'DOT'], // 3 litery, zaczyna się na D
        x: 0, y: 1, 
        direction: 'across' 
      },
      { 
        number: 3, 
        clue: 'Kot', 
        answer: 'CAT', 
        options: ['CAT', 'CAR', 'CAN'], // 3 litery, zaczyna się na C
        x: 0, y: 4, 
        direction: 'across' 
      },
      { 
        number: 5, 
        clue: 'Ptak', 
        answer: 'BIRD', 
        options: ['BIRD', 'BALL', 'BAND'], // 4 litery, zaczyna się na B
        x: 0, y: 7, 
        direction: 'across' 
      },
      
      // Down - poprawne skrzyżowania
      { 
        number: 2, 
        clue: 'Rzeka', 
        answer: 'RIVER', 
        options: ['RIVER', 'RIDER', 'RISER'], // 5 liter, zaczyna się na R
        x: 2, y: 0, 
        direction: 'down' 
      },
      { 
        number: 4, 
        clue: 'Las', 
        answer: 'FOREST', 
        options: ['FOREST', 'FOLDER', 'FORMER'], // 6 liter, zaczyna się na F
        x: 4, y: 2, 
        direction: 'down' 
      },
      { 
        number: 6, 
        clue: 'Góra', 
        answer: 'MOUNTAIN', 
        options: ['MOUNTAIN', 'MORNING', 'MOVEMENT'], // 8 liter, zaczyna się na M
        x: 5, y: 0, 
        direction: 'down' 
      },
    ],
  },
  {
    id: 5,
    gridSize: 6,
    gridHeight: 7,
    clues: [
      // Across - poprawne skrzyżowania
      { 
        number: 1, 
        clue: 'Miasto', 
        answer: 'CITY', 
        options: ['CITY', 'COOL', 'COAT'], // 4 litery, zaczyna się na C
        x: 0, y: 1, 
        direction: 'across' 
      },
      { 
        number: 3, 
        clue: 'Ulica', 
        answer: 'STREET', 
        options: ['STREET', 'STREAM', 'STRESS'], // 6 liter, zaczyna się na S
        x: 0, y: 4, 
        direction: 'across' 
      },
      { 
        number: 5, 
        clue: 'Samochód', 
        answer: 'CAR', 
        options: ['CAR', 'CAT', 'CAN'], // 3 litery, zaczyna się na C
        x: 2, y: 6, 
        direction: 'across' 
      },
      
      // Down - poprawne skrzyżowania
      { 
        number: 2, 
        clue: 'Kraj', 
        answer: 'COUNTRY', 
        options: ['COUNTRY', 'COUCHER', 'COURIER'], // 7 liter, zaczyna się na C
        x: 1, y: 0, 
        direction: 'down' 
      },
      { 
        number: 4, 
        clue: 'Wieś', 
        answer: 'VILLAGE', 
        options: ['VILLAGE', 'VISIBLE', 'VINTAGE'], // 7 liter, zaczyna się na V
        x: 3, y: 2, 
        direction: 'down' 
      },
      { 
        number: 6, 
        clue: 'Park', 
        answer: 'PARK', 
        options: ['PARK', 'PART', 'PALE'], // 4 litery, zaczyna się na P
        x: 5, y: 3, 
        direction: 'down' 
      },
    ],
  },
];