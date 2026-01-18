
"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Home, RefreshCw, Pause, Play, Clock, Trophy } from "lucide-react";
import { questions as initialQuestions, type IrregularVerbQuestion } from "@/lib/questions-irregular-verbs-fr";
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

const QUESTION_TIME_LIMIT = 20;
const PAUSE_PENALTY = 5;
const MIN_TIME_FOR_PAUSE = 6;
const QUIZ_NAME = 'Verbes & Aux.';
const TIME_UPDATE_INTERVAL = 5;
const QUIZ_LENGTH = 10;

export default function QuizIrregularVerbsFr() {
  const [questions, setQuestions] = useState<IrregularVerbQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);

  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [translationStatus, setTranslationStatus] = useState<"correct" | "incorrect" | null>(null);
  const [selectedAuxiliary, setSelectedAuxiliary] = useState<'avoir' | 'être' | null>(null);
  const [auxiliaryStatus, setAuxiliaryStatus] = useState<"correct" | "incorrect" | null>(null);
  const [isLongText, setIsLongText] = useState(false);
  
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "timeout" | null>(null);
  
  const [isRestartAlertOpen, setIsRestartAlertOpen] = useState(false);
  const [isHomeAlertOpen, setIsHomeAlertOpen] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [shuffledTranslationOptions, setShuffledTranslationOptions] = useState<string[]>([]);
  const timeoutFiredRef = useRef(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const showAchievementToast = useCallback((achievement: Achievement) => {
    playSound('achievement');
    toast({
        title: (
            <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber" />
                <span className="font-bold">Succès débloqué !</span>
            </div>
        ),
        description: `Vous avez gagné : "${achievement.name_fr || achievement.name}"`,
    });
  }, [toast]);
  
  const resetQuestionState = useCallback(() => {
    setAnswerStatus(null);
    setSelectedTranslation(null);
    setTranslationStatus(null);
    setSelectedAuxiliary(null);
    setAuxiliaryStatus(null);
    setQuestionTimer(QUESTION_TIME_LIMIT);
    timeoutFiredRef.current = false;
  }, []);

  const restartTest = useCallback(() => {
    setQuestions(shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH));
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalTime(0);
    setIsPaused(false);
    setSessionErrors([]);
    setIsRestartAlertOpen(false);
    resetQuestionState();
  }, [resetQuestionState]);

  useEffect(() => {
    restartTest();
  }, [restartTest]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (answerStatus) {
      timer = setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        resetQuestionState();
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [answerStatus, resetQuestionState]);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      const isPerfect = score === questions.length;
      const unlocked = checkSessionAchievements(isPerfect);
      unlocked.forEach(showAchievementToast);
    }
  }, [currentQuestionIndex, questions.length, score, showAchievementToast]);

  useEffect(() => {
    if (isPaused || !!answerStatus || currentQuestionIndex >= questions.length) {
      return;
    }

    const interval = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!timeoutFiredRef.current) {
            timeoutFiredRef.current = true;
            setAnswerStatus("timeout");
            playSound("incorrect");
            vibrate("incorrect");
            
            const unlocked = updateStats(false, QUIZ_NAME, questions[currentQuestionIndex].id);
            unlocked.forEach(showAchievementToast);

            const errorRecord = {
              word: questions[currentQuestionIndex].verb,
              userAnswer: 'Pas de réponse',
              correctAnswer: `${questions[currentQuestionIndex].correctTranslation}, auxiliaire: ${questions[currentQuestionIndex].auxiliary}`,
              quiz: QUIZ_NAME,
            };
            addError(errorRecord);
            setSessionErrors(prev => [...prev, errorRecord]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, answerStatus, currentQuestionIndex, questions, showAchievementToast]);

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
      const options = shuffleArray(currentQuestion.translationOptions);
      setShuffledTranslationOptions(options);

      const hasLongOption = options.some(option => option.length > 15);
      setIsLongText(hasLongOption);
    }
  }, [currentQuestion]);
  
  const handleTranslationClick = (option: string) => {
    if (translationStatus || answerStatus) return;
    
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

  const handleAuxiliaryClick = (choice: 'avoir' | 'être') => {
    if (answerStatus) return;

    setSelectedAuxiliary(choice);
    const isCorrect = choice === currentQuestion.auxiliary;
    setAuxiliaryStatus(isCorrect ? 'correct' : 'incorrect');
    
    const overallCorrect = translationStatus === 'correct' && isCorrect;
    setAnswerStatus(overallCorrect ? 'correct' : 'incorrect');

    if (overallCorrect) {
      setScore(prev => prev + 1);
    } else if (translationStatus === 'correct' && !isCorrect) { // Log error only if translation was right but auxiliary was wrong
      const errorRecord = {
        word: currentQuestion.verb,
        userAnswer: `Auxiliaire: ${choice}`,
        correctAnswer: `Auxiliaire: ${currentQuestion.auxiliary}`,
        quiz: QUIZ_NAME,
      };
      addError(errorRecord);
      setSessionErrors(prev => [...prev, errorRecord]);
    }

    const unlocked = updateStats(overallCorrect, QUIZ_NAME, currentQuestion.id);
    unlocked.forEach(showAchievementToast);
    playSound(overallCorrect ? 'correct' : 'incorrect');
    vibrate(overallCorrect ? 'correct' : 'incorrect');
  };

  const handleRestartClick = () => {
    if (currentQuestionIndex > 0) setIsRestartAlertOpen(true);
    else restartTest();
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
  };
  
  const goHome = () => {
    setIsHomeAlertOpen(false);
    router.push('/');
  }

  const getTranslationButtonClass = (option: string) => {
    if (answerStatus === 'timeout') {
      return option === currentQuestion.correctTranslation
        ? "bg-success text-success-foreground"
        : "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
    }
    if (!translationStatus) return "bg-primary text-primary-foreground hover:bg-primary/90";
    const isCorrect = option === currentQuestion.correctTranslation;
    const isSelected = option === selectedTranslation;
    if (isCorrect) return "bg-success text-success-foreground";
    if (isSelected && !isCorrect) return "bg-destructive text-destructive-foreground";
    return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
  };
  
  const getAuxiliaryButtonClass = (choice: 'avoir' | 'être') => {
    if (answerStatus === 'timeout') {
      return choice === currentQuestion.auxiliary
        ? "bg-success text-success-foreground"
        : "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
    }
    if (!auxiliaryStatus) return "bg-primary text-primary-foreground hover:bg-primary/90";
    const isCorrect = choice === currentQuestion.auxiliary;
    const isSelected = choice === selectedAuxiliary;
    if (isCorrect) return "bg-success text-success-foreground";
    if (isSelected && !isCorrect) return "bg-destructive text-destructive-foreground";
    return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
  }
  
  if (!currentQuestion) {
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
    return null;
  }
  
  const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
  const questionTimeProgress = (questionTimer / QUESTION_TIME_LIMIT) * 100;

  return (
    <>
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
          <CardDescription className="pt-2">Sélectionnez la traduction et l'auxiliaire correct</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-full flex justify-around gap-4 text-center">
                <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <span className={cn("text-2xl font-bold transition-colors duration-300 text-card-foreground", showTimePenalty && "text-destructive animate-in fade-in-0 shake-sm")}>
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
              <p className="text-muted-foreground">Verbe irrégulier:</p>
              <p className="text-4xl font-headline font-bold">{`"${currentQuestion.verb}"`}</p>
          </div>

          <div className="w-full space-y-4">
            <p className="text-center text-muted-foreground">1. Choisissez la bonne traduction</p>
            <div className={cn("grid gap-2 w-full", isLongText ? "grid-cols-2" : "grid-cols-3")}>
              {shuffledTranslationOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleTranslationClick(option)}
                  disabled={!!translationStatus || !!answerStatus || isPaused}
                  className={cn("h-auto text-base p-2 whitespace-normal", getTranslationButtonClass(option))}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="animate-in fade-in-50 duration-500">
              <p className="text-center text-muted-foreground pt-4">2. Choisissez l'auxiliaire correct pour le Passé Composé</p>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <Button
                  onClick={() => handleAuxiliaryClick('avoir')}
                  disabled={translationStatus !== 'correct' || !!answerStatus || isPaused}
                  className={cn("h-16 text-lg", getAuxiliaryButtonClass('avoir'))}
                >
                  Avoir
                </Button>
                <Button
                  onClick={() => handleAuxiliaryClick('être')}
                  disabled={translationStatus !== 'correct' || !!answerStatus || isPaused}
                  className={cn("h-16 text-lg", getAuxiliaryButtonClass('être'))}
                >
                  Être
                </Button>
              </div>
            </div>
            
            {(answerStatus === 'incorrect' || answerStatus === 'timeout') && (
              <div className="text-center text-success font-medium animate-in fade-in">
                Réponse correcte: {currentQuestion.correctTranslation}, auxiliaire: {currentQuestion.auxiliary}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 w-full pt-4 border-t">
            <Link href="/" passHref><Button variant="outline" size="icon" onClick={handleHomeClick}><Home /></Button></Link>
            <Button variant="outline" size="icon" onClick={handleRestartClick}><RefreshCw /></Button>
            <Button variant="outline" size="icon" onClick={handlePauseClick} disabled={!isPaused && questionTimer < MIN_TIME_FOR_PAUSE}>
              {isPaused ? <Play /> : <Pause />}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 p-6 pt-0">
          <div className="flex justify-between w-full items-center">
              <div className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} sur {questions.length}</div>
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Score :</span>
                  <div key={score} className="text-2xl font-bold text-primary animate-in fade-in zoom-in-125 duration-300">
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
            <AlertDialogTitle>Êtes-vous sûr de vouloir recommencer ?</AlertDialogTitle>
            <AlertDialogDescription>Cela redémarrera le quiz et toute votre progression actuelle sera perdue.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={restartTest}>Recommencer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isHomeAlertOpen} onOpenChange={setIsHomeAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir retourner à l'accueil ?</AlertDialogTitle>
            <AlertDialogDescription>Cela mettra fin au quiz en cours et toute votre progression sera perdue.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={goHome}>Retour à l'accueil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
