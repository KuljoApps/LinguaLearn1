
"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Home, RefreshCw, Pause, Play, Clock, Trophy } from "lucide-react";
import { questions as initialQuestions, type IrregularVerbQuestion } from "@/lib/questions-irregular-verbs-it";
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
import { updateStats, addError, updateTimeSpent, checkSessionAchievements, type Achievement, type ErrorRecord } from "@/lib/storage";
import { playSound } from "@/lib/sounds";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { vibrate } from "@/lib/vibrations";
import { useToast } from "@/hooks/use-toast";
import QuizResults from "./quiz-results";

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
const QUIZ_NAME = 'Verbi Irregolari (IT)';
const TIME_UPDATE_INTERVAL = 5; // seconds
const QUIZ_LENGTH = 10;


export default function QuizIrregularVerbsIt() {
  const [questions, setQuestions] = useState<IrregularVerbQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [form2Input, setForm2Input] = useState("");
  const [form3Input, setForm3Input] = useState("");
  const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);

  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "timeout" | null>(null);
  const [translationStatus, setTranslationStatus] = useState<"correct" | "incorrect" | null>(null);
  const [isRestartAlertOpen, setIsRestartAlertOpen] = useState(false);
  const [isHomeAlertOpen, setIsHomeAlertOpen] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [shuffledTranslationOptions, setShuffledTranslationOptions] = useState<string[]>([]);
  
  const router = useRouter();
  const form2InputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const showAchievementToast = useCallback((achievement: Achievement) => {
    playSound('achievement');
    toast({
        title: (
            <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber" />
                <span className="font-bold">Obiettivo Raggiunto!</span>
            </div>
        ),
        description: `Hai guadagnato: "${achievement.name_it || achievement.name}"`,
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
          setSelectedTranslation(null);
          playSound("incorrect");
          vibrate("incorrect");

          const unlocked = updateStats(false, QUIZ_NAME, questions[currentQuestionIndex].id);
          unlocked.forEach(showAchievementToast);
          
          const errorRecord = {
            word: questions[currentQuestionIndex].verb,
            userAnswer: 'No answer',
            correctAnswer: `${questions[currentQuestionIndex].correctTranslation}, ${questions[currentQuestionIndex].form2}, ${questions[currentQuestionIndex].form3}`,
            quiz: QUIZ_NAME,
          };
          addError(errorRecord);
          setSessionErrors(prev => [...prev, errorRecord]);
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
      setShuffledTranslationOptions(shuffleArray(currentQuestion.translationOptions));
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (answerStatus === 'timeout' && currentQuestion) {
      setForm2Input(currentQuestion.form2);
      setForm3Input(currentQuestion.form3);
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
      vibrate('correct');
    } else {
      setTranslationStatus('incorrect');
      setAnswerStatus('incorrect');
      playSound('incorrect');
      vibrate('incorrect');

      const unlocked = updateStats(false, QUIZ_NAME, currentQuestion.id);
      unlocked.forEach(showAchievementToast);

      const errorRecord = {
        word: currentQuestion.verb,
        userAnswer: option,
        correctAnswer: currentQuestion.correctTranslation,
        quiz: QUIZ_NAME,
      };
      addError(errorRecord);
      setSessionErrors(prev => [...prev, errorRecord]);
    }
  };
  
  const handleConfirmClick = () => {
    if (answerStatus || isPaused) return;

    const isForm2Correct = form2Input.trim().toLowerCase() === currentQuestion.form2.toLowerCase();
    const isForm3Correct = form3Input.trim().toLowerCase() === currentQuestion.form3.toLowerCase();
    const isCorrect = isForm2Correct && isForm3Correct && translationStatus === 'correct';

    const unlocked = updateStats(isCorrect, QUIZ_NAME, currentQuestion.id);
    unlocked.forEach(showAchievementToast);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("correct");
      playSound('correct');
      vibrate('correct');
    } else {
      setAnswerStatus("incorrect");
      playSound('incorrect');
      vibrate('incorrect');
       const errorRecord = {
        word: currentQuestion.verb,
        userAnswer: `${form2Input}, ${form3Input}`,
        correctAnswer: `${currentQuestion.form2}, ${currentQuestion.form3}`,
        quiz: QUIZ_NAME,
      };
      addError(errorRecord);
      setSessionErrors(prev => [...prev, errorRecord]);
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
    setQuestions(shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH));
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
    setSessionErrors([]);
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

    const isCorrect = inputValue.trim().toLowerCase() === correctValue.toLowerCase();

    return isCorrect ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground";
  }
  
  if (questions.length > 0 && currentQuestionIndex >= questions.length) {
    return (
        <QuizResults
            score={score}
            totalQuestions={questions.length}
            totalTime={totalTime}
            sessionErrors={sessionErrors}
            quizName={QUIZ_NAME}
            onRestart={restartTest}
        />
    );
  }
  
  if (questions.length === 0 || !currentQuestion) {
    return null;
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
          <CardDescription>Seleziona la traduzione e compila le forme del verbo.</CardDescription>
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
              <p className="text-muted-foreground">Verbo irregolare:</p>
              <p className="text-4xl font-headline font-bold text-card-foreground">"{currentQuestion.verb}"?</p>
          </div>

          <div className="w-full space-y-4">
            <p className="text-center text-muted-foreground">1. Seleziona la traduzione corretta</p>
            <div className="grid grid-cols-3 gap-2 w-full">
              {shuffledTranslationOptions.map((option) => (
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

            <p className="text-center text-muted-foreground pt-4">2. Scrivi il Passato Prossimo & il Participio Passato</p>
            <div className="grid grid-cols-3 gap-2 w-full items-center text-center">
              <Input value={currentQuestion.verb} readOnly className="text-center font-bold bg-muted" />
              <Input
                ref={form2InputRef}
                value={form2Input}
                onChange={(e) => setForm2Input(e.target.value)}
                placeholder="Passato Prossimo"
                disabled={!!answerStatus || isPaused || translationStatus !== 'correct'}
                className={cn("text-center transition-colors duration-300", getInputClass(form2Input, currentQuestion.form2))}
              />
              <Input
                value={form3Input}
                onChange={(e) => setForm3Input(e.target.value)}
                placeholder="Participio Passato"
                disabled={!!answerStatus || isPaused || translationStatus !== 'correct'}
                className={cn("text-center transition-colors duration-300", getInputClass(form3Input, currentQuestion.form3))}
              />
            </div>
            {(answerStatus === 'incorrect' || (answerStatus === 'timeout' && (!form2Input || !form3Input))) && (
              <div className="text-center text-success font-medium animate-in fade-in">
                  Forme corrette: {currentQuestion.form2}, {currentQuestion.form3}
              </div>
            )}
            
            {translationStatus === 'correct' && (
              <Button 
                  className="w-full mt-4 h-12 text-lg"
                  onClick={handleConfirmClick}
                  disabled={!!answerStatus || isPaused || !form2Input || !form3Input}
              >
                  Conferma Risposta
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
                  Domanda {currentQuestionIndex + 1} di {questions.length}
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Punti:</span>
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
            <AlertDialogTitle>Sei sicuro di voler ricominciare?</AlertDialogTitle>
            <AlertDialogDescription>
              Questo riavvierà il quiz e tutti i tuoi progressi attuali andranno persi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={restartTest}>Ricomincia</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isHomeAlertOpen} onOpenChange={setIsHomeAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro di voler tornare alla home?</AlertDialogTitle>
            <AlertDialogDescription>
              Questo terminerà il quiz attuale e tutti i tuoi progressi andranno persi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={goHome}>Torna alla Home</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
