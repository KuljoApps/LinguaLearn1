"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import type { Phrase } from '@/lib/phrases';
import type { Language } from '@/lib/storage';

interface PhrasesPageProps {
    title: string;
    backHref: string;
    phrases: Phrase[];
    children: React.ReactNode;
}

export default function PhrasesPage({ title, backHref, phrases, children }: PhrasesPageProps) {
    const lang = backHref.split('/')[2] as Language;
    const isBackToLearning = backHref.split('/').length === 3;

    const backButtonTextsLearning: Record<Language, string> = {
        en: 'Back to Learning',
        de: 'Zurück zum Lernen',
        es: 'Volver a Aprendizaje',
        fr: 'Retour à l\'Apprentissage',
        it: 'Torna ad Apprendimento',
    };

    const backButtonTextsPhrases: Record<Language, string> = {
        en: 'Back to Expressions',
        de: 'Zurück zu den Ausdrücken',
        es: 'Volver a Expresiones',
        fr: 'Retour aux Expressions',
        it: 'Torna a Espressioni',
    };

    const backText = isBackToLearning 
        ? backButtonTextsLearning[lang] || backButtonTextsLearning['en']
        : backButtonTextsPhrases[lang] || backButtonTextsPhrases['en'];

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-4">
                    {children}
                    <CardTitle className="text-3xl">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4">
                    <div className="flex flex-col gap-3">
                        <div data-tutorial-id="airport-first-phrases" className="flex flex-col gap-3">
                            {phrases.slice(0, 2).map((p, index) => (
                                <React.Fragment key={index}>
                                    <div className="text-sm">
                                        <p className="font-bold">{p.phrase}</p>
                                        {p.translation && <p className="text-muted-foreground">{p.translation}</p>}
                                    </div>
                                    {index === 0 && phrases.length > 1 && <Separator />}
                                </React.Fragment>
                            ))}
                        </div>

                        {phrases.slice(2).map((p, index) => (
                             <React.Fragment key={index + 2}>
                                {index === 0 && phrases.length > 2 && <Separator />}
                                <div className="text-sm">
                                    <p className="font-bold">{p.phrase}</p>
                                    {p.translation && <p className="text-muted-foreground">{p.translation}</p>}
                                </div>
                                {index < phrases.slice(2).length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href={backHref} passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {backText}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
