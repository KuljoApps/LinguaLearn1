"use client";

import { useState, useEffect, useMemo } from "react";
import { BrainCircuit } from "lucide-react";
import { questions as initialQuestions, type Question } from "@/lib/questions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null);
  
  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions));
  }, []);

  useEffect(() => {
    if (answerStatus) {
      const timer = setTimeout(() => {
        setAnswerStatus(null);
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [answerStatus, questions.length]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  
  const handleAnswerClick = (answer: string) => {
    if (answerStatus) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }
  };

  const getButtonClass = (option: string) => {
    if (!answerStatus) {
      return "bg-card hover:bg-secondary";
    }

    const isCorrectAnswer = option === currentQuestion.correctAnswer;
    const isSelectedAnswer = option === selectedAnswer;

    if (isCorrectAnswer) {
      return "bg-success text-success-foreground hover:bg-success/90";
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    }
    return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
  };
  
  if (questions.length === 0) {
    return null; // Or a loading spinner
  }

  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold tracking-tight">LinguaLearn</CardTitle>
        </div>
        <CardDescription>Select the correct translation.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-2">
            <p className="text-muted-foreground">What is the English meaning of</p>
            <p className="text-4xl font-headline font-bold text-card-foreground">"{currentQuestion.word}"?</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswerClick(option)}
              disabled={!!answerStatus}
              className={cn("h-auto text-base p-4 whitespace-normal transition-all duration-300", getButtonClass(option))}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4 p-6 pt-0">
        <div className="flex justify-between w-full items-center">
            <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Score:</span>
                <div
                    key={score}
                    className="text-2xl font-bold text-primary animate-in fade-in zoom-in-125 duration-300"
                >
                    {score}
                </div>
            </div>
        </div>
        <Progress value={progressValue} className="w-full h-2" />
      </CardFooter>
    </Card>
  );
}
