
"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Home, RefreshCw, Pause, Play, Clock, Trophy } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { questions as initialQuestions, type Question } from "@/lib/questions-en-pl";
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
import { updateStats, addError, updateTimeSpent, checkSessionAchievements, type Achievement, type ErrorRecord, getTutorialState } from "@/lib/storage";
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

const QUESTION_TIME_LIMIT = 15;
const PAUSE_PENALTY = 5;
const MIN_TIME_FOR_PAUSE = 6;
const QUIZ_NAME = 'English - Polish';
const TIME_UPDATE_INTERVAL = 5;
const QUIZ_LENGTH = 10;

const tutorialQuestions: Question[] = [
  { id: 999, language: 'English', word: 'Hello', options: ['Cześć', 'Do widzenia', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Cześć' },
  { id: 998, language: 'English', word: 'Reliable', options: ['Religijny', 'Niezawodny', 'Niepewny', 'Zmienny'], correctAnswer: 'Niezawodny' },
  { id: 997, language: 'English', word: 'Conscientious', options: ['Sumienny', 'Niedbały', 'Leniwy', 'Powierzchowny'], correctAnswer: 'Sumienny' },
];


export default function QuizEnPl() {
  const searchParams = useSearchParams();
  const isTutorialMode = useMemo(() => searchParams.get('tutorial') === 'true', [searchParams]);
  
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
  const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);
  const timeoutFiredRef = useRef(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const [tutorialStep, setTutorialStep] = useState<number | null>(null);

    useEffect(() => {
        if (!isTutorialMode) return;
        const handleStateUpdate = () => {
            const state = getTutorialState();
            setTutorialStep(state?.stage === 'quiz' ? state.step : null);
        };
        window.addEventListener('tutorial-state-changed', handleStateUpdate);
        handleStateUpdate();
        return () => window.removeEventListener('tutorial-state-changed', handleStateUpdate);
    }, [isTutorialMode]);

  const showAchievementToast = useCallback((achievement: Achievement) => {
    playSound('achievement');
    toast({
        title: (
            <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber" />
                <span className="font-bold">Achievement Unlocked!</span>
            </div>
        ),
        description: `You've earned: "${achievement.name}"`,
    });
  }, [toast]);
  
  useEffect(() => {
    if (isTutorialMode) {
      setQuestions(tutorialQuestions);
    } else {
      const newQuestions = shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH);
      setQuestions(newQuestions);
    }
    timeoutFiredRef.current = false;
  }, [isTutorialMode]);

  useEffect(() => {
      timeoutFiredRef.current = false;
  }, [currentQuestionIndex]);

  useEffect(() => {
      if (!isTutorialMode && currentQuestionIndex >= questions.length && questions.length > 0) {
          const isPerfect = score === questions.length;
          const unlocked = checkSessionAchievements(isPerfect);
          unlocked.forEach(showAchievementToast);
      }
  }, [isTutorialMode, currentQuestionIndex, questions.length, score, showAchievementToast]);

  useEffect(() => {
    if (isTutorialMode) return;
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
  }, [answerStatus, isTutorialMode]);

  useEffect(() => {
    if (isTutorialMode || isPaused || !!answerStatus || currentQuestionIndex >= questions.length) {
      return;
    }

    const interval = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!timeoutFiredRef.current) {
            timeoutFiredRef.current = true;
            setAnswerStatus("timeout");
            setSelectedAnswer(null);
            playSound("incorrect");
            vibrate("incorrect");
            const unlocked = updateStats(false, QUIZ_NAME, questions[currentQuestionIndex].id);
            unlocked.forEach(showAchievementToast);
            
            const errorRecord = {
              word: questions[currentQuestionIndex].word,
              userAnswer: 'No answer',
              correctAnswer: questions[currentQuestionIndex].correctAnswer,
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
  }, [isTutorialMode, isPaused, answerStatus, currentQuestionIndex, questions, showAchievementToast]);

  useEffect(() => {
    if (isTutorialMode || currentQuestionIndex >= questions.length || isPaused) {
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
  }, [isTutorialMode, currentQuestionIndex, questions.length, isPaused, totalTime, showAchievementToast]);


  const {
    question: displayQuestion,
    answerStatus: displayAnswerStatus,
    selectedAnswer: displaySelectedAnswer,
    isFinished: isTutorialFinished
  } = useMemo(() => {
      if (!isTutorialMode || tutorialStep === null || questions.length === 0) {
          return { question: questions[currentQuestionIndex], answerStatus, selectedAnswer, isFinished: false };
      }
  
      if (tutorialStep >= 4) {
          return { question: questions[2], answerStatus: null, selectedAnswer: null, isFinished: true };
      }
      
      const questionIndex = tutorialStep < 2 ? 0 : tutorialStep === 2 ? 0 : 1;
      const question = questions[questionIndex];
  
      let status: typeof answerStatus = null;
      let selAnswer: string | null = null;
      
      if (tutorialStep === 2) {
          status = 'correct';
          selAnswer = question.correctAnswer;
      } else if (tutorialStep === 3) {
          status = 'incorrect';
          selAnswer = question.options.find(o => o !== question.correctAnswer)!;
      }
  
      return { question, answerStatus: status, selectedAnswer: selAnswer, isFinished: false };
  
  }, [isTutorialMode, tutorialStep, questions, currentQuestionIndex, answerStatus, selectedAnswer]);

  useEffect(() => {
    if (displayQuestion) {
      setShuffledOptions(shuffleArray(displayQuestion.options));
    }
  }, [displayQuestion]);
  
  const handleAnswerClick = (answer: string) => {
    if (displayAnswerStatus || isPaused || isTutorialMode) return;

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
      const errorRecord = {
        word: currentQuestion.word,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        quiz: QUIZ_NAME,
      };
      addError(errorRecord);
      setSessionErrors(prev => [...prev, errorRecord]);
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
    if (currentQuestionIndex > 0 && !isTutorialMode) {
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
    setQuestions(isTutorialMode ? tutorialQuestions : shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setQuestionTimer(QUESTION_TIME_LIMIT);
    setTotalTime(0);
    setIsPaused(false);
    setSessionErrors([]);
    timeoutFiredRef.current = false;
    setIsRestartAlertOpen(false);
  }

  const goHome = () => {
    setIsHomeAlertOpen(false);
    router.push('/');
  }

  const getButtonClass = (option: string) => {
    if (!displayAnswerStatus) {
      return "bg-primary text-primary-foreground hover:bg-primary/90";
    }
    
    const isCorrectAnswer = option === displayQuestion.correctAnswer;
    const isSelectedAnswer = option === displaySelectedAnswer;

    if (displayAnswerStatus === 'timeout') {
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
  
  if (questions.length === 0) return null;

  if (isTutorialFinished || (!isTutorialMode && currentQuestionIndex >= questions.length)) {
    return (
        <QuizResults
            score={isTutorialMode ? 1 : score}
            totalQuestions={isTutorialMode ? 2 : questions.length}
            totalTime={totalTime}
            sessionErrors={isTutorialMode ? [{ word: tutorialQuestions[1].word, userAnswer: tutorialQuestions[1].options.find(o => o !== tutorialQuestions[1].correctAnswer)!, correctAnswer: tutorialQuestions[1].correctAnswer, quiz: QUIZ_NAME }] : sessionErrors}
            quizName={QUIZ_NAME}
            onRestart={restartTest}
            isTutorialMode={isTutorialMode}
        />
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const progressValue = ((currentQuestionIndex + 1) / (isTutorialMode ? 3 : questions.length)) * 100;
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
          <CardDescription className="pt-2">Select the correct translation</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
            <div className="w-full flex justify-around gap-4 text-center">
                <div className="flex items-center gap-2" data-tutorial-id="quiz-timer">
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
              <p className="text-muted-foreground">What is the Polish meaning of</p>
              <p className={cn(
                  "font-headline font-bold text-card-foreground",
                  displayQuestion.word.length > 20 ? "text-3xl" : "text-4xl"
              )}>"{displayQuestion.word}"?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {shuffledOptions.map((option) => {
              const isCorrectForTutorial = isTutorialMode && tutorialStep === 2 && option === displayQuestion.correctAnswer;
              const isIncorrectForTutorial = isTutorialMode && tutorialStep === 3 && (option === displaySelectedAnswer || option === displayQuestion.correctAnswer);
              
              let tutorialId = undefined;
              if (isCorrectForTutorial) {
                tutorialId = 'quiz-answer-correct';
              } else if (isIncorrectForTutorial) {
                tutorialId = 'quiz-answer-incorrect';
              }

              return (
                <Button
                  key={option}
                  data-tutorial-id={tutorialId}
                  onClick={() => handleAnswerClick(option)}
                  disabled={!!displayAnswerStatus || isPaused}
                  className={cn("h-auto text-lg p-4 whitespace-normal transition-all duration-300", getButtonClass(option))}
                >
                  {option}
                </Button>
              )
            })}
          </div>
          <div className="flex justify-center gap-4 w-full pt-4 border-t">
            {isTutorialMode ? (
              <Button variant="outline" size="icon" disabled>
                <Home />
              </Button>
            ) : (
              <Link href="/" passHref>
                <Button variant="outline" size="icon" onClick={handleHomeClick}>
                  <Home />
                </Button>
              </Link>
            )}
            <Button variant="outline" size="icon" onClick={handleRestartClick}>
              <RefreshCw />
            </Button>
            <Button 
                data-tutorial-id="quiz-pause-button"
                variant="outline" 
                size="icon" 
                onClick={handlePauseClick}
                disabled={isTutorialMode || (!isPaused && questionTimer < MIN_TIME_FOR_PAUSE)}
            >
              {isPaused ? <Play /> : <Pause />}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 p-6 pt-0">
          <div className="flex justify-between w-full items-center">
              <div className="text-sm text-muted-foreground">
                  Question {isTutorialMode ? (tutorialStep! < 3 ? 1 : 2) : currentQuestionIndex + 1} of {isTutorialMode ? 2 : questions.length}
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Score:</span>
                  <div
                      key={score}
                      className="text-2xl font-bold text-primary animate-in fade-in zoom-in-125 duration-300"
                  >
                      {isTutorialMode ? (tutorialStep! >=2 ? 1 : 0) : score}
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

