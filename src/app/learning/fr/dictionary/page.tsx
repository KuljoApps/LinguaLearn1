"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Hash, Palette, Clock, Users, BookText, PersonStanding, Utensils, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getLanguage, setLanguage, type Language } from '@/lib/storage';

export default function DictionaryFrPage() {
    const [language, setCurrentLanguage] = useState<Language>('fr');

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

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setCurrentLanguage(lang);
    };

    const getFlag = () => {
        if (language === 'en') return '🇬🇧';
        if (language === 'de') return '🇩🇪';
        if (language === 'it') return '🇮🇹';
        if (language === 'es') return '🇪🇸';
        return '🇫🇷';
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Dictionnaire</h1>
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="Changer de langue">
                                <span className="text-2xl">{getFlag()}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/fr/dictionary/numbers" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hash className="h-12 w-12 text-deep-purple" />
                            Nombres
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/colors" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Palette className="h-12 w-12 text-deep-purple" />
                            Couleurs
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/time" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Clock className="h-12 w-12 text-deep-purple" />
                            Temps
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/family" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Users className="h-12 w-12 text-deep-purple" />
                            Famille
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/body-parts" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PersonStanding className="h-16 w-16 text-deep-purple" />
                            Parties du Corps
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/food" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12 text-deep-purple" />
                            Nourriture
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/home" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Home className="h-12 w-12 text-deep-purple" />
                            Logement
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/work" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Briefcase className="h-14 w-14 text-deep-purple" />
                            Travail
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/fr" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'Apprentissage
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
