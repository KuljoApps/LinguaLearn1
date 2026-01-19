"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star } from 'lucide-react';
import type { DictionaryWord } from '@/lib/types';
import { getFavorites, toggleFavorite, getTutorialState } from '@/lib/storage';
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
        const handleStateUpdate = () => {
            const tutorialState = getTutorialState();
            // The step index in the extended array is 13, which corresponds to the user-facing step 19.
            const isWordListTutorialActive =
                tutorialState?.isActive &&
                tutorialState.stage === 'extended' &&
                tutorialState.step === 13;

            const realFavorites = getFavorites(categorySlug);
            if (isWordListTutorialActive) {
                const fakeFavoriteWord = 'khaki';
                const favoriteSet = new Set([fakeFavoriteWord, ...realFavorites]);
                setFavorites(Array.from(favoriteSet));
            } else {
                setFavorites(realFavorites);
            }
        };

        handleStateUpdate();

        window.addEventListener('tutorial-state-changed', handleStateUpdate);
        window.addEventListener('language-changed', handleStateUpdate);

        return () => {
            window.removeEventListener('tutorial-state-changed', handleStateUpdate);
            window.removeEventListener('language-changed', handleStateUpdate);
        };
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

    const sortedWords = useMemo(() => {
        const favoriteWords = words.filter(w => !w.isHeader && favorites.includes(w.word));
        const nonFavoritedWords = words.filter(w => w.isHeader || !favorites.includes(w.word));

        const colorPageTitles = new Set(['Colors', 'Farben', 'Colores', 'Couleurs', 'Colori']);
        const isColorsPage = colorPageTitles.has(title);

        if (favoriteWords.length > 0) {
            if (isColorsPage) {
                return [...favoriteWords, ...nonFavoritedWords];
            } else {
                const favoritesHeader: DictionaryWord = { word: favoritesTitle[lang], translation: '', isHeader: true, special: 'favorites-header' };
                return [
                    favoritesHeader,
                    ...favoriteWords,
                    ...nonFavoritedWords
                ];
            }
        }
        
        return words;
    }, [words, favorites, lang, favoritesTitle, title]);

    const renderedItems = sortedWords.map((w, index) => {
        if (w.isHeader) {
            const isFavoritesHeader = w.special === 'favorites-header';
            return (
                <div key={`header-${w.word}-${index}`} className={cn("pt-6 pb-2", isFavoritesHeader && "pt-0")}>
                    <h3 className="text-xl font-bold italic tracking-tight text-primary">{w.word}</h3>
                </div>
            );
        }
        return (
            <React.Fragment key={`${w.word}-${index}`}>
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
                            "h-3.5 w-3.5 transition-all",
                            favorites.includes(w.word)
                                ? "text-amber fill-amber"
                                : "text-muted-foreground/40 hover:text-muted-foreground/80"
                        )} />
                    </button>
                </div>
                {index < sortedWords.length - 1 && !sortedWords[index + 1]?.isHeader && <Separator />}
            </React.Fragment>
        );
    });

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
                        <div data-tutorial-id="dictionary-word-list">
                            {renderedItems.slice(0, 3)}
                        </div>
                        {renderedItems.slice(3)}
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
