"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { getTutorialState, type ErrorRecord, type TutorialState } from '@/lib/storage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, Pause, Home, RefreshCw, Play } from 'lucide-react';
import DemoQuizResults from './demo-quiz-results';

const demoQuestions = [
    { id: 1, word: 'Hello', options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Cześć' },
    { id: 2, word: 'Throughout', options: ['Na zewnątrz', 'Pod spodem', 'Wewnątrz', 'Przez cały (czas)'], correctAnswer: 'Przez cały (czas)' },
    { id: 3, word: 'Impeccable', options: ['Niedbały', 'Zwykły', 'Nieskazitelny', 'Brudny'], correctAnswer: 'Nieskazitelny' },
];

const QUESTION_TIME_LIMIT = 15;

export default function DemoQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "timeout" | null>(null);
    const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);
    
    const [totalTime, setTotalTime] = useState(0);
    const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
    const [isPaused, setIsPaused] = useState(false);
    const [isTutorialBubbleVisible, setIsTutorialBubbleVisible] = useState(false);
    const timeoutFiredRef = useRef(false);

    const checkTutorialState = useCallback(() => {
        const state = getTutorialState();
        const isQuizStepActive = state?.stage === 'quiz' && state.step >= 0 && state.step <= 6; // Steps 26-32
        setIsTutorialBubbleVisible(isQuizStepActive);

        // Special handling for the results screens
        if (state?.stage === 'quiz' && state.step >= 4) { // Steps 30, 31, 32
            if (currentQuestionIndex < demoQuestions.length) {
                // Force quiz to end to show results
                setCurrentQuestionIndex(demoQuestions.length);
            }
        } else if (currentQuestionIndex >= demoQuestions.length && (!state || state.stage !== 'quiz')) {
            // If tutorial is exited, reset quiz
            restartQuiz();
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        checkTutorialState();
        window.addEventListener('tutorial-state-changed', checkTutorialState);
        return () => window.removeEventListener('tutorial-state-changed', checkTutorialState);
    }, [checkTutorialState]);

    const currentQuestion = useMemo(() => demoQuestions[currentQuestionIndex], [currentQuestionIndex]);

    const advanceToNextQuestion = useCallback(() => {
        if (currentQuestionIndex < demoQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setAnswerStatus(null);
            setSelectedAnswer(null);
            setQuestionTimer(QUESTION_TIME_LIMIT);
            timeoutFiredRef.current = false;
        } else {
            setCurrentQuestionIndex(demoQuestions.length); // End of quiz
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (answerStatus) {
            const timer = setTimeout(advanceToNextQuestion, 2000);
            return () => clearTimeout(timer);
        }
    }, [answerStatus, advanceToNextQuestion]);

    useEffect(() => {
        if (isPaused || !!answerStatus || currentQuestionIndex >= demoQuestions.length || isTutorialBubbleVisible) {
            return;
        }

        const interval = setInterval(() => {
            setQuestionTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (!timeoutFiredRef.current) {
                        timeoutFiredRef.current = true;
                        setAnswerStatus("timeout");
                        setSessionErrors(prev => [...prev, {
                            word: currentQuestion.word,
                            userAnswer: 'No answer',
                            correctAnswer: currentQuestion.correctAnswer,
                            quiz: "Demo Quiz"
                        }]);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, answerStatus, currentQuestionIndex, demoQuestions.length, isTutorialBubbleVisible, currentQuestion]);

    useEffect(() => {
        if (isPaused || !!answerStatus || currentQuestionIndex >= demoQuestions.length || isTutorialBubbleVisible) {
            return;
        }
        const interval = setInterval(() => {
            setTotalTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isPaused, answerStatus, currentQuestionIndex, demoQuestions.length, isTutorialBubbleVisible]);

    const handleAnswerClick = (answer: string) => {
        if (answerStatus) return;

        setSelectedAnswer(answer);
        const isCorrect = answer === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            setAnswerStatus("correct");
        } else {
            setAnswerStatus("incorrect");
            setSessionErrors(prev => [...prev, {
                word: currentQuestion.word,
                userAnswer: answer,
                correctAnswer: currentQuestion.correctAnswer,
                quiz: "Demo Quiz"
            }]);
        }
    };
    
    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setAnswerStatus(null);
        setSessionErrors([]);
        setQuestionTimer(QUESTION_TIME_LIMIT);
        setTotalTime(0);
        setIsPaused(false);
        timeoutFiredRef.current = false;
    }

    const handlePauseClick = () => {
        setIsPaused(prev => !prev);
    };

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

    if (currentQuestionIndex >= demoQuestions.length) {
        return (
            <DemoQuizResults 
                score={score}
                totalQuestions={demoQuestions.length}
                totalTime={totalTime}
                sessionErrors={sessionErrors}
                onRestart={restartQuiz}
                quizName="Demo Quiz"
            />
        );
    }

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const overallProgress = ((currentQuestionIndex + 1) / demoQuestions.length) * 100;
    const questionTimeProgress = (questionTimer / QUESTION_TIME_LIMIT) * 100;

    return (
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
                 <div data-tutorial-id="quiz-timer" className="w-full space-y-4">
                    <div className="w-full flex justify-around gap-4 text-center">
                        <div className="flex items-center gap-2">
                            <Clock className="h-6 w-6" />
                            <span className="text-2xl font-bold">{questionTimer}s</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-6 w-6" />
                            <span className="text-2xl font-bold">{formatTime(totalTime)}</span>
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
                
                <div data-tutorial-id={answerStatus === 'correct' ? "quiz-correct-answer" : answerStatus === 'incorrect' ? "quiz-incorrect-answer" : undefined} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {currentQuestion.options.map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            disabled={!!answerStatus || (currentQuestionIndex === 0 && option !== currentQuestion.correctAnswer)}
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
                        <Button variant="outline" size="icon" onClick={handlePauseClick}>
                          {isPaused ? <Play /> : <Pause />}
                        </Button>
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