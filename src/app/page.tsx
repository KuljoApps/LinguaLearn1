
"use client";

import { BookOpen, Dumbbell, Sparkles, Settings, BarChart, ShieldX, MessageSquareQuote, Layers, Trophy, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { getLanguage, setLanguage } from '@/lib/storage';
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

export default function Home() {
    const [language, setCurrentLanguage] = useState<'en' | 'fr' | 'de' | 'it' | 'es'>('en');

    useEffect(() => {
        setCurrentLanguage(getLanguage());
    }, []);

    const handleLanguageChange = (lang: 'en' | 'fr' | 'de' | 'it' | 'es') => {
        setLanguage(lang);
        setCurrentLanguage(lang);
    };

    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const isItalian = language === 'it';
    const isSpanish = language === 'es';

    const getWelcomeMessage = () => {
        if (isFrench) return "Prêt à remettre en question tes choix de vie dans une autre langue? Allons-y!";
        if (isGerman) return "Bereit, deine Lebensentscheidungen in einer anderen Sprache zu hinterfragen? Los geht's!";
        if (isItalian) return "Pronto a mettere in discussione le tue scelte di vita in un'altra lingua? Andiamo!";
        if (isSpanish) return "¿Listo para cuestionar tus elecciones de vida en otro idioma? ¡Vamos!";
        return "Ready to question your life choices in another language? Let's go!";
    };

    const getQuizTitle1 = () => {
        if (isFrench) return "Français - Polonais";
        if (isGerman) return "Deutsch - Polnisch";
        if (isItalian) return "Italiano - Polacco";
        if (isSpanish) return "Español - Polaco";
        return "English - Polish";
    };

    const getQuizTitle2 = () => {
        if (isFrench) return "Polonais - Français";
        if (isGerman) return "Polnisch - Deutsch";
        if (isItalian) return "Polacco - Italiano";
        if (isSpanish) return "Polaco - Español";
        return "Polish - English";
    };
    
    const getQuizTitle3 = () => {
        if (isFrench) return "Verbes Irréguliers";
        if (isGerman) return "Unregelmäßige Verben";
        if (isItalian) return "Verbi Irregolari";
        if (isSpanish) return "Verbos Irregulares";
        return "Irregular Verbs";
    }

    const getQuizTitle4 = () => {
        if (isFrench) return "Faux Amis";
        if (isGerman) return "Trennbare Verben";
        if (isItalian) return "Falsi Amici";
        if (isSpanish) return "Falsos Amigos";
        return "Phrasal Verbs";
    }
    
    const getQuizTitle5 = () => {
        if (isFrench) return "Idiomes";
        if (isGerman) return "Redewendungen";
        if (isItalian) return "Modi di dire";
        if (isSpanish) return "Modismos";
        return "Idioms";
    }

    const getLearningButtonText = () => {
        if (isFrench) return "Apprentissage";
        if (isGerman) return "Lernen";
        if (isItalian) return "Apprendimento";
        if (isSpanish) return "Aprendizaje";
        return "Learning";
    };

    const getFlag = () => {
        if (isFrench) return '🇫🇷';
        if (isGerman) return '🇩🇪';
        if (isItalian) return '🇮🇹';
        if (isSpanish) return '🇪🇸';
        return '🇬🇧';
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl text-center">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <LinguaLearnLogo width="48" height="48" />
                        <h1 className="text-4xl font-bold tracking-tight">LinguaLearn</h1>
                    </div>
                    <p className="text-muted-foreground">
                        {getWelcomeMessage()}
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-6 pt-0 pb-4">
                    <Link href={isFrench ? "/quiz/fr-pl" : isGerman ? "/quiz/de-pl" : isItalian ? "/quiz/it-pl" : isSpanish ? "/quiz/es-pl" : "/quiz/en-pl"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <BookOpen className="mr-2 h-5 w-5" />
                            {getQuizTitle1()}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/pl-fr" : isGerman ? "/quiz/pl-de" : isItalian ? "/quiz/pl-it" : isSpanish ? "/quiz/pl-es" : "/quiz/pl-en"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Dumbbell className="mr-2 h-5 w-5" />
                            {getQuizTitle2()}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/irregular-verbs-fr" : isGerman ? "/quiz/irregular-verbs-de" : isItalian ? "/quiz/irregular-verbs-it" : isSpanish ? "/quiz/irregular-verbs-es" : "/quiz/irregular-verbs"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            {getQuizTitle3()}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/phrasal-verbs-fr" : isGerman ? "/quiz/phrasal-verbs-de" : isItalian ? "/quiz/phrasal-verbs-it" : isSpanish ? "/quiz/phrasal-verbs-es" : "/quiz/phrasal-verbs"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Layers className="mr-2 h-5 w-5" />
                            {getQuizTitle4()}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/idioms-fr" : isGerman ? "/quiz/idioms-de" : isItalian ? "/quiz/idioms-it" : isSpanish ? "/quiz/idioms-es" : "/quiz/idioms"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <MessageSquareQuote className="mr-2 h-5 w-5" />
                            {getQuizTitle5()}
                        </Button>
                    </Link>
                </CardContent>
                <div className="px-6 pb-2">
                    <Separator className="mb-2"/>
                    <Link href={isFrench ? "/learning/fr" : isGerman ? "/learning/de" : isItalian ? "/learning/it" : isSpanish ? "/learning/es" : "/learning/en"} passHref>
                        <Button variant="outline" className="w-full h-12 text-lg mt-2 border-2 border-primary">
                            <GraduationCap className="mr-2 h-5 w-5 text-deep-purple" />
                            {getLearningButtonText()}
                        </Button>
                    </Link>
                </div>
                <CardFooter className="flex justify-center gap-4 p-6 pt-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="Change language">
                                <span className="text-2xl">{getFlag()}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                                <span className="mr-2 text-lg">🇬🇧</span> English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                                <span className="mr-2 text-lg">🇫🇷</span> Français
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                                <span className="mr-2 text-lg">🇩🇪</span> Deutsch
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('it')}>
                                <span className="mr-2 text-lg">🇮🇹</span> Italiano
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
                                <span className="mr-2 text-lg">🇪🇸</span> Español
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

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
