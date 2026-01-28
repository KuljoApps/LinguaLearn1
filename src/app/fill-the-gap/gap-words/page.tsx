'use client';

import { useState, useEffect, useMemo, type SetStateAction, type Dispatch } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, Pencil, LayoutGrid, List, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, type Language, getGapWordsProgress, addCompletedGapWord } from '@/lib/storage';
import { allGapWordQuestions, type GapWordQuestion } from '@/lib/fill-the-gap/gap-words';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Confetti from '@/components/Confetti';
import { playSound } from '@/lib/sounds';
import { vibrate } from '@/lib/vibrations';

const VIEW_MODE_KEY = 'gapWordsViewMode';

function GapWordExercise({ question, onComplete }: { question: GapWordQuestion, onComplete: () => void }) {
    const [inputValue, setInputValue] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const completedSet = getGapWordsProgress();
        if (completedSet.has(question.fullWord)) {
            setIsCompleted(true);
            setInputValue(question.missingLetters);
        }
    }, [question]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isCompleted) {
            setInputValue(value);
        }

        if (value.toLowerCase() === question.missingLetters.toLowerCase()) {
            handleCorrect();
        }
    };
    
    const handleCorrect = () => {
        if (isCompleted) return;
        setIsCompleted(true);
        addCompletedGapWord(question.fullWord);
        playSound('correct');
        vibrate('correct');
        setShowConfetti(true);
    };

    const onConfettiCompleteHandler = () => {
        setShowConfetti(false);
        onComplete();
    };

    const { wordWithGap, missingLetters, fullWord, hint } = question;
    const parts = wordWithGap.replace(/_+/, '_').split('_');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            {showConfetti && <Confetti onConfettiComplete={onConfettiCompleteHandler} />}
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <FileText className="h-8 w-8" />
                        <CardTitle className="text-3xl">Complete the Word</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                    <div className={cn(
                        "flex flex-col items-center gap-4 p-6 rounded-lg text-center",
                        isCompleted ? "bg-success/10" : "bg-card border"
                    )}>
                        <div className="flex-grow flex items-center gap-2 text-3xl sm:text-4xl font-mono tracking-wider flex-wrap justify-center">
                            <span>{parts[0]}</span>
                            <Input
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={isCompleted}
                                autoFocus
                                className={cn(
                                    "w-24 h-12 text-center text-3xl sm:text-4xl font-mono",
                                    isCompleted && "border-success bg-success/20 text-success-foreground cursor-default",
                                    !isCompleted && inputValue.toLowerCase() === missingLetters.toLowerCase() ? "border-success" : ""
                                )}
                                style={{ width: `${missingLetters.length * 1.5 + 2}rem`, maxWidth: '100%' }}
                            />
                            <span>{parts[1]}</span>
                        </div>
                        {isCompleted && (
                            <div className="flex items-center gap-2 text-2xl font-semibold text-success animate-in fade-in zoom-in-50">
                                <CheckCircle className="h-6 w-6" />
                                <span>{fullWord}</span>
                            </div>
                        )}
                    </div>
                     <div className="flex items-center gap-3 p-3 rounded-md bg-amber/10 border border-amber/20 text-amber">
                        <Lightbulb className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">Podpowiedź: <span className="font-semibold italic">{hint}</span></p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" onClick={onComplete}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Word List
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}

function WordListPage({ onSelectQuestion }: { onSelectQuestion: Dispatch<SetStateAction<GapWordQuestion | null>> }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [questions, setQuestions] = useState<GapWordQuestion[]>([]);
    const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
    const [view, setView] = useState<'list' | 'grid'>('list');

    useEffect(() => {
        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'list' | 'grid' | null;
        if (savedView) {
            setView(savedView);
        }
        
        const handleStateUpdate = () => {
            const lang = getLanguage();
            setLanguageState(lang);
            setQuestions(allGapWordQuestions[lang] || []);
            setCompletedWords(getGapWordsProgress());
        };
        handleStateUpdate();

        window.addEventListener('language-changed', handleStateUpdate);
        window.addEventListener('storage', handleStateUpdate); 

        return () => {
            window.removeEventListener('language-changed', handleStateUpdate);
            window.removeEventListener('storage', handleStateUpdate);
        };
    }, []);

    const handleViewToggle = () => {
        const newView = view === 'grid' ? 'list' : 'grid';
        setView(newView);
        localStorage.setItem(VIEW_MODE_KEY, newView);
    };

    const { uncompleted, completed } = useMemo(() => {
        const uncompleted: GapWordQuestion[] = [];
        const completed: GapWordQuestion[] = [];
        questions.forEach(q => {
            if (completedWords.has(q.fullWord)) {
                completed.push(q);
            } else {
                uncompleted.push(q);
            }
        });
        return { uncompleted, completed };
    }, [questions, completedWords]);
    
    const renderWordItem = (question: GapWordQuestion, index: number, isCompleted: boolean) => (
        <div onClick={() => onSelectQuestion(question)} key={question.fullWord} className="cursor-pointer">
            <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                isCompleted ? "bg-success/10 text-muted-foreground" : "bg-card hover:bg-muted/50"
            )}>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono w-6 text-right">{index + 1}.</span>
                    <span className={cn("font-semibold text-lg", !isCompleted && "font-mono tracking-wider")}>
                         {isCompleted ? question.fullWord : question.wordWithGap.replace(/_+/g, '___')}
                    </span>
                </div>
                {isCompleted ? <CheckCircle className="h-5 w-5 text-success" /> : <Pencil className="h-5 w-5 text-muted-foreground/50" />}
            </div>
        </div>
    );
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <FileText className="h-8 w-8" />
                        <CardTitle className="text-3xl">Gap in the Words</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pl-6 pr-2 pt-2 pb-4">
                    <ScrollArea className="h-[60vh] pr-4">
                        {view === 'list' ? (
                            <div className="space-y-1">
                                {uncompleted.map((q, i) => renderWordItem(q, i, false))}
                                {completed.length > 0 && uncompleted.length > 0 && (
                                    <div className="py-4">
                                        <h3 className="text-sm font-semibold text-muted-foreground text-center uppercase tracking-wider">Completed</h3>
                                        <Separator className="mt-2" />
                                    </div>
                                )}
                                {completed.map((q, i) => renderWordItem(q, uncompleted.length + i, true))}
                            </div>
                        ) : (
                             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                {questions.map((question, index) => {
                                    const isCompleted = completedWords.has(question.fullWord);
                                    return (
                                        <div onClick={() => onSelectQuestion(question)} key={question.fullWord} className="cursor-pointer">
                                            <div className={cn(
                                                "flex items-center justify-center aspect-square rounded-lg transition-colors border-2",
                                                isCompleted 
                                                    ? "bg-success/20 text-foreground border-success/40 hover:bg-success/30" 
                                                    : "bg-card hover:bg-muted/50 border-primary"
                                            )}>
                                                <span className="font-bold text-xl">{index + 1}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/fill-the-gap" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Fill the Gap
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleViewToggle}>
                            {view === 'list' ? <LayoutGrid className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
                            View
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}

export default function GapWordsContainerPage() {
    const [selectedQuestion, setSelectedQuestion] = useState<GapWordQuestion | null>(null);
    const [_, setTick] = useState(0); 

    const handleComplete = () => {
        setSelectedQuestion(null);
        setTick(t => t + 1); 
    };

    if (selectedQuestion) {
        return <GapWordExercise question={selectedQuestion} onComplete={handleComplete} />;
    }

    return <WordListPage onSelectQuestion={setSelectedQuestion} />;
}
