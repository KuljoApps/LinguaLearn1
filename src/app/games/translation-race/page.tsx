"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Timer, Play, SkipForward, FlagOff, Zap, Brain, ThumbsUp, Trophy, ShieldX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getLanguage, type Language } from '@/lib/storage';
import { allTranslationRaceWords, type TranslationPair } from '@/lib/games/translation-race';
import { playSound } from '@/lib/sounds';
import { vibrate } from '@/lib/vibrations';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import TimerRing from '@/components/TimerRing';
import TallyScore from '@/components/TallyScore';

const GAME_DURATION = 60; // seconds

const uiTexts = {
    title: { en: 'Translation Race', fr: 'Course de Traduction', de: 'Übersetzungsrennen', it: 'Gara di Traduzione', es: 'Carrera de Traducción' },
    description: {
        en: 'Translate as many words as you can in 60 seconds.',
        fr: 'Traduisez autant de mots que possible en 60 secondes.',
        de: 'Übersetze so viele Wörter wie möglich in 60 Sekunden.',
        it: 'Traduci quante più parole possibili in 60 secondi.',
        es: 'Traduce tantas palabras como puedas en 60 segundos.'
    },
    startGame: { en: 'Start Game', fr: 'Démarrer le jeu', de: 'Spiel starten', it: 'Inizia il gioco', es: 'Empezar juego' },
    timesUp: { en: 'Time\'s up!', fr: 'Le temps est écoulé !', de: 'Die Zeit ist um!', it: 'Tempo scaduto!', es: '¡Se acabó el tiempo!' },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
    timeLeft: { en: 'Time Left', fr: 'Temps restant', de: 'Verbleibende Zeit', it: 'Tempo rimasto', es: 'Tiempo restante' },
    score: { en: 'Score', fr: 'Score', de: 'Punkte', it: 'Punteggio', es: 'Puntuación' },
    translateWord: { en: 'Translate the word:', fr: 'Traduisez le mot :', de: 'Übersetze das Wort:', it: 'Traduci la parola:', es: 'Traduce la palabra:' },
    placeholder: { en: 'Type translation in Polish...', fr: 'Tapez la traduction en polonais...', de: 'Gib die polnische Übersetzung ein...', it: 'Scrivi la traduzione in polacco...', es: 'Escribe la traducción en polaco...' },
    back: { en: 'Back to Game Center', fr: 'Retour aux Jeux', de: 'Zurück zur Spielzentrale', it: 'Torna ai Giochi', es: 'Volver a Juegos' },
    summary: { en: 'Summary', fr: 'Résumé', de: 'Zusammenfassung', it: 'Riepilogo', es: 'Resumen' },
    wpm: { en: 'Words per minute', fr: 'Mots par minute', de: 'Wörter pro Minute', it: 'Parole al minuto', es: 'Palabras por minuto' },
    skips: { en: 'Skips Used', fr: 'Passes utilisées', de: 'Übersprungen', it: 'Salti usati', es: 'Saltos usados' },
    skippedWord: { en: 'Skipped word', fr: 'Mot passé', de: 'Übersprungenes Wort', it: 'Parola saltata', es: 'Palabra saltada' },
    finalScore: { en: 'Final Score', fr: 'Score Final', de: 'Endergebnis', it: 'Punteggio Finale', es: 'Puntuación Final' },
    surrender: { en: 'Surrender', fr: 'Abandonner', de: 'Aufgeben', it: 'Arrendersi', es: 'Rendirse' },
};

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const TranslationRacePage = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [wordSet, setWordSet] = useState<TranslationPair[]>(allTranslationRaceWords.en);
    const [currentWord, setCurrentWord] = useState<TranslationPair | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
    const [skipsLeft, setSkipsLeft] = useState(3);
    const [sessionSkippedWords, setSessionSkippedWords] = useState<TranslationPair[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);

    const getNextWord = useCallback(() => {
        const availableWords = wordSet.filter(w => !usedWords.has(w.native));
        if (availableWords.length === 0) {
            setUsedWords(new Set()); // Reset if all words are used
            const newWordSet = shuffle(wordSet);
            setWordSet(newWordSet);
            const firstWord = newWordSet[0];
            setUsedWords(new Set([firstWord.native]));
            return firstWord;
        }
        const nextWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        setUsedWords(prev => new Set(prev).add(nextWord.native));
        return nextWord;
    }, [wordSet, usedWords]);

    const setupNewGame = useCallback(() => {
        const currentLang = getLanguage();
        setLanguage(currentLang);
        const newWordSet = shuffle(allTranslationRaceWords[currentLang]);
        setWordSet(newWordSet);
        
        setUsedWords(new Set());
        const firstWord = newWordSet[0];
        setUsedWords(new Set([firstWord.native]));

        setCurrentWord(firstWord);
        setTimeLeft(GAME_DURATION);
        setScore(0);
        setIsActive(true);
        setInputValue('');
        setSkipsLeft(3);
        setSessionSkippedWords([]);
        setIsGameOver(false);
    }, []);

    useEffect(() => {
        const currentLang = getLanguage();
        setLanguage(currentLang);
        setWordSet(allTranslationRaceWords[currentLang]);
        
        const handleLanguageChange = () => {
            const newLang = getLanguage();
            setLanguage(newLang);
            setWordSet(allTranslationRaceWords[newLang]);
            setIsActive(false);
            setTimeLeft(GAME_DURATION);
            setIsGameOver(false);
        };
        window.addEventListener('language-changed', handleLanguageChange);
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            playSound('achievement');
        }
        return () => clearTimeout(timer);
    }, [isActive, timeLeft]);
    
    const normalizeString = (str: string): string => {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ł/g, 'l');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentWord) return;
        const value = e.target.value;
        setInputValue(value);

        const normalizedInput = normalizeString(value.trim());
        const normalizedAnswer = normalizeString(currentWord.pl);

        if (normalizedInput === normalizedAnswer) {
            playSound('correct');
            vibrate('correct');
            setScore(score + 1);
            setInputValue('');
            setCurrentWord(getNextWord());
        }
    }

    const handleSkip = useCallback(() => {
      if (skipsLeft > 0 && currentWord) {
          setSkipsLeft(prev => prev - 1);
          setScore(prev => Math.max(-99, prev - 1));
          setSessionSkippedWords(prev => [...prev, currentWord]);
          setCurrentWord(getNextWord());
          setInputValue('');
          vibrate('incorrect');
          playSound('incorrect');
      }
    }, [skipsLeft, currentWord, getNextWord]);
    
    const handleSurrender = useCallback(() => {
        setIsActive(false);
        setIsGameOver(true);
        playSound('incorrect');
        vibrate('incorrect');
    }, []);

    const getUIText = (key: keyof typeof uiTexts) => {
      const texts = uiTexts[key];
      if (!texts) return '';
      return texts[language] || texts['en'];
    };

    const wpm = score > 0 ? Math.round(score / (GAME_DURATION / 60)) : 0;
    
    const motivationalMessage = useMemo(() => {
      if (score >= 40) return { icon: <Trophy className="h-16 w-16 text-amber animate-shake" />, title: getUIText('timesUp') };
      if (score >= 20) return { icon: <ThumbsUp className="h-16 w-16 text-primary" />, title: getUIText('timesUp') };
      return { icon: <Brain className="h-16 w-16 text-muted-foreground" />, title: getUIText('timesUp') };
    }, [score, getUIText]);

    const isGameFinished = !isActive && timeLeft === 0;
    const shouldShowResults = isGameFinished || isGameOver;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                 <CardHeader className="text-center p-6">
                     <div className="flex items-center justify-center gap-4">
                         <Timer className="h-8 w-8" />
                         <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                     </div>
                 </CardHeader>
                <CardContent className="p-6 pt-0 flex flex-col justify-center min-h-[50vh]">
                    {!isActive && !shouldShowResults && (
                        <div className="text-center flex flex-col items-center justify-center gap-8 flex-grow">
                             <p className="text-muted-foreground mt-4">{getUIText('description')}</p>
                             <Button size="lg" onClick={setupNewGame} className="mt-4">
                                <Play className="mr-2 h-5 w-5 animate-pulse-strong" />
                                 {getUIText('startGame')}
                             </Button>
                        </div>
                    )}
                    
                    {shouldShowResults && (
                        <div className="space-y-4">
                            <div className="text-center space-y-2 flex flex-col items-center">
                                {motivationalMessage.icon}
                                <h2 className="text-2xl font-bold">{motivationalMessage.title}</h2>
                                <CardDescription>{getUIText('finalScore')} <span className="font-bold text-primary">{score}</span></CardDescription>
                            </div>
                            <Card className="bg-muted/50">
                                <CardHeader className="pb-2"><CardTitle className="text-xl text-center">{getUIText('summary')}</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 text-center">
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber"/><span className="text-2xl font-bold">{wpm}</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('wpm')}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                        <div className="flex items-center gap-2"><ShieldX className="h-4 w-4 text-destructive"/><span className="text-2xl font-bold">{3 - skipsLeft}</span></div>
                                        <span className="text-xs text-muted-foreground">{getUIText('skips')}</span>
                                    </div>
                                </CardContent>
                            </Card>
                            {sessionSkippedWords.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-center font-semibold">{getUIText('worthRepeating')}</h3>
                                    <ScrollArea className="h-24 w-full rounded-md border p-2">
                                        <div className="space-y-2">
                                            {sessionSkippedWords.map((word, index) => (
                                                <React.Fragment key={index}>
                                                    <div className="text-sm p-2 bg-muted/30 rounded-md">
                                                        <p><span className="text-destructive font-semibold">{getUIText('skippedWord')}:</span> {word.native} - {word.pl}</p>
                                                    </div>
                                                    {index < sessionSkippedWords.length - 1 && <Separator />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}
                             <div className="text-center pt-2">
                                <Button onClick={setupNewGame}>{getUIText('playAgain')}</Button>
                             </div>
                        </div>
                    )}
                    
                    {isActive && currentWord && (
                         <div className="flex flex-col h-full items-center">
                            <div className="flex justify-around items-center w-full mb-8">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium text-muted-foreground mb-2">{getUIText('timeLeft')}</span>
                                    <TimerRing timeLeft={timeLeft} totalTime={GAME_DURATION} />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium text-muted-foreground mb-2">{getUIText('score')}</span>
                                    <div className="h-[112px] flex items-center">
                                        <TallyScore score={score} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-grow flex flex-col items-center justify-center text-center mb-8">
                                <p className="text-muted-foreground">{getUIText('translateWord')}</p>
                                <p className="text-6xl font-bold tracking-wider text-amber">{currentWord.native}</p>
                            </div>

                            <div className="w-full max-w-sm space-y-6">
                                <Input 
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder={getUIText('placeholder')}
                                    className="text-lg text-center h-12"
                                    autoFocus
                                />
                                <div className="flex justify-center gap-2">
                                    <Button variant="outline" size="lg" onClick={handleSkip} disabled={skipsLeft <= 0} className="relative">
                                    <SkipForward className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 text-xs font-bold bg-destructive text-destructive-foreground rounded-full h-4 w-4 flex items-center justify-center">{skipsLeft}</span>
                                    </Button>
                                    {skipsLeft <= 0 && (
                                        <Button variant="destructive" size="lg" onClick={handleSurrender}>
                                            <FlagOff className="mr-2 h-4 w-4" />
                                            {getUIText('surrender')}
                                        </Button>
                                    )}
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

export default TranslationRacePage;
