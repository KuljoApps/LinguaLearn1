"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import type { DictionaryWord } from '@/lib/dictionary';

interface DictionaryPageProps {
    title: string;
    backHref: string;
    words: DictionaryWord[];
    children: React.ReactNode;
}

export default function DictionaryPage({ title, backHref, words, children }: DictionaryPageProps) {
    const lang = backHref.split('/')[2] as 'en' | 'de' | 'es' | 'fr' | 'it';

    const backButtonTexts = {
        en: 'Back to Dictionary',
        de: 'Zurück zum Wörterbuch',
        es: 'Volver al Diccionario',
        fr: 'Retour au Dictionnaire',
        it: 'Torna al Dizionario',
    };
    
    const backText = backButtonTexts[lang] || 'Back to Dictionary';

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
                        {words.map((w, index) => (
                            <React.Fragment key={index}>
                                <div className="text-sm">
                                    <p className="font-bold">{w.word}</p>
                                    <p className="text-muted-foreground">{w.translation}</p>
                                </div>
                                {index < words.length - 1 && <Separator />}
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
