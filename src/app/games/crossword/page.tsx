'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Puzzle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  allCrosswordPuzzles,
  type CrosswordPuzzle,
  type CrosswordClue,
} from '@/lib/games/crossword';
import { getLanguage, type Language } from '@/lib/storage';

interface Cell {
  char: string;
  number: number | null;
  isInput: boolean;
  clues: { across?: number; down?: number };
}

type Direction = 'across' | 'down';

const uiTexts = {
    title: { en: 'Crossword', fr: 'Mots Croisés', de: 'Kreuzworträtsel', it: 'Cruciverba', es: 'Crucigrama' },
    description: {
        en: 'Translate the Polish clues to fill in the English words.',
        fr: 'Traduisez les indices polonais pour remplir les mots français.',
        de: 'Übersetze die polnischen Hinweise, um die deutschen Wörter einzutragen.',
        it: 'Traduci gli indizi polacchi per inserire le parole italiane.',
        es: 'Traduce las pistas en polaco para rellenar las palabras en español.',
    },
    across: { en: 'Across', fr: 'Horizontalement', de: 'Waagerecht', it: 'Orizzontali', es: 'Horizontales' },
    down: { en: 'Down', fr: 'Verticalement', de: 'Senkrecht', it: 'Verticali', es: 'Verticales' },
    check: { en: 'Check Answers', fr: 'Vérifier', de: 'Antworten prüfen', it: 'Controlla', es: 'Comprobar' },
    back: { en: 'Back to Game Center', fr: 'Retour aux Jeux', de: 'Zurück zur Spielzentrale', it: 'Torna ai Giochi', es: 'Volver a Juegos' },
    winTitle: { en: 'Congratulations!', fr: 'Félicitations !', de: 'Herzlichen Glückwunsch!', it: 'Congratulazioni!', es: '¡Felicidades!' },
    winDesc: { en: 'You solved the crossword!', fr: 'Vous avez résolu les mots croisés !', de: 'Du hast das Kreuzworträtsel gelöst!', it: 'Hai risolto il cruciverba!', es: '¡Has resuelto el crucigrama!' },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
};

const CrosswordPage = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [puzzle, setPuzzle] = useState<CrosswordPuzzle | null>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [cellStates, setCellStates] = useState<Record<string, 'correct' | 'incorrect'>>({});
  const [isGameWon, setIsGameWon] = useState(false);
  const [activeCell, setActiveCell] = useState<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<Direction>('across');
  const [gridWidth, setGridWidth] = useState(300);
  const gridRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>([]);

  const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

  const generateGrid = useCallback((p: CrosswordPuzzle): Cell[][] => {
    const newGrid: Cell[][] = Array(p.gridSize)
      .fill(null)
      .map(() =>
        Array(p.gridSize)
          .fill(null)
          .map(() => ({
            char: '',
            number: null,
            isInput: false,
            clues: {},
          }))
      );

    p.clues.forEach((clue) => {
      let { x, y } = clue;
      newGrid[y][x].number = clue.number;
      if (clue.direction === 'across') {
        newGrid[y][x].clues.across = clue.number;
      } else {
        newGrid[y][x].clues.down = clue.number;
      }

      for (let i = 0; i < clue.answer.length; i++) {
        if(y >= p.gridSize || x >= p.gridSize) continue;
        
        newGrid[y][x].isInput = true;
        newGrid[y][x].char = clue.answer[i];

        const existingClues = newGrid[y][x].clues;
        if (clue.direction === 'across') {
          newGrid[y][x].clues = { ...existingClues, across: clue.number };
          x++;
        } else {
          newGrid[y][x].clues = { ...existingClues, down: clue.number };
          y++;
        }
      }
    });
    return newGrid;
  }, []);

  const initializeGame = useCallback(() => {
    const lang = getLanguage();
    setLanguage(lang);
    const puzzles = allCrosswordPuzzles[lang];
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    
    setPuzzle(randomPuzzle);
    setGrid(generateGrid(randomPuzzle));
    setUserAnswers({});
    setCellStates({});
    setIsGameWon(false);
    setActiveCell(null);
    setDirection('across');
    inputRefs.current = [];
  }, [generateGrid]);

  useEffect(() => {
    initializeGame();
    window.addEventListener('language-changed', initializeGame);
    return () => window.removeEventListener('language-changed', initializeGame);
  }, [initializeGame]);

  useEffect(() => {
    const updateSize = () => {
      if (gridRef.current) {
        const parentWidth = gridRef.current.parentElement?.clientWidth || 300;
        const availableWidth = Math.min(parentWidth, 500); 
        setGridWidth(availableWidth);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [puzzle]);

  const activeClueNumber = useMemo(() => {
    if (!activeCell || !puzzle) return null;
    const { x, y } = activeCell;
    const cell = grid[y]?.[x];
    if (!cell) return null;

    const findClue = (direction: Direction) => {
        for(const clue of puzzle.clues) {
            if (clue.direction !== direction) continue;

            let currentX = clue.x;
            let currentY = clue.y;
            for(let i=0; i<clue.answer.length; i++) {
                if(currentX === x && currentY === y) {
                    return clue.number;
                }
                if (clue.direction === 'across') currentX++;
                else currentY++;
            }
        }
        return null;
    }
    
    return findClue(direction) || findClue(direction === 'across' ? 'down' : 'across');
}, [activeCell, direction, grid, puzzle]);


  const getWordCells = useCallback(
    (clueNumber: number) => {
      const clue = puzzle?.clues.find((c) => c.number === clueNumber);
      if (!clue) return [];

      const cells = [];
      let { x, y } = clue;
      for (let i = 0; i < clue.answer.length; i++) {
        cells.push({ x, y });
        if (clue.direction === 'across') x++;
        else y++;
      }
      return cells;
    },
    [puzzle]
  );
  
  const activeWordCells = useMemo(() => {
    if (!activeClueNumber) return [];
    const clue = puzzle?.clues.find(c => c.number === activeClueNumber && c.direction === direction);
    if (clue) {
       return getWordCells(clue.number);
    }
    const otherClue = puzzle?.clues.find(c => c.number === activeClueNumber);
    if(otherClue) return getWordCells(otherClue.number);
    return [];
  }, [activeClueNumber, getWordCells, puzzle?.clues, direction]);


  const handleFocus = (x: number, y: number) => {
    const cell = grid[y]?.[x];
    if (!cell || !cell.isInput) {
        setActiveCell(null);
        return;
    }
    
    setActiveCell({ x, y });
    
    const isPartOfAcross = puzzle?.clues.some(c => c.direction === 'across' && x >= c.x && x < c.x + c.answer.length && y === c.y);
    const isPartOfDown = puzzle?.clues.some(c => c.direction === 'down' && y >= c.y && y < c.y + c.answer.length && x === c.x);

    if (direction === 'across' && isPartOfAcross) {
        // Keep current direction if valid
    } else if (direction === 'down' && isPartOfDown) {
        // Keep current direction if valid
    } else {
        // Switch to the first valid direction
        if (isPartOfAcross) {
            setDirection('across');
        } else if (isPartOfDown) {
            setDirection('down');
        }
    }
  };
  
  const handleClick = (x: number, y: number) => {
      const cell = grid[y]?.[x];
      if (!cell || !cell.isInput) {
          setActiveCell(null);
          return;
      }

      if (activeCell?.x === x && activeCell?.y === y) {
          const hasAcross = puzzle?.clues.some(c => c.direction === 'across' && x >= c.x && x < c.x + c.answer.length && y === c.y);
          const hasDown = puzzle?.clues.some(c => c.direction === 'down' && y >= c.y && y < c.y + c.answer.length && x === c.x);

          if (hasAcross && hasDown) {
              setDirection(prev => (prev === 'across' ? 'down' : 'across'));
          }
      } else {
          handleFocus(x, y);
      }
      inputRefs.current[y]?.[x]?.focus();
  };

  const handleInputChange = (x: number, y: number, value: string) => {
    const key = `${y}-${x}`;
    const upperValue = value.toUpperCase();
    setUserAnswers((prev) => ({ ...prev, [key]: upperValue }));

    if (upperValue && activeClueNumber) {
        const clue = puzzle?.clues.find(c => c.number === activeClueNumber && c.direction === direction);
        if (!clue) return;
        
        let currentCellIndex = -1;
        let cells = [];
        let curX = clue.x;
        let curY = clue.y;
        for (let i=0; i<clue.answer.length; i++) {
            if(curX === x && curY === y) currentCellIndex = i;
            cells.push({x: curX, y: curY});
            if(clue.direction === 'across') curX++; else curY++;
        }

        if (currentCellIndex !== -1 && currentCellIndex < cells.length - 1) {
            const nextCell = cells[currentCellIndex + 1];
            inputRefs.current[nextCell.y]?.[nextCell.x]?.focus();
        }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, x: number, y: number) => {
    if (e.key === 'Backspace' && !userAnswers[`${y}-${x}`] && activeClueNumber) {
        const clue = puzzle?.clues.find(c => c.number === activeClueNumber && c.direction === direction);
        if (!clue) return;

        let currentCellIndex = -1;
        let cells = [];
        let curX = clue.x;
        let curY = clue.y;
        for (let i=0; i<clue.answer.length; i++) {
            if(curX === x && curY === y) currentCellIndex = i;
            cells.push({x: curX, y: curY});
            if(clue.direction === 'across') curX++; else curY++;
        }

        if (currentCellIndex > 0) {
            const prevCell = cells[currentCellIndex - 1];
            inputRefs.current[prevCell.y]?.[prevCell.x]?.focus();
        }
    }
  };
  
  const checkAnswers = () => {
    if (!puzzle) return;
    const newCellStates: Record<string, 'correct' | 'incorrect'> = {};
    let allCorrect = true;

    for (let y = 0; y < puzzle.gridSize; y++) {
      for (let x = 0; x < puzzle.gridSize; x++) {
        const key = `${y}-${x}`;
        if (grid[y][x].isInput) {
          const userAnswer = userAnswers[key] || '';
          const correctAnswer = grid[y][x].char;
          if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
            newCellStates[key] = 'correct';
          } else {
            newCellStates[key] = 'incorrect';
            allCorrect = false;
          }
        }
      }
    }
    
    setCellStates(newCellStates);
    if (allCorrect) {
      setIsGameWon(true);
    }
  };
  
  if (!puzzle) {
    return null;
  }
  
  const acrossClues = puzzle.clues.filter((c) => c.direction === 'across').sort((a, b) => a.number - b.number);
  const downClues = puzzle.clues.filter((c) => c.direction === 'down').sort((a, b) => a.number - b.number);
  const cellWidth = Math.floor(gridWidth / puzzle.gridSize);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="text-center p-6">
          <div className="flex items-center justify-center gap-4">
            <Puzzle className="h-8 w-8" />
            <CardTitle className="text-3xl font-bold tracking-tight">
              {getUIText('title')}
            </CardTitle>
          </div>
          <p className="text-muted-foreground pt-2">
            {getUIText('description')}
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {isGameWon ? (
            <div className="text-center space-y-4 flex flex-col items-center">
              <Award className="h-24 w-24 text-amber animate-shake" />
              <h2 className="text-2xl font-bold">{getUIText('winTitle')}</h2>
              <p>{getUIText('winDesc')}</p>
              <Button onClick={initializeGame}>{getUIText('playAgain')}</Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
              <div
                ref={gridRef}
                className="grid gap-0 bg-background"
                style={{
                  gridTemplateColumns: `repeat(${puzzle.gridSize}, minmax(0, 1fr))`,
                  width: `${gridWidth}px`,
                }}
              >
                {grid.map((row, y) =>
                  row.map((cell, x) => {
                    const key = `${y}-${x}`;
                    const cellValue = userAnswers[key] || '';
                    const cellStatus = cellStates[key] || 'default';
                    const isActive = activeCell?.x === x && activeCell?.y === y;
                    
                    const isActiveWordCell = activeWordCells.some(c => c.x === x && c.y === y);

                    return (
                      <div
                        key={key}
                        onClick={() => handleClick(x, y)}
                        className={cn(
                            "relative flex items-center justify-center aspect-square",
                            !cell.isInput && 'bg-muted/20',
                            cell.isInput && isActiveWordCell && 'bg-primary/10',
                            isActive && 'bg-amber/20'
                        )}
                      >
                        {cell.number && (
                          <span className="absolute top-0.5 left-0.5 text-xs font-bold text-muted-foreground select-none" style={{fontSize: `${cellWidth * 0.2}px`}}>
                            {cell.number}
                          </span>
                        )}
                        <input
                          ref={(el) => {
                            if (!inputRefs.current[y]) inputRefs.current[y] = [];
                            inputRefs.current[y][x] = el;
                          }}
                          type="text"
                          value={cellValue}
                          maxLength={1}
                          onChange={(e) => handleInputChange(x, y, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, x, y)}
                          onFocus={() => handleFocus(x, y)}
                          disabled={!cell.isInput}
                          className={cn(
                            "w-full h-full text-center font-bold border-2 uppercase transition-colors bg-transparent",
                            "focus:outline-none",
                            cell.isInput ? 'border-primary/30' : 'border-transparent cursor-default',
                            cellStatus === 'correct' && 'border-success bg-success/10 text-success-foreground',
                            cellStatus === 'incorrect' && 'border-destructive bg-destructive/10 text-destructive-foreground'
                          )}
                           style={{
                                fontSize: `${cellWidth * 0.5}px`,
                                lineHeight: `${cellWidth * 0.8}px`,
                            }}
                        />
                      </div>
                    );
                  })
                )}
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="font-bold text-lg">{getUIText('across')}</h3>
                  {acrossClues.map((c) => (
                    <p
                      key={`across-${c.number}`}
                      className={cn(
                        "text-muted-foreground text-sm cursor-pointer hover:text-foreground",
                        activeClueNumber === c.number && direction === 'across' && "text-amber font-bold"
                      )}
                    >
                      {c.number}. {c.clue}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{getUIText('down')}</h3>
                  {downClues.map((c) => (
                    <p
                      key={`down-${c.number}`}
                      className={cn(
                        "text-muted-foreground text-sm cursor-pointer hover:text-foreground",
                        activeClueNumber === c.number && direction === 'down' && "text-amber font-bold"
                      )}
                    >
                      {c.number}. {c.clue}
                    </p>
                  ))}
                </div>
                <div className="pt-4">
                  <Button onClick={checkAnswers}>{getUIText('check')}</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center p-6 border-t">
          <Link href="/games" passHref>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>{getUIText('back')}</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default CrosswordPage;
