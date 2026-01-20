"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Brain, ThumbsUp, Trophy, Clock, CheckCircle, ShieldX } from 'lucide-react';
import type { ErrorRecord } from '@/lib/storage';

const fakeSessionErrors = [
    { word: 'Throughout', userAnswer: 'Na zewnątrz', correctAnswer: 'Przez cały (czas)', quiz: 'Demo Quiz' },
];

const motivationalMessage = {
    icon: <ThumbsUp className="h-16 w-16 text-primary" />,
    title: 'Dobry wynik!',
    description: 'Jesteś na dobrej drodze. Ćwicz dalej, aby opanować język do perfekcji!',
};

export default function QuizResultsPage() {
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [router]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="items-center text-center pb-4">
                    {motivationalMessage.icon}
                    <CardTitle className="text-3xl font-bold">{motivationalMessage.title}</CardTitle>
                    <CardDescription>{motivationalMessage.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div data-tutorial-id="quiz-results-summary">
                        <Card className="bg-muted/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-center">Podsumowanie</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4 text-center">
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                    <span className="text-2xl font-bold">1 / 2</span>
                                    <span className="text-xs text-muted-foreground">Wynik</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                    <span className="text-2xl font-bold">50%</span>
                                    <span className="text-xs text-muted-foreground">Skuteczność</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-success"/>
                                        <span className="text-2xl font-bold">1</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Poprawne</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                    <div className="flex items-center gap-2">
                                        <ShieldX className="h-4 w-4 text-destructive"/>
                                        <span className="text-2xl font-bold">1</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Błędne</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background col-span-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground"/>
                                        <span className="text-2xl font-bold">{formatTime(15)}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Całkowity czas</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2" data-tutorial-id="quiz-results-errors">
                        <h3 className="text-center font-semibold">Warto to powtórzyć</h3>
                        <ScrollArea className="h-32 w-full rounded-md border p-2">
                            <div className="space-y-2">
                                {fakeSessionErrors.map((error, index) => (
                                    <React.Fragment key={index}>
                                        <div className="text-sm p-2 bg-muted/30 rounded-md">
                                            <p><span className="font-semibold">{error.word}</span></p>
                                            <p className="text-destructive">Twoja odp: <span className="font-medium">{error.userAnswer}</span></p>
                                            <p className="text-success">Poprawna: <span className="font-medium">{error.correctAnswer}</span></p>
                                        </div>
                                        {index < fakeSessionErrors.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-4 pt-4" data-tutorial-id="quiz-results-actions">
                    <div className="flex w-full gap-4">
                        <Button className="w-full pointer-events-none">Zagraj ponownie</Button>
                        <Button variant="outline" className="w-full pointer-events-none">Wróć do menu</Button>
                    </div>
                    <Button variant="link" className="text-muted-foreground pointer-events-none">
                        Zobacz wszystkie błędy
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
      