"use client";

import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Dumbbell, Sparkles, MessageSquareQuote, Layers, ArrowLeft, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getLanguage, type Language } from '@/lib/storage';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ProgressRing from '@/components/ProgressRing';

const VIEW_MODE_KEY = 'quizzesViewMode';

export default function QuizzesPage() {
    const [language, setCurrentLanguage] = useState<Language>('en');
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [progressData, setProgressData] = useState<{ completed: number; total: number; progress: number; }[]>([]);

    useEffect(() => {
        const handleLanguageChange = () => {
            setCurrentLanguage(getLanguage());
        };
        handleLanguageChange();

        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'grid' | 'list' | null;
        if (savedView) {
            setView(savedView);
        }

        window.addEventListener('language-changed', handleLanguageChange);
        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
        };
    }, []);

    const handleViewToggle = () => {
        const newView = view === 'grid' ? 'list' : 'grid';
        setView(newView);
        localStorage.setItem(VIEW_MODE_KEY, newView);
    };
    
    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const isItalian = language === 'it';
    const isSpanish = language === 'es';

    const quizTasks = useMemo(() => {
        const getQuizTitle = (baseTitle: string, langMap: Partial<Record<Language, string>>) => {
            return langMap[language] || baseTitle;
        };

        const getQuizTitle3 = () => {
            if (isFrench) return "Verbes & Aux.";
            if (isGerman) return "Irregular Verbs";
            if (isItalian) return "Verbi Irregolari";
            if (isSpanish) return "Verbos Irregulares";
            return "Irregular Verbs";
        }
    
        const getQuizTitle4 = () => {
            if (isFrench) return "Faux Amis";
            if (isGerman) return "Separable Verbs";
            if (isItalian) return "Falsi Amici";
            if (isSpanish) return "Falsos Amigos";
            return "Phrasal Verbs";
        }

        return [
        { 
            href: isFrench ? "/quiz/fr-pl" : isGerman ? "/quiz/de-pl" : isItalian ? "/quiz/it-pl" : isSpanish ? "/quiz/es-pl" : "/quiz/en-pl", 
            icon: BookOpen, 
            title: getQuizTitle('English - Polish', { fr: 'Français - Polonais', de: 'Deutsch - Polnisch', it: 'Italiano - Polacco', es: 'Español - Polaco' }), 
            description: "Przetłumacz słowa z wybranego języka na polski. Doskonały sposób na przetestowanie i poszerzenie podstawowego słownictwa." 
        },
        { 
            href: isFrench ? "/quiz/pl-fr" : isGerman ? "/quiz/pl-de" : isItalian ? "/quiz/pl-it" : isSpanish ? "/quiz/pl-es" : "/quiz/pl-en", 
            icon: Dumbbell, 
            title: getQuizTitle('Polish - English', { fr: 'Polonais - Français', de: 'Polnisch - Deutsch', it: 'Polacco - Italiano', es: 'Polaco - Español' }), 
            description: "Odwróć role! Zobacz, czy potrafisz przetłumaczyć polskie słowa na wybrany język, aby wzmocnić swoje umiejętności." 
        },
        { 
            href: isFrench ? "/quiz/irregular-verbs-fr" : isGerman ? "/quiz/irregular-verbs-de" : isItalian ? "/quiz/irregular-verbs-it" : isSpanish ? "/quiz/irregular-verbs-es" : "/quiz/irregular-verbs-en", 
            icon: Sparkles, 
            title: getQuizTitle3(),
            description: "Sprawdź swoją wiedzę o nieregularnych czasownikach. Ten quiz pomoże Ci zapamiętać ich kluczowe formy i zastosowanie." 
        },
        { 
            href: isFrench ? "/quiz/phrasal-verbs-fr" : isGerman ? "/quiz/phrasal-verbs-de" : isItalian ? "/quiz/phrasal-verbs-it" : isSpanish ? "/quiz/phrasal-verbs-es" : "/quiz/phrasal-verbs-en", 
            icon: Layers, 
            title: getQuizTitle4(),
            description: "Zmierz się z podchwytliwymi zwrotami i 'fałszywymi przyjaciółmi'. Opanuj popularne zwroty, aby Twoja mowa brzmiała bardziej naturalnie." 
        },
        { 
            href: isFrench ? "/quiz/idioms-fr" : isGerman ? "/quiz/idioms-de" : isItalian ? "/quiz/idioms-it" : isSpanish ? "/quiz/idioms-es" : "/quiz/idioms-en", 
            icon: MessageSquareQuote, 
            title: getQuizTitle('Idioms', { fr: 'Idiomes', de: 'Redewendungen', it: 'Modi di dire', es: 'Modismos' }), 
            description: "Zgadnij znaczenie popularnych idiomów. To świetny sposób na zrozumienie kulturowych niuansów języka i wzbogacenie wypowiedzi." 
        },
    ]}, [language, isFrench, isGerman, isItalian, isSpanish]);

    useEffect(() => {
        setProgressData(
            Array(quizTasks.length)
                .fill(0)
                .map(() => {
                    const completed = Math.floor(10 + Math.random() * 86);
                    const total = 100;
                    const progress = (completed / total) * 100;
                    return {
                        completed,
                        total,
                        progress: Math.max(10, Math.min(95, progress)),
                    };
                })
        );
    }, [quizTasks]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className={cn(
                "w-full max-w-md shadow-2xl text-center",
                view === 'grid' && "flex flex-col h-[90vh]"
            )}>
                <CardHeader className="text-center p-6 pb-2">
                    <div className="flex items-center justify-center gap-4">
                        <LayoutGrid className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            <span className="relative inline-block">
                                Quizzes
                                <span className="absolute -right-1 -bottom-2 text-sm font-semibold tracking-normal text-amber">
                                Lite
                                </span>
                            </span>
                        </h1>
                    </div>
                </CardHeader>
                <CardContent data-tutorial-id="quiz-buttons" className={cn(
                    "p-6 pt-0 pb-4",
                    view === 'grid' ? "flex-1 overflow-y-auto" : "flex flex-col space-y-2"
                )}>
                    <p className="text-muted-foreground text-center pb-4">Test your language skills with a variety of quizzes.</p>
                    {view === 'list' ? (
                        <div className="flex flex-col space-y-2">
                            {quizTasks.map((task) => (
                                <div key={task.href}>
                                    <Link href={task.href} passHref>
                                        <Button className="w-full h-12 text-lg" size="lg">
                                            <task.icon className="mr-2 h-5 w-5" />
                                            {task.title}
                                        </Button>
                                    </Link>
                                    <p className="text-xs italic text-muted-foreground mt-1 px-2">{task.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quizTasks.map((task, index) => {
                                const Icon = task.icon;
                                const { completed, total, progress } = progressData[index] || { completed: 0, total: 0, progress: 0 };
                                return (
                                    <Card key={task.title} className="relative border-2 overflow-hidden">
                                        <ProgressRing progress={progress} completed={completed} total={total} />
                                        <CardHeader className="items-center pt-12">
                                            <Icon className="h-12 w-12 text-primary" />
                                            <CardTitle className="pt-2 text-center">{task.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-center text-muted-foreground h-20">{task.description}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Link href={task.href} className="w-full">
                                                <Button className="w-full">Start</Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
                <CardFooter className={cn(
                    "flex flex-col p-6 pt-4 gap-4",
                    view === 'grid' && "mt-auto"
                )}>
                    <Separator />
                    <div className="flex justify-center gap-4">
                         <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleViewToggle} className="gap-2">
                            {view === 'grid' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                            <span>View</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
