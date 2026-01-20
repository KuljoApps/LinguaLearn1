"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock } from 'lucide-react';

const question = {
    word: 'Throughout', 
    options: ['Na zewnątrz', 'Pod spodem', 'Wewnątrz', 'Przez cały (czas)'], 
    correctAnswer: 'Przez cały (czas)'
};

export default function QuizIncorrectPage() {
    const selectedAnswer = 'Na zewnątrz';
    const answerStatus = "incorrect";

    const getButtonClass = (option: string) => {
        const isCorrectAnswer = option === question.correctAnswer;
        const isSelectedAnswer = option === selectedAnswer;

        if (answerStatus === 'incorrect') {
            if (isCorrectAnswer) return "bg-success text-success-foreground";
            if (isSelectedAnswer) return "bg-destructive text-destructive-foreground";
        }
        return "bg-muted text-muted-foreground opacity-70";
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-center gap-2">
                        <LinguaLearnLogo className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">
                            Lingua<span className="relative inline-block">Learn<span className="absolute -right-0.5 -bottom-3 text-sm font-semibold tracking-normal text-amber">Lite</span></span>
                        </CardTitle>
                    </div>
                    <CardDescription className="pt-2">Wybierz poprawną odpowiedź</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
                     <div className="w-full space-y-4">
                        <div className="w-full flex justify-around gap-4 text-center">
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className="text-2xl font-bold">8s</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className="text-2xl font-bold">00:12</span>
                            </div>
                        </div>
                        <Progress value={(8 / 15) * 100} className="w-full h-2" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground">What is the Polish meaning of</p>
                        <p className={cn(
                            "font-headline font-bold",
                            question.word.length > 15 ? "text-3xl" : "text-4xl"
                        )}>"{question.word}"?</p>
                    </div>
                    <div
                        data-tutorial-id='quiz-incorrect-answer'
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                    >
                        {question.options.map((option: string) => (
                            <Button
                                key={option}
                                disabled
                                className={cn("h-auto text-lg p-4 whitespace-normal", getButtonClass(option))}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </CardContent>
                 <CardFooter className="flex-col gap-4 p-6 pt-0">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-muted-foreground">
                           Pytanie 2 z 2
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Punkty:</span>
                            <div className="text-2xl font-bold text-primary">1</div>
                        </div>
                    </div>
                    <Progress value={100} className="w-full h-2" />
                </CardFooter>
            </Card>
        </main>
    );
}
