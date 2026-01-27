"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, Clock, ShieldX, Percent, Trophy, ThumbsUp, Brain, Flame, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getLanguage, type Language } from '@/lib/storage';
import { allSynonymQuestions, type SynonymPair } from '@/lib/games/synonym-match';
import { playSound } from '@/lib/sounds';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const TOTAL_PAIRS = 12;
const BOARD_SIZE = 5;
const USED_SYNONYMS_KEY_PREFIX = 'linguaLearnUsedSynonyms_';

type SessionError = {
    word1: string;
    word2: string;
    correct: string;
    count: number;
};

const uiTexts = {
    title: { en: 'Synonym Match', fr: 'Jeu des Synonymes', de: 'Synonym-Paare', it: 'Abbinamento Sinonimi', es: 'Coincidencia de Sinónimos' },
    description: { en: 'Match the words with their synonyms.', fr: 'Associez les mots à leurs synonymes.', de: 'Ordne die Wörter ihren Synonymen zu.', it: 'Abbina le parole con i loro sinonimi.', es: 'Empareja las palabras con sus sinónimos.' },
    incorrectToastTitle: { en: 'Incorrect', fr: 'Incorrect', de: 'Falsch', it: 'Sbagliato', es: 'Incorrecto' },
    incorrectToastDesc: { en: '"{word1}" and "{word2}" are not synonyms.', fr: '"{word1}" et "{word2}" ne sont pas des synonymes.', de: '"{word1}" und "{word2}" sind keine Synonyme.', it: '"{word1}" e "{word2}" non sono sinonimi.', es: '"{word1}" y "{word2}" no son sinónimos.' },
    winTitle: { en: 'You matched them all!', fr: 'Vous les avez tous trouvés !', de: 'Du hast sie alle gefunden!', it: 'Li hai abbinati tutti!', es: '¡Los has emparejado todos!' },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
    backToGames: { en: 'Back to Game Center', fr: 'Retour au Centre de jeux', de: 'Zurück zur Spielzentrale', it: 'Torna al Centro Giochi', es: 'Volver al Centro de Juegos' },
    summary: { en: 'Summary', fr: 'Résumé', de: 'Zusammenfassung', it: 'Riepilogo', es: 'Resumen' },
    streak: { en: 'Best Streak', fr: 'Meilleure Série', de: 'Beste Serie', it: 'Miglior Serie', es: 'Mejor Racha' },
    mistakes: { en: 'Mistakes', fr: 'Erreurs', de: 'Fehler', it: 'Errori', es: 'Errores' },
    time: { en: 'Time', fr: 'Temps', de: 'Zeit', it: 'Tempo', es: 'Tiempo' },
    successRate: { en: 'Success Rate', fr: 'Taux de réussite', de: 'Erfolgsquote', it: 'Tasso di successo', es: 'Tasa de éxito' },
    worthRepeating: { en: 'Worth repeating', fr: 'À répéter', de: 'Wiederholenswert', it: 'Da ripetere', es: 'Vale la pena repetir' },
    yourAnswer: { en: 'Your pair', fr: 'Votre paire', de: 'Dein Paar', it: 'La tua coppia', es: 'Tu pareja' },
    correctAnswer: { en: 'Correct pair', fr: 'Paire correcte', de: 'Richtiges Paar', it: 'Coppia corretta', es: 'Pareja correcta' },
};

const SynonymMatchPage = () => {
    const [language, setLanguage] = useState<Language>('en');
    
    // Game state
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [deck, setDeck] = useState<SynonymPair[]>([]);
    const [activeWords1, setActiveWords1] = useState<string[]>([]);
    const [activeWords2, setActiveWords2] = useState<string[]>([]);
    
    const [selected1, setSelected1] = useState<string | null>(null);
    const [selected2, setSelected2] = useState<string | null>(null);
    const [correctPairs, setCorrectPairs] = useState<string[]>([]);
    const [incorrectPair, setIncorrectPair] = useState<[string, string] | null>(null);
    
    const [isFrozen, setIsFrozen] = useState(false);
    const [stage, setStage] = useState(0);

    // Stats
    const [mistakes, setMistakes] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [gameWonTime, setGameWonTime] = useState<number | null>(null);
    const [sessionErrors, setSessionErrors] = useState<Map<string, SessionError>>(new Map());
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    const gameContainerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef(new Map<string, HTMLButtonElement | null>());

    const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; key: string }[]>([]);

    const { toast } = useToast();
    
    const aggregatedErrors = useMemo(() => Array.from(sessionErrors.values()), [sessionErrors]);
    const totalTime = gameWonTime && startTime ? Math.round((gameWonTime - startTime) / 1000) : 0;
    const successRate = TOTAL_PAIRS + mistakes > 0 ? Math.round((TOTAL_PAIRS / (TOTAL_PAIRS + mistakes)) * 100) : 0;

    const motivationalMessage = useMemo(() => {
        if (successRate === 100) return { icon: <Trophy className="h-16 w-16 text-amber animate-shake" />, title: 'Perfect Match!' };
        if (successRate >= 80) return { icon: <ThumbsUp className="h-16 w-16 text-primary" />, title: 'Great Job!' };
        return { icon: <Brain className="h-16 w-16 text-muted-foreground" />, title: 'Good Effort!' };
    }, [successRate]);


    const getUIText = (key: keyof typeof uiTexts, replacements: Record<string, string | number> = {}) => {
        let text = uiTexts[key][language] || uiTexts[key]['en'];
        for (const placeholder in replacements) {
            text = text.replace(`{${placeholder}}`, String(replacements[placeholder]));
        }
        return text;
    };
    
    const showRemixToast = useCallback(() => {
        toast({
            title: (
                <div className="flex items-center gap-3">
                    <Shuffle className="h-8 w-8 text-amber" />
                    <span className="text-xl font-bold">Shuffle Time!</span>
                </div>
            ),
            description: "New words are entering the board.",
            duration: 2000,
        });
    }, [toast]);
    
    const setupNewGame = useCallback((lang: Language) => {
        const STORAGE_KEY = `${USED_SYNONYMS_KEY_PREFIX}${lang}`;
        const allPairsForLang = allSynonymQuestions[lang];
        
        let usedWords: string[] = [];
        try {
            const usedWordsJson = localStorage.getItem(STORAGE_KEY);
            usedWords = usedWordsJson ? JSON.parse(usedWordsJson) : [];
        } catch (e) { console.error("Failed to parse used synonyms", e); usedWords = []; }

        let availablePairs = allPairsForLang.filter(p => !usedWords.includes(p.word1));

        if (availablePairs.length < TOTAL_PAIRS) {
            availablePairs = allPairsForLang;
            usedWords = [];
            localStorage.removeItem(STORAGE_KEY);
        }

        const gamePairs = shuffle(availablePairs).slice(0, TOTAL_PAIRS);
        const newUsedWords = [...usedWords, ...gamePairs.map(p => p.word1)];
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsedWords)); } catch (e) { console.error("Failed to save used synonyms", e); }
        
        const newMatches: Record<string, string> = {};
        gamePairs.forEach(p => { newMatches[p.word1] = p.word2; newMatches[p.word2] = p.word1; });
        
        const initialBoardPairs = gamePairs.slice(0, BOARD_SIZE);
        const initialDeck = gamePairs.slice(BOARD_SIZE);

        setMatches(newMatches);
        setDeck(initialDeck);
        setActiveWords1(shuffle(initialBoardPairs.map(p => p.word1)));
        setActiveWords2(shuffle(initialBoardPairs.map(p => p.word2)));

        setStage(0);
        setSelected1(null);
        setSelected2(null);
        setCorrectPairs([]);
        setIncorrectPair(null);
        setMistakes(0);
        setStartTime(Date.now());
        setGameWonTime(null);
        setSessionErrors(new Map());
        setLines([]);
        setCurrentStreak(0);
        setLongestStreak(0);
        setIsFrozen(false);
    }, []);

    useEffect(() => {
        const handleLanguageChange = () => { const newLang = getLanguage(); setLanguage(newLang); setupNewGame(newLang); };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, [setupNewGame]);

    useEffect(() => {
        if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
        }
    }, [currentStreak, longestStreak]);

    useEffect(() => {
        if (correctPairs.length > 0 && correctPairs.length === TOTAL_PAIRS * 2 && !gameWonTime) {
            setGameWonTime(Date.now());
            playSound('achievement');
        }
    }, [correctPairs, gameWonTime]);
    
    const handleShuffle = useCallback((numToTake: number) => {
        const currentlyMatchedWords = new Set(correctPairs);
        const currentBoardWords = [...activeWords1, ...activeWords2];
        const unmatchedWordsOnBoard = currentBoardWords.filter(w => !currentlyMatchedWords.has(w));

        const remainingPairsOnBoard: SynonymPair[] = [];
        const seenWords = new Set();
        for (const word of unmatchedWordsOnBoard) {
            if (!seenWords.has(word)) {
                const partner = matches[word];
                if (unmatchedWordsOnBoard.includes(partner)) {
                    remainingPairsOnBoard.push({ word1: word, word2: partner });
                    seenWords.add(word);
                    seenWords.add(partner);
                }
            }
        }
        
        const newPairsFromDeck = deck.slice(0, numToTake);
        const remainingDeck = deck.slice(numToTake);
        const nextBoardPairs = [...remainingPairsOnBoard, ...newPairsFromDeck];
        
        setActiveWords1(shuffle(nextBoardPairs.map(p => p.word1)));
        setActiveWords2(shuffle(nextBoardPairs.map(p => p.word2)));
        setDeck(remainingDeck);
        setStage(prev => prev + 1);
        setSelected1(null);
        setSelected2(null);

        setIsFrozen(true);
        showRemixToast();
        setTimeout(() => {
            setIsFrozen(false);
        }, 1000); // Animation duration
    }, [correctPairs, activeWords1, activeWords2, deck, matches, showRemixToast]);
    
    useEffect(() => {
        const correctPairCount = correctPairs.length / 2;
    
        const checkAndShuffle = (requiredCount: number, numToTake: number) => {
            if (correctPairCount === requiredCount) {
                setTimeout(() => handleShuffle(numToTake), 1000);
            }
        };
    
        if (!isFrozen) {
            if (stage === 0) checkAndShuffle(3, 3);
            else if (stage === 1) checkAndShuffle(6, 4);
        }
    
    }, [correctPairs.length, isFrozen, stage, handleShuffle]);

    useEffect(() => {
        if (!gameContainerRef.current) return;

        const newLines: typeof lines = [];
        const containerRect = gameContainerRef.current.getBoundingClientRect();

        for (let i = 0; i < correctPairs.length; i += 2) {
            const word1 = correctPairs[i];
            const word2 = correctPairs[i + 1];

            if (!word1 || !word2) continue;

            const btn1 = buttonRefs.current.get(word1);
            const btn2 = buttonRefs.current.get(word2);

            if (btn1 && btn2) {
                const rect1 = btn1.getBoundingClientRect();
                const rect2 = btn2.getBoundingClientRect();

                const p1 = {
                    x: (rect1.left < rect2.left ? rect1.right : rect1.left) - containerRect.left,
                    y: rect1.top + rect1.height / 2 - containerRect.top,
                };
                const p2 = {
                    x: (rect2.left < rect1.left ? rect2.right : rect2.left) - containerRect.left,
                    y: rect2.top + rect2.height / 2 - containerRect.top,
                };
                
                newLines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, key: `${word1}-${word2}` });
            }
        }
        setLines(newLines);

    }, [correctPairs, activeWords1, activeWords2]);


    const handleSelect1 = (word: string) => {
        if (correctPairs.includes(word) || incorrectPair || isFrozen) return;
        setSelected1(prev => prev === word ? null : word);
    };

    const handleSelect2 = (word: string) => {
        if (correctPairs.includes(word) || !selected1 || incorrectPair || isFrozen) return;
        setSelected2(word);

        if (matches && matches[selected1] === word) {
            playSound('correct');
            setCorrectPairs(prev => [...prev, selected1, word]);
            setCurrentStreak(prev => prev + 1);
            setSelected1(null);
            setSelected2(null);
        } else {
            setIncorrectPair([selected1, word]);
            setMistakes(prev => prev + 1);
            setCurrentStreak(0);
            if(matches) {
              const errorKey = [selected1!, word].sort().join('-');
              setSessionErrors(prev => {
                const newErrors = new Map(prev);
                const existingError = newErrors.get(errorKey);
                if(existingError) {
                  existingError.count++;
                } else {
                  newErrors.set(errorKey, { word1: selected1!, word2: word, correct: matches[selected1!], count: 1 });
                }
                return newErrors;
              });
            }
            toast({ variant: "destructive", title: getUIText('incorrectToastTitle'), description: getUIText('incorrectToastDesc', { word1: selected1, word2: word }), duration: 2000 });
            setTimeout(() => {
                setSelected1(null);
                setSelected2(null);
                setIncorrectPair(null);
            }, 800);
        }
    };
    
    const isGameWon = !!gameWonTime;

    const getButtonClasses = (word: string, isColumn1: boolean) => {
        const isSelected = isColumn1 ? selected1 === word : selected2 === word;
        const isCorrect = correctPairs.includes(word);
        const isIncorrect = incorrectPair?.includes(word) ?? false;
        
        return cn(
            "h-16 text-lg transition-colors duration-150",
            isFrozen && !isCorrect && "animate-shuffle-blur-spin",
            isSelected && !isIncorrect && "border-primary border-2 ring-2 ring-primary/50",
            isCorrect && "bg-success/20 text-muted-foreground line-through disabled:opacity-100",
            isIncorrect && "bg-destructive/80 text-destructive-foreground border-destructive disabled:opacity-100"
        );
    };
    
    const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

    if (!activeWords1.length) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                 <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <ArrowRightLeft className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-8">
                    {isGameWon ? (
                        <div className="space-y-4">
                            <div className="text-center space-y-2 flex flex-col items-center">
                                {motivationalMessage.icon}
                                <h2 className="text-2xl font-bold text-success">{getUIText('winTitle')}</h2>
                            </div>
                            <Card className="bg-muted/50">
                                <CardHeader className="pb-2 pt-4"><CardTitle className="text-xl text-center">{getUIText('summary')}</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 text-center">
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-amber"/><span className="text-2xl font-bold">{longestStreak}</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('streak')}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><ShieldX className="h-4 w-4 text-destructive"/><span className="text-2xl font-bold">{mistakes}</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('mistakes')}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground"/><span className="text-2xl font-bold">{formatTime(totalTime)}</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('time')}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><Percent className="h-4 w-4 text-amber"/><span className="text-2xl font-bold">{successRate}%</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('successRate')}</span>
                                    </div>
                                </CardContent>
                            </Card>
                            {aggregatedErrors.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-center font-semibold">{getUIText('worthRepeating')}</h3>
                                    <ScrollArea className="h-24 w-full rounded-md border p-2">
                                        <div className="space-y-2">
                                            {aggregatedErrors.map((error, index) => (
                                                <React.Fragment key={index}>
                                                    <div className="text-sm p-2 bg-muted/30 rounded-md">
                                                        <p className="flex justify-between items-start">
                                                            <span><span className="text-destructive">{getUIText('yourAnswer')}:</span> {error.word1} & {error.word2}</span>
                                                            {error.count > 1 && <span className="text-xs font-bold text-destructive bg-destructive/20 px-1.5 py-0.5 rounded-full ml-2">x{error.count}</span>}
                                                        </p>
                                                        <p><span className="text-success">{getUIText('correctAnswer')}:</span> {error.word1} & {error.correct}</p>
                                                    </div>
                                                    {index < aggregatedErrors.length - 1 && <Separator />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}
                             <div className="text-center pt-2">
                                <Button onClick={() => setupNewGame(language)}>{getUIText('playAgain')}</Button>
                             </div>
                        </div>
                    ) : (
                        <>
                         <p className="text-muted-foreground pt-2 text-center pb-0">{getUIText('description')}</p>
                        <div ref={gameContainerRef} className="relative grid grid-cols-2 gap-8">
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                                {lines.map(line => (
                                    <line
                                        key={line.key}
                                        x1={line.x1}
                                        y1={line.y1}
                                        x2={line.x2}
                                        y2={line.y2}
                                        stroke="hsl(var(--success))"
                                        strokeWidth="1.5"
                                        className="animate-draw-line"
                                    />
                                ))}
                            </svg>
                            <div className="flex flex-col gap-4">
                                {activeWords1.map(word => (
                                    <Button
                                        key={word}
                                        ref={(el) => { buttonRefs.current.set(word, el); }}
                                        variant="outline"
                                        className={getButtonClasses(word, true)}
                                        onClick={() => handleSelect1(word)}
                                        disabled={correctPairs.includes(word) || !!incorrectPair || isFrozen}
                                    >
                                        {word}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                {activeWords2.map(word => (
                                    <Button
                                        key={word}
                                        ref={(el) => { buttonRefs.current.set(word, el); }}
                                        variant="outline"
                                        className={getButtonClasses(word, false)}
                                        onClick={() => handleSelect2(word)}
                                        disabled={!selected1 || correctPairs.includes(word) || !!incorrectPair || isFrozen}
                                    >
                                        {word}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/games" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>{getUIText('backToGames')}</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
};

export default SynonymMatchPage;
