
"use client";

import { BookOpen, Dumbbell, Sparkles, Settings, BarChart, ShieldX, MessageSquareQuote, Layers, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { getLanguage, setLanguage } from '@/lib/storage';
import { useState, useEffect } from 'react';

export default function Home() {
    const [language, setCurrentLanguage] = useState<'en' | 'fr'>('en');

    useEffect(() => {
        setCurrentLanguage(getLanguage());
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
        setCurrentLanguage(newLang);
        // We can reload or dynamically update content. For simplicity, we'll make links dynamic.
    };

    const isFrench = language === 'fr';

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl text-center">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <LinguaLearnLogo width="48" height="48" />
                        <h1 className="text-4xl font-bold tracking-tight">LinguaLearn</h1>
                    </div>
                    <p className="text-muted-foreground">
                        {isFrench
                            ? "Prêt à remettre en question tes choix de vie dans une autre langue? Allons-y!"
                            : "Ready to question your life choices in another language? Let's go!"}
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-6 pt-0">
                    <Link href={isFrench ? "/quiz/fr-pl" : "/quiz/en-pl"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <BookOpen className="mr-2 h-5 w-5" />
                            {isFrench ? "Français - Polonais" : "English - Polish"}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/pl-fr" : "/quiz/pl-en"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Dumbbell className="mr-2 h-5 w-5" />
                            {isFrench ? "Polonais - Français" : "Polish - English"}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/irregular-verbs-fr" : "/quiz/irregular-verbs"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            {isFrench ? "Verbes Irréguliers" : "Irregular Verbs"}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/phrasal-verbs-fr" : "/quiz/phrasal-verbs"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Layers className="mr-2 h-5 w-5" />
                            {isFrench ? "Verbes à Particule" : "Phrasal Verbs"}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/idioms-fr" : "/quiz/idioms"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <MessageSquareQuote className="mr-2 h-5 w-5" />
                            {isFrench ? "Idiomes" : "Idioms"}
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 p-6 pt-0">
                    <Button variant="outline" size="icon" onClick={toggleLanguage} title={isFrench ? "Switch to English" : "Switch to French"}>
                        <span className="text-2xl">{isFrench ? '🇬🇧' : '🇫🇷'}</span>
                    </Button>
                    <Link href="/settings" passHref>
                        <Button variant="outline" size="icon">
                            <Settings />
                        </Button>
                    </Link>
                    <Link href="/stats" passHref>
                        <Button variant="outline" size="icon">
                            <BarChart />
                        </Button>
                    </Link>
                    <Link href="/errors" passHref>
                        <Button variant="outline" size="icon">
                            <ShieldX />
                        </Button>
                    </Link>
                    <Link href="/achievements" passHref>
                        <Button variant="outline" size="icon">
                            <Trophy />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
