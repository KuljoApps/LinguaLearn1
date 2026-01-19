
"use client";

import React, { useState, useEffect } from 'react';
import { getTutorialState, type ErrorRecord } from '@/lib/storage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, Pause, Home, RefreshCw } from 'lucide-react';
import DemoQuizResults from './demo-quiz-results';

const demoQuestions = [
    { id: 1, word: 'Hello', options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Cześć' },
    { id: 2, word: 'Funny', options: ['Poważny', 'Smutny', 'Zabawny', 'Nudny'], correctAnswer: 'Zabawny' },
    { id: 3, word: 'Throughout', options: ['Na zewnątrz', 'Pod spodem', 'Wewnątrz', 'Przez cały (czas)'], correctAnswer: 'Przez cały (czas)' },
];

export default function DemoQuiz() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const updateStep = () => {
            const tutorialState = getTutorialState();
            if (tutorialState?.stage === 'quiz') {
                setStep(tutorialState.step);
            }
        };
        updateStep();
        window.addEventListener('tutorial-state-changed', updateStep);
        return () => window.removeEventListener('tutorial-state-changed', updateStep);
    }, []);

    const getCurrentState = () => {
        let questionIndex = 0;
        let score = 0;
        let selectedAnswer: string | null = null;
        let answerStatus: 'correct' | 'incorrect' | null = null;
        let sessionErrors: Omit<ErrorRecord, 'id'>[] = [];
        let questionTimer = 12;
        let totalTime = 4;

        if (step >= 2) { 
            score = 1;
        }
        if (step >= 5) { 
             sessionErrors.push({
                word: demoQuestions[1].word,
                userAnswer: 'Smutny',
                correctAnswer: demoQuestions[1].correctAnswer,
                quiz: 'Demo Quiz'
            });
        }
        
        if (step >= 0 && step <=2) {
            questionIndex = 0;
            questionTimer = 12;
            totalTime = 4;
            if (step === 2) {
                 selectedAnswer = demoQuestions[0].correctAnswer;
                 answerStatus = 'correct';
                 questionTimer = 10;
                 totalTime = 6;
            }
        } else if (step === 3 || step === 4) {
            questionIndex = 1;
            questionTimer = 15;
            totalTime = 8;
             if (step === 4) {
                selectedAnswer = 'Smutny';
                answerStatus = 'incorrect';
                questionTimer = 11;
                totalTime = 12;
            }
        } else if (step === 5) {
            questionIndex = 2;
            selectedAnswer = 'Wewnątrz';
            answerStatus = 'incorrect';
            questionTimer = 8;
            totalTime = 16;
            sessionErrors.push({
                word: demoQuestions[2].word,
                userAnswer: 'Wewnątrz',
                correctAnswer: demoQuestions[2].correctAnswer,
                quiz: 'Demo Quiz'
            });
        } else if (step >= 6) {
            return { isResults: true, score: 1, totalTime: 20, sessionErrors };
        }

        return {
            isResults: false,
            question: demoQuestions[questionIndex],
            questionIndex,
            score,
            selectedAnswer,
            answerStatus,
            sessionErrors,
            questionTimer,
            totalTime
        };
    };
    
    const state = getCurrentState();

    if (state.isResults) {
        return (
             <DemoQuizResults 
                 score={state.score!}
                 totalQuestions={demoQuestions.length}
                 totalTime={state.totalTime!}
                 sessionErrors={state.sessionErrors}
                 quizName="Demo Quiz"
                 onRestart={() => {}}
             />
        );
    }
    
    const { question, questionIndex, score, selectedAnswer, answerStatus, questionTimer, totalTime } = state;

    const getButtonClass = (option: string) => {
        if (!answerStatus) {
          return "bg-primary text-primary-foreground hover:bg-primary/90";
        }
        const isCorrectAnswer = option === question!.correctAnswer;
        const isSelectedAnswer = option === selectedAnswer;
    
        if (isCorrectAnswer) {
          return "bg-success text-success-foreground";
        }
        if (isSelectedAnswer && !isCorrectAnswer) {
          return "bg-destructive text-destructive-foreground";
        }
        return "bg-muted text-muted-foreground opacity-70";
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const overallProgress = ((questionIndex + 1) / demoQuestions.length) * 100;
    const questionTimeProgress = (questionTimer! / 15) * 100;

    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2">
                    <LinguaLearnLogo className="h-8 w-8" />
                    <CardTitle className="text-3xl font-bold tracking-tight">
                        Lingua
                        <span className="relative inline-block">
                            Learn
                            <span className="absolute -right-0.5 -bottom-3 text-sm font-semibold tracking-normal text-amber">
                            Lite
                            </span>
                        </span>
                    </CardTitle>
                </div>
                <CardDescription className="pt-2">Wybierz poprawną odpowiedź</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
                 <div data-tutorial-id="quiz-timer" className="w-full space-y-4">
                    <div className="w-full flex justify-around gap-4 text-center">
                        <div className="flex items-center gap-2">
                            <Clock className="h-6 w-6" />
                            <span className="text-2xl font-bold">{questionTimer}s</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-6 w-6" />
                            <span className="text-2xl font-bold">{formatTime(totalTime!)}</span>
                        </div>
                    </div>
                    <Progress value={questionTimeProgress} className="w-full h-2" />
                </div>

                <div className="text-center space-y-2">
                    <p className="text-muted-foreground">What is the Polish meaning of</p>
                    <p className={cn(
                        "font-headline font-bold",
                        question!.word.length > 15 ? "text-3xl" : "text-4xl"
                    )}>"{question!.word}"?</p>
                </div>
                
                <div data-tutorial-id={step === 2 ? "quiz-correct-answer" : (step === 5 ? "quiz-incorrect-answer" : undefined)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {question!.options.map((option) => (
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
                    <Button variant="outline" size="icon" className="pointer-events-none"><Home /></Button>
                    <Button variant="outline" size="icon" className="pointer-events-none"><RefreshCw /></Button>
                    <div data-tutorial-id="quiz-pause-button">
                        <Button variant="outline" size="icon" className="pointer-events-none"><Pause /></Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 p-6 pt-0">
                <div className="flex justify-between w-full items-center">
                    <div className="text-sm text-muted-foreground">
                        Pytanie {questionIndex + 1} z {demoQuestions.length}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Punkty:</span>
                        <div className="text-2xl font-bold text-primary">
                            {score}
                        </div>
                    </div>
                </div>
                <Progress value={overallProgress} className="w-full h-2" />
            </CardFooter>
        </Card>
    );
}
