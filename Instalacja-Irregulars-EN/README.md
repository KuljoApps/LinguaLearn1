# Instrukcja Integracji Quizu "Irregular Verbs"

Ten przewodnik opisuje, jak zaktualizować starszą wersję komponentu quizu czasowników nieregularnych (`Irregular Verbs`) do nowszej, ulepszonej wersji używanej w aplikacji LinguaLearn.

## Główne Różnice i Ulepszenia

Nowa wersja komponentu wprowadza kilka kluczowych zmian w porównaniu do starszej wersji:

*   **Ulepszony Interfejs Użytkownika:** Bardziej przejrzysty i nowoczesny wygląd, zgodny z resztą aplikacji. Usunięto napis "PRO" z logo i zmieniono wygląd paska postępu.
*   **Lepsza Struktura Komponentów:** Wykorzystanie dodatkowych komponentów UI, takich jak `<Label>` dla lepszej semantyki i dostępności pól formularza.
*   **Uproszczona Struktura Plików:** Ujednolicone ścieżki do plików z danymi oraz komponentów.

## Krok 1: Struktura plików i zależności

Upewnij się, że struktura plików jest zgodna z poniższą. Nowe lub zmodyfikowane pliki zostaną opisane w kolejnych krokach.

```
src/
├── app/
│   └── quiz/
│       └── irregular-verbs/
│           └── page.tsx      // Plik do stworzenia
├── components/
│   ├── ui/
│   │   └── label.tsx         // Dodatkowy komponent UI (jeśli go nie ma)
│   ├── quiz-results.tsx    // Komponent wyników (może wymagać aktualizacji ścieżki)
│   └── quiz-irregular-verbs.tsx // Zaktualizowany główny komponent quizu
└── lib/
    └── questions-irregular-verbs.ts // Nowy, ujednolicony plik z pytaniami
```

## Krok 2: Aktualizacja Głównego Komponentu Quizu

Zastąp zawartość swojego starego komponentu quizu nową, poniższą wersją.

**Lokalizacja:** `src/components/quiz-irregular-verbs.tsx`

```tsx
"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Home, RefreshCw, Pause, Play, Clock, Trophy } from "lucide-react";
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
import { updateStats, addError, updateTimeSpent, checkSessionAchievements, type Achievement, type ErrorRecord } from "@/lib/storage";
import { playSound } from "@/lib/sounds";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { vibrate } from "@/lib/vibrations";
import { useToast } from "@/hooks/use-toast";
import QuizResults from "./quiz-results";
import { Label } from "./ui/label";

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
const QUIZ_NAME = 'Irregular Verbs';
const TIME_UPDATE_INTERVAL = 5; // seconds
const QUIZ_LENGTH = 10;


export default function QuizIrregularVerbs() {
  const [questions, setQuestions] = useState<IrregularVerbQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [form2Input, setForm2Input] = useState("");
  const [form3Input, setForm3Input] = useState("");
  const [sessionErrors, setSessionErrors] = useState<Omit<ErrorRecord, 'id'>[]>([]);
  const [isLongText, setIsLongText] = useState(false);

  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | "timeout" | null>(null);
  const [translationStatus, setTranslationStatus] = useState<"correct" | "incorrect" | null>(null);
  const [isRestartAlertOpen, setIsRestartAlertOpen] = useState(false);
  const [isHomeAlertOpen, setIsHomeAlertOpen] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(QUESTION_TIME_LIMIT);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [shuffledTranslationOptions, setShuffledTranslationOptions] = useState<string[]>([]);
  const timeoutFiredRef = useRef(false);
  
  const router = useRouter();
  const form2InputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    const newQuestions = shuffleArray(initialQuestions).slice(0, QUIZ_LENGTH);
    setQuestions(newQuestions);
    timeoutFiredRef.current = false;
  }, []);

  useEffect(() => {
      timeoutFiredRef.current = false;
  }, [currentQuestionIndex]);
  

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
          if (!timeoutFiredRef.current) {
            timeoutFiredRef.current = true;
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
          }
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
      const options = shuffleArray(currentQuestion.translationOptions);
      setShuffledTranslationOptions(options);

      const hasLongOption = options.some(option => option.length > 10);
      setIsLongText(hasLongOption);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (answerStatus === 'timeout' && currentQuestion) {
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

    const isForm2Correct = currentQuestion.form2.toLowerCase().split('/').includes(form2Input.trim().toLowerCase());
    const isForm3Correct = currentQuestion.form3.toLowerCase().split('/').includes(form3Input.trim().toLowerCase());
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
    timeoutFiredRef.current = false;
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
            if(isCorrectAnswer) return "bg-success text-success-foreground hover:bg-success/90 disabled:opacity-100";
            return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
        }

        if (isCorrectAnswer) {
          return "bg-success text-success-foreground hover:bg-success/90 disabled:opacity-100";
        }
        if (isSelectedAnswer && !isCorrectAnswer) {
          return "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-100";
        }
        return "bg-muted text-muted-foreground opacity-70 cursor-not-allowed";
    }

    if (translationStatus && isSelectedAnswer) {
      return translationStatus === 'correct' 
          ? "bg-success text-success-foreground disabled:opacity-100" 
          : "bg-destructive text-destructive-foreground disabled:opacity-100";
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
        <CardHeader className="text-center pb-4">
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
          <CardDescription className="pt-2">Select the translation and fill in the verb forms</CardDescription>
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
            <div className={cn(
                "grid grid-cols-3 gap-2 w-full",
                isLongText && "grid-cols-2"
            )}>
                {shuffledTranslationOptions.map((option, index) => {
                    const button = (
                        <Button
                            key={option}
                            onClick={() => handleTranslationClick(option)}
                            disabled={!!answerStatus || isPaused || translationStatus !== null}
                            className={cn(
                                "h-auto text-base p-2 whitespace-normal transition-all duration-300",
                                getTranslationButtonClass(option),
                                isLongText && index === 2 ? 'col-span-2' : ''
                            )}
                        >
                            {option}
                        </Button>
                    );

                    if (isLongText && index === 2) {
                        return <div key={option} className="col-span-2 flex justify-center">{button}</div>
                    }
                    return button;
                })}
            </div>

            <p className="text-center text-muted-foreground pt-4">2. Type the Past Simple & Past Participle forms</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full text-center">
                <div>
                    <Label htmlFor="form2" className="text-sm font-medium text-muted-foreground">Past Simple</Label>
                    <Input
                        id="form2"
                        ref={form2InputRef}
                        value={form2Input}
                        onChange={(e) => setForm2Input(e.target.value)}
                        placeholder=""
                        disabled={!!answerStatus || isPaused || translationStatus !== 'correct'}
                        className={cn("text-center transition-colors duration-300 mt-1", getInputClass(form2Input, currentQuestion.form2))}
                    />
                </div>
                <div>
                    <Label htmlFor="form3" className="text-sm font-medium text-muted-foreground">Past Participle</Label>
                    <Input
                        id="form3"
                        value={form3Input}
                        onChange={(e) => setForm3Input(e.target.value)}
                        placeholder=""
                        disabled={!!answerStatus || isPaused || translationStatus !== 'correct'}
                        className={cn(
                            "text-center transition-colors duration-300 mt-1",
                            getInputClass(form3Input, currentQuestion.form3)
                        )}
                    />
                </div>
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
```

---

## Krok 3: Aktualizacja Pliku z Pytaniami

Upewnij się, że plik z pytaniami jest w odpowiedniej lokalizacji i ma aktualną zawartość. W nowej wersji ścieżka została uproszczona.

**Lokalizacja:** `src/lib/questions-irregular-verbs.ts`
*(Zastąp stary plik `src/lib/questions/irregulars/questions-irregulars-en.ts`)*

```ts
export interface IrregularVerbQuestion {
  id: number;
  verb: string; // Base form
  form2: string; // Past simple
  form3: string; // Past participle
  translationOptions: string[];
  correctTranslation: string;
}

export const questions: IrregularVerbQuestion[] = [
  { id: 1, verb: 'be', form2: 'was/were', form3: 'been', translationOptions: ['być', 'mieć', 'robić'], correctTranslation: 'być' },
  { id: 2, verb: 'beat', form2: 'beat', form3: 'beaten', translationOptions: ['bić', 'wygrywać', 'przegrywać'], correctTranslation: 'bić' },
  { id: 3, verb: 'become', form2: 'became', form3: 'become', translationOptions: ['stawać się', 'być', 'pozostawać'], correctTranslation: 'stawać się' },
  { id: 4, verb: 'begin', form2: 'began', form3: 'begun', translationOptions: ['zaczynać', 'kończyć', 'kontynuować'], correctTranslation: 'zaczynać' },
  { id: 5, verb: 'bend', form2: 'bent', form3: 'bent', translationOptions: ['zginać', 'prostować', 'łamać'], correctTranslation: 'zginać' },
  { id: 6, verb: 'bet', form2: 'bet', form3: 'bet', translationOptions: ['zakładać się', 'przegrywać', 'wygrywać'], correctTranslation: 'zakładać się' },
  { id: 7, verb: 'bite', form2: 'bit', form3: 'bitten', translationOptions: ['gryźć', 'żuć', 'połykać'], correctTranslation: 'gryźć' },
  { id: 8, verb: 'blow', form2: 'blew', form3: 'blown', translationOptions: ['dmuchać', 'ciągnąć', 'pchać'], correctTranslation: 'dmuchać' },
  { id: 9, verb: 'break', form2: 'broke', form3: 'broken', translationOptions: ['łamać', 'naprawiać', 'budować'], correctTranslation: 'łamać' },
  { id: 10, verb: 'bring', form2: 'brought', form3: 'brought', translationOptions: ['przynosić', 'zabierać', 'wysyłać'], correctTranslation: 'przynosić' },
  { id: 11, verb: 'build', form2: 'built', form3: 'built', translationOptions: ['budować', 'niszczyć', 'projektować'], correctTranslation: 'budować' },
  { id: 12, verb: 'burn', form2: 'burnt/burned', form3: 'burnt/burned', translationOptions: ['palić/płonąć', 'gasić', 'zalewać'], correctTranslation: 'palić/płonąć' },
  { id: 13, verb: 'buy', form2: 'bought', form3: 'bought', translationOptions: ['kupować', 'sprzedawać', 'wymieniać'], correctTranslation: 'kupować' },
  { id: 14, verb: 'catch', form2: 'caught', form3: 'caught', translationOptions: ['łapać', 'puszczać', 'rzucać'], correctTranslation: 'łapać' },
  { id: 15, verb: 'choose', form2: 'chose', form3: 'chosen', translationOptions: ['wybierać', 'odrzucać', 'ignorować'], correctTranslation: 'wybierać' },
  { id: 16, verb: 'come', form2: 'came', form3: 'come', translationOptions: ['przychodzić', 'wychodzić', 'zostawać'], correctTranslation: 'przychodzić' },
  { id: 17, verb: 'cost', form2: 'cost', form3: 'cost', translationOptions: ['kosztować', 'płacić', 'zarabiać'], correctTranslation: 'kosztować' },
  { id: 18, verb: 'cut', form2: 'cut', form3: 'cut', translationOptions: ['ciąć', 'kleić', 'szyć'], correctTranslation: 'ciąć' },
  { id: 19, verb: 'deal', form2: 'dealt', form3: 'dealt', translationOptions: ['radzić sobie', 'unikać', 'zbierać'], correctTranslation: 'radzić sobie' },
  { id: 20, verb: 'dig', form2: 'dug', form3: 'dug', translationOptions: ['kopać', 'zasypywać', 'sadzić'], correctTranslation: 'kopać' },
  { id: 21, verb: 'do', form2: 'did', form3: 'done', translationOptions: ['robić', 'niszczyć', 'tworzyć'], correctTranslation: 'robić' },
  { id: 22, verb: 'draw', form2: 'drew', form3: 'drawn', translationOptions: ['rysować', 'pisać', 'malować'], correctTranslation: 'rysować' },
  { id: 23, verb: 'dream', form2: 'dreamt/dreamed', form3: 'dreamt/dreamed', translationOptions: ['marzyć/śnić', 'budzić się', 'planować'], correctTranslation: 'marzyć/śnić' },
  { id: 24, verb: 'drink', form2: 'drank', form3: 'drunk', translationOptions: ['pić', 'jeść', 'spać'], correctTranslation: 'pić' },
  { id: 25, verb: 'drive', form2: 'drove', form3: 'driven', translationOptions: ['prowadzić', 'chodzić', 'biegać'], correctTranslation: 'prowadzić' },
  { id: 26, verb: 'eat', form2: 'ate', form3: 'eaten', translationOptions: ['jeść', 'pić', 'głodować'], correctTranslation: 'jeść' },
  { id: 27, verb: 'fall', form2: 'fell', form3: 'fallen', translationOptions: ['upadać', 'wstawać', 'skakać'], correctTranslation: 'upadać' },
  { id: 28, verb: 'feel', form2: 'felt', form3: 'felt', translationOptions: ['czuć', 'dotykać', 'widzieć'], correctTranslation: 'czuć' },
  { id: 29, verb: 'fight', form2: 'fought', form3: 'fought', translationOptions: ['walczyć', 'poddawać się', 'uciekać'], correctTranslation: 'walczyć' },
  { id: 30, verb: 'find', form2: 'found', form3: 'found', translationOptions: ['znajdować', 'gubić', 'szukać'], correctTranslation: 'znajdować' },
  { id: 31, verb: 'fly', form2: 'flew', form3: 'flown', translationOptions: ['latać', 'pływać', 'biegać'], correctTranslation: 'latać' },
  { id: 32, verb: 'forget', form2: 'forgot', form3: 'forgotten', translationOptions: ['zapominać', 'pamiętać', 'uczyć się'], correctTranslation: 'zapominać' },
  { id: 33, verb: 'forgive', form2: 'forgave', form3: 'forgiven', translationOptions: ['wybaczać', 'oskarżać', 'karać'], correctTranslation: 'wybaczać' },
  { id: 34, verb: 'freeze', form2: 'froze', form3: 'frozen', translationOptions: ['zamarzać', 'topnieć', 'gotować'], correctTranslation: 'zamarzać' },
  { id: 35, verb: 'get', form2: 'got', form3: 'got/gotten', translationOptions: ['dostawać', 'dawać', 'tracić'], correctTranslation: 'dostawać' },
  { id: 36, verb: 'give', form2: 'gave', form3: 'given', translationOptions: ['dawać', 'brać', 'otrzymywać'], correctTranslation: 'dawać' },
  { id: 37, verb: 'go', form2: 'went', form3: 'gone', translationOptions: ['iść', 'stać', 'przychodzić'], correctTranslation: 'iść' },
  { id: 38, verb: 'grow', form2: 'grew', form3: 'grown', translationOptions: ['rosnąć', 'maleć', 'kurczyć się'], correctTranslation: 'rosnąć' },
  { id: 39, verb: 'hang', form2: 'hung', form3: 'hung', translationOptions: ['wieszać', 'kłaść', 'zdejmować'], correctTranslation: 'wieszać' },
  { id: 40, verb: 'have', form2: 'had', form3: 'had', translationOptions: ['mieć', 'potrzebować', 'być'], correctTranslation: 'mieć' },
  { id: 41, verb: 'hear', form2: 'heard', form3: 'heard', translationOptions: ['słyszeć', 'widzieć', 'mówić'], correctTranslation: 'słyszeć' },
  { id: 42, verb: 'hide', form2: 'hid', form3: 'hidden', translationOptions: ['chować się', 'pokazywać', 'szukać'], correctTranslation: 'chować się' },
  { id: 43, verb: 'hit', form2: 'hit', form3: 'hit', translationOptions: ['uderzać', 'głaskać', 'unikać'], correctTranslation: 'uderzać' },
  { id: 44, verb: 'hold', form2: 'held', form3: 'held', translationOptions: ['trzymać', 'puszczać', 'upuszczać'], correctTranslation: 'trzymać' },
  { id: 45, verb: 'hurt', form2: 'hurt', form3: 'hurt', translationOptions: ['ranić/boleć', 'leczyć', 'pomagać'], correctTranslation: 'ranić/boleć' },
  { id: 46, verb: 'keep', form2: 'kept', form3: 'kept', translationOptions: ['trzymać/zachowywać', 'oddawać', 'wyrzucać'], correctTranslation: 'trzymać/zachowywać' },
  { id: 47, verb: 'know', form2: 'knew', form3: 'known', translationOptions: ['wiedzieć/znać', 'nie wiedzieć', 'uczyć się'], correctTranslation: 'wiedzieć/znać' },
  { id: 48, verb: 'lay', form2: 'laid', form3: 'laid', translationOptions: ['kłaść', 'podnosić', 'stawiać'], correctTranslation: 'kłaść' },
  { id: 49, verb: 'lead', form2: 'led', form3: 'led', translationOptions: ['prowadzić', 'podążać', 'stać'], correctTranslation: 'prowadzić' },
  { id: 50, verb: 'leave', form2: 'left', form3: 'left', translationOptions: ['opuszczać/zostawiać', 'przybywać', 'wracać'], correctTranslation: 'opuszczać/zostawiać' },
  { id: 51, verb: 'lend', form2: 'lent', form3: 'lent', translationOptions: ['pożyczać (komuś)', 'pożyczać (od kogoś)', 'dawać'], correctTranslation: 'pożyczać (komuś)' },
  { id: 52, verb: 'let', form2: 'let', form3: 'let', translationOptions: ['pozwalać', 'zabraniać', 'kazać'], correctTranslation: 'pozwalać' },
  { id: 53, verb: 'lie', form2: 'lay', form3: 'lain', translationOptions: ['leżeć', 'stać', 'siedzieć'], correctTranslation: 'leżeć' },
  { id: 54, verb: 'lose', form2: 'lost', form3: 'lost', translationOptions: ['gubić/przegrywać', 'znajdować', 'wygrywać'], correctTranslation: 'gubić/przegrywać' },
  { id: 55, verb: 'make', form2: 'made', form3: 'made', translationOptions: ['robić/tworzyć', 'niszczyć', 'psuć'], correctTranslation: 'robić/tworzyć' },
  { id: 56, verb: 'mean', form2: 'meant', form3: 'meant', translationOptions: ['znaczyć/mieć na myśli', 'domyślać się', 'ignorować'], correctTranslation: 'znaczyć/mieć na myśli' },
  { id: 57, verb: 'meet', form2: 'met', form3: 'met', translationOptions: ['spotykać', 'omijać', 'rozstawać się'], correctTranslation: 'spotykać' },
  { id: 58, verb: 'pay', form2: 'paid', form3: 'paid', translationOptions: ['płacić', 'otrzymywać', 'oszczędzać'], correctTranslation: 'płacić' },
  { id: 59, verb: 'put', form2: 'put', form3: 'put', translationOptions: ['kłaść', 'brać', 'podnosić'], correctTranslation: 'kłaść' },
  { id: 60, verb: 'read', form2: 'read', form3: 'read', translationOptions: ['czytać', 'pisać', 'oglądać'], correctTranslation: 'czytać' },
  { id: 61, verb: 'ride', form2: 'rode', form3: 'ridden', translationOptions: ['jeździć', 'chodzić', 'stać'], correctTranslation: 'jeździć' },
  { id: 62, verb: 'ring', form2: 'rang', form3: 'rung', translationOptions: ['dzwonić', 'milczeć', 'pisać'], correctTranslation: 'dzwonić' },
  { id: 63, verb: 'rise', form2: 'rose', form3: 'risen', translationOptions: ['wznosić się', 'opadać', 'siadać'], correctTranslation: 'wznosić się' },
  { id: 64, verb: 'run', form2: 'ran', form3: 'run', translationOptions: ['biec', 'chodzić', 'stać'], correctTranslation: 'biec' },
  { id: 65, verb: 'say', form2: 'said', form3: 'said', translationOptions: ['mówić/powiedzieć', 'pytać', 'milczeć'], correctTranslation: 'mówić/powiedzieć' },
  { id: 66, verb: 'see', form2: 'saw', form3: 'seen', translationOptions: ['widzieć', 'słyszeć', 'czuć'], correctTranslation: 'widzieć' },
  { id: 67, verb: 'sell', form2: 'sold', form3: 'sold', translationOptions: ['sprzedawać', 'kupować', 'dawać'], correctTranslation: 'sprzedawać' },
  { id: 68, verb: 'send', form2: 'sent', form3: 'sent', translationOptions: ['wysyłać', 'otrzymywać', 'przynosić'], correctTranslation: 'wysyłać' },
  { id: 69, verb: 'set', form2: 'set', form3: 'set', translationOptions: ['ustawiać', 'przesuwać', 'burzyć'], correctTranslation: 'ustawiać' },
  { id: 70, verb: 'shake', form2: 'shook', form3: 'shaken', translationOptions: ['trząść', 'uspokajać', 'trzymać'], correctTranslation: 'trząść' },
  { id: 71, verb: 'shine', form2: 'shone', form3: 'shone', translationOptions: ['świecić', 'gasnąć', 'ciemnieć'], correctTranslation: 'świecić' },
  { id: 72, verb: 'shoot', form2: 'shot', form3: 'shot', translationOptions: ['strzelać', 'celować', 'rzucać'], correctTranslation: 'strzelać' },
  { id: 73, verb: 'show', form2: 'showed', form3: 'shown', translationOptions: ['pokazywać', 'ukrywać', 'zasłaniać'], correctTranslation: 'pokazywać' },
  { id: 74, verb: 'shut', form2: 'shut', form3: 'shut', translationOptions: ['zamykać', 'otwierać', 'uchylać'], correctTranslation: 'zamykać' },
  { id: 75, verb: 'sing', form2: 'sang', form3: 'sung', translationOptions: ['śpiewać', 'mówić', 'krzyczeć'], correctTranslation: 'śpiewać' },
  { id: 76, verb: 'sink', form2: 'sank', form3: 'sunk', translationOptions: ['tonąć', 'pływać', 'unosić się'], correctTranslation: 'tonąć' },
  { id: 77, verb: 'sit', form2: 'sat', form3: 'sat', translationOptions: ['siedzieć', 'stać', 'leżeć'], correctTranslation: 'siedzieć' },
  { id: 78, verb: 'sleep', form2: 'slept', form3: 'slept', translationOptions: ['spać', 'budzić się', 'pracować'], correctTranslation: 'spać' },
  { id: 79, verb: 'speak', form2: 'spoke', form3: 'spoken', translationOptions: ['mówić', 'milczeć', 'słuchać'], correctTranslation: 'mówić' },
  { id: 80, verb: 'spend', form2: 'spent', form3: 'spent', translationOptions: ['spędzać/wydawać', 'oszczędzać', 'zarabiać'], correctTranslation: 'spędzać/wydawać' },
  { id: 81, verb: 'stand', form2: 'stood', form3: 'stood', translationOptions: ['stać', 'siedzieć', 'leżeć'], correctTranslation: 'stać' },
  { id: 82, verb: 'steal', form2: 'stole', form3: 'stolen', translationOptions: ['kraść', 'dawać', 'oddawać'], correctTranslation: 'kraść' },
  { id: 83, verb: 'stick', form2: 'stuck', form3: 'stuck', translationOptions: ['przyklejać/trzymać się', 'odklejać', 'puszczać'], correctTranslation: 'przyklejać/trzymać się' },
  { id: 84, verb: 'strike', form2: 'struck', form3: 'struck', translationOptions: ['uderzać', 'głaskać', 'unikać'], correctTranslation: 'uderzać' },
  { id: 85, verb: 'swear', form2: 'swore', form3: 'sworn', translationOptions: ['przysięgać', 'kłamać', 'wątpić'], correctTranslation: 'przysięgać' },
  { id: 86, verb: 'swim', form2: 'swam', form3: 'swum', translationOptions: ['pływać', 'tonąć', 'biegać'], correctTranslation: 'pływać' },
  { id: 87, verb: 'take', form2: 'took', form3: 'taken', translationOptions: ['brać', 'dawać', 'rzucać'], correctTranslation: 'brać' },
  { id: 88, verb: 'teach', form2: 'taught', form3: 'taught', translationOptions: ['uczyć (kogoś)', 'uczyć się', 'zapominać'], correctTranslation: 'uczyć (kogoś)' },
  { id: 89, verb: 'tell', form2: 'told', form3: 'told', translationOptions: ['mówić/opowiadać', 'pytać', 'słuchać'], correctTranslation: 'mówić/opowiadać' },
  { id: 90, verb: 'think', form2: 'thought', form3: 'thought', translationOptions: ['myśleć', 'wiedzieć', 'czuć'], correctTranslation: 'myśleć' },
  { id: 91, verb: 'throw', form2: 'threw', form3: 'thrown', translationOptions: ['rzucać', 'łapać', 'trzymać'], correctTranslation: 'rzucać' },
  { id: 92, verb: 'understand', form2: 'understood', form3: 'understood', translationOptions: ['rozumieć', 'ignorować', 'mylić'], correctTranslation: 'rozumieć' },
  { id: 93, verb: 'wake', form2: 'woke', form3: 'woken', translationOptions: ['budzić się', 'zasypiać', 'spać'], correctTranslation: 'budzić się' },
  { id: 94, verb: 'wear', form2: 'wore', form3: 'worn', translationOptions: ['nosić (ubranie)', 'zdejmować', 'kupować'], correctTranslation: 'nosić (ubranie)' },
  { id: 95, verb: 'win', form2: 'won', form3: 'won', translationOptions: ['wygrywać', 'przegrywać', 'remisować'], correctTranslation: 'wygrywać' },
  { id: 96, verb: 'write', form2: 'wrote', form3: 'written', translationOptions: ['pisać', 'czytać', 'rysować'], correctTranslation: 'pisać' },
  { id: 97, verb: 'bleed', form2: 'bled', form3: 'bled', translationOptions: ['krwawić', 'leczyć', 'bandażować'], correctTranslation: 'krwawić' },
  { id: 98, verb: 'breed', form2: 'bred', form3: 'bred', translationOptions: ['hodować', 'niszczyć', 'polować'], correctTranslation: 'hodować' },
  { id: 99, verb: 'cling', form2: 'clung', form3: 'clung', translationOptions: ['uczepić się/przylgnąć', 'puścić', 'odepchnąć'], correctTranslation: 'uczepić się/przylgnąć' },
  { id: 100, verb: 'creep', form2: 'crept', form3: 'crept', translationOptions: ['skradać się', 'biec', 'krzyczeć'], correctTranslation: 'skradać się' },
  { id: 101, verb: 'dive', form2: 'dived/dove', form3: 'dived', translationOptions: ['nurkować', 'pływać', 'wynurzać się'], correctTranslation: 'nurkować' },
  { id: 102, verb: 'feed', form2: 'fed', form3: 'fed', translationOptions: ['karmić', 'głodzić', 'jeść'], correctTranslation: 'karmić' },
  { id: 103, verb: 'flee', form2: 'fled', form3: 'fled', translationOptions: ['uciekać', 'zostawać', 'walczyć'], correctTranslation: 'uciekać' },
  { id: 104, verb: 'forbid', form2: 'forbade', form3: 'forbidden', translationOptions: ['zabraniać', 'pozwalać', 'prosić'], correctTranslation: 'zabraniać' },
  { id: 105, verb: 'grind', form2: 'ground', form3: 'ground', translationOptions: ['mielić', 'mieszać', 'gotować'], correctTranslation: 'mielić' },
  { id: 106, verb: 'kneel', form2: 'knelt', form3: 'knelt', translationOptions: ['klęczeć', 'stać', 'siedzieć'], correctTranslation: 'klęczeć' },
  { id: 107, verb: 'light', form2: 'lit', form3: 'lit', translationOptions: ['zapalać/oświetlać', 'gasić', 'zaciemniać'], correctTranslation: 'zapalać/oświetlać' },
  { id: 108, verb: 'prove', form2: 'proved', form3: 'proven/proved', translationOptions: ['udowadniać', 'zaprzeczać', 'wątpić'], correctTranslation: 'udowadniać' },
  { id: 109, verb: 'quit', form2: 'quit', form3: 'quit', translationOptions: ['rzucać/rezygnować', 'zaczynać', 'kontynuować'], correctTranslation: 'rzucać/rezygnować' },
  { id: 110, verb: 'seek', form2: 'sought', form3: 'sought', translationOptions: ['szukać', 'znajdować', 'unikać'], correctTranslation: 'szukać' },
  { id: 111, verb: 'shed', form2: 'shed', form3: 'shed', translationOptions: ['zrzucać/gubić', 'zakładać', 'zbierać'], correctTranslation: 'zrzucać/gubić' },
  { id: 112, verb: 'smell', form2: 'smelt/smelled', form3: 'smelt/smelled', translationOptions: ['pachnieć/wąchać', 'patrzeć', 'dotykać'], correctTranslation: 'pachnieć/wąchać' },
  { id: 113, verb: 'speed', form2: 'sped', form3: 'sped', translationOptions: ['pędzić/przyspieszać', 'zwalniać', 'zatrzymywać się'], correctTranslation: 'pędzić/przyspieszać' },
  { id: 114, verb: 'spoil', form2: 'spoilt/spoiled', form3: 'spoilt/spoiled', translationOptions: ['psuć/rozpieszczać', 'naprawiać', 'karcić'], correctTranslation: 'psuć/rozpieszczać' },
  { id: 115, verb: 'spread', form2: 'spread', form3: 'spread', translationOptions: ['rozprzestrzeniać (się)', 'zbierać', 'ograniczać'], correctTranslation: 'rozprzestrzeniać (się)' },
  { id: 116, verb: 'spring', form2: 'sprang', form3: 'sprung', translationOptions: ['skakać/wytrysnąć', 'opadać', 'stać'], correctTranslation: 'skakać/wytrysnąć' },
  { id: 117, verb: 'sting', form2: 'stung', form3: 'stung', translationOptions: ['żądlić/kłuć', 'głaskać', 'leczyć'], correctTranslation: 'żądlić/kłuć' },
  { id: 118, verb: 'sweep', form2: 'swept', form3: 'swept', translationOptions: ['zamiatać', 'brudzić', 'myć'], correctTranslation: 'zamiatać' },
  { id: 119, verb: 'swing', form2: 'swung', form3: 'swung', translationOptions: ['huśtać się', 'stać', 'zatrzymywać'], correctTranslation: 'huśtać się' },
  { id: 120, verb: 'tear', form2: 'tore', form3: 'torn', translationOptions: ['drzeć/rozdzierać', 'kleić', 'szyć'], correctTranslation: 'drzeć/rozdzierać' },
  { id: 121, verb: 'tread', form2: 'trod', form3: 'trodden', translationOptions: ['stąpać/deptać', 'unosić się', 'skakać'], correctTranslation: 'stąpać/deptać' },
  { id: 122, verb: 'weep', form2: 'wept', form3: 'wept', translationOptions: ['płakać', 'śmiać się', 'milczeć'], correctTranslation: 'płakać' },
  { id: 123, verb: 'wind', form2: 'wound', form3: 'wound', translationOptions: ['nakręcać/owijać', 'rozwijać', 'prostować'], correctTranslation: 'nakręcać/owijać' },
  { id: 124, verb: 'withdraw', form2: 'withdrew', form3: 'withdrawn', translationOptions: ['wycofywać (się)', 'wpłacać', 'dołączać'], correctTranslation: 'wycofywać (się)' },
  { id: 125, verb: 'withstand', form2: 'withstood', form3: 'withstood', translationOptions: ['wytrzymywać', 'poddawać się', 'łamać się'], correctTranslation: 'wytrzymywać' },
  { id: 126, verb: 'bind', form2: 'bound', form3: 'bound', translationOptions: ['wiązać', 'rozwiązywać', 'uwalniać'], correctTranslation: 'wiązać' },
  { id: 127, verb: 'cast', form2: 'cast', form3: 'cast', translationOptions: ['rzucać', 'łapać', 'trzymać'], correctTranslation: 'rzucać' },
  { id: 128, verb: 'forecast', form2: 'forecast', form3: 'forecast', translationOptions: ['prognozować', 'zgadywać', 'relacjonować'], correctTranslation: 'prognozować' },
  { id: 129, verb: 'knit', form2: 'knit/knitted', form3: 'knit/knitted', translationOptions: ['robić na drutach', 'szyć', 'pruć'], correctTranslation: 'robić na drutach' },
  { id: 130, verb: 'lean', form2: 'leant/leaned', form3: 'leant/leaned', translationOptions: ['opierać się', 'prostować się', 'odsuwać się'], correctTranslation: 'opierać się' },
  { id: 131, verb: 'leap', form2: 'leapt/leaped', form3: 'leapt/leaped', translationOptions: ['skakać', 'stać', 'pełzać'], correctTranslation: 'skakać' },
  { id: 132, verb: 'rid', form2: 'rid', form3: 'rid', translationOptions: ['pozbywać się', 'zdobywać', 'trzymać'], correctTranslation: 'pozbywać się' },
  { id: 133, verb: 'slide', form2: 'slid', form3: 'slid', translationOptions: ['ślizgać się', 'stać', 'zatrzymywać'], correctTranslation: 'ślizgać się' },
  { id: 134, verb: 'split', form2: 'split', form3: 'split', translationOptions: ['dzielić/rozdzielać', 'łączyć', 'scalać'], correctTranslation: 'dzielić/rozdzielać' },
  { id: 135, verb: 'wed', form2: 'wed', form3: 'wed', translationOptions: ['brać ślub', 'rozwodzić się', 'rozstawać się'], correctTranslation: 'brać ślub' },
  { id: 136, verb: 'arise', form2: 'arose', form3: 'arisen', translationOptions: ['powstawać/pojawiać się', 'znikać', 'opadać'], correctTranslation: 'powstawać/pojawiać się' },
  { id: 137, verb: 'burst', form2: 'burst', form3: 'burst', translationOptions: ['pękać', 'kurczyć się', 'naprawiać'], correctTranslation: 'pękać' },
  { id: 138, verb: 'slit', form2: 'slit', form3: 'slit', translationOptions: ['rozcinać', 'zszywać', 'kleić'], correctTranslation: 'rozcinać' },
  { id: 139, verb: 'spin', form2: 'spun', form3: 'spun', translationOptions: ['kręcić (się)', 'zatrzymywać', 'prostować'], correctTranslation: 'kręcić (się)' },
  { id: 140, verb: 'spit', form2: 'spat', form3: 'spat', translationOptions: ['pluć', 'połykać', 'pić'], correctTranslation: 'pluć' },
  { id: 141, verb: 'stride', form2: 'strode', form3: 'stridden', translationOptions: ['kroczyć', 'czołgać się', 'stać'], correctTranslation: 'kroczyć' },
  { id: 142, verb: 'strive', form2: 'strove', form3: 'striven', translationOptions: ['dążyć/usiłować', 'poddawać się', 'rezygnować'], correctTranslation: 'dążyć/usiłować' },
  { id: 143, verb: 'thrust', form2: 'thrust', form3: 'thrust', translationOptions: ['pchać/wpychać', 'ciągnąć', 'wycofywać'], correctTranslation: 'pchać/wpychać' },
  { id: 144, verb: 'wet', form2: 'wet/wetted', form3: 'wet/wetted', translationOptions: ['moczyć', 'suszyć', 'wycierać'], correctTranslation: 'moczyć' },
  { id: 145, verb: 'wring', form2: 'wrung', form3: 'wrung', translationOptions: ['wyżymać/wykręcać', 'moczyć', 'gładzić'], correctTranslation: 'wyżymać/wykręcać' }
];
```

---

## Krok 4: Dodanie Komponentu `<Label>`

Nowa wersja formularza używa komponentu `<Label>` dla lepszej dostępności. Dodaj ten plik, jeśli go nie posiadasz.

**Lokalizacja:** `src/components/ui/label.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

## Krok 5: Stworzenie Strony Quizu

Stwórz plik strony, który będzie renderował zaktualizowany komponent quizu.

**Lokalizacja:** `src/app/quiz/irregular-verbs/page.tsx`

```tsx
import QuizIrregularVerbs from '@/components/quiz-irregular-verbs';

export default function QuizIrregularVerbsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <QuizIrregularVerbs />
    </main>
  );
}
```

---

Po wykonaniu tych kroków, Twój quiz "Irregular Verbs" będzie w pełni zaktualizowany do najnowszej wersji.
