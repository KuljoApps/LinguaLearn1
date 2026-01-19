
"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
    { id: 2, word: 'Throughout', options: ['Na zewnątrz', 'Pod spodem', 'Wewnątrz', 'Przez cały (czas)'], correctAnswer: 'Przez cały (czas)' },
    { id: 3, word: 'Impeccable', options: ['Niedbały', 'Zwykły', 'Nieskazitelny', 'Brudny'], correctAnswer: 'Nieskazitelny' },
];

export default function DemoQuiz() {
    const [tutorialStep, setTutorialStep] = useState(0);

    // Local state for interactivity
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null);
    const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);
    
    // Static timers for demo purposes
    const [totalTime, setTotalTime] = useState(0);
    const [questionTimer, setQuestionTimer] = useState(15);

    // This effect SYNC-s the local state with the tutorial step
    useEffect(() => {
        const updateStateForTutorial = () => {
            const state = getTutorialState();
            if (state?.stage === 'quiz') {
                const step = state.step;
                setTutorialStep(step);

                // This logic sets up the "scene" for each step of the tutorial's quiz part.
                if (step <= 27) { // Scene 1: Answer Q1 (Hello)
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setSessionErrors([]);
                    setSelectedAnswer(null);
                    setAnswerStatus(null);
                    setQuestionTimer(12);
                    setTotalTime(4);
                } else if (step === 28) { // Scene 2: Show result of Q1
                    setCurrentQuestionIndex(0);
                    setScore(1);
                    setSelectedAnswer('Cześć');
                    setAnswerStatus('correct');
                    setQuestionTimer(10);
                    setTotalTime(6);
                } else if (step === 29) { // Scene 3: Show incorrect answer for Q2
                    setCurrentQuestionIndex(1);
                    setScore(1); // From previous question
                    // A wrong answer for 'Throughout'
                    const wrongAnswer = demoQuestions[1].options.find(o => o !== demoQuestions[1].correctAnswer)!;
                    setSelectedAnswer(wrongAnswer); 
                    setAnswerStatus('incorrect');
                    setSessionErrors([{
                        word: demoQuestions[1].word,
                        userAnswer: wrongAnswer,
                        correctAnswer: demoQuestions[1].correctAnswer,
                        quiz: "Demo Quiz"
                    }]);
                    setQuestionTimer(11);
                    setTotalTime(12);
                }
            }
        };

        updateStateForTutorial();
        window.addEventListener('tutorial-state-changed', updateStateForTutorial);
        return () => window.removeEventListener('tutorial-state-changed', updateStateForTutorial);
    }, []);
    
    const handleAnswerClick = (answer: string) => {
        // This handler only provides local visual feedback. It does not advance the quiz.
        if (answerStatus || tutorialStep >= 28) return; 

        const currentQuestion = demoQuestions[currentQuestionIndex];
        setSelectedAnswer(answer);
        const isCorrect = answer === currentQuestion.correctAnswer;

        if (isCorrect) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }
    };

    const currentQuestion = demoQuestions[currentQuestionIndex];
    const isResults = tutorialStep >= 30;

    if (isResults) {
        return (
            <DemoQuizResults 
                score={score}
                totalQuestions={demoQuestions.length}
                totalTime={20}
                sessionErrors={sessionErrors}
                quizName="Demo Quiz"
                onRestart={() => {}}
            />
        );
    }
    
    if (!currentQuestion) return null; // Should not happen

    const getButtonClass = (option: string) => {
        if (!answerStatus) {
            return "bg-primary text-primary-foreground hover:bg-primary/90";
        }
        const isCorrectAnswer = option === currentQuestion.correctAnswer;
        const isSelectedAnswer = option === selectedAnswer;
    
        if (isCorrectAnswer) return "bg-success text-success-foreground";
        if (isSelectedAnswer && !isCorrectAnswer) return "bg-destructive text-destructive-foreground";
        return "bg-muted text-muted-foreground opacity-70";
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    
    // Logic for button interactivity based on tutorial step
    const isQ1PreAnswer = currentQuestionIndex === 0 && tutorialStep <= 27;

    const overallProgress = ((currentQuestionIndex + 1) / demoQuestions.length) * 100;
    const questionTimeProgress = (questionTimer / 15) * 100;

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
                        currentQuestion.word.length > 15 ? "text-3xl" : "text-4xl"
                    )}>"{currentQuestion.word}"?</p>
                </div>
                
                <div data-tutorial-id={tutorialStep === 28 ? "quiz-correct-answer" : (tutorialStep === 29 ? "quiz-incorrect-answer" : undefined)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {currentQuestion.options.map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            disabled={
                                !!answerStatus || 
                                (isQ1PreAnswer && option !== currentQuestion.correctAnswer)
                            }
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
                        Pytanie {currentQuestionIndex + 1} z {demoQuestions.length}
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
