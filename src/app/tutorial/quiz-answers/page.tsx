"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, Pause, Home, RefreshCw } from 'lucide-react';
import { getTutorialState } from '@/lib/storage';

const correctQuestion = {
    word: 'Hello',
    options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'],
    correctAnswer: 'Cześć',
    selectedAnswer: 'Cześć',
};

const incorrectQuestion = {
    word: 'Throughout', 
    options: ['Na zewnątrz', 'Pod spodem', 'Wewnątrz', 'Przez cały czas'], 
    correctAnswer: 'Przez cały czas',
    selectedAnswer: 'Na zewnątrz',
};

const QUIZ_LENGTH = 3;
const QUESTION_TIME_LIMIT = 15;

export default function QuizAnswersPage() {
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            router.push('/');
        }

        const updateStep = () => {
            const state = getTutorialState();
            if (state?.stage === 'quiz') {
                setActiveStep(state.step);
            } else {
                setActiveStep(null);
            }
        };

        window.addEventListener('tutorial-state-changed', updateStep);
        updateStep();
        return () => window.removeEventListener('tutorial-state-changed', updateStep);
    }, [router]);
    
    const isCorrectView = activeStep === 2;
    const isIncorrectView = activeStep === 3;

    if (activeStep === null) {
        return null;
    }

    const question = isIncorrectView ? incorrectQuestion : correctQuestion;
    const answerStatus = isCorrectView ? "correct" : isIncorrectView ? "incorrect" : null;
    const { word, options, correctAnswer, selectedAnswer } = question;

    const getButtonClass = (option: string) => {
        if (!answerStatus) {
            return "bg-primary text-primary-foreground pointer-events-none";
        }
        const isCorrectAnswer = option === correctAnswer;
        const isSelected = option === selectedAnswer;

        if (answerStatus === 'correct') {
            return isCorrectAnswer ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground opacity-70";
        }
        if (answerStatus === 'incorrect') {
            if (isCorrectAnswer) return "bg-success text-success-foreground";
            if (isSelected) return "bg-destructive text-destructive-foreground";
        }
        return "bg-muted text-muted-foreground opacity-70";
    };

    const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

    const displayTimer = isCorrectView ? 11 : 8;
    const displayTotalTime = isCorrectView ? 4 : 12;
    const questionTimeProgress = (displayTimer / QUESTION_TIME_LIMIT) * 100;
    const currentQuestionNumber = isCorrectView ? 1 : 2;
    const score = 1;
    const overallProgress = (currentQuestionNumber / QUIZ_LENGTH) * 100;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                 <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-center gap-2">
                        <LinguaLearnLogo className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">Lingua<span className="relative inline-block">Learn<span className="absolute -right-0.5 -bottom-3 text-sm font-semibold tracking-normal text-amber">Lite</span></span></CardTitle>
                    </div>
                    <CardDescription className="pt-2">Wybierz poprawną odpowiedź</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
                     <div className="w-full space-y-4">
                        <div className="w-full flex justify-around gap-4 text-center">
                            <div className="flex items-center gap-2"><Clock className="h-6 w-6" /><span className="text-2xl font-bold">{displayTimer}s</span></div>
                            <div className="flex items-center gap-2"><Clock className="h-6 w-6" /><span className="text-2xl font-bold">{formatTime(displayTotalTime)}</span></div>
                        </div>
                        <Progress value={questionTimeProgress} className="w-full h-2" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground">What is the Polish meaning of</p>
                        <p className={cn("font-headline font-bold text-4xl", word.length > 15 ? "text-3xl" : "text-4xl")}>"{word}"?</p>
                    </div>
                    <div
                        data-tutorial-id="quiz-answers-grid"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                    >
                        {options.map((option: string) => (
                            <Button 
                                key={option} 
                                disabled 
                                className={cn("h-auto text-lg p-4 whitespace-normal", getButtonClass(option))}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 w-full pt-4 border-t">
                        <Button variant="outline" size="icon"><Home /></Button>
                        <Button variant="outline" size="icon"><RefreshCw /></Button>
                        <div data-tutorial-id="quiz-pause-button">
                             <Button variant="outline" size="icon"><Pause /></Button>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="flex-col gap-4 p-6 pt-0">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-muted-foreground">Pytanie {currentQuestionNumber} z {QUIZ_LENGTH}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Punkty:</span>
                            <div className="text-2xl font-bold text-primary">{score}</div>
                        </div>
                    </div>
                    <Progress value={overallProgress} className="w-full h-2" />
                </CardFooter>
            </Card>
        </main>
    );
}
