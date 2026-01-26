'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Puzzle, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { allCrosswordPuzzles, type CrosswordPuzzle, type CrosswordClue } from '@/lib/games/crossword';
import { getLanguage, type Language } from '@/lib/storage';

type CellStatus = 'default' | 'correct' | 'incorrect';

interface Cell {
  char: string;
  number: number | null;
  isInput: boolean;
}

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
    const [cellStates, setCellStates] = useState<Record<string, CellStatus>>({});
    const [isGameWon, setIsGameWon] = useState(false);
    const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>([]);
    const [activeClue, setActiveClue] = useState<{ number: number; direction: 'across' | 'down' } | null>(null);

    const generateGrid = useCallback((p: CrosswordPuzzle): Cell[][] => {
        const newGrid: Cell[][] = Array(p.gridSize).fill(null).map(() => Array(p.gridSize).fill(null).map(() => ({ char: '', number: null, isInput: false })));
        p.clues.forEach(clue => {
            let { x, y } = clue;
            if (newGrid[y][x].number === null) {
                newGrid[y][x].number = clue.number;
            }
            for (let i = 0; i < clue.answer.length; i++) {
                if (y < p.gridSize && x < p.gridSize) {
                    newGrid[y][x].isInput = true;
                    newGrid[y][x].char = clue.answer[i];
                    if (clue.direction === 'across') x++; else y++;
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
        setActiveClue(null);
        inputRefs.current = Array(randomPuzzle.gridSize).fill(null).map(() => Array(randomPuzzle.gridSize).fill(null));
    }, [generateGrid]);

    useEffect(() => {
        initializeGame();
        window.addEventListener('language-changed', initializeGame);
        return () => window.removeEventListener('language-changed', initializeGame);
    }, [initializeGame]);

    const getCluesForCell = useCallback((y: number, x: number) => {
        if (!puzzle) return [];
        return puzzle.clues.filter(c => {
            if (c.direction === 'across') {
                return c.y === y && x >= c.x && x < c.x + c.answer.length;
            } else { // down
                return c.x === x && y >= c.y && y < c.y + c.answer.length;
            }
        });
    }, [puzzle]);

    const handleCellClick = useCallback((y: number, x: number) => {
        const cluesForCell = getCluesForCell(y, x);
        if (cluesForCell.length === 0) {
            setActiveClue(null);
            return;
        }

        const acrossClue = cluesForCell.find(c => c.direction === 'across');
        const downClue = cluesForCell.find(c => c.direction === 'down');
        
        if (acrossClue && downClue) { // It's an intersection
            if (activeClue && activeClue.direction === 'across' && activeClue.number === acrossClue.number) {
                // Currently on 'across', switch to 'down'
                setActiveClue({ number: downClue.number, direction: 'down' });
            } else {
                // Default to 'across' or switch from 'down' to 'across'
                setActiveClue({ number: acrossClue.number, direction: 'across' });
            }
        } else if (acrossClue) { // Only an 'across' clue
            setActiveClue({ number: acrossClue.number, direction: 'across' });
        } else if (downClue) { // Only a 'down' clue
            setActiveClue({ number: downClue.number, direction: 'down' });
        }
    }, [getCluesForCell, activeClue]);

    const handleInputChange = (y: number, x: number, value: string) => {
        const upperValue = value.toUpperCase().slice(-1);
        setUserAnswers(prev => ({ ...prev, [`${y}-${x}`]: upperValue }));

        if (upperValue && activeClue && puzzle) {
            const clue = puzzle.clues.find(c => c.number === activeClue.number && c.direction === activeClue.direction);
            if (!clue) return;

            if (activeClue.direction === 'across' && x + 1 < clue.x + clue.answer.length) {
                inputRefs.current[y]?.[x + 1]?.focus();
            } else if (activeClue.direction === 'down' && y + 1 < clue.y + clue.answer.length) {
                inputRefs.current[y + 1]?.[x]?.focus();
            }
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, y: number, x: number) => {
        if (e.key === 'Backspace' && !userAnswers[`${y}-${x}`]) {
            if (activeClue && puzzle) {
                const clue = puzzle.clues.find(c => c.number === activeClue.number && c.direction === activeClue.direction);
                if (!clue) return;

                if (activeClue.direction === 'across' && x > clue.x) {
                    inputRefs.current[y]?.[x - 1]?.focus();
                } else if (activeClue.direction === 'down' && y > clue.y) {
                    inputRefs.current[y - 1]?.[x]?.focus();
                }
            }
        }
    };

    const isCellActive = useCallback((y: number, x: number) => {
        if (!activeClue || !puzzle) return false;
        const clue = puzzle.clues.find(c => c.number === activeClue.number && c.direction === activeClue.direction);
        if (!clue) return false;

        if (clue.direction === 'across') {
            return clue.y === y && x >= clue.x && x < clue.x + clue.answer.length;
        } else { // down
            return clue.x === x && y >= clue.y && y < clue.y + clue.answer.length;
        }
    }, [activeClue, puzzle]);
    
    const checkAnswers = () => {
        if (!puzzle) return;
        const newCellStates: Record<string, CellStatus> = {};
        let allCorrect = true;

        for (const y in inputRefs.current) {
            for (const x in inputRefs.current[y]) {
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
    
    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];
    
    if (!puzzle) {
        return null;
    }

    const acrossClues = puzzle.clues.filter(c => c.direction === 'across').sort((a,b) => a.number - b.number);
    const downClues = puzzle.clues.filter(c => c.direction === 'down').sort((a,b) => a.number - b.number);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="text-center p-6">
          <div className="flex items-center justify-center gap-4">
            <Puzzle className="h-8 w-8" />
            <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
          </div>
          <p className="text-muted-foreground pt-2">{getUIText('description')}</p>
        </CardHeader>
        <CardContent className="p-6">
            {isGameWon ? (
                <div className="text-center space-y-4 flex flex-col items-center">
                    <Award className="h-24 w-24 text-amber animate-shake"/>
                    <h2 className="text-2xl font-bold">{getUIText('winTitle')}</h2>
                    <p>{getUIText('winDesc')}</p>
                    <Button onClick={initializeGame}>{getUIText('playAgain')}</Button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
                    <div className="grid gap-1 bg-background" style={{gridTemplateColumns: `repeat(${puzzle.gridSize}, minmax(0, 1fr))`}}>
                        {grid.map((row, y) => row.map((cell, x) => (
                            <div key={`${y}-${x}`} className="relative" onClick={() => cell.isInput && handleCellClick(y,x)}>
                                {cell.number && <span className="absolute top-0.5 left-0.5 text-xs text-muted-foreground select-none pointer-events-none">{cell.number}</span>}
                                <Input
                                    ref={el => { if(inputRefs.current[y]) inputRefs.current[y][x] = el }}
                                    type="text"
                                    maxLength={1}
                                    className={cn(
                                        "w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-2xl font-bold border-2 rounded-none uppercase disabled:bg-muted disabled:opacity-40 transition-colors",
                                        isCellActive(y,x) ? 'bg-primary/10 border-primary/50' : 'border-input',
                                        cellStates[`${y}-${x}`] === 'correct' && 'border-success bg-success/10 text-success-foreground',
                                        cellStates[`${y}-${x}`] === 'incorrect' && 'border-destructive bg-destructive/10 text-destructive-foreground',
                                        !cell.isInput && 'border-muted/20 bg-muted/20',
                                    )}
                                    disabled={!cell.isInput}
                                    value={userAnswers[`${y}-${x}`] || ''}
                                    onChange={(e) => handleInputChange(y, x, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, y, x)}
                                    onFocus={() => handleCellClick(y,x)}
                                />
                            </div>
                        )))}
                    </div>
                    <div className="space-y-4 flex-1">
                        <div>
                            <h3 className="font-bold text-lg">{getUIText('across')}</h3>
                            {acrossClues.map(c => <p key={`across-${c.number}`} className={cn("text-muted-foreground text-sm", activeClue?.number === c.number && activeClue.direction === 'across' && 'text-primary font-semibold')}>{c.number}. {c.clue}</p>)}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{getUIText('down')}</h3>
                            {downClues.map(c => <p key={`down-${c.number}`} className={cn("text-muted-foreground text-sm", activeClue?.number === c.number && activeClue.direction === 'down' && 'text-primary font-semibold')}>{c.number}. {c.clue}</p>)}
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

    