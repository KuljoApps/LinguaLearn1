'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Puzzle, Save, Trash2, ClipboardCopy, Settings, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type CrosswordPuzzle, type CrosswordClue } from '@/lib/games/crossword';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getLanguage, type Language } from '@/lib/storage';
import { allCrosswordPuzzles } from '@/lib/games/crossword';

const GRID_WIDTH = 6;
const GRID_HEIGHT = 9;

const initialGrid = () => Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill({ letter: '', number: null }));

type CellState = { letter: string; number: number | null };
type GridState = CellState[][];
type ActiveCell = { row: number; col: number } | null;

interface ClueData {
    clue: string;
    answer: string;
    direction: 'across' | 'down';
    options: string[];
}

const CrosswordGeneratorPage = () => {
    const { toast } = useToast();
    const [grid, setGrid] = useState<GridState>(initialGrid());
    const [activeCell, setActiveCell] = useState<ActiveCell>(null);
    const [clues, setClues] = useState<Map<number, ClueData>>(new Map());
    const [outputJson, setOutputJson] = useState('');
    const [language, setLanguage] = useState<Language>(getLanguage());

    useEffect(() => {
        const handleLanguageChange = () => setLanguage(getLanguage());
        window.addEventListener('language-changed', handleLanguageChange);
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, []);

    const handleCellClick = (row: number, col: number) => {
        setActiveCell({ row, col });
    };

    const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const newGrid = [...grid.map(r => [...r])];
        newGrid[row][col] = { ...newGrid[row][col], letter: e.target.value.toUpperCase().charAt(0) };
        setGrid(newGrid);
    };

    const handleNumberClick = (num: number) => {
        if (!activeCell) return;
        const { row, col } = activeCell;
        const newGrid = [...grid.map(r => [...r])];
        const currentNumber = newGrid[row][col].number;
        newGrid[row][col] = { ...newGrid[row][col], number: currentNumber === num ? null : num };
        
        if (currentNumber === num) {
            const newClues = new Map(clues);
            newClues.delete(num);
            setClues(newClues);
        }

        setGrid(newGrid);
    };

    const handleClueDataChange = (num: number, field: keyof ClueData, value: string | 'across' | 'down' | string[]) => {
        const existingClue = clues.get(num) || { clue: '', answer: '', direction: 'across', options: ['', ''] };
        setClues(new Map(clues).set(num, { ...existingClue, [field]: value }));
    };

    const handleReset = () => {
        setGrid(initialGrid());
        setActiveCell(null);
        setClues(new Map());
        setOutputJson('');
        toast({ title: 'Generator zresetowany', description: 'Wszystkie pola zostały wyczyszczone.' });
    };

    const handleGenerateJson = () => {
        const generatedClues: CrosswordClue[] = [];
        let hasError = false;

        for (let row = 0; row < GRID_HEIGHT; row++) {
            for (let col = 0; col < GRID_WIDTH; col++) {
                const cell = grid[row][col];
                if (cell.number && clues.has(cell.number)) {
                    const clueData = clues.get(cell.number)!;
                    
                    let answer = '';
                    let tempCol = col;
                    let tempRow = row;

                    if (clueData.direction === 'across') {
                        while (tempCol < GRID_WIDTH && grid[row][tempCol].letter) {
                            answer += grid[row][tempCol].letter;
                            tempCol++;
                        }
                    } else {
                        while (tempRow < GRID_HEIGHT && grid[tempRow][col].letter) {
                            answer += grid[tempRow][col].letter;
                            tempRow++;
                        }
                    }

                    if(!answer) {
                        toast({ variant: 'destructive', title: `Błąd w haśle #${cell.number}`, description: 'Pole startowe hasła nie ma litery.'});
                        hasError = true;
                        continue;
                    }
                    
                    generatedClues.push({
                        number: cell.number,
                        clue: clueData.clue,
                        answer,
                        options: [answer, ...clueData.options.filter(o => o.trim() !== '')],
                        x: col,
                        y: row,
                        direction: clueData.direction,
                    });
                }
            }
        }

        if (hasError) return;

        const newPuzzle: CrosswordPuzzle = {
            id: (allCrosswordPuzzles[language]?.length || 0) + 1,
            gridSize: GRID_WIDTH,
            gridHeight: GRID_HEIGHT,
            clues: generatedClues.sort((a,b) => a.number - b.number),
        };

        setOutputJson(JSON.stringify(newPuzzle, null, 2));
        toast({ title: 'JSON wygenerowany!', description: 'Możesz go skopiować i wkleić do pliku z pytaniami.' });
    };

    const handleCopyToClipboard = () => {
        if (!outputJson) return;
        navigator.clipboard.writeText(outputJson);
        toast({ title: 'Skopiowano do schowka!' });
    };
    
    const renderClueEditors = () => {
        const numberedCells = new Set<number>();
        grid.forEach(row => row.forEach(cell => {
            if(cell.number) numberedCells.add(cell.number);
        }));

        if (numberedCells.size === 0) return <p className="text-sm text-muted-foreground text-center">Kliknij na komórkę i dodaj numerek, aby stworzyć hasło.</p>

        return Array.from(numberedCells).sort((a,b) => a - b).map(num => {
            const clueData = clues.get(num) || { clue: '', answer: '', direction: 'across', options: ['', ''] };
            return (
                <div key={num} className="p-3 border rounded-md space-y-2">
                    <Label className="font-bold text-lg">Hasło #{num}</Label>
                    <Input placeholder="Wskazówka (po polsku)" value={clueData.clue} onChange={(e) => handleClueDataChange(num, 'clue', e.target.value)} />
                    <Select value={clueData.direction} onValueChange={(val: 'across' | 'down') => handleClueDataChange(num, 'direction', val)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="across">Poziomo (Across)</SelectItem>
                            <SelectItem value="down">Pionowo (Down)</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="space-y-1 pt-2">
                        <Label className="text-xs text-muted-foreground">Błędne odpowiedzi (opcje do wyboru)</Label>
                        {[0, 1].map(i => (
                            <Input key={i} placeholder={`Opcja ${i + 1}`} value={clueData.options[i]} onChange={(e) => {
                                const newOptions = [...clueData.options];
                                newOptions[i] = e.target.value;
                                handleClueDataChange(num, 'options', newOptions);
                            }} />
                        ))}
                    </div>
                </div>
            )
        });
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-5xl shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Wrench className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">Generator Krzyżówek</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    <div className="md:col-span-1 space-y-4">
                        <Card>
                            <CardHeader className="p-3"><CardTitle className="text-base">1. Wpisz litery i numery</CardTitle></CardHeader>
                            <CardContent className="p-3">
                                <div className="grid bg-background" style={{gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`}}>
                                    {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
                                        <div 
                                            key={`${rowIndex}-${colIndex}`} 
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            className={cn(
                                                "relative w-full aspect-square border",
                                                activeCell?.row === rowIndex && activeCell?.col === colIndex && "ring-2 ring-ring ring-offset-2 z-10"
                                            )}
                                        >
                                            <Input 
                                                type="text"
                                                maxLength={1} 
                                                value={cell.letter}
                                                onChange={(e) => handleLetterChange(e, rowIndex, colIndex)}
                                                className="w-full h-full p-0 text-center text-xl uppercase font-bold bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                            {cell.number && <span className="absolute top-0.5 left-0.5 text-xs font-bold text-muted-foreground">{cell.number}</span>}
                                        </div>
                                    )))}
                                </div>
                                <div className="grid grid-cols-4 gap-2 mt-4">
                                    {Array.from({length: 8}, (_, i) => i + 1).map(num => (
                                        <Button key={num} variant={activeCell && grid[activeCell.row][activeCell.col].number === num ? 'default' : 'outline'} onClick={() => handleNumberClick(num)}>
                                            {num}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <Card>
                            <CardHeader className="p-3"><CardTitle className="text-base">2. Dodaj wskazówki</CardTitle></CardHeader>
                            <CardContent className="p-3 space-y-3 max-h-[60vh] overflow-y-auto">
                                {renderClueEditors()}
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader className="p-3"><CardTitle className="text-base">3. Zapisz i zresetuj</CardTitle></CardHeader>
                             <CardContent className="p-3 space-y-3">
                                <div className="flex gap-2">
                                    <Button className="w-full" onClick={handleGenerateJson}><Save className="mr-2 h-4 w-4"/> Wygeneruj JSON</Button>
                                    <Button variant="destructive" className="w-full" onClick={handleReset}><Trash2 className="mr-2 h-4 w-4"/> Resetuj</Button>
                                </div>
                                {outputJson && (
                                     <div className="relative">
                                         <Textarea value={outputJson} readOnly className="h-48 font-mono text-xs"/>
                                         <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopyToClipboard}><ClipboardCopy className="h-4 w-4" /></Button>
                                     </div>
                                )}
                             </CardContent>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/games" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Powrót do gier</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
};

export default CrosswordGeneratorPage;
