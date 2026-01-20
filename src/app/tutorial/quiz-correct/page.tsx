"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, Pause, Home, RefreshCw } from 'lucide-react';
import { getTutorialState } from '@/lib/storage';
import { useRouter } from 'next/navigation';


const question = {
    word: 'Hello',
    options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'],
    correctAnswer: 'Cześć'
};

const QUESTION_TIME_LIMIT = 15;

export default function QuizCorrectPage() {
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
    const [totalTime, setTotalTime] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [router]);

    useEffect(() => {
        const updateStep = () => {
            const state = getTutorialState();
            if (state?.stage === 'quiz') {
                setActiveStep(state.step);
            }
        };
        window.addEventListener('tutorial-state-changed', updateStep);
        updateStep();
        return () => window.removeEventListener('tutorial-state-changed', updateStep);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (activeStep === 0) { // Only animate for Slide 27
            interval = setInterval(() => {
                setQuestionTimer(prev => (prev > 0 ? prev - 1 : QUESTION_TIME_LIMIT));
                setTotalTime(prev => prev + 1);
            }, 1000);
        } else {
            setQuestionTimer(QUESTION_TIME_LIMIT);
            setTotalTime(0);
        }
        return () => clearInterval(interval);
    }, [activeStep]);
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const isAnswerView = activeStep === 2; // This is Slide 29
    
    const displayTimer = activeStep === 0 ? questionTimer : isAnswerView ? 11 : 15;
    const displayTotalTime = activeStep === 0 ? totalTime : isAnswerView ? 4 : 0;
    const questionTimeProgress = (displayTimer / QUESTION_TIME_LIMIT) * 100;
    
    const getButtonClass = (option: string) => {
        if (isAnswerView) {
            const isCorrectAnswer = option === question.correctAnswer;
            if (isCorrectAnswer) {
                return "bg-success text-success-foreground hover:bg-success/90";
            }
            return "bg-muted text-muted-foreground opacity-70";
        }
        return "bg-primary text-primary-foreground";
    };

    const overallProgress = isAnswerView ? 100 : 50;
    const score = isAnswerView ? 1 : 0;

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
                    <div
                        data-tutorial-id='quiz-correct-answer'
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
                    <div className="flex justify-center gap-4 w-full pt-4 border-t">
                        <Button variant="outline" size="icon" className="pointer-events-none opacity-50"><Home /></Button>
                        <Button variant="outline" size="icon" className="pointer-events-none opacity-50"><RefreshCw /></Button>
                        <div data-tutorial-id="quiz-pause-button">
                             <Button variant="outline" size="icon">
                                <Pause />
                            </Button>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="flex-col gap-4 p-6 pt-0">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-muted-foreground">
                           Pytanie 1 z 2
                        </div>
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
