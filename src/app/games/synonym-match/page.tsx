"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, Clock, ShieldX, CheckCircle, Percent, Trophy, ThumbsUp, Brain, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getLanguage, type Language } from '@/lib/storage';
import { allSynonymQuestions } from '@/lib/games/synonym-match';
import { playSound } from '@/lib/sounds';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);
const GAME_SIZE = 5;
const USED_SYNONYMS_KEY_PREFIX = 'linguaLearnUsedSynonyms_';

const uiTexts = {
    title: { en: 'Synonym Match', fr: 'Jeu des Synonymes', de: 'Synonym-Paare', it: 'Abbinamento Sinonimi', es: 'Coincidencia de Sinónimos' },
    description: { en: 'Match the words with their synonyms.', fr: 'Associez les mots à leurs synonymes.', de: 'Ordne die Wörter ihren Synonymen zu.', it: 'Abbina le parole con i loro sinonimi.', es: 'Empareja las palabras con sus sinónimos.' },
    correctToastTitle: { en: 'Correct!', fr: 'Correct !', de: 'Richtig!', it: 'Corretto!', es: '¡Correcto!' },
    correctToastDesc: { en: '"{word1}" and "{word2}" are synonyms.', fr: '"{word1}" et "{word2}" sont des synonymes.', de: '"{word1}" und "{word2}" sind Synonyme.', it: '"{word1}" e "{word2}" sono sinonimi.', es: '"{word1}" y "{word2}" son sinónimos.' },
    incorrectToastTitle: { en: 'Incorrect', fr: 'Incorrect', de: 'Falsch', it: 'Sbagliato', es: 'Incorrecto' },
    incorrectToastDesc: { en: '"{word1}" and "{word2}" are not synonyms.', fr: '"{word1}" et "{word2}" ne sont pas des synonymes.', de: '"{word1}" und "{word2}" sind keine Synonyme.', it: '"{word1}" e "{word2}" non sono sinonimi.', es: '"{word1}" y "{word2}" no son sinónimos.' },
    winTitle: { en: 'You matched them all!', fr: 'Vous les avez tous trouvés !', de: 'Du hast sie alle gefunden!', it: 'Li hai abbinati tutti!', es: '¡Los has emparejado todos!' },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
    backToGames: { en: 'Back to Game Center', fr: 'Retour au Centre de jeux', de: 'Zurück zur Spielzentrale', it: 'Torna al Centro Giochi', es: 'Volver al Centro de Juegos' },
    summary: { en: 'Summary', fr: 'Résumé', de: 'Zusammenfassung', it: 'Riepilogo', es: 'Resumen' },
    longestStreak: { en: 'Longest Streak', fr: 'Série la plus longue', de: 'Längste Serie', it: 'Serie più lunga', es: 'Racha más larga' },
    mistakes: { en: 'Mistakes', fr: 'Erreurs', de: 'Fehler', it: 'Errori', es: 'Errores' },
    time: { en: 'Time', fr: 'Temps', de: 'Zeit', it: 'Tempo', es: 'Tiempo' },
    successRate: { en: 'Success Rate', fr: 'Taux de réussite', de: 'Erfolgsquote', it: 'Tasso di successo', es: 'Tasa de éxito' },
    worthRepeating: { en: 'Worth repeating', fr: 'À répéter', de: 'Wiederholenswert', it: 'Da ripetere', es: 'Vale la pena repetir' },
    yourAnswer: { en: 'Your pair', fr: 'Votre paire', de: 'Dein Paar', it: 'La tua coppia', es: 'Tu pareja' },
    correctAnswer: { en: 'Correct pair', fr: 'Paire correcte', de: 'Richtiges Paar', it: 'Coppia corretta', es: 'Pareja correcta' },
};

const SynonymMatchPage = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [wordSet, setWordSet] = useState<{ words1: string[], words2: string[], matches: Record<string, string> } | null>(null);
    const [selected1, setSelected1] = useState<string | null>(null);
    const [selected2, setSelected2] = useState<string | null>(null);
    const [correctPairs, setCorrectPairs] = useState<string[]>([]);
    const [incorrectPair, setIncorrectPair] = useState<[string, string] | null>(null);
    const [mistakes, setMistakes] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [gameWonTime, setGameWonTime] = useState<number | null>(null);
    const [sessionErrors, setSessionErrors] = useState<{ word1: string; word2: string; correct: string; count: number }[]>([]);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);

    const { toast } = useToast();

    const totalTime = gameWonTime && startTime ? Math.round((gameWonTime - startTime) / 1000) : 0;
    const successRate = GAME_SIZE + mistakes > 0 ? Math.round((GAME_SIZE / (GAME_SIZE + mistakes)) * 100) : 100;

    const motivationalMessage = useMemo(() => {
        if (successRate === 100) {
            return {
                icon: <Trophy className="h-16 w-16 text-amber animate-shake" />,
                title: 'Perfect Match!',
            };
        }
        if (successRate >= 80) {
            return {
                icon: <ThumbsUp className="h-16 w-16 text-primary" />,
                title: 'Great Job!',
            };
        }
        return {
            icon: <Brain className="h-16 w-16 text-muted-foreground" />,
            title: 'Good Effort!',
        };
    }, [successRate]);


    const getUIText = (key: keyof typeof uiTexts, replacements: Record<string, string> = {}) => {
      let text = uiTexts[key][language] || uiTexts[key]['en'];
      for (const placeholder in replacements) {
          text = text.replace(`{${placeholder}}`, replacements[placeholder]);
      }
      return text;
    };

    const setupNewGame = useCallback((lang: Language) => {
        const STORAGE_KEY = `${USED_SYNONYMS_KEY_PREFIX}${lang}`;
        const allPairsForLang = allSynonymQuestions[lang];
        
        let usedWords: string[] = [];
        try {
            const usedWordsJson = localStorage.getItem(STORAGE_KEY);
            usedWords = usedWordsJson ? JSON.parse(usedWordsJson) : [];
        } catch (e) {
            console.error("Failed to parse used synonyms", e);
            usedWords = [];
        }

        let availablePairs = allPairsForLang.filter(p => !usedWords.includes(p.word1));

        if (availablePairs.length < GAME_SIZE) {
            availablePairs = allPairsForLang;
            usedWords = [];
            localStorage.removeItem(STORAGE_KEY);
        }

        const gamePairs = shuffle(availablePairs).slice(0, GAME_SIZE);
        const newUsedWords = [...usedWords, ...gamePairs.map(p => p.word1)];
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsedWords));
        } catch (e) {
            console.error("Failed to save used synonyms", e);
        }

        const words1 = shuffle(gamePairs.map(p => p.word1));
        const words2 = shuffle(gamePairs.map(p => p.word2));
        
        const matches: Record<string, string> = {};
        gamePairs.forEach(p => {
            matches[p.word1] = p.word2;
            matches[p.word2] = p.word1;
        });

        setWordSet({ words1, words2, matches });
        setSelected1(null);
        setSelected2(null);
        setCorrectPairs([]);
        setIncorrectPair(null);
        setMistakes(0);
        setStartTime(Date.now());
        setGameWonTime(null);
        setSessionErrors([]);
        setCurrentStreak(0);
        setMaxStreak(0);
    }, []);

    useEffect(() => {
        const handleLanguageChange = () => {
            const newLang = getLanguage();
            setLanguage(newLang);
            setupNewGame(newLang);
        };
        
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);
        
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, [setupNewGame]);

    useEffect(() => {
        if (correctPairs.length > 0 && correctPairs.length === GAME_SIZE * 2 && !gameWonTime) {
            setGameWonTime(Date.now());
            playSound('achievement');
            setMaxStreak(prev => Math.max(prev, currentStreak));
        }
    }, [correctPairs, gameWonTime, currentStreak]);

    const handleSelect1 = (word: string) => {
        if (correctPairs.includes(word) || incorrectPair) return;
        if (selected1 === word) {
            setSelected1(null);
        } else {
            setSelected1(word);
        }
    };

    const handleSelect2 = (word: string) => {
        if (correctPairs.includes(word) || !selected1 || incorrectPair) return;
        
        setIncorrectPair([selected1, word]);

        if (wordSet && wordSet.matches[selected1] === word) {
            // Correct match
            setTimeout(() => {
                setCorrectPairs(prev => [...prev, selected1, word]);
                toast({ title: getUIText('correctToastTitle'), description: getUIText('correctToastDesc', { word1: selected1, word2: word }), duration: 2000 });
                setSelected1(null);
                setIncorrectPair(null);
                setCurrentStreak(prev => prev + 1);
            }, 150);
        } else {
            // Incorrect match
            setMaxStreak(prev => Math.max(prev, currentStreak));
            setCurrentStreak(0);
            setMistakes(prev => prev + 1);
            if(wordSet) {
              const correctSynonym = wordSet.matches[selected1!];
              setSessionErrors(prevErrors => {
                  const existingErrorIndex = prevErrors.findIndex(e => e.word1 === selected1 && e.word2 === word);
                  if (existingErrorIndex > -1) {
                      const updatedErrors = [...prevErrors];
                      updatedErrors[existingErrorIndex].count++;
                      return updatedErrors;
                  }
                  return [...prevErrors, { word1: selected1!, word2: word, correct: correctSynonym, count: 1 }];
              });
            }
            toast({ variant: "destructive", title: getUIText('incorrectToastTitle'), description: getUIText('incorrectToastDesc', { word1: selected1, word2: word }), duration: 2000 });
            setTimeout(() => {
                setSelected1(null);
                setIncorrectPair(null);
            }, 800);
        }
    };

    if (!wordSet) {
        return null;
    }
    
    const isGameWon = !!gameWonTime;

    const getButtonClasses = (word: string, isColumn1: boolean) => {
        const isSelected = isColumn1 ? selected1 === word : false;
        const isCorrect = correctPairs.includes(word);
        const isIncorrect = incorrectPair?.includes(word) ?? false;
        
        if(isCorrect) return "bg-success/20 text-muted-foreground line-through pointer-events-none";
        if(isIncorrect) return "bg-destructive/80 text-destructive-foreground border-destructive";
        if(isSelected) return "border-primary border-2 ring-2 ring-primary/50";
        
        return "h-16 text-lg transition-all duration-150";
    };
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                 {!isGameWon && (
                    <CardHeader className="text-center p-6">
                        <div className="flex items-center justify-center gap-4">
                            <ArrowRightLeft className="h-8 w-8" />
                            <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                        </div>
                    </CardHeader>
                )}
                <CardContent className="p-6 pt-0 space-y-8">
                    {isGameWon ? (
                        <div className="space-y-4 pt-6">
                            <div className="text-center space-y-2 flex flex-col items-center">
                                {motivationalMessage.icon}
                                <h2 className="text-2xl font-bold text-success">{getUIText('winTitle')}</h2>
                            </div>
                            <Card className="bg-muted/50">
                                <CardHeader className="pb-2"><CardTitle className="text-xl text-center">{getUIText('summary')}</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 text-center">
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-primary"/><span className="text-2xl font-bold">{maxStreak}</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('longestStreak')}</span>
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
                            {sessionErrors.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-center font-semibold">{getUIText('worthRepeating')}</h3>
                                    <ScrollArea className="h-24 w-full rounded-md border p-2">
                                        <div className="space-y-2">
                                            {sessionErrors.map((error, index) => (
                                                <React.Fragment key={index}>
                                                    <div className="text-sm p-2 bg-muted/30 rounded-md">
                                                        <div className="flex justify-between items-center">
                                                            <p><span className="text-destructive">{getUIText('yourAnswer')}:</span> {error.word1} & {error.word2}</p>
                                                            {error.count > 1 && (
                                                                <span className="text-xs font-mono bg-destructive/20 text-destructive-foreground rounded-full px-1.5 py-0.5">{error.count}x</span>
                                                            )}
                                                        </div>
                                                        <p><span className="text-success">{getUIText('correctAnswer')}:</span> {error.word1} & {error.correct}</p>
                                                    </div>
                                                    {index < sessionErrors.length - 1 && <Separator />}
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
                         <p className="text-muted-foreground text-center pb-4 pt-2">{getUIText('description')}</p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4">
                                {wordSet.words1.map(word => (
                                    <Button
                                        key={word}
                                        variant="outline"
                                        className={getButtonClasses(word, true)}
                                        onClick={() => handleSelect1(word)}
                                    >
                                        {word}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                {wordSet.words2.map(word => (
                                    <Button
                                        key={word}
                                        variant="outline"
                                        className={getButtonClasses(word, false)}
                                        onClick={() => handleSelect2(word)}
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
