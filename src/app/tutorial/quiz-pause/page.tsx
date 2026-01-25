"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, Pause, Home, RefreshCw, Play } from 'lucide-react';
import { getTutorialState } from '@/lib/storage';

const question = {
    word: 'Hello',
    options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'],
    correctAnswer: 'Cześć'
};

const QUESTION_TIME_LIMIT = 15;
const QUIZ_LENGTH = 3;

export default function QuizPausePage() {
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
    const [totalTime, setTotalTime] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            const timer = setTimeout(() => {
                if (window.location.pathname.includes('/tutorial/')) {
                    router.push('/');
                }
            }, 2000);
            return () => clearTimeout(timer);
        }

        const updateStep = () => {
            const state = getTutorialState();
            if (state?.stage === 'quiz') {
                setActiveStep(state.step);
            }
        };

        window.addEventListener('tutorial-state-changed', updateStep);
        updateStep();
        return () => window.removeEventListener('tutorial-state-changed', updateStep);
    }, [router]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (activeStep === 0) { // Timer animation for the first step
            interval = setInterval(() => {
                setQuestionTimer(prev => (prev > 1 ? prev - 1 : QUESTION_TIME_LIMIT));
                setTotalTime(prev => prev + 1);
            }, 1000);
        } else {
            setQuestionTimer(QUESTION_TIME_LIMIT);
            setTotalTime(0);
        }
        return () => clearInterval(interval);
    }, [activeStep]);
    
    const isTimerView = activeStep === 0;
    const isPausedView = activeStep === 1;

    const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

    const displayTimer = isTimerView ? questionTimer : 10;
    const displayTotalTime = isTimerView ? totalTime : 5;
    const questionTimeProgress = (displayTimer / QUESTION_TIME_LIMIT) * 100;
    const overallProgress = (1 / QUIZ_LENGTH) * 100;

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
                     <div className="w-full space-y-4" data-tutorial-id="quiz-timer">
                        <div className="w-full flex justify-around gap-4 text-center">
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className="text-2xl font-bold">{displayTimer}s</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className="text-2xl font-bold">{formatTime(displayTotalTime)}</span>
                            </div>
                        </div>
                        <Progress value={questionTimeProgress} className="w-full h-2" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground">What is the Polish meaning of</p>
                        <p className="font-headline font-bold text-4xl">"{question.word}"?</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {question.options.map((option) => (
                            <Button
                                key={option}
                                disabled
                                className={cn("h-auto text-lg p-4 whitespace-normal bg-primary text-primary-foreground", "disabled:opacity-100")}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 w-full pt-4 border-t">
                        <Button variant="outline" size="icon" className={cn(isPausedView && "pointer-events-none opacity-50")}><Home /></Button>
                        <Button variant="outline" size="icon" className={cn(isPausedView && "pointer-events-none opacity-50")}><RefreshCw /></Button>
                        <div data-tutorial-id="quiz-pause-button">
                             <Button variant="outline" size="icon" className={cn(isTimerView && "pointer-events-none")}>
                                {isPausedView ? <Play /> : <Pause />}
                            </Button>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="flex-col gap-4 p-6 pt-0">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-muted-foreground">
                           Pytanie 1 z {QUIZ_LENGTH}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Punkty:</span>
                            <div className="text-2xl font-bold text-primary">0</div>
                        </div>
                    </div>
                    <Progress value={overallProgress} className="w-full h-2" />
                </CardFooter>
            </Card>
        </main>
    );
}
