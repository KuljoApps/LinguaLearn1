"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star } from 'lucide-react';
import type { DictionaryWord } from '@/lib/types';
import { getFavorites, toggleFavorite } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface DictionaryPageProps {
    title: string;
    backHref: string;
    words: DictionaryWord[];
    children: React.ReactNode;
}

export default function DictionaryPage({ title, backHref, words, children }: DictionaryPageProps) {
    const lang = backHref.split('/')[2] as 'en' | 'de' | 'es' | 'fr' | 'it';
    const categorySlug = title.replace(/\s+/g, '-').toLowerCase();

    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        setFavorites(getFavorites(categorySlug));
    }, [categorySlug]);

    const handleFavoriteToggle = (word: string) => {
        const newFavorites = toggleFavorite(categorySlug, word);
        setFavorites(newFavorites);
    };

    const backButtonTexts = {
        en: 'Back to Dictionary',
        de: 'Zurück zum Wörterbuch',
        es: 'Volver al Diccionario',
        fr: 'Retour au Dictionnaire',
        it: 'Torna al Dizionario',
    };
    const backText = backButtonTexts[lang] || 'Back to Dictionary';

    const favoritesTitle = {
        en: 'Favorites',
        de: 'Favoriten',
        es: 'Favoritos',
        fr: 'Favoris',
        it: 'Preferiti',
    };

    const sortedWords: DictionaryWord[] = useMemo(() => {
        const favoriteWords = words.filter(w => !w.isHeader && favorites.includes(w.word));
        const nonFavoritedWords = words.filter(w => w.isHeader || !favorites.includes(w.word));

        if (favoriteWords.length > 0) {
            const favoritesHeader: DictionaryWord = { word: favoritesTitle[lang], translation: '', isHeader: true };
            return [
                favoritesHeader,
                ...favoriteWords,
                ...nonFavoritedWords
            ];
        }
        return words;
    }, [words, favorites, lang, favoritesTitle]);


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
                    <div className="flex flex-col">
                        {sortedWords.map((w, index) => {
                            if (w.isHeader) {
                                const isFavoritesHeader = w.word === favoritesTitle[lang];
                                return (
                                    <div key={`header-${index}`} className={cn("pb-2", isFavoritesHeader ? "pt-0" : "pt-6")}>
                                        <h3 className="text-xl font-bold italic tracking-tight text-primary">{w.word}</h3>
                                    </div>
                                );
                            }
                            return (
                                <React.Fragment key={w.word}>
                                    <div className="flex items-center justify-between text-sm py-1.5">
                                        <div className="flex items-center gap-2">
                                            {w.colorCode && (
                                                <div
                                                    className="h-4 w-4 shrink-0 rounded-full border"
                                                    style={{ backgroundColor: w.colorCode }}
                                                />
                                            )}
                                            <div>
                                                <p className="font-bold">{w.word}</p>
                                                <p className="text-muted-foreground">
                                                    {w.translation}
                                                    {w.numeric && <span className="font-mono text-xs ml-2 tracking-tighter">({w.numeric})</span>}
                                                </p>
                                            </div>
                                        </div>
                                         <button onClick={() => handleFavoriteToggle(w.word)} className="p-2 -m-2 rounded-full hover:bg-accent transition-colors">
                                            <Star className={cn(
                                                "h-4 w-4 transition-all",
                                                favorites.includes(w.word)
                                                    ? "text-amber fill-amber"
                                                    : "text-muted-foreground/40 hover:text-muted-foreground/80"
                                            )} />
                                        </button>
                                    </div>
                                    {index < sortedWords.length - 1 && !sortedWords[index + 1]?.isHeader && <Separator />}
                                </React.Fragment>
                            );
                        })}
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
