
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Home, RefreshCw, Pause, Play, Clock } from "lucide-react";
import { questions as initialQuestions, type IrregularVerbQuestion } from "@/lib/questions-irregular-verbs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateStats, addError } from "@/lib/storage";
import { playSound } from "@/lib/sounds";

const LinguaLearnLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'hsl(var(--chart-2))', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'hsl(var(--chart-4))', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M22 22H2" stroke="url(#grad1)" />
        <path d="M19 22V9.33a2 2 0 0 0-.64-1.42l-5-5.01a2 2 0 0 0-2.72 0l-5 5.01A2 2 0 0 0 5 9.33V22" stroke="url(#grad1)" />
        <path d="M9 13h6" stroke="url(#grad1)" />
        <path d="M9 17h6" stroke="url(#grad1)" />
        <path d="M15 22v-5a3 3 0 0 0-6 0v5" stroke="url(#grad1)" />
    </svg>
);


function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTION_TIME_LIMIT = 30;
const PAUSE_PENALTY = 10;
const MIN_TIME_FOR_PAUSE = 11;


export default function QuizIrregularVerbs() {
  const [questions, setQuestions] = useState<IrregularVerbQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [form2Input, setForm2Input] = useState("");
  const [form3Input, setForm3Input] = useState("");

  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "timeout" | null>(null);
  const [translationStatus, setTranslationStatus] = useState<"correct" | "incorrect" | null>(null);
  const [isRestartAlertOpen, setIsRestartAlertOpen] = useState(false);
  const [isHomeAlertOpen, setIsHomeAlertOpen] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  
  const router = useRouter();
  const form2InputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (answerStatus) {
      timer = setTimeout(() => {
        setAnswerStatus(null);
        setSelectedTranslation(null);
        setForm2Input("");
        setForm3Input("");
        setTranslationStatus(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setQuestionTimer(QUESTION_TIME_LIMIT);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [answerStatus]);

  useEffect(() => {
    if (isPaused || !!answerStatus || currentQuestionIndex >= questions.length) {
      return;
    }

    const interval = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAnswerStatus("timeout");
          setSelectedTranslation(null);
          playSound("incorrect");
          updateStats(false);
          addError({
            word: currentQuestion.verb,
            userAnswer: 'No answer',
            correctAnswer: `${currentQuestion.correctTranslation}, ${currentQuestion.form2}, ${currentQuestion.form3}`,
            quiz: 'Irregular Verbs',
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, answerStatus, currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, questions.length, isPaused]);
  
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  useEffect(() => {
    if (answerStatus === 'timeout') {
      setForm2Input(currentQuestion.form2.split('/')[0]);
      setForm3Input(currentQuestion.form3.split('/')[0]);
    }
  }, [answerStatus, currentQuestion]);

  useEffect(() => {
    if (translationStatus === 'correct') {
      form2InputRef.current?.focus();
    }
  }, [translationStatus]);
  
  const handleTranslationClick = (option: string) => {
    if (answerStatus || isPaused || translationStatus) return;

    setSelectedTranslation(option);
    const isCorrect = option === currentQuestion.correctTranslation;

    if (isCorrect) {
      setTranslationStatus('correct');
      playSound('correct');
    } else {
      setTranslationStatus('incorrect');
      setAnswerStatus('incorrect');
      playSound('incorrect');
      updateStats(false);
      addError({
        word: currentQuestion.verb,
        userAnswer: `Translation: ${option}`,
        correctAnswer: `Translation: ${currentQuestion.correctTranslation}`,
        quiz: 'Irregular Verbs',
      });
    }
  };
  
  const handleConfirmClick = () => {
    if (answerStatus || isPaused) return;

    const isForm2Correct = currentQuestion.form2.toLowerCase().split('/').includes(form2Input.trim().toLowerCase());
    const isForm3Correct = currentQuestion.form3.toLowerCase().split('/').includes(form3Input.trim().toLowerCase());
    const isCorrect = isForm2Correct && isForm3Correct;

    updateStats(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("correct");
      playSound('correct');
    } else {
      setAnswerStatus("incorrect");
      playSound('incorrect');
       addError({
        word: currentQuestion.verb,
        userAnswer: `Forms: ${form2Input}, ${form3Input}`,
        correctAnswer: `Forms: ${currentQuestion.form2}, ${currentQuestion.form3}`,
        quiz: 'Irregular Verbs',
      });
    }
  };

  const handleRestartClick = () => {
    if (currentQuestionIndex > 0 || form2Input || form3Input || selectedTranslation) {
      setIsRestartAlertOpen(true);
    } else {
      restartTest();
    }
  };
  
  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionIndex > 0 || form2Input || form3Input || selectedTranslation) {
      e.preventDefault();
      setIsHomeAlertOpen(true);
    }
  };

  const handlePauseClick = () => {
    if (!isPaused) {
      setIsPaused(true);
    } else {
      const newTime = Math.max(0, questionTimer - PAUSE_PENALTY);
      setShowTimePenalty(true);
      setTimeout(() => setShowTimePenalty(false), 500);
      setQuestionTimer(newTime);
      setIsPaused(false);
    }
  }

  const restartTest = () => {
    setQuestions(shuffleArray(initialQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedTranslation(null);
    setForm2Input("");
    setForm3Input("");
    setAnswerStatus(null);
    setTranslationStatus(null);
    setQuestionTimer(QUESTION_TIME_LIMIT);
    setTotalTime(0);
    setIsPaused(false);
    setIsRestartAlertOpen(false);
  }

  const goHome = () => {
    setIsHomeAlertOpen(false);
    router.push('/');
  }

  const getTranslationButtonClass = (option: string) => {
    const isCorrectAnswer = option === currentQuestion.correctTranslation;
    const isSelectedAnswer = option === selectedTranslation;

    if (answerStatus) {
        if (answerStatus === 'timeout') {
            if(isCorrectAnswer) return "bg-success text-success-foreground hover:bg-success/90";
            return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
        }

        if (isCorrectAnswer) {
          return "bg-success text-success-foreground hover:bg-success/90";
        }
        if (isSelectedAnswer && !isCorrectAnswer) {
          return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
        }
        return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
    }

    if (translationStatus && isSelectedAnswer) {
      return translationStatus === 'correct' 
          ? "bg-success text-success-foreground" 
          : "bg-destructive text-destructive-foreground";
    }
    if (translationStatus && !isSelectedAnswer) {
      return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
    }

    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };

  const getInputClass = (inputValue: string, correctValue: string) => {
    if (!answerStatus) return "";
    
    if (answerStatus === 'timeout') {
      return "bg-success text-success-foreground";
    }

    const isCorrect = correctValue.toLowerCase().split('/').includes(inputValue.trim().toLowerCase());

    return isCorrect ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground";
  }
  
  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-xl">Your final score is: {score} / {questions.length}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={restartTest}>Play Again</Button>
            </CardFooter>
        </Card>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
  const questionTimeProgress = (questionTimer / QUESTION_TIME_LIMIT) * 100;

  return (
    <>
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
              <LinguaLearnLogo className="h-8 w-8" />
              <CardTitle className="text-3xl font-bold tracking-tight">LinguaLearn</CardTitle>
          </div>
          <CardDescription>Select the translation and fill in the verb forms.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-full flex justify-around gap-4 text-center">
                <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <span className={cn(
                        "text-2xl font-bold transition-colors duration-300 text-card-foreground",
                        showTimePenalty && "text-destructive animate-in fade-in-0 shake-sm"
                    )}>
                        {questionTimer}s
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <span className="text-2xl font-bold text-card-foreground">{formatTime(totalTime)}</span>
                </div>
            </div>
            <Progress value={questionTimeProgress} className="w-full h-2" />

          <div className="text-center space-y-2">
              <p className="text-muted-foreground">Irregular verb:</p>
              <p className="text-4xl font-headline font-bold text-card-foreground">"{currentQuestion.verb}"</p>
          </div>

          <div className="w-full space-y-4">
            <p className="text-center text-muted-foreground">1. Select the correct translation</p>
            <div className="grid grid-cols-3 gap-2 w-full">
              {currentQuestion.translationOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleTranslationClick(option)}
                  disabled={!!answerStatus || isPaused || translationStatus !== null}
                  className={cn("h-auto text-base p-2 whitespace-normal transition-all duration-300", getTranslationButtonClass(option))}
                >
                  {option}
                </Button>
              ))}
            </div>

            <p className="text-center text-muted-foreground pt-4">2. Type the Past Simple & Past Participle forms</p>
            <div className="grid grid-cols-3 gap-2 w-full items-center text-center">
              <Input value={currentQuestion.verb} readOnly className="text-center font-bold bg-muted" />
              <Input
                ref={form2InputRef}
                value={form2Input}
                onChange={(e) => setForm2Input(e.target.value)}
                placeholder="Past Simple"
                disabled={!!answerStatus || isPaused || translationStatus !== 'correct'}
                className={cn("text-center transition-colors duration-300", getInputClass(form2Input, currentQuestion.form2))}
              />
              <Input
                value={form3Input}
                onChange={(e) => setForm3Input(e.target.value)}
                placeholder="Past Participle"
                disabled={!!answerStatus || isPaused || translationStatus !== 'correct'}
                className={cn("text-center transition-colors duration-300", getInputClass(form3Input, currentQuestion.form3))}
              />
            </div>
            {(answerStatus === 'incorrect' || (answerStatus === 'timeout' && (!form2Input || !form3Input))) && (
              <div className="text-center text-success font-medium animate-in fade-in">
                  Correct forms: {currentQuestion.form2}, {currentQuestion.form3}
              </div>
            )}
            
            {translationStatus === 'correct' && (
              <Button 
                  className="w-full mt-4 h-12 text-lg"
                  onClick={handleConfirmClick}
                  disabled={!!answerStatus || isPaused || !form2Input || !form3Input}
              >
                  Confirm Answer
              </Button>
            )}
          </div>

          <div className="flex justify-center gap-4 w-full pt-4 border-t">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" onClick={handleHomeClick}>
                <Home />
              </Button>
            </Link>
            <Button variant="outline" size="icon" onClick={handleRestartClick}>
              <RefreshCw />
            </Button>
            <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePauseClick}
                disabled={!isPaused && questionTimer < MIN_TIME_FOR_PAUSE}
            >
              {isPaused ? <Play /> : <Pause />}
            </Button>
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
      
      <AlertDialog open={isRestartAlertOpen} onOpenChange={setIsRestartAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to restart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restart the quiz and all your current progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={restartTest}>Restart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isHomeAlertOpen} onOpenChange={setIsHomeAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to go home?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end the current quiz and all your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={goHome}>Go to Home</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
