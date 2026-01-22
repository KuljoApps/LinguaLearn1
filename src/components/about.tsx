"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, FileText, Gavel } from "lucide-react";
import LinguaLearnLogo from "@/components/LinguaLearnLogo";
import { Separator } from "@/components/ui/separator";
import KuljoAppsLogo from "./KuljoAppsLogo";
import { getLanguage, type Language } from "@/lib/storage";

const uiTexts = {
    title: { en: 'About LinguaLearn', fr: 'À propos de LinguaLearn', de: 'Über LinguaLearn', it: 'Informazioni su LinguaLearn', es: 'Acerca de LinguaLearn' },
    description: { en: 'This application is a language learning tool designed to help you expand your vocabulary through interactive quizzes.', fr: "Cette application est un outil d'apprentissage des langues conçu pour vous aider à élargir votre vocabulaire grâce à des quiz interactifs.", de: 'Diese Anwendung ist ein Sprachlerntool, das Ihnen hilft, Ihren Wortschatz durch interaktive Quizze zu erweitern.', it: 'Questa applicazione è uno strumento di apprendimento linguistico progettato per aiutarti ad ampliare il tuo vocabolario attraverso quiz interattivi.', es: 'Esta aplicación es una herramienta de aprendizaje de idiomas diseñada para ayudarte a ampliar tu vocabulario a través de cuestionarios interactivos.' },
    contact: { en: 'Contact the Creator', fr: 'Contacter le créateur', de: 'Kontakt zum Ersteller', it: 'Contatta il creatore', es: 'Contactar al creador' },
    city: { en: 'Warsaw', fr: 'Varsovie', de: 'Warschau', it: 'Varsavia', es: 'Varsovia' },
    termsTitle: { en: 'Terms and Licenses', fr: 'Termes et licences', de: 'Bedingungen und Lizenzen', it: 'Termini e licenze', es: 'Términos y licencias' },
    terms: { en: 'Terms', fr: 'Termes', de: 'Bedingungen', it: 'Termini', es: 'Términos' },
    licenses: { en: 'Licenses', fr: 'Licences', de: 'Lizenzen', it: 'Licenze', es: 'Licencias' },
    back: { en: 'Back to Settings', fr: 'Retour aux réglages', de: 'Zurück zu den Einstellungen', it: 'Torna alle Impostazioni', es: 'Volver a Ajustes' },
};

export default function AboutPage() {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(getLanguage());
        };
        handleLanguageChange();
        window.addEventListener('language-changed', handleLanguageChange);
        return () => {
            window.removeEventListener('language-changed', handleLanguageChange);
        };
    }, []);

    const getUIText = (key: keyof typeof uiTexts) => {
        return uiTexts[key][language] || uiTexts[key]['en'];
    };

    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="items-center text-center">
                 <div className="flex items-center justify-center gap-4">
                    <LinguaLearnLogo width="48" height="48" />
                    <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap">
                        Lingua
                        <span className="relative inline-block">
                            Learn
                            <span className="absolute -right-1 -bottom-3.5 text-base font-semibold tracking-normal text-amber">
                            Lite
                            </span>
                        </span>
                    </h1>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
                <p className="text-muted-foreground">
                    {getUIText('description')}
                </p>
                <Separator />
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-4">{getUIText('contact')}</h3>
                    <div className="flex items-center gap-4">
                        <KuljoAppsLogo width={85} height={85} />
                        <div className="space-y-1 text-sm text-left">
                            <p className="font-bold">Kuljo Apps (Damian Kuliś)</p>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-deep-purple" />
                                <span>{getUIText('city')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4 text-deep-purple" />
                                <span>kuljo.apps@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4 text-deep-purple" />
                                <span>600 130 255</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col items-center w-full">
                    <h3 className="text-lg font-semibold mb-4">{getUIText('termsTitle')}</h3>
                    <div className="grid grid-cols-2 gap-4 w-full">
                         <Link href="/settings/about/terms" passHref className="w-full">
                            <Button variant="outline" className="w-full">
                                <FileText className="mr-2 h-4 w-4 text-deep-purple" />
                                {getUIText('terms')}
                            </Button>
                        </Link>
                        <Link href="/settings/about/licenses" passHref className="w-full">
                            <Button variant="outline" className="w-full">
                                <Gavel className="mr-2 h-4 w-4 text-deep-purple" />
                                {getUIText('licenses')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center p-6">
                <Link href="/settings" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {getUIText('back')}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
