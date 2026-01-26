"use client";

import { BookOpen, Dumbbell, Sparkles, MessageSquareQuote, Layers, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getLanguage } from '@/lib/storage';
import { useState, useEffect } from 'react';
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Separator } from '@/components/ui/separator';

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

     const getQuizDesc1 = () => {
        if (isFrench) return "Traduisez des mots du français vers le polonais et testez vos compétences.";
        if (isGerman) return "Übersetzen Sie Wörter vom Deutschen ins Polnische und testen Sie Ihre Fähigkeiten.";
        if (isItalian) return "Traduci parole dall'italiano al polacco e metti alla prova le tue abilità.";
        if (isSpanish) return "Traduce palabras del español al polaco y pon a prueba tus habilidades.";
        return "Przetłumacz słowa z angielskiego na polski i sprawdź, jak sobie radzisz.";
    };

    const getQuizTitle2 = () => {
        if (isFrench) return "Polonais - Français";
        if (isGerman) return "Polnisch - Deutsch";
        if (isItalian) return "Polacco - Italiano";
        if (isSpanish) return "Polaco - Español";
        return "Polish - English";
    };

    const getQuizDesc2 = () => {
        if (isFrench) return "Inversez les rôles ! Voyez si vous pouvez traduire des mots polonais en français.";
        if (isGerman) return "Rollentausch! Sehen Sie, ob Sie polnische Wörter ins Deutsche übersetzen können.";
        if (isItalian) return "Inverti i ruoli! Vedi se riesci a tradurre parole polacche in italiano.";
        if (isSpanish) return "¡Invierte los papeles! Ve si puedes traducir palabras polacas al inglés.";
        return "Odwróć role! Zobacz, czy potrafisz przetłumaczyć polskie słowa na angielski.";
    };
    
    const getQuizTitle3 = () => {
        if (isFrench) return "Verbes & Aux.";
        if (isGerman) return "Unregelmäßige Verben";
        if (isItalian) return "Verbi Irregolari";
        if (isSpanish) return "Verbos Irregulares";
        return "Irregular Verbs";
    }

    const getQuizDesc3 = () => {
        if (isFrench) return "Testez vos connaissances des verbes et auxiliaires.";
        if (isGerman) return "Testen Sie Ihr Wissen über unregelmäßige Verben.";
        if (isItalian) return "Metti alla prova la tua conoscenza dei verbi irregolari.";
        if (isSpanish) return "Pon a prueba tu conocimiento de los verbos irregulares.";
        return "Sprawdź swoją wiedzę o nieregularnych czasownikach.";
    }

    const getQuizTitle4 = () => {
        if (isFrench) return "Faux Amis";
        if (isGerman) return "Trennbare Verben";
        if (isItalian) return "Falsi Amici";
        if (isSpanish) return "Falsos Amigos";
        return "Phrasal Verbs";
    }

    const getQuizDesc4 = () => {
        if (isFrench) return "Identifiez les 'faux amis' qui se cachent entre le français et le polonais.";
        if (isGerman) return "Überprüfen Sie Ihr Verständnis von trennbaren Verben.";
        if (isItalian) return "Controlla la tua comprensione dei 'falsi amici'.";
        if (isSpanish) return "Comprueba tu comprensión de los 'falsos amigos'.";
        return "Zmierz się z podchwytliwymi 'phrasal verbs'.";
    }
    
    const getQuizTitle5 = () => {
        if (isFrench) return "Idiomes";
        if (isGerman) return "Redewendungen";
        if (isItalian) return "Modi di dire";
        if (isSpanish) return "Modismos";
        return "Idioms";
    }

     const getQuizDesc5 = () => {
        if (isFrench) return "Devinez le sens des idiomes courants.";
        if (isGerman) return "Errate die Bedeutung gängiger Redewendungen.";
        if (isItalian) return "Indovina il significato degli idiomi comuni.";
        if (isSpanish) return "Adivina el significado de los modismos comunes.";
        return "Zgadnij znaczenie popularnych angielskich idiomów.";
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
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <LinguaLearnLogo width="48" height="48" />
                        <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">
                            Lingua
                            <span className="relative inline-block">
                                Learn
                                <span className="absolute -right-1 -bottom-4 text-lg font-semibold tracking-normal text-amber">
                                Lite
                                </span>
                            </span>
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        {getWelcomeMessage()}
                    </p>
                    <CardTitle className="text-3xl font-bold tracking-tight pt-4">{getTitle()}</CardTitle>
                </CardHeader>
                <CardContent data-tutorial-id="quiz-buttons" className="flex flex-col space-y-2 p-6 pt-2 pb-4">
                    <div>
                        <Link href={isFrench ? "/quiz/fr-pl" : isGerman ? "/quiz/de-pl" : isItalian ? "/quiz/it-pl" : isSpanish ? "/quiz/es-pl" : "/quiz/en-pl"} passHref>
                            <Button className="w-full h-12 text-lg" size="lg">
                                <BookOpen className="mr-2 h-5 w-5" />
                                {getQuizTitle1()}
                            </Button>
                        </Link>
                        <p className="text-xs italic text-muted-foreground mt-1">{getQuizDesc1()}</p>
                    </div>
                    <div>
                        <Link href={isFrench ? "/quiz/pl-fr" : isGerman ? "/quiz/pl-de" : isItalian ? "/quiz/pl-it" : isSpanish ? "/quiz/pl-es" : "/quiz/pl-en"} passHref>
                            <Button className="w-full h-12 text-lg" size="lg">
                                <Dumbbell className="mr-2 h-5 w-5" />
                                {getQuizTitle2()}
                            </Button>
                        </Link>
                         <p className="text-xs italic text-muted-foreground mt-1">{getQuizDesc2()}</p>
                    </div>
                    <div>
                        <Link href={isFrench ? "/quiz/irregular-verbs-fr" : isGerman ? "/quiz/irregular-verbs-de" : isItalian ? "/quiz/irregular-verbs-it" : isSpanish ? "/quiz/irregular-verbs-es" : "/quiz/irregular-verbs-en"} passHref>
                            <Button className="w-full h-12 text-lg" size="lg">
                                <Sparkles className="mr-2 h-5 w-5" />
                                {getQuizTitle3()}
                            </Button>
                        </Link>
                        <p className="text-xs italic text-muted-foreground mt-1">{getQuizDesc3()}</p>
                    </div>
                     <div>
                        <Link href={isFrench ? "/quiz/phrasal-verbs-fr" : isGerman ? "/quiz/phrasal-verbs-de" : isItalian ? "/quiz/phrasal-verbs-it" : isSpanish ? "/quiz/phrasal-verbs-es" : "/quiz/phrasal-verbs-en"} passHref>
                            <Button className="w-full h-12 text-lg" size="lg">
                                <Layers className="mr-2 h-5 w-5" />
                                {getQuizTitle4()}
                            </Button>
                        </Link>
                        <p className="text-xs italic text-muted-foreground mt-1">{getQuizDesc4()}</p>
                    </div>
                    <div>
                        <Link href={isFrench ? "/quiz/idioms-fr" : isGerman ? "/quiz/idioms-de" : isItalian ? "/quiz/idioms-it" : isSpanish ? "/quiz/idioms-es" : "/quiz/idioms-en"} passHref>
                            <Button className="w-full h-12 text-lg" size="lg">
                                <MessageSquareQuote className="mr-2 h-5 w-5" />
                                {getQuizTitle5()}
                            </Button>
                        </Link>
                         <p className="text-xs italic text-muted-foreground mt-1">{getQuizDesc5()}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col p-6 pt-4 gap-4">
                    <Separator />
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
