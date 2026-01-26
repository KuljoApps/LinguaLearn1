export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  options: string[];
  x: number;
  y: number;
  direction: 'across' | 'down';
}

export interface CrosswordPuzzle {
  id: number;
  gridSize: number;
  gridHeight?: number;
  clues: CrosswordClue[];
}
