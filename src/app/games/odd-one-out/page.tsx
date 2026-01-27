"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, EyeOff, Play, ShieldX, Percent, Clock, Trophy, ThumbsUp, Brain, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, type Language, updateStats, addError, checkSessionAchievements, type Achievement, type ErrorRecord } from '@/lib/storage';
import { allOddOneOutQuestions, type OddOneOutSet } from '@/lib/games/odd-one-out';
import { playSound } from '@/lib/sounds';
import { vibrate } from '@/lib/vibrations';
import { Separator } from '@/components/ui/separator';
import TimerRing from '@/components/TimerRing';
import TallyScore from '@/components/TallyScore';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

const GAME_DURATION = 15; // seconds per question
const QUESTIONS_PER_SESSION = 10;
const USED_QUESTIONS_KEY_PREFIX = 'linguaLearnUsedOddOneOut_';

const uiTexts = {
    title: { en: 'Odd One Out', fr: 'L\'intrus', de: 'Der Ausreißer', it: 'L\'intruso', es: 'El Intruso' },
    description: { 
        en: 'Find the word that doesn\'t belong to the group.',
        fr: 'Trouvez le mot qui n\'appartient pas au groupe.',
        de: 'Finde das Wort, das nicht zur Gruppe gehört.',
        it: 'Trova la parola che non appartiene al gruppo.',
        es: 'Encuentra la palabra que no pertenece al grupo.'
    },
    category: { en: 'Category', fr: 'Catégorie', de: 'Kategorie', it: 'Categoria', es: 'Categoría' },
    backToGames: { en: 'Back to Game Center', fr: 'Retour au Centre de jeux', de: 'Zurück zur Spielzentrale', it: 'Torna al Centro Giochi', es: 'Volver al Centro de Juegos' },
    summary: { en: 'Summary', fr: 'Résumé', de: 'Zusammenfassung', it: 'Riepilogo', es: 'Resumen' },
    worthRepeating: { en: 'Worth repeating', fr: 'À répéter', de: 'Wiederholenswert', it: 'Da ripetere', es: 'Vale la pena repetir' },
    score: { en: 'Score', fr: 'Score', de: 'Punkte', it: 'Punteggio', es: 'Puntuación' },
    streak: { en: 'Best Streak', fr: 'Meilleure Série', de: 'Beste Serie', it: 'Miglior Serie', es: 'Mejor Racha' },
    playAgain: { en: 'Play Again', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di nuovo', es: 'Jugar de nuevo' },
    timeLeft: { en: 'Time Left', fr: 'Temps restant', de: 'Verbleibende Zeit', it: 'Tempo rimasto', es: 'Tiempo restante' },
    finalScore: { en: 'Final Score', fr: 'Score Final', de: 'Endergebnis', it: 'Punteggio Finale', es: 'Puntuación Final' },
    successRate: { en: 'Success Rate', fr: 'Taux de réussite', de: 'Erfolgsquote', it: 'Tasso di successo', es: 'Tasa de éxito' },
    time: { en: 'Time', fr: 'Temps', de: 'Zeit', it: 'Tempo', es: 'Tiempo' },
    question: { en: 'Question', fr: 'Question', de: 'Frage', it: 'Domanda', es: 'Pregunta' },
};

const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const OddOneOutPage = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [gameStage, setGameStage] = useState<'playing' | 'results'>('playing');
    const [sessionQuestions, setSessionQuestions] = useState<OddOneOutSet[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | 'timeout' | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [totalTime, setTotalTime] = useState(0);
    const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);
    const { toast } = useToast();
    const [isPreGame, setIsPreGame] = useState(true);
    const [preGameCountdown, setPreGameCountdown] = useState(4); // 4 -> 3, 2, 1, GO!
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreakInSession, setLongestStreakInSession] = useState(0);
    
    const currentSet = sessionQuestions[currentQuestionIndex];
    
    const getUIText = (key: keyof typeof uiTexts) => uiTexts[key][language] || uiTexts[key]['en'];

    const setupNewGame = useCallback(() => {
        const lang = getLanguage();
        setLanguage(lang);
        const allQuestions = allOddOneOutQuestions[lang];
        const STORAGE_KEY = `${USED_QUESTIONS_KEY_PREFIX}${lang}`;
        let usedIndices: number[] = [];
        try {
            usedIndices = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) { console.error("Failed to parse used questions", e); }
        
        let availableQuestions = allQuestions.filter((_, i) => !usedIndices.includes(i));
        if (availableQuestions.length < QUESTIONS_PER_SESSION) {
            availableQuestions = [...allQuestions];
            usedIndices = [];
        }

        const gameQuestions = shuffle(availableQuestions).slice(0, QUESTIONS_PER_SESSION);
        const newUsedIndices = gameQuestions.map(q => allQuestions.indexOf(q));
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...usedIndices, ...newUsedIndices]));
        } catch (e) { console.error("Failed to save used questions", e); }
        
        setSessionQuestions(gameQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentStreak(0);
        setLongestStreakInSession(0);
        setTotalTime(0);
        setSessionErrors([]);
        resetQuestionState(gameQuestions[0]);
        setGameStage('playing');
        setIsPreGame(true);
        setPreGameCountdown(4);
    }, []);

    const resetQuestionState = (questionSet: OddOneOutSet) => {
        if (!questionSet) return;
        setShuffledWords(shuffle(questionSet.words));
        setSelected(null);
        setAnswerStatus(null);
        setTimeLeft(GAME_DURATION);
    };

    useEffect(() => {
        setupNewGame();

        const handleLanguageChange = () => {
            setupNewGame();
        };
        window.addEventListener('language-changed', handleLanguageChange);
        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, [setupNewGame]);

    useEffect(() => {
        if (!isPreGame) return;
        const countdownTimer = setInterval(() => {
            setPreGameCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownTimer);
                    setTimeout(() => setIsPreGame(false), 1000); // Show "GO!" for 1s
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdownTimer);
    }, [isPreGame]);
    
    const showAchievementToast = useCallback((achievement: Achievement) => {
        playSound('achievement');
        toast({
            title: <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-amber" /><span className="font-bold">Achievement Unlocked!</span></div>,
            description: `You've earned: "${achievement.name}"`,
        });
    }, [toast]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex >= QUESTIONS_PER_SESSION - 1) {
             setLongestStreakInSession(prev => Math.max(prev, currentStreak));
            setGameStage('results');
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            resetQuestionState(sessionQuestions[currentQuestionIndex + 1]);
        }
    }, [currentQuestionIndex, sessionQuestions, currentStreak]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (answerStatus) {
            const delay = answerStatus === 'correct' ? 1000 : 2000;
            timer = setTimeout(() => {
              if (currentQuestionIndex === QUESTIONS_PER_SESSION - 1) {
                    const isPerfect = score + (answerStatus === 'correct' ? 1 : 0) === QUESTIONS_PER_SESSION;
                    const unlocked = checkSessionAchievements(isPerfect);
                    unlocked.forEach(showAchievementToast);
                }
                handleNextQuestion();
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [answerStatus, handleNextQuestion, score, showAchievementToast, currentQuestionIndex]);

    useEffect(() => {
        if (gameStage !== 'playing' || !!answerStatus || isPreGame) return;
        
        const questionTimer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(questionTimer);
                    setAnswerStatus('timeout');
                    addError({ word: currentSet.category[language], userAnswer: 'Timeout', correctAnswer: currentSet.correct, quiz: 'Odd One Out' });
                    setSessionErrors(prev => [...prev, { word: currentSet.category[language], userAnswer: 'Timeout', correctAnswer: currentSet.correct, quiz: 'Odd One Out' }]);
                    vibrate('incorrect');
                    playSound('incorrect');
                    setLongestStreakInSession(prev => Math.max(prev, currentStreak));
                    setCurrentStreak(0);
                    const unlocked = updateStats(false, 'Odd One Out', currentQuestionIndex);
                    unlocked.forEach(showAchievementToast);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const gameTimer = setInterval(() => {
            setTotalTime(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(questionTimer);
            clearInterval(gameTimer);
        };
    }, [gameStage, answerStatus, currentQuestionIndex, currentSet, showAchievementToast, language, isPreGame, currentStreak]);
    
    const handleSelect = (word: string) => {
        if (answerStatus || isPreGame) return;
        setSelected(word);
        const isCorrect = word === currentSet.correct;
        
        if (isCorrect) {
            setAnswerStatus('correct');
            setScore(prev => prev + 1);
            setCurrentStreak(prev => prev + 1);
            vibrate('correct');
            playSound('correct');
        } else {
            setAnswerStatus('incorrect');
            vibrate('incorrect');
            playSound('incorrect');
            setLongestStreakInSession(prev => Math.max(prev, currentStreak));
            setCurrentStreak(0);
            const errorRecord = { word: currentSet.category[language], userAnswer: word, correctAnswer: currentSet.correct, quiz: 'Odd One Out' };
            addError(errorRecord);
            setSessionErrors(prev => [...prev, errorRecord]);
        }
        const unlocked = updateStats(isCorrect, 'Odd One Out', currentQuestionIndex);
        unlocked.forEach(showAchievementToast);
    };

    const successRate = totalTime > 0 ? Math.round((score / QUESTIONS_PER_SESSION) * 100) : 0;
    const finalScoreColor = score > 10 ? "text-success" : score < 0 ? "text-destructive" : "text-foreground";
    const motivationalMessage = useMemo(() => {
        if (successRate >= 90) return { icon: <Trophy className="h-16 w-16 text-amber animate-shake" />, title: 'Excellent!' };
        if (successRate >= 70) return { icon: <ThumbsUp className="h-16 w-16 text-success" />, title: 'Great Job!' };
        return { icon: <Brain className="h-16 w-16 text-muted-foreground" />, title: 'Good Effort!' };
    }, [successRate]);
    const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

    if (gameStage === 'results') {
        return (
             <main className="flex min-h-screen flex-col items-center justify-center p-4">
                <Card className="w-full max-w-2xl shadow-2xl">
                    <CardHeader className="text-center p-6">
                        <div className="flex items-center justify-center gap-4">
                            <EyeOff className="h-8 w-8" />
                            <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardHeader className="items-center text-center pb-4 pt-0">
                        {motivationalMessage.icon}
                        <CardTitle className="text-3xl font-bold">{motivationalMessage.title}</CardTitle>
                        <CardDescription className="flex flex-col items-center gap-1">
                            <span>{getUIText('finalScore')}</span>
                            <span className={cn("text-4xl font-bold", finalScoreColor)}>{score}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Card className="bg-muted/50">
                             <CardHeader className="pb-2 pt-4"><CardTitle className="text-xl text-center">{getUIText('summary')}</CardTitle></CardHeader>
                             <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                    <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-amber"/><span className="text-2xl font-bold">{longestStreakInSession}</span></div>
                                    <span className="text-xs text-muted-foreground">{getUIText('streak')}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                    <div className="flex items-center gap-2"><Percent className="h-4 w-4 text-amber"/><span className="text-2xl font-bold">{successRate}%</span></div>
                                    <span className="text-xs text-muted-foreground">{getUIText('successRate')}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background col-span-2 sm:col-span-1">
                                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground"/><span className="text-2xl font-bold">{formatTime(totalTime)}</span></div>
                                    <span className="text-xs text-muted-foreground">{getUIText('time')}</span>
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
                                                    <p className="font-semibold">{getUIText('category')}: {error.word}</p>
                                                    <p className="text-destructive">Twoja odp: <span className="font-medium">{error.userAnswer}</span></p>
                                                    <p className="text-success">Poprawna: <span className="font-medium">{error.correctAnswer}</span></p>
                                                </div>
                                                {index < sessionErrors.length - 1 && <Separator />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </CardContent>
                     <CardFooter className="flex-col gap-4 p-6 border-t">
                        <div className="flex w-full gap-4">
                            <Button onClick={setupNewGame} className="w-full">{getUIText('playAgain')}</Button>
                            <Link href="/games" passHref className="w-full"><Button variant="outline" className="w-full">{getUIText('backToGames')}</Button></Link>
                        </div>
                    </CardFooter>
                </Card>
            </main>
        );
    }

    if (!currentSet) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <EyeOff className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">{getUIText('title')}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                    <div className="flex justify-center items-center w-full mb-4 gap-4">
                        <div className="relative flex-1 flex flex-col items-center">
                            <span className="text-sm font-medium text-muted-foreground mb-2">{getUIText('timeLeft')}</span>
                             <div className="relative flex h-28 w-28 items-center justify-center">
                                <TimerRing timeLeft={isPreGame ? 0 : timeLeft} totalTime={GAME_DURATION} />
                                {isPreGame && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-background rounded-full">
                                        <span className="text-5xl font-bold text-amber animate-pulse">
                                            {preGameCountdown > 0 ? preGameCountdown : 'GO!'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-24 self-center" />
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-sm font-medium text-muted-foreground mb-2">{getUIText('score')}</span>
                            <div className="h-[112px] flex items-center justify-center">
                                <TallyScore score={score} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-1">
                        <p className="text-sm font-medium text-muted-foreground text-center">
                            {getUIText('question')} {currentQuestionIndex + 1} / {QUESTIONS_PER_SESSION}
                        </p>
                        <Progress value={((currentQuestionIndex + 1) / QUESTIONS_PER_SESSION) * 100} className="w-full h-2" />
                    </div>

                    <p className="text-center text-lg">{getUIText('category')}: <span className="font-bold">{currentSet.category[language]}</span></p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {shuffledWords.map(word => {
                            const isCorrectAnswer = word === currentSet.correct;
                            const isSelected = word === selected;
                            
                            return (
                                <Button 
                                    key={word}
                                    variant="outline"
                                    className={cn("h-24 text-2xl", 
                                        answerStatus && isSelected && !isCorrectAnswer && 'bg-destructive text-destructive-foreground',
                                        answerStatus && isCorrectAnswer && 'bg-success text-success-foreground',
                                        answerStatus && !isSelected && !isCorrectAnswer && 'opacity-50'
                                    )}
                                    onClick={() => handleSelect(word)}
                                    disabled={!!selected || isPreGame}
                                >
                                    {word}
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/games" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>{getUIText('backToGames')}</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
};

export default OddOneOutPage;
