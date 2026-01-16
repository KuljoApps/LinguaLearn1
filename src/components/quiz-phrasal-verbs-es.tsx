
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Home, RefreshCw, Pause, Play, Clock, Trophy } from "lucide-react";
import { questions as initialQuestions, type Question } from "@/lib/questions-phrasal-verbs-es";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { updateStats, addError, updateTimeSpent, checkSessionAchievements, type Achievement } from "@/lib/storage";
import { playSound } from "@/lib/sounds";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { vibrate } from "@/lib/vibrations";
import { useToast } from "@/hooks/use-toast";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTION_TIME_LIMIT = 15;
const PAUSE_PENALTY = 5;
const MIN_TIME_FOR_PAUSE = 6;
const QUIZ_NAME = 'Verbos con Preposición (ES)';
const TIME_UPDATE_INTERVAL = 5; // seconds
const QUIZ_LENGTH = 10;


export default function QuizPhrasalVerbsEs() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "timeout" | null>(null);
  const [isRestartAlertOpen, setIsRestartAlertOpen] = useState(false);
  const [isHomeAlertOpen, setIsHomeAlertOpen] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  const router = useRouter();
  const { toast } = useToast();

  const showAchievementToast = useCallback((achievement: Achievement) => {
    playSound('achievement');
    toast({
        title: (
            <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber" />
                <span className="font-bold">¡Logro desbloqueado!</span>
            </div>
        ),
        description: `Has ganado: "${achievement.name_es || achievement.name}"`,
    });
  }, [toast]);
  
  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH));
  }, []);

  // Finalize session achievements
  useEffect(() => {
      if (currentQuestionIndex >= questions.length && questions.length > 0) {
          const isPerfect = score === questions.length;
          const unlocked = checkSessionAchievements(isPerfect);
          unlocked.forEach(showAchievementToast);
      }
  }, [currentQuestionIndex, questions.length, score, showAchievementToast]);

  // Handle transitions between questions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (answerStatus) {
      timer = setTimeout(() => {
        setAnswerStatus(null);
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setQuestionTimer(QUESTION_TIME_LIMIT);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [answerStatus]);

  // Per-question timer
  useEffect(() => {
    if (isPaused || !!answerStatus || currentQuestionIndex >= questions.length) {
      return;
    }

    const interval = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAnswerStatus("timeout");
          setSelectedAnswer(null);
          playSound("incorrect");
          vibrate("incorrect");
          
          const unlocked = updateStats(false, QUIZ_NAME, questions[currentQuestionIndex].id);
          unlocked.forEach(showAchievementToast);

          addError({
            word: questions[currentQuestionIndex].word,
            userAnswer: 'No answer',
            correctAnswer: questions[currentQuestionIndex].correctAnswer,
            quiz: QUIZ_NAME,
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, answerStatus, currentQuestionIndex, questions, showAchievementToast]);

  // Total quiz time and periodic time-based achievement check
  useEffect(() => {
    if (currentQuestionIndex >= questions.length || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
      if ((totalTime + 1) % TIME_UPDATE_INTERVAL === 0) {
          const unlocked = updateTimeSpent(TIME_UPDATE_INTERVAL);
          unlocked.forEach(showAchievementToast);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, questions.length, isPaused, totalTime, showAchievementToast]);


  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestion) {
      setShuffledOptions(shuffleArray(currentQuestion.options));
    }
  }, [currentQuestion]);
  
  const handleAnswerClick = (answer: string) => {
    if (answerStatus || isPaused) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const unlocked = updateStats(isCorrect, QUIZ_NAME, currentQuestion.id);
    unlocked.forEach(showAchievementToast);
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("correct");
      playSound("correct");
      vibrate("correct");
    } else {
      setAnswerStatus("incorrect");
      playSound("incorrect");
      vibrate("incorrect");
      addError({
        word: currentQuestion.word,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        quiz: QUIZ_NAME,
      });
    }
  };

  const handleRestartClick = () => {
    if (currentQuestionIndex > 0) {
      setIsRestartAlertOpen(true);
    } else {
      restartTest();
    }
  };
  
  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionIndex > 0) {
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
    setQuestions(shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setQuestionTimer(QUESTION_TIME_LIMIT);
    setTotalTime(0);
    setIsPaused(false);
    setIsRestartAlertOpen(false);
  }

  const goHome = () => {
    setIsHomeAlertOpen(false);
    router.push('/');
  }

  const getButtonClass = (option: string) => {
    if (!answerStatus) {
      return "bg-primary text-primary-foreground hover:bg-primary/90";
    }

    const isCorrectAnswer = option === currentQuestion.correctAnswer;
    const isSelectedAnswer = option === selectedAnswer;

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
  };
  
  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">¡Prueba completada!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-xl">Tu puntuación final es: {score} / {questions.length}</p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
                <Button onClick={restartTest}>Jugar de nuevo</Button>
                 <Link href="/" passHref>
                    <Button variant="outline">Volver al inicio</Button>
                </Link>
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
          <CardDescription>Selecciona la traducción correcta del verbo.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
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
              <p className="text-muted-foreground">¿Cuál es el significado polaco de</p>
              <p className="text-4xl font-headline font-bold text-card-foreground">"{currentQuestion.word}"?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {shuffledOptions.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={!!answerStatus || isPaused}
                className={cn("h-auto text-lg p-4 whitespace-normal transition-all duration-300", getButtonClass(option))}
              >
                {option}
              </Button>
            ))}
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
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Puntos:</span>
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
            <AlertDialogTitle>¿Estás seguro de que quieres reiniciar?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto reiniciará la prueba y se perderá todo tu progreso actual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={restartTest}>Reiniciar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isHomeAlertOpen} onOpenChange={setIsHomeAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de que quieres volver al inicio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto terminará la prueba actual y se perderá todo tu progreso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={goHome}>Volver al inicio</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
