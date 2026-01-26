"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Ear, Keyboard, BookOpen, LayoutGrid, List, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import ButtonColors from '@/components/button-colors';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const VIEW_MODE_KEY = 'listeningViewMode';

const listeningTasks = [
    {
        href: '/listening/story-comprehension',
        icon: BookOpen,
        title: 'Story Comprehension',
        description: 'Wysłuchaj krótkiej historii, a następnie odpowiedz na pytania dotyczące jej treści, aby sprawdzić swoje rozumienie.',
    },
    {
        href: '/listening/dictation',
        icon: Keyboard,
        title: 'Dictation',
        description: 'Zapisz zdanie, które usłyszysz. Doskonałe ćwiczenie na rozumienie ze słuchu i ortografię.',
    },
    {
        href: '/listening/conversation-location',
        icon: MapPin,
        title: 'Conversation Location',
        description: 'Wysłuchaj krótkiego dialogu i określ, gdzie odbywa się rozmowa (np. na lotnisku, w restauracji).',
    },
    {
        href: '/listening/speaker-identification',
        icon: Users,
        title: 'Speaker Identification',
        description: 'Wysłuchaj rozmowy i zidentyfikuj, który z mówców wypowiedział określoną frazę.',
    },
];


export default function ListeningPage() {
    const [view, setView] = useState<'grid' | 'list'>('list');

    useEffect(() => {
        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'grid' | 'list' | null;
        if (savedView) {
            setView(savedView);
        }
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
                        <Ear className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">
                             <span className="relative inline-block">
                                Listening
                                <span className="absolute right-[-12px] -bottom-[11px] text-sm font-semibold tracking-normal text-amber">
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
                        Ćwicz swoje umiejętności słuchania poprzez różnorodne zadania.
                    </p>
                    {view === 'list' ? (
                        <div className="flex flex-col space-y-2">
                            {listeningTasks.map((task) => (
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
                            {listeningTasks.map((task) => {
                                const Icon = task.icon;
                                return (
                                    <Card key={task.title} className="relative border-2">
                                        <CardHeader className="items-center">
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
                    <div className="pt-4">
                        <ButtonColors />
                    </div>
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
