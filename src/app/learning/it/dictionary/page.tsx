"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Hash, Palette, Clock, Users, BookText, PersonStanding, Utensils, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getLanguage, setLanguage, type Language } from '@/lib/storage';

export default function DictionaryItPage() {
    const [language, setCurrentLanguage] = useState<Language>('it');

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
        if (language === 'fr') return '🇫🇷';
        if (language === 'de') return '🇩🇪';
        if (language === 'en') return '🇬🇧';
        if (language === 'es') return '🇪🇸';
        return '🇮🇹';
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Dizionario</h1>
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="Cambia lingua">
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
                    <Link href="/learning/it/dictionary/numbers" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hash className="h-12 w-12 text-deep-purple" />
                            Numeri
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/colors" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Palette className="h-12 w-12 text-deep-purple" />
                            Colori
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/time" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Clock className="h-12 w-12 text-deep-purple" />
                            Tempo
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/family" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Users className="h-12 w-12 text-deep-purple" />
                            Famiglia
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/body-parts" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PersonStanding className="h-16 w-16 text-deep-purple" />
                            Parti del Corpo
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/food" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12 text-deep-purple" />
                            Cibo
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/home" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Home className="h-12 w-12 text-deep-purple" />
                            Casa
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/work" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Briefcase className="h-14 w-14 text-deep-purple" />
                            Lavoro
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/it" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Torna ad Apprendimento
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
