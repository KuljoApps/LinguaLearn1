"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStats, clearStats, type Stats, getErrors, type ErrorRecord, getLanguage, type Language, getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CheckCircle, Flame, Percent, ShieldX, Trash2, ArrowUpRight } from "lucide-react";
import React from 'react';

const defaultStats: Stats = { totalAnswers: 0, totalCorrectAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, longestStreakQuiz: null, perQuizStats: {}, totalTimeSpent: 0, lastPlayTimestamp: null, uniqueDaysPlayed: 0, playedQuizzes: [], totalPerfectScores: 0 };

const uiTexts = {
    title: { en: 'Statistics', fr: 'Statistiques', de: 'Statistiken', it: 'Statistiche', es: 'Estadísticas' },
    totalAnswers: { en: 'Total Answers', fr: 'Total de Réponses', de: 'Gesamte Antworten', it: 'Risposte Totali', es: 'Respuestas Totales' },
    totalErrors: { en: 'Total Errors', fr: 'Total d\'Erreurs', de: 'Gesamtfehler', it: 'Errori Totali', es: 'Errores Totales' },
    successRate: { en: 'Success Rate', fr: 'Taux de Réussite', de: 'Erfolgsquote', it: 'Tasso di Successo', es: 'Tasa de Éxito' },
    longestStreak: { en: 'Longest Streak', fr: 'Plus Longue Série', de: 'Längste Serie', it: 'Serie più Lunga', es: 'Racha más Larga' },
    answersPerQuiz: { en: 'Answers per Quiz', fr: 'Réponses par Quiz', de: 'Antworten pro Quiz', it: 'Risposte per Quiz', es: 'Respuestas por Cuestionario' },
    noData: { en: 'No data yet.', fr: 'Pas encore de données.', de: 'Noch keine Daten.', it: 'Nessun dato ancora.', es: 'Aún no hay datos.' },
    errorsPerQuiz: { en: 'Errors per Quiz', fr: 'Erreurs par Quiz', de: 'Fehler pro Quiz', it: 'Errori per Quiz', es: 'Errores por Cuestionario' },
    successRatePerQuiz: { en: 'Success Rate per Quiz', fr: 'Taux de Réussite par Quiz', de: 'Erfolgsquote pro Quiz', it: 'Tasso di Successo per Quiz', es: 'Tasa de Éxito por Cuestionario' },
    longestStreakAchieved: { en: 'Longest Streak Achieved', fr: 'Plus Longue Série Atteinte', de: 'Längste Serie Erreicht', it: 'Serie più Lunga Raggiunta', es: 'Racha más Larga Alcanzada' },
    notYetAchieved: { en: 'Not yet achieved.', fr: 'Pas encore atteint.', de: 'Noch nicht erreicht.', it: 'Non ancora raggiunto.', es: 'Aún no se ha logrado.' },
    inQuiz: { en: 'in', fr: 'dans', de: 'in', it: 'in', es: 'en' },
    lastFifty: { en: 'Last 50 Answers', fr: '50 Dernières Réponses', de: 'Letzte 50 Antworten', it: 'Ultime 50 Risposte', es: 'Últimas 50 Respuestas' },
    errorDetails: { en: 'Error Details', fr: 'Détails de l\'Erreur', de: 'Fehlerdetails', it: 'Dettagli Errore', es: 'Detalles del Error' },
    fromQuiz: { en: 'From quiz:', fr: 'Du quiz :', de: 'Vom Quiz:', it: 'Dal quiz:', es: 'Del cuestionario:' },
    word: { en: 'Word:', fr: 'Mot :', de: 'Wort:', it: 'Parola:', es: 'Palabra:' },
    correct: { en: 'Correct:', fr: 'Correct :', de: 'Richtig:', it: 'Corretto:', es: 'Correcto:' },
    yourAnswer: { en: 'Your answer:', fr: 'Votre réponse :', de: 'Deine Antwort:', it: 'La tua risposta:', es: 'Tu respuesta:' },
    backToHome: { en: 'Back to Home', fr: 'Retour à l\'Accueil', de: 'Zurück zur Startseite', it: 'Torna alla Home', es: 'Volver al Inicio' },
    clearStats: { en: 'Clear Stats', fr: 'Effacer les Stats', de: 'Statistiken löschen', it: 'Cancella Statistiche', es: 'Borrar Estadísticas' },
    alertTitle: { en: 'Are you sure?', fr: 'Êtes-vous sûr ?', de: 'Bist du sicher?', it: 'Sei sicuro?', es: '¿Estás seguro?' },
    alertDescription: { en: 'This will permanently delete all your statistics and achievements. This action cannot be undone.', fr: 'Cela supprimera définitivement toutes vos statistiques et réalisations. Cette action ne peut pas être annulée.', de: 'Dadurch werden alle deine Statistiken und Erfolge dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.', it: 'Questo eliminerà permanentemente tutte le tue statistiche e i tuoi obiettivi. Questa azione non può essere annullata.', es: 'Esto eliminará permanentemente todas tus estadísticas y logros. Esta acción no se puede deshacer.' },
    cancel: { en: 'Cancel', fr: 'Annuler', de: 'Abbrechen', it: 'Annulla', es: 'Cancelar' },
    clear: { en: 'Clear', fr: 'Effacer', de: 'Löschen', it: 'Cancella', es: 'Borrar' },
};


export default function Stats() {
    const router = useRouter();
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [errors, setErrors] = useState<ErrorRecord[]>([]);
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
    const [language, setLanguage] = useState<Language>('en');
    const [isTutorialActiveForCards, setIsTutorialActiveForCards] = useState(false);
    
    // Refs for animation control
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        const cleanupAnimation = () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        };

        const handleStateUpdate = () => {
            const currentLang = getLanguage();
            setLanguage(currentLang);
            const currentStats = getStats();
            setStats(currentStats);
            setErrors(getErrors());

            const tutorialState = getTutorialState();
            
            if (!tutorialState || !tutorialState.isActive) {
                const timer = setTimeout(() => { router.push('/'); }, 3000);
                timeoutsRef.current.push(timer);
                return;
            }

            const isOnStatsCardsStep = tutorialState.stage === 'extended' && tutorialState.step === 2;
            setIsTutorialActiveForCards(isOnStatsCardsStep && currentStats.totalAnswers === 0);
            
            const isOnStatsGridStep = tutorialState.stage === 'extended' && tutorialState.step === 3;
            
            cleanupAnimation();

            if (isOnStatsGridStep && scrollAreaRef.current) {
                const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
                if (viewport) {
                    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
                        t /= d / 2;
                        if (t < 1) return (c / 2) * t * t + b;
                        t--;
                        return (-c / 2) * (t * (t - 2) - 1) + b;
                    };

                    const animateScroll = (element: Element, to: number, duration: number) => {
                        const start = element.scrollTop;
                        const change = to - start;
                        let startTime: number | null = null;
                
                        const animation = (currentTime: number) => {
                            if (startTime === null) startTime = currentTime;
                            const timeElapsed = currentTime - startTime;
                            const run = easeInOutQuad(timeElapsed, start, change, duration);
                            element.scrollTop = run;
                            if (timeElapsed < duration) {
                                animationFrameIdRef.current = requestAnimationFrame(animation);
                            }
                        };
                        animationFrameIdRef.current = requestAnimationFrame(animation);
                    };
        
                    const scrollDown = () => {
                        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
                        animateScroll(viewport, maxScroll, 3000);
                        timeoutsRef.current.push(setTimeout(scrollUp, 4000));
                    };
        
                    const scrollUp = () => {
                        animateScroll(viewport, 0, 3000);
                        timeoutsRef.current.push(setTimeout(scrollDown, 4000));
                    };
        
                    timeoutsRef.current.push(setTimeout(scrollDown, 1200));
                }
            }
        };

        handleStateUpdate(); // Initial run

        window.addEventListener('language-changed', handleStateUpdate);
        window.addEventListener('tutorial-state-changed', handleStateUpdate);
        
        return () => {
            window.removeEventListener('language-changed', handleStateUpdate);
            window.removeEventListener('tutorial-state-changed', handleStateUpdate);
            cleanupAnimation(); // Cleanup on unmount
        };
    }, [router]);


    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][language] || uiTexts[key]['en'];
    };

    const handleClearStats = () => {
        clearStats();
        setStats(getStats());
        setErrors(getErrors());
        setIsClearAlertOpen(false);
    }
    
    const fakeStats: Stats = {
      ...defaultStats,
      totalAnswers: 128,
      totalErrors: 17,
      longestStreak: 23,
      perQuizStats: {
        'English - Polish': { totalAnswers: 78, totalErrors: 12 },
        'Irregular Verbs': { totalAnswers: 50, totalErrors: 5 },
      }
    };
    
    const displayStats = isTutorialActiveForCards ? fakeStats : stats;

    const successRate = displayStats.totalAnswers > 0
        ? Math.round(((displayStats.totalAnswers - displayStats.totalErrors) / displayStats.totalAnswers) * 100)
        : 0;
    
    const quizNames = Object.keys(displayStats.perQuizStats);
    
    const isTutorialActiveForGrid = useMemo(() => {
        if (typeof window === 'undefined') return false;
        const tutorialState = getTutorialState();
        return tutorialState?.isActive &&
               tutorialState.stage === 'extended' &&
               tutorialState.step === 3 &&
               stats.lastFiftyAnswers.length === 0;
    }, [stats.lastFiftyAnswers.length]);


    const renderLastFiftyAnswersGrid = () => {
        const gridItems = [];
        let errorIndex = -1;
        
        const fakeAnswers = useMemo(() => Array.from({ length: 50 }, () => Math.random() > 0.3), []);
        const answersToRender = isTutorialActiveForGrid ? fakeAnswers : stats.lastFiftyAnswers;


        for (let i = 0; i < 50; i++) {
            const answer = answersToRender[i];

            if (answer === undefined) {
                gridItems.push(<div key={`empty-${i}`} className="h-4 w-4 rounded-sm bg-muted/20" />);
                continue;
            }

            if (answer) {
                 gridItems.push(
                    <div
                        key={`correct-${i}`}
                        className="h-4 w-4 rounded-sm bg-success"
                    />
                );
            } else {
                errorIndex++;
                const currentError = errors[errorIndex];

                if (!currentError || isTutorialActiveForGrid) { 
                    gridItems.push(
                        <Popover key={`error-fake-${i}`}>
                            <PopoverTrigger asChild>
                                <button
                                    aria-label="Show error details"
                                    className="h-4 w-4 rounded-sm bg-destructive cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto max-w-xs text-sm">
                                 <div className="space-y-2">
                                    <h4 className="font-medium leading-none text-center">{getUIText('errorDetails')}</h4>
                                    <p className="text-muted-foreground">
                                        {getUIText('fromQuiz')} <span className="font-semibold text-foreground">English - Polish</span>
                                    </p>
                                    <p>
                                        <span className="text-muted-foreground">{getUIText('word')} </span>
                                        <span className="font-bold">Sympathetic</span>
                                    </p>
                                    <p>
                                        <span className="text-muted-foreground">{getUIText('correct')} </span>
                                        <span className="font-bold text-success">Współczujący</span>
                                    </p>
                                    <p>
                                        <span className="text-muted-foreground">{getUIText('yourAnswer')} </span>
                                        <span className="font-bold text-destructive">Sympatyczny</span>
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    );
                    continue;
                }
                
                gridItems.push(
                    <Popover key={`error-${i}`}>
                        <PopoverTrigger asChild>
                            <button
                                aria-label="Show error details"
                                className="h-4 w-4 rounded-sm bg-destructive cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto max-w-xs text-sm">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none text-center">{getUIText('errorDetails')}</h4>
                                <p className="text-muted-foreground">
                                    {getUIText('fromQuiz')} <span className="font-semibold text-foreground">{currentError.quiz}</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">{getUIText('word')} </span>
                                    <span className="font-bold">{currentError.word}</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">{getUIText('correct')} </span>
                                    <span className="font-bold text-success">{currentError.correctAnswer}</span>
                                </p>
                                {currentError.userAnswer !== 'No answer' && (
                                    <p>
                                        <span className="text-muted-foreground">{getUIText('yourAnswer')} </span>
                                        <span className="font-bold text-destructive">{currentError.userAnswer}</span>
                                    </p>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                );
            }
        }
        return gridItems;
    };


    return (
        <>
            <Card className="w-full max-w-md shadow-2xl" data-tutorial-id="stats-card">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">{getUIText('title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4" data-tutorial-id="stats-cards">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{getUIText('totalAnswers')}</CardTitle>
                                        <CheckCircle className="h-5 w-5 text-amber" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{displayStats.totalAnswers.toLocaleString()}</div>
                                    </CardContent>
                                     <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                                </Card>
                            </PopoverTrigger>
                            <PopoverContent className="w-56">
                                <h4 className="font-medium text-center mb-2">{getUIText('answersPerQuiz')}</h4>
                                <div className="space-y-1 text-sm">
                                    {quizNames.length > 0 ? (
                                        quizNames.map((quizName) => (
                                            <div key={quizName} className="flex justify-between">
                                                <span>{quizName}:</span>
                                                <span className="font-bold">{displayStats.perQuizStats[quizName]?.totalAnswers || 0}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-center">{getUIText('noData')}</p>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{getUIText('totalErrors')}</CardTitle>
                                        <ShieldX className="h-5 w-5 text-amber" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{displayStats.totalErrors.toLocaleString()}</div>
                                    </CardContent>
                                    <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                                </Card>
                            </PopoverTrigger>
                            <PopoverContent className="w-56">
                                <h4 className="font-medium text-center mb-2">{getUIText('errorsPerQuiz')}</h4>
                                <div className="space-y-1 text-sm">
                                    {quizNames.length > 0 ? (
                                        quizNames.map((quizName) => (
                                            <div key={quizName} className="flex justify-between">
                                                <span>{quizName}:</span>
                                                <span className="font-bold">{displayStats.perQuizStats[quizName]?.totalErrors || 0}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-center">{getUIText('noData')}</p>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{getUIText('successRate')}</CardTitle>
                                        <Percent className="h-5 w-5 text-amber" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{successRate}%</div>
                                    </CardContent>
                                     <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                                </Card>
                            </PopoverTrigger>
                            <PopoverContent className="w-56">
                                <h4 className="font-medium text-center mb-2">{getUIText('successRatePerQuiz')}</h4>
                                <div className="space-y-1 text-sm">
                                    {quizNames.length > 0 ? (
                                        quizNames.map((quizName) => {
                                            const quizStats = displayStats.perQuizStats[quizName];
                                            const rate = quizStats && quizStats.totalAnswers > 0
                                                ? Math.round(((quizStats.totalAnswers - quizStats.totalErrors) / quizStats.totalAnswers) * 100)
                                                : 0;
                                            return (
                                                <div key={quizName} className="flex justify-between">
                                                    <span>{quizName}:</span>
                                                    <span className="font-bold">{rate}%</span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-muted-foreground text-center">{getUIText('noData')}</p>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{getUIText('longestStreak')}</CardTitle>
                                        <Flame className="h-6 w-6 text-amber" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{displayStats.longestStreak.toLocaleString()}</div>
                                    </CardContent>
                                     <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                                </Card>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto">
                                <div className="text-center space-y-1">
                                    <h4 className="font-medium mb-1">{getUIText('longestStreakAchieved')}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {displayStats.longestStreak > 0 && displayStats.longestStreakDate
                                            ? new Date(displayStats.longestStreakDate).toLocaleString()
                                            : getUIText('notYetAchieved')}
                                    </p>
                                    {displayStats.longestStreakQuiz && (
                                        <p className="text-xs text-muted-foreground">
                                            {getUIText('inQuiz')} <span className="font-semibold text-foreground">{displayStats.longestStreakQuiz}</span>
                                        </p>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Card data-tutorial-id="last-50-grid">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">{getUIText('lastFifty')}</CardTitle>
                        </CardHeader>
                        <CardContent ref={scrollAreaRef}>
                            <div className="flex flex-wrap gap-1">
                                {renderLastFiftyAnswersGrid()}
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('backToHome')}
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsClearAlertOpen(true)} disabled={stats.totalAnswers === 0}>
                            <Trash2 className="mr-2 h-4 w-4" /> {getUIText('clearStats')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{getUIText('alertTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {getUIText('alertDescription')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{getUIText('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearStats} className="bg-destructive hover:bg-destructive/90">
                           {getUIText('clear')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
