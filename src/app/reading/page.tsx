"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ScanSearch, ListCollapse, PenTool, Scale, LayoutGrid, List, BookOpenText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ProgressRing from '@/components/ProgressRing';

const VIEW_MODE_KEY = 'readingViewMode';

const readingTasks = [
    {
        href: '/reading/read-and-answer',
        icon: BookOpenText,
        title: 'Read and Answer',
        description: 'Przeczytaj krótki tekst i odpowiedz na pytania, aby sprawdzić swoje zrozumienie.',
    },
    {
        href: '/reading/true-false',
        icon: CheckCircle2,
        title: 'True or False',
        description: 'Przeczytaj stwierdzenia i zdecyduj, czy są prawdziwe, fałszywe, czy też informacja nie została podana w tekście.',
    },
    {
        href: '/reading/vocabulary-in-context',
        icon: ScanSearch,
        title: 'Vocabulary in Context',
        description: 'Zidentyfikuj znaczenie wyróżnionych słów na podstawie kontekstu, w którym występują w tekście.',
    },
    {
        href: '/reading/matching-headings',
        icon: ListCollapse,
        title: 'Matching Headings',
        description: 'Dopasuj nagłówki do odpowiednich akapitów tekstu, aby sprawdzić swoje zrozumienie głównej myśli każdej części.',
    },
    {
        href: '/reading/tone-analysis',
        icon: PenTool,
        title: 'Tone Analysis',
        description: 'Określ ton autora tekstu (np. informacyjny, perswazyjny, humorystyczny), aby nauczyć się rozpoznawać głębsze intencje piszącego.',
    },
    {
        href: '/reading/fact-or-opinion',
        icon: Scale,
        title: 'Fact or Opinion',
        description: 'Przeczytaj tekst i rozróżnij stwierdzenia oparte na faktach od tych, które wyrażają opinię autora, rozwijając swoje krytyczne myślenie.',
    },
];

export default function ReadingPage() {
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [progressData, setProgressData] = useState<{ completed: number; total: number; progress: number; }[]>([]);

    useEffect(() => {
        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'grid' | 'list' | null;
        if (savedView) {
            setView(savedView);
        }

        setProgressData(
            Array(readingTasks.length)
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
    }, []);

    const handleViewToggle = () => {
        const newView = view === 'grid' ? 'list' : 'grid';
        setView(newView);
        localStorage.setItem(VIEW_MODE_KEY, newView);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className={cn(
                "w-full max-w-md shadow-2xl text-center",
                view === 'grid' && "flex flex-col h-[90vh]"
            )}>
                <CardHeader className="text-center p-6 pb-2">
                    <div className="flex items-center justify-center gap-4">
                        <BookOpenText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            <span className="relative inline-block">
                                Reading
                                <span className="absolute -left-[10px] -bottom-2 text-sm font-semibold tracking-normal text-amber">
                                Lite
                                </span>
                            </span>
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className={cn(
                    "p-6 pt-0 pb-4",
                    view === 'grid' && "flex-1 overflow-y-auto"
                )}>
                    <p className="text-muted-foreground text-center pb-4">Hone your reading comprehension and vocabulary skills.</p>
                    {view === 'list' ? (
                        <div className="flex flex-col space-y-2">
                            {readingTasks.map((task) => (
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
                            {readingTasks.map((task, index) => {
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
