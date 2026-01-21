"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, ArrowLeft } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { getTutorialState } from '@/lib/storage';
import { useRouter } from 'next/navigation';

const question = {
    verb: 'be',
    correctForm2: 'was/were',
    correctForm3: 'been',
    correctTranslation: 'być',
    translationOptions: ['mieć', 'robić', 'być'],
};

export default function IrregularVerbQuizPage() {
    const [form2Input, setForm2Input] = useState('');
    const [form3Input, setForm3Input] = useState('');
    const [form2Class, setForm2Class] = useState('');
    const [form3Class, setForm3Class] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [router]);


    useEffect(() => {
        const updateStep = () => {
            const state = getTutorialState();
            if (state?.stage === 'quiz') {
                setActiveStep(state.step);
            }
        };

        window.addEventListener('tutorial-state-changed', updateStep);
        updateStep();
        return () => window.removeEventListener('tutorial-state-changed', updateStep);
    }, []);

    const typeText = async (setter: React.Dispatch<React.SetStateAction<string>>, text: string, delay: number) => {
        for (let i = 0; i <= text.length; i++) {
            setter(text.substring(0, i));
            await new Promise(res => setTimeout(res, delay));
        }
    };

    useEffect(() => {
        if (activeStep === 5) { // Step 32: "Wpisywanie odpowiedzi" - Animate typing
            setShowHint(false);
            setForm2Input('');
            setForm3Input('');
            const animate = async () => {
                await new Promise(res => setTimeout(res, 500));
                
                await typeText(setForm2Input, "was", 100);
                setForm2Class('bg-success text-success-foreground');
                
                await new Promise(res => setTimeout(res, 300));
                
                await typeText(setForm3Input, "beed", 150);
                setForm3Class('bg-destructive text-destructive-foreground');
            };
            animate();
        } else if (activeStep === 6) { // Step 33: "Dwie poprawne formy" - Show hint statically
            // Set the state to match the end of the previous animation's state
            setForm2Input('was');
            setForm3Input('beed');
            setForm2Class('');
            setForm3Class('bg-destructive text-destructive-foreground');
            // Show the hint immediately, without delay
            setShowHint(true);
        } else {
            // Reset state for all other steps
            setForm2Input('');
            setForm3Input('');
            setForm2Class('');
            setForm3Class('');
            setShowHint(false);
        }
    }, [activeStep]);
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center gap-2">
                        <LinguaLearnLogo className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">Lingua<span className="relative inline-block">Learn<span className="absolute -right-0.5 -bottom-3 text-sm font-semibold tracking-normal text-amber">Lite</span></span></CardTitle>
                    </div>
                    <CardDescription className="pt-2">Wybierz tłumaczenie i uzupełnij formy</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-6">
                    <div className="w-full space-y-4">
                        <div className="w-full flex justify-around gap-4 text-center">
                            <div className="flex items-center gap-2"><Clock className="h-6 w-6" /><span className="text-2xl font-bold">30s</span></div>
                            <div className="flex items-center gap-2"><Clock className="h-6 w-6" /><span className="text-2xl font-bold">00:00</span></div>
                        </div>
                        <Progress value={100} className="w-full h-2" />
                    </div>

                    <div className="w-full space-y-4">
                         <div data-tutorial-id="irregular-quiz-part1" className="text-center space-y-4">
                            <div className="space-y-2">
                                <p className="text-muted-foreground">Czasownik nieregularny:</p>
                                <p className="text-4xl font-headline font-bold">"{question.verb}"</p>
                            </div>
                            <div className="w-full">
                                <p className="text-center text-muted-foreground">1. Wybierz poprawne tłumaczenie</p>
                                <div className="grid grid-cols-3 gap-2 w-full mt-2">
                                    {question.translationOptions.map((option) => (
                                        <Button key={option} disabled className={cn("h-auto text-base p-2", option === question.correctTranslation ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground opacity-50')}>
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pt-4" data-tutorial-id="irregular-quiz-part2">
                            <p className="text-center text-muted-foreground">2. Wpisz formy Past Simple i Past Participle</p>
                            <div className="grid grid-cols-3 gap-2 w-full items-center text-center mt-2">
                                <Input value={question.verb} readOnly className="text-center font-bold bg-muted" />
                                <Input value={form2Input} readOnly className={cn("text-center transition-colors duration-300", form2Class)} />
                                <Input value={form3Input} readOnly className={cn("text-center transition-colors duration-300", form3Class)} />
                            </div>
                        </div>
                        <div className="text-center h-16 mt-2" data-tutorial-id="irregular-quiz-hint">
                            {showHint && (
                                <div className="animate-in fade-in">
                                    <p className="text-success font-medium">
                                        Poprawne formy: {question.correctForm2}, {question.correctForm3}
                                    </p>
                                    <div className="text-xs text-muted-foreground mt-1">Jeżeli czasownik ma dwie formy, każda z nich jest zaliczana.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-0">
                    <Button variant="outline" className="pointer-events-none opacity-50"><ArrowLeft className="mr-2 h-4 w-4" /> Wróć</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
