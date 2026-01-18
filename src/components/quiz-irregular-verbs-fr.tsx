
"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
const QUIZ_NAME = 'Verbes Irréguliers & Auxiliaires';
const TIME_UPDATE_INTERVAL = 5;
const QUIZ_LENGTH = 10;

export default function QuizIrregularVerbsFr() {
  const [questions, setQuestions] = useState<IrregularVerbQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);

  const [stage, setStage] = useState<'translation' | 'auxiliary'>('translation');
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [translationStatus, setTranslationStatus] = useState<"correct" | "incorrect" | null>(null);
  const [auxiliaryStatus, setAuxiliaryStatus] = useState<"correct" | "incorrect" | null>(null);
  const [selectedAuxiliary, setSelectedAuxiliary] = useState<'avoir' | 'être' | null>(null);
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
  
  const resetQuestionState = () => {
    setStage('translation');
    setAnswerStatus(null);
    setSelectedTranslation(null);
    setTranslationStatus(null);
    setSelectedAuxiliary(null);
    setAuxiliaryStatus(null);
    setQuestionTimer(QUESTION_TIME_LIMIT);
    timeoutFiredRef.current = false;
  };

  const restartTest = () => {
    setQuestions(shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH));
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalTime(0);
    setIsPaused(false);
    setSessionErrors([]);
    setIsRestartAlertOpen(false);
    resetQuestionState();
  };

  useEffect(() => {
    restartTest();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (answerStatus) {
      timer = setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        resetQuestionState();
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [answerStatus]);

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
              userAnswer: 'No answer',
              correctAnswer: `Tłumaczenie: ${questions[currentQuestionIndex].correctTranslation}, Czasownik posiłkowy: ${questions[currentQuestionIndex].auxiliary}`,
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
      setShuffledTranslationOptions(shuffleArray(currentQuestion.translationOptions));
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
      setTimeout(() => setStage('auxiliary'), 500);
    } else {
      setTranslationStatus('incorrect');
      setAnswerStatus('incorrect');
      playSound('incorrect');
      vibrate('incorrect');

      const unlocked = updateStats(false, QUIZ_NAME, currentQuestion.id);
      unlocked.forEach(showAchievementToast);

      const errorRecord = {
        word: currentQuestion.verb,
        userAnswer: `Tłumaczenie: ${option}`,
        correctAnswer: `Tłumaczenie: ${currentQuestion.correctTranslation}`,
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
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

    const unlocked = updateStats(isCorrect, QUIZ_NAME, currentQuestion.id);
    unlocked.forEach(showAchievementToast);
    playSound(isCorrect ? 'correct' : 'incorrect');
    vibrate(isCorrect ? 'correct' : 'incorrect');

    if (!isCorrect) {
      const errorRecord = {
        word: currentQuestion.verb,
        userAnswer: `Czasownik posiłkowy: ${choice}`,
        correctAnswer: `Czasownik posiłkowy: ${currentQuestion.auxiliary}`,
        quiz: QUIZ_NAME,
      };
      addError(errorRecord);
      setSessionErrors(prev => [...prev, errorRecord]);
    } else {
        setScore(prev => prev + 1);
    }
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

  const handlePauseClick = () => setIsPaused(prev => !prev);
  
  const goHome = () => {
    setIsHomeAlertOpen(false);
    router.push('/');
  }

  const getTranslationButtonClass = (option: string) => {
    if (!translationStatus) return "bg-primary text-primary-foreground hover:bg-primary/90";
    const isCorrect = option === currentQuestion.correctTranslation;
    const isSelected = option === selectedTranslation;
    if (isCorrect) return "bg-success text-success-foreground";
    if (isSelected && !isCorrect) return "bg-destructive text-destructive-foreground";
    return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
  };
  
  const getAuxiliaryButtonClass = (choice: 'avoir' | 'être') => {
    if (!auxiliaryStatus) return "bg-primary text-primary-foreground hover:bg-primary/90";
    const isCorrect = choice === currentQuestion.auxiliary;
    const isSelected = choice === selectedAuxiliary;
    if (isCorrect) return "bg-success text-success-foreground";
    if (isSelected && !isCorrect) return "bg-destructive text-destructive-foreground";
    return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
  }
  
  if (!currentQuestion) {
    if (questions.length > 0) {
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
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2">
              <LinguaLearnLogo className="h-8 w-8" />
              <CardTitle className="text-3xl font-bold tracking-tight">LinguaLearn Lite</CardTitle>
          </div>
          <CardDescription className="pt-2">Wybierz tłumaczenie i poprawny czasownik posiłkowy</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full flex justify-around gap-4 text-center">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <span className={cn("text-2xl font-bold", showTimePenalty && "text-destructive")}>{questionTimer}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <span className="text-2xl font-bold">{formatTime(totalTime)}</span>
            </div>
          </div>
          <Progress value={questionTimeProgress} className="w-full h-2" />

          <div className="text-center space-y-2">
              <p className="text-muted-foreground">Verbe irrégulier:</p>
              <p className="text-4xl font-headline font-bold">"{currentQuestion.verb}"</p>
          </div>

          <div className="w-full space-y-4">
            {stage === 'translation' && (
              <>
                <p className="text-center text-muted-foreground">1. Wybierz poprawne tłumaczenie</p>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {shuffledTranslationOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleTranslationClick(option)}
                      disabled={!!answerStatus || isPaused}
                      className={cn("h-auto text-base p-2", getTranslationButtonClass(option))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {stage === 'auxiliary' && (
              <>
                <p className="text-center text-muted-foreground">2. Wybierz poprawny czasownik posiłkowy dla Passé Composé</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button
                    onClick={() => handleAuxiliaryClick('avoir')}
                    disabled={!!answerStatus}
                    className={cn("h-16 text-lg", getAuxiliaryButtonClass('avoir'))}
                  >
                    Avoir
                  </Button>
                  <Button
                    onClick={() => handleAuxiliaryClick('être')}
                    disabled={!!answerStatus}
                    className={cn("h-16 text-lg", getAuxiliaryButtonClass('être'))}
                  >
                    Être
                  </Button>
                </div>
              </>
            )}

            {answerStatus === 'incorrect' && (
              <div className="text-center text-success font-medium animate-in fade-in">
                Poprawnie: {currentQuestion.correctTranslation}, {currentQuestion.auxiliary}
              </div>
            )}
            {answerStatus === 'timeout' && (
              <div className="text-center text-destructive font-medium animate-in fade-in">
                Czas minął! Poprawna odpowiedź: {currentQuestion.correctTranslation}, {currentQuestion.auxiliary}
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
              <div className="text-sm text-muted-foreground">Pytanie {currentQuestionIndex + 1} z {questions.length}</div>
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Wynik:</span>
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
