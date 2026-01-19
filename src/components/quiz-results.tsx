"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Brain, ThumbsUp, Trophy, Clock, CheckCircle, ShieldX } from 'lucide-react';
import type { ErrorRecord, Language } from '@/lib/storage';
import { getLanguage } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface QuizResultsProps {
    score: number;
    totalQuestions: number;
    totalTime: number;
    quizName: string;
    sessionErrors: Omit<ErrorRecord, 'id'>[];
    onRestart: () => void;
}

const uiTexts: { [key: string]: Record<Language, string> } = {
    perfectTitle: { en: 'Perfect Score!', pl: 'Bezbłędny test!', fr: 'Score Parfait !', de: 'Perfektes Ergebnis!', it: 'Punteggio Perfetto!', es: '¡Puntuación Perfecta!' },
    perfectDesc: { en: 'Excellent! All answers were correct. You are a champion!', pl: 'Doskonale! Wszystkie odpowiedzi były poprawne. Jesteś mistrzem!', fr: 'Excellent ! Toutes les réponses étaient correctes. Vous êtes un champion !', de: 'Ausgezeichnet! Alle Antworten waren richtig. Du bist ein Champion!', it: 'Eccellente! Tutte le risposte erano corrette. Sei un campione!', es: '¡Excelente! Todas las respuestas fueron correctas. ¡Eres un campeón!' },
    greatTitle: { en: 'Great Job!', pl: 'Świetna robota!', fr: 'Excellent Travail !', de: 'Tolle Arbeit!', it: 'Ottimo Lavoro!', es: '¡Gran Trabajo!' },
    greatDesc: { en: 'Your score is impressive. Keep it up!', pl: 'Twój wynik jest imponujący. Tak trzymać!', fr: 'Votre score est impressionnant. Continuez comme ça !', de: 'Dein Ergebnis ist beeindruckend. Mach weiter so!', it: 'Il tuo punteggio è impressionante. Continua così!', es: 'Tu puntuación es impresionante. ¡Sigue así!' },
    goodTitle: { en: 'Good Effort!', pl: 'Dobry wynik!', fr: 'Bel Effort !', de: 'Gute Leistung!', it: 'Buon Tentativo!', es: '¡Buen Esfuerzo!' },
    goodDesc: { en: 'You\'re on the right track. Keep practicing!', pl: 'Jesteś na dobrej drodze. Ćwicz dalej!', fr: 'Vous êtes sur la bonne voie. Continuez à pratiquer !', de: 'Du bist auf dem richtigen Weg. Übe weiter!', it: 'Sei sulla strada giusta. Continua a esercitarti!', es: 'Estás en el camino correcto. ¡Sigue practicando!' },
    practiceTitle: { en: 'Practice Makes Perfect!', pl: 'Ćwiczenie czyni mistrza!', fr: 'C\'est en forgeant qu\'on devient forgeron !', de: 'Übung macht den Meister!', it: 'La pratica rende perfetti!', es: '¡La práctica hace al maestro!' },
    practiceDesc: { en: 'Every mistake is a learning opportunity. Try again!', pl: 'Każdy błąd to okazja do nauki. Spróbuj jeszcze raz!', fr: 'Chaque erreur est une opportunité d\'apprendre. Réessayez !', de: 'Jeder Fehler ist eine Lernchance. Versuche es erneut!', it: 'Ogni errore è un\'opportunità di apprendimento. Riprova!', es: 'Cada error es una oportunidad de aprendizaje. ¡Inténtalo de nuevo!' },
    summary: { en: 'Summary', pl: 'Podsumowanie', fr: 'Résumé', de: 'Zusammenfassung', it: 'Riepilogo', es: 'Resumen' },
    score: { en: 'Score', pl: 'Wynik', fr: 'Score', de: 'Ergebnis', it: 'Punteggio', es: 'Puntuación' },
    accuracy: { en: 'Accuracy', pl: 'Skuteczność', fr: 'Précision', de: 'Genauigkeit', it: 'Precisione', es: 'Precisión' },
    correct: { en: 'Correct', pl: 'Poprawne', fr: 'Correct', de: 'Richtig', it: 'Corretto', es: 'Correcto' },
    incorrect: { en: 'Incorrect', pl: 'Błędne', fr: 'Incorrect', de: 'Falsch', it: 'Errato', es: 'Incorrecto' },
    totalTime: { en: 'Total Time', pl: 'Całkowity czas', fr: 'Temps Total', de: 'Gesamtzeit', it: 'Tempo Totale', es: 'Tiempo Total' },
    worthRepeating: { en: 'Worth Repeating', pl: 'Warto to powtórzyć', fr: 'À Répéter', de: 'Wiederholenswert', it: 'Da Ripetere', es: 'Vale la pena repetir' },
    yourAnswer: { en: 'Your answer:', pl: 'Twoja odp:', fr: 'Votre réponse :', de: 'Deine Antwort:', it: 'La tua risposta:', es: 'Tu respuesta:' },
    correctAnswer: { en: 'Correct:', pl: 'Poprawna:', fr: 'Correct :', de: 'Richtig:', it: 'Corretto:', es: 'Correcto:' },
    playAgain: { en: 'Play Again', pl: 'Zagraj ponownie', fr: 'Rejouer', de: 'Nochmal spielen', it: 'Gioca di Nuovo', es: 'Jugar de Nuevo' },
    backToMenu: { en: 'Back to Menu', pl: 'Wróć do menu', fr: 'Retour au Menu', de: 'Zurück zum Menü', it: 'Torna al Menu', es: 'Volver al Menú' },
    seeAllErrors: { en: 'See all errors', pl: 'Zobacz wszystkie błędy', fr: 'Voir toutes les erreurs', de: 'Alle Fehler ansehen', it: 'Vedi tutti gli errori', es: 'Ver todos los errores' }
};

export default function QuizResults({ score, totalQuestions, totalTime, quizName, sessionErrors, onRestart }: QuizResultsProps) {
    const lang = useMemo(() => getLanguage(), []);
    const successRate = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    
    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][lang] || uiTexts[key]['en'];
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const motivationalMessage = useMemo(() => {
        if (successRate === 100) {
            return {
                icon: <Trophy className="h-16 w-16 text-amber animate-shake" />,
                title: getUIText('perfectTitle'),
                description: getUIText('perfectDesc'),
            };
        }
        if (successRate >= 80) {
            return {
                icon: <Trophy className="h-16 w-16 text-amber" />,
                title: getUIText('greatTitle'),
                description: getUIText('greatDesc'),
            };
        }
        if (successRate >= 50) {
            return {
                icon: <ThumbsUp className="h-16 w-16 text-primary" />,
                title: getUIText('goodTitle'),
                description: getUIText('goodDesc'),
            };
        }
        return {
            icon: <Brain className="h-16 w-16 text-muted-foreground" />,
            title: getUIText('practiceTitle'),
            description: getUIText('practiceDesc'),
        };
    }, [successRate, lang]);


    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="items-center text-center pb-4">
                {motivationalMessage.icon}
                <CardTitle className="text-3xl font-bold">{motivationalMessage.title}</CardTitle>
                <CardDescription>{motivationalMessage.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-center">{getUIText('summary')}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-center">
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <span className="text-2xl font-bold">{score} / {totalQuestions}</span>
                            <span className="text-xs text-muted-foreground">{getUIText('score')}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <span className="text-2xl font-bold">{successRate}%</span>
                            <span className="text-xs text-muted-foreground">{getUIText('accuracy')}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-success"/>
                                <span className="text-2xl font-bold">{score}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{getUIText('correct')}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <div className="flex items-center gap-2">
                                <ShieldX className="h-4 w-4 text-destructive"/>
                                <span className="text-2xl font-bold">{sessionErrors.length}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{getUIText('incorrect')}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background col-span-2">
                             <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground"/>
                                <span className="text-2xl font-bold">{formatTime(totalTime)}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{getUIText('totalTime')}</span>
                        </div>
                    </CardContent>
                </Card>

                {sessionErrors.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-center font-semibold">{getUIText('worthRepeating')}</h3>
                        <ScrollArea className="h-32 w-full rounded-md border p-2">
                             <div className="space-y-2">
                                {sessionErrors.map((error, index) => (
                                    <React.Fragment key={index}>
                                        <div className="text-sm p-2 bg-muted/30 rounded-md">
                                            <p><span className="font-semibold">{error.word}</span></p>
                                            <p className="text-destructive">{getUIText('yourAnswer')} <span className="font-medium">{error.userAnswer}</span></p>
                                            <p className="text-success">{getUIText('correctAnswer')} <span className="font-medium">{error.correctAnswer}</span></p>
                                        </div>
                                        {index < sessionErrors.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex-col gap-4 pt-4">
                 <div className="flex w-full gap-4">
                    <Button onClick={onRestart} className="w-full">{getUIText('playAgain')}</Button>
                    <Link href="/" passHref className="w-full">
                        <Button variant="outline" className="w-full">{getUIText('backToMenu')}</Button>
                    </Link>
                </div>
                {sessionErrors.length > 0 && (
                    <Link href="/errors" passHref>
                        <Button variant="link" className="text-muted-foreground">
                            {getUIText('seeAllErrors')}
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}
