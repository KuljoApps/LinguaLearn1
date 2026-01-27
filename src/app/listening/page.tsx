"use client";

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Ear, Keyboard, BookOpen, LayoutGrid, List, MapPin, Users, Beaker, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ProgressRing from '@/components/ProgressRing';
import { getLanguage, type Language } from '@/lib/storage';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const VIEW_MODE_KEY = 'listeningViewMode';
const DEV_TOOLS_COLLAPSIBLE_STATE_KEY = 'linguaLearnDevToolsOpen';

const uiTexts = {
    welcome: {
        en: 'Practice your listening skills with a variety of tasks.',
        fr: 'Exercez vos compétences d\'écoute avec une variété de tâches.',
        de: 'Übe deine Hörfähigkeiten mit einer Vielzahl von Aufgaben.',
        it: 'Esercita le tue abilità di ascolto con una varietà di compiti.',
        es: 'Practica tus habilidades de escucha con una variedad de tareas.'
    },
    backToHome: {
        en: 'Back to Home',
        fr: "Retour à l'accueil",
        de: 'Zurück zur Startseite',
        it: 'Torna alla Home',
        es: 'Volver al Inicio'
    },
    view: {
        en: 'View',
        fr: 'Vue',
        de: 'Ansicht',
        it: 'Vista',
        es: 'Vista'
    },
    start: {
        en: 'Start',
        fr: 'Démarrer',
        de: 'Start',
        it: 'Inizia',
        es: 'Empezar'
    }
};

const tasksData = [
    {
        href: '/listening/story-comprehension',
        icon: BookOpen,
        titles: {
            en: 'Story Comprehension',
            fr: 'Compréhension d\'Histoire',
            de: 'Hörverständnis einer Geschichte',
            it: 'Comprensione della Storia',
            es: 'Comprensión de Historias'
        },
        description: 'Wysłuchaj krótkiej historii, a następnie odpowiedz na pytania dotyczące jej treści, aby sprawdzić swoje zrozumienie.',
    },
    {
        href: '/listening/dictation',
        icon: Keyboard,
        titles: {
            en: 'Dictation',
            fr: 'Dictée',
            de: 'Diktat',
            it: 'Dettato',
            es: 'Dictado'
        },
        description: 'Zapisz zdanie, które usłyszysz. Doskonałe ćwiczenie na rozumienie ze słuchu i ortografię.',
    },
    {
        href: '/listening/conversation-location',
        icon: MapPin,
        titles: {
            en: 'Conversation Location',
            fr: 'Lieu de la Conversation',
            de: 'Ort des Gesprächs',
            it: 'Luogo della Conversazione',
            es: 'Lugar de la Conversación'
        },
        description: 'Wysłuchaj krótkiego dialogu i określ, gdzie odbywa się rozmowa (np. na lotnisku, w restauracji).',
    },
    {
        href: '/listening/speaker-identification',
        icon: Users,
        titles: {
            en: 'Speaker Identification',
            fr: 'Identification du Locuteur',
            de: 'Sprecheridentifikation',
            it: 'Identificazione dell\'Oratore',
            es: 'Identificación del Hablante'
        },
        description: 'Wysłuchaj rozmowy i zidentyfikuj, który z mówców wypowiedział określoną frazę.',
    },
];


export default function ListeningPage() {
    const [language, setLanguageState] = useState<Language>('en');
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [progressData, setProgressData] = useState<{ completed: number; total: number; progress: number; }[]>([]);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguageState(getLanguage());
        };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);

        const savedView = localStorage.getItem(VIEW_MODE_KEY) as 'grid' | 'list' | null;
        if (savedView) {
            setView(savedView);
        }

        const savedDevToolsState = localStorage.getItem(DEV_TOOLS_COLLAPSIBLE_STATE_KEY);
        if (savedDevToolsState === 'true') {
            setIsDevToolsOpen(true);
        }

        setProgressData(
            Array(tasksData.length)
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
        
        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
        };
    }, []);

    const handleViewToggle = () => {
        const newView = view === 'grid' ? 'list' : 'grid';
        setView(newView);
        localStorage.setItem(VIEW_MODE_KEY, newView);
    };

    const handleDevToolsOpenChange = (open: boolean) => {
        setIsDevToolsOpen(open);
        localStorage.setItem(DEV_TOOLS_COLLAPSIBLE_STATE_KEY, JSON.stringify(open));
    };
    
    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][language] || uiTexts[key]['en'];
    };

    const tasks = useMemo(() => tasksData.map(task => ({
        ...task,
        title: task.titles[language] || task.titles.en
    })), [language]);

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
                                <span className="absolute -left-[12px] -top-1 text-sm font-semibold tracking-normal text-amber">
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
                        {getUIText('welcome')}
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
                                                <Button className="w-full">{getUIText('start')}</Button>
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
                                <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('backToHome')}
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleViewToggle} className="gap-2">
                            {view === 'grid' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                            <span>{getUIText('view')}</span>
                        </Button>
                    </div>

                    <div className="w-full pt-4 mt-4 border-t border-dashed">
                        <Collapsible open={isDevToolsOpen} onOpenChange={handleDevToolsOpenChange} className="w-full">
                            <div className="flex items-center justify-center -mb-2">
                                <Separator className="flex-grow" />
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-3">
                                        <Beaker className="h-4 w-4" />
                                        <span className="text-sm italic text-muted-foreground">Dev Tools Colors</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDevToolsOpen ? 'rotate-180' : ''}`} />
                                    </Button>
                                </CollapsibleTrigger>
                                <Separator className="flex-grow" />
                            </div>
                            <CollapsibleContent className="pt-4 space-y-4 text-center">
                                <div className="p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-semibold text-sm mb-2">Button Colors</h4>
                                    <p className="text-xs text-muted-foreground">Button color configurator will be here.</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-semibold text-sm mb-2">Confetti Configurator</h4>
                                    <p className="text-xs text-muted-foreground">Confetti configurator will be here.</p>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
