"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Brain, ThumbsUp, Trophy, Clock, CheckCircle, ShieldX } from 'lucide-react';
import type { ErrorRecord } from '@/lib/storage';

interface QuizResultsProps {
    score: number;
    totalQuestions: number;
    totalTime: number;
    quizName: string;
    sessionErrors: Omit<ErrorRecord, 'id'>[];
    onRestart: () => void;
}

export default function DemoQuizResults({ score, totalQuestions, totalTime, sessionErrors, onRestart }: QuizResultsProps) {
    const successRate = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const motivationalMessage = useMemo(() => {
        if (successRate === 100) {
            return {
                icon: <Trophy className="h-16 w-16 text-amber animate-shake" />,
                title: 'Bezbłędny test!',
                description: 'Doskonale! Wszystkie odpowiedzi były poprawne. Jesteś mistrzem!',
            };
        }
        if (successRate >= 80) {
            return {
                icon: <Trophy className="h-16 w-16 text-amber" />,
                title: 'Świetna robota!',
                description: 'Twój wynik jest imponujący. Tak trzymać!',
            };
        }
        if (successRate >= 50) {
            return {
                icon: <ThumbsUp className="h-16 w-16 text-primary" />,
                title: 'Dobry wynik!',
                description: 'Jesteś na dobrej drodze. Ćwicz dalej!',
            };
        }
        return {
            icon: <Brain className="h-16 w-16 text-muted-foreground" />,
            title: 'Ćwiczenie czyni mistrza!',
            description: 'Każdy błąd to okazja do nauki. Spróbuj jeszcze raz!',
        };
    }, [successRate]);


    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="items-center text-center pb-4">
                {motivationalMessage.icon}
                <CardTitle className="text-3xl font-bold">{motivationalMessage.title}</CardTitle>
                <CardDescription>{motivationalMessage.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <Card className="bg-muted/50" data-tutorial-id="quiz-results-summary">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-center">Podsumowanie</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-center">
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <span className="text-2xl font-bold">{score} / {totalQuestions}</span>
                            <span className="text-xs text-muted-foreground">Wynik</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <span className="text-2xl font-bold">{successRate}%</span>
                            <span className="text-xs text-muted-foreground">Skuteczność</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-success"/>
                                <span className="text-2xl font-bold">{score}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Poprawne</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                            <div className="flex items-center gap-2">
                                <ShieldX className="h-4 w-4 text-destructive"/>
                                <span className="text-2xl font-bold">{sessionErrors.length}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Błędne</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background col-span-2">
                             <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground"/>
                                <span className="text-2xl font-bold">{formatTime(totalTime)}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Całkowity czas</span>
                        </div>
                    </CardContent>
                </Card>

                {sessionErrors.length > 0 && (
                    <div className="space-y-2" data-tutorial-id="quiz-results-errors">
                        <h3 className="text-center font-semibold">Warto to powtórzyć</h3>
                        <ScrollArea className="h-32 w-full rounded-md border p-2">
                             <div className="space-y-2">
                                {sessionErrors.map((error, index) => (
                                    <React.Fragment key={index}>
                                        <div className="text-sm p-2 bg-muted/30 rounded-md">
                                            <p><span className="font-semibold">{error.word}</span></p>
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

            <CardFooter className="flex-col gap-4 pt-4" data-tutorial-id="quiz-results-actions">
                 <div className="flex w-full gap-4">
                    <Button onClick={onRestart} className="w-full">Zagraj ponownie</Button>
                    <Link href="/" passHref className="w-full">
                        <Button variant="outline" className="w-full">Wróć do menu</Button>
                    </Link>
                </div>
                {sessionErrors.length > 0 && (
                    <Link href="/errors" passHref>
                        <Button variant="link" className="text-muted-foreground">
                            Zobacz wszystkie błędy
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}