"use client";

import { BookOpen, Dumbbell, Sparkles, MessageSquareQuote, Layers, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getLanguage } from '@/lib/storage';
import { useState, useEffect } from 'react';

export default function QuizzesPage() {
    const [language, setCurrentLanguage] = useState<'en' | 'fr' | 'de' | 'it' | 'es'>('en');

    useEffect(() => {
        const handleLanguageChange = () => {
            setCurrentLanguage(getLanguage());
        };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);
        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
        };
    }, []);

    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const isItalian = language === 'it';
    const isSpanish = language === 'es';

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
        if (isFrench) return "Verbes & Aux.";
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

    const getTitle = () => {
        if (isFrench) return "Quiz";
        if (isGerman) return "Quiz";
        if (isItalian) return "Quiz";
        if (isSpanish) return "Cuestionarios";
        return "Quizzes";
    }

     const getBackText = () => {
        if (isFrench) return "Retour à l'accueil";
        if (isGerman) return "Zurück zur Startseite";
        if (isItalian) return "Torna alla Home";
        if (isSpanish) return "Volver al Inicio";
        return "Back to Home";
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl text-center">
                <CardHeader>
                     <CardTitle className="text-3xl font-bold tracking-tight">{getTitle()}</CardTitle>
                </CardHeader>
                <CardContent data-tutorial-id="quiz-buttons" className="flex flex-col space-y-4 p-6 pt-0 pb-4">
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
                    <Link href={isFrench ? "/quiz/irregular-verbs-fr" : isGerman ? "/quiz/irregular-verbs-de" : isItalian ? "/quiz/irregular-verbs-it" : isSpanish ? "/quiz/irregular-verbs-es" : "/quiz/irregular-verbs-en"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            {getQuizTitle3()}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/phrasal-verbs-fr" : isGerman ? "/quiz/phrasal-verbs-de" : isItalian ? "/quiz/phrasal-verbs-it" : isSpanish ? "/quiz/phrasal-verbs-es" : "/quiz/phrasal-verbs-en"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <Layers className="mr-2 h-5 w-5" />
                            {getQuizTitle4()}
                        </Button>
                    </Link>
                    <Link href={isFrench ? "/quiz/idioms-fr" : isGerman ? "/quiz/idioms-de" : isItalian ? "/quiz/idioms-it" : isSpanish ? "/quiz/idioms-es" : "/quiz/idioms-en"} passHref>
                        <Button className="w-full h-12 text-lg" size="lg">
                            <MessageSquareQuote className="mr-2 h-5 w-5" />
                            {getQuizTitle5()}
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-4">
                     <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> {getBackText()}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
