"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, PencilLine, FileText, MessagesSquare, AlignLeft, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ProgressRing from '@/components/ProgressRing';

const VIEW_MODE_KEY = 'fillTheGapViewMode';

const tasks = [
    {
        href: '/fill-the-gap/gap-words',
        icon: FileText,
        title: 'Gap in the Words',
        description: 'Uzupełnij słowa, wpisując brakujące litery. Świetny sposób na ćwiczenie pisowni.',
    },
    {
        href: '/fill-the-gap/gap-sentences',
        icon: MessagesSquare,
        title: 'Gap in the Sentences',
        description: 'Uzupełnij zdania, wpisując brakujące słowa. Sprawdź swoją gramatykę i słownictwo.',
    },
    {
        href: '/fill-the-gap/gap-text',
        icon: AlignLeft,
        title: 'Gap in the Text',
        description: 'Uzupełnij brakujące zdanie w tekście, wybierając najlepszą opcję, aby sprawdzić rozumienie spójności i logicznego przepływu.',
    },
];

export default function FillTheGapPage() {
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [progressData, setProgressData] = useState<{ completed: number; total: number; progress: number; }[]>([]);

    useEffect(() => {
        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'grid' | 'list' | null;
        if (savedView) {
            setView(savedView);
        }

        setProgressData(
            Array(tasks.length)
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
                        <PencilLine className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            Fill the{' '}
                            <span className="relative inline-block">
                                Gap
                                <span className="absolute -left-[30px] -bottom-3 text-sm font-semibold tracking-normal text-amber">
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
                    <p className="text-muted-foreground text-center pb-4">
                        Practice your language skills by filling in the missing parts.
                    </p>
                    {view === 'list' ? (
                        <div className="flex flex-col space-y-2">
                            {tasks.map((task) => (
                                <div key={task.href}>
                                    <Link href={task.href} passHref>
                                        <Button className="w-full h-16 text-lg" size="lg">
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
                            {tasks.map((task, index) => {
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
