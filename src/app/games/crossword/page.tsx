'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Puzzle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allCrosswordPuzzles, type CrosswordPuzzle, type CrosswordClue } from '@/lib/games/crossword';
import { getLanguage, type Language } from '@/lib/storage';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
    const [popoverStates, setPopoverStates] = useState<Record<number, boolean>>({});
    const [shuffledOptions, setShuffledOptions] = useState<Record<number, string[]>>({});

    const generateGrid = useCallback((p: CrosswordPuzzle): Cell[][] => {
        const newGrid: Cell[][] = Array(p.gridSize).fill(null).map(() => Array(p.gridSize).fill(null).map(() => ({ char: '', number: null, isInput: false })));
        p.clues.forEach(clue => {
            let { x, y } = clue;
            
            // Prevent out-of-bounds access at the start
            if (y >= p.gridSize || x >= p.gridSize) {
                console.error(`Clue ${clue.number} starting at (${x},${y}) is out of bounds for grid size ${p.gridSize}.`);
                return; // Skip this clue to prevent crash
            }

            if (newGrid[y][x].number === null) {
                newGrid[y][x].number = clue.number;
            }
            for (let i = 0; i < clue.answer.length; i++) {
                // Check bounds inside the loop *before* accessing the grid
                if (y < p.gridSize && x < p.gridSize) {
                    newGrid[y][x].isInput = true;
                    newGrid[y][x].char = clue.answer[i];
                    if (clue.direction === 'across') x++; else y++;
                } else {
                    console.error(`Clue '${clue.answer}' goes out of bounds.`);
                    break;
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
        setPopoverStates({});
        setShuffledOptions({});
    }, [generateGrid]);

    useEffect(() => {
        initializeGame();
        window.addEventListener('language-changed', initializeGame);
        return () => window.removeEventListener('language-changed', initializeGame);
    }, [initializeGame]);
    
    const handleTriggerClick = (clueNumber: number, options: string[]) => {
        setShuffledOptions(prev => ({
            ...prev,
            [clueNumber]: [...options].sort(() => Math.random() - 0.5)
        }));
    };

    const handleOptionSelect = (clue: CrosswordClue, selectedWord: string) => {
        const newAnswers = { ...userAnswers };
        let { x, y } = clue;
        for (let i = 0; i < selectedWord.length; i++) {
            const key = `${y}-${x}`;
            newAnswers[key] = selectedWord[i].toUpperCase();
            if (clue.direction === 'across') x++;
            else y++;
        }
        setUserAnswers(newAnswers);
        setPopoverStates(prev => ({ ...prev, [clue.number]: false }));
    };

    const checkAnswers = () => {
        if (!puzzle) return;
        const newCellStates: Record<string, CellStatus> = {};
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
                        <div className="grid bg-background" style={{gridTemplateColumns: `repeat(${puzzle.gridSize}, minmax(0, 1fr))`}}>
                            {grid.map((row, y) => row.map((cell, x) => {
                                const key = `${y}-${x}`;
                                const startingClue = puzzle.clues.find(c => c.x === x && c.y === y);
                                const cellValue = userAnswers[key] || '';
                                const cellStatus = cellStates[key] || 'default';
                                
                                if (startingClue) {
                                    return (
                                        <Popover key={key} open={popoverStates[startingClue.number]} onOpenChange={(isOpen) => setPopoverStates(prev => ({...prev, [startingClue.number]: isOpen}))}>
                                            <PopoverTrigger asChild>
                                                <button
                                                    disabled={!cell.isInput}
                                                    onClick={() => handleTriggerClick(startingClue.number, startingClue.options)}
                                                    className={cn(
                                                        "relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-2xl font-bold border rounded-none uppercase transition-colors",
                                                        !cell.isInput && 'border-muted/20 bg-muted/20 cursor-default',
                                                        cell.isInput && 'border-primary bg-primary/10 cursor-pointer hover:bg-primary/20',
                                                        cellStatus === 'correct' && 'border-success bg-success/10 text-success-foreground',
                                                        cellStatus === 'incorrect' && 'border-destructive bg-destructive/10 text-destructive-foreground',
                                                    )}
                                                >
                                                    <span className="absolute top-0.5 left-0.5 text-xs font-bold text-muted-foreground select-none">{cell.number}</span>
                                                    {cellValue}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-2">
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold">{startingClue.clue}</p>
                                                    <div className="flex flex-col gap-1">
                                                        {(shuffledOptions[startingClue.number] || []).map(option => (
                                                            <Button
                                                                key={option}
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleOptionSelect(startingClue, option)}
                                                            >
                                                                {option}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }

                                return (
                                    <div key={key} className={cn(
                                        "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-2xl font-bold border rounded-none uppercase",
                                        !cell.isInput && 'border-muted/20 bg-muted/20',
                                        cell.isInput && 'border-input',
                                        cellStatus === 'correct' && 'border-success bg-success/10 text-success-foreground',
                                        cellStatus === 'incorrect' && 'border-destructive bg-destructive/10 text-destructive-foreground',
                                    )}>
                                        {cellValue}
                                    </div>
                                );
                            }))}
                        </div>
                        <div className="space-y-4 flex-1">
                            <div>
                                <h3 className="font-bold text-lg">{getUIText('across')}</h3>
                                {acrossClues.map(c => <p key={`across-${c.number}`} className="text-muted-foreground text-sm">{c.number}. {c.clue}</p>)}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{getUIText('down')}</h3>
                                {downClues.map(c => <p key={`down-${c.number}`} className="text-muted-foreground text-sm">{c.number}. {c.clue}</p>)}
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
