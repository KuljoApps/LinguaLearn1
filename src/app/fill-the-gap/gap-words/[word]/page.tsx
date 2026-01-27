'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Lightbulb, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLanguage, addCompletedGapWord, type Language, getGapWordsProgress } from '@/lib/storage';
import { allGapWordQuestions, type GapWordQuestion } from '@/lib/fill-the-gap/gap-words';
import { playSound } from '@/lib/sounds';
import { vibrate } from '@/lib/vibrations';
import Confetti from '@/components/Confetti';

export default function GapWordExercisePage() {
    const params = useParams();
    const router = useRouter();

    const [question, setQuestion] = useState<GapWordQuestion | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const lang = getLanguage();
        
        const wordParam = Array.isArray(params.word) ? params.word[0] : params.word;
        if (wordParam) {
            const decodedWord = decodeURIComponent(wordParam);
            const questionsForLang = allGapWordQuestions[lang];
            const foundQuestion = questionsForLang.find(q => q.fullWord === decodedWord);
            if (foundQuestion) {
                setQuestion(foundQuestion);
                const completedSet = getGapWordsProgress();
                if(completedSet.has(decodedWord)) {
                    setIsCompleted(true);
                    setInputValue(foundQuestion.missingLetters);
                }
            } else {
                router.push('/fill-the-gap/gap-words');
            }
        }
        
        const handleLanguageChange = () => router.push('/fill-the-gap/gap-words');
        window.addEventListener('language-changed', handleLanguageChange);

        return () => window.removeEventListener('language-changed', handleLanguageChange);
    }, [params.word, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isCompleted) {
            setInputValue(value);
        }

        if (question && value.toLowerCase() === question.missingLetters.toLowerCase()) {
            handleCorrect();
        }
    };
    
    const handleCorrect = () => {
        if (!question) return;
        setIsCompleted(true);
        addCompletedGapWord(question.fullWord);
        playSound('correct');
        vibrate('correct');
        setShowConfetti(true);
    };

    const onConfettiComplete = () => {
        setShowConfetti(false);
        router.push('/fill-the-gap/gap-words');
    };

    if (!question) {
        return null; // Or a loading spinner
    }

    const { wordWithGap, missingLetters, fullWord, hint } = question;
    const parts = wordWithGap.replace(/_+/, '_').split('_');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            {showConfetti && <Confetti onConfettiComplete={onConfettiComplete} />}
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
                    <Link href="/fill-the-gap/gap-words" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Word List
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
