"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const fakeWords = [
    { word: 'white', translation: 'biały', colorCode: '#FFFFFF' },
    { word: 'black', translation: 'czarny', colorCode: '#000000' },
    { word: 'red', translation: 'czerwony', colorCode: '#FF0000' },
    { word: 'blue', translation: 'niebieski', colorCode: '#0000FF' },
    { word: 'green', translation: 'zielony', colorCode: '#008000' },
    { word: 'yellow', translation: 'żółty', colorCode: '#FFFF00' },
    { word: 'gray', translation: 'szary', colorCode: '#808080' },
    { word: 'orange', translation: 'pomarańczowy', colorCode: '#FFA500' },
    { word: 'brown', translation: 'brązowy', colorCode: '#A52A2A' },
    { word: 'purple', translation: 'fioletowy', colorCode: '#800080' },
    { word: 'pink', translation: 'różowy', colorCode: '#FFC0CB' },
    { word: 'navy blue', translation: 'granatowy', colorCode: '#000080' },
    { word: 'beige', translation: 'beżowy', colorCode: '#F5F5DC' },
    { word: 'apricot', translation: 'morelowy', colorCode: '#FBCEB1' },
    { word: 'olive', translation: 'oliwkowy', colorCode: '#808000' },
    { word: 'turquoise', translation: 'turkusowy', colorCode: '#40E0D0' },
    { word: 'light blue', translation: 'jasnoniebieski', colorCode: '#ADD8E6' },
    { word: 'dark blue', translation: 'ciemnoniebieski', colorCode: '#00008B' },
    { word: 'light green', translation: 'jasnozielony', colorCode: '#90EE90' },
    { word: 'dark green', translation: 'ciemnozielony', colorCode: '#006400' },
    { word: 'maroon', translation: 'bordowy', colorCode: '#800000' },
    { word: 'lavender', translation: 'lawendowy', colorCode: '#E6E6FA' },
    { word: 'gold', translation: 'złoty', colorCode: '#FFD700' },
    { word: 'silver', translation: 'srebrny', colorCode: '#C0C0C0' },
    { word: 'copper', translation: 'miedziany', colorCode: '#B87333' },
    { word: 'salmon', translation: 'łososiowy', colorCode: '#FA8072' },
    { word: 'indigo', translation: 'indygo', colorCode: '#4B0082' },
    { word: 'magenta', translation: 'magenta', colorCode: '#FF00FF' },
    { word: 'teal', translation: 'morski', colorCode: '#008080' },
    { word: 'fuchsia', translation: 'fuksja', colorCode: '#FF00FF' },
    { word: 'purple', translation: 'purpurowy', colorCode: '#A020F0' },
    { word: 'khaki', translation: 'khaki', colorCode: '#C3B091' }
];

export default function FakeDictionaryColorsPage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    
    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];
        
        timeouts.push(setTimeout(() => {
            setFavorites(current => [...current, 'navy blue']);
        }, 1000));

        timeouts.push(setTimeout(() => {
            setFavorites(current => [...current, 'apricot']);
        }, 3000));
        
        timeouts.push(setTimeout(() => {
            setFavorites(current => [...current, 'olive']);
        }, 5000));

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    const sortedWords = useMemo(() => {
        const favoriteWords = fakeWords.filter(w => favorites.includes(w.word));
        const nonFavoritedWords = fakeWords.filter(w => !favorites.includes(w.word));
        return [...favoriteWords, ...nonFavoritedWords];
    }, [favorites]);

    const renderWord = (w: (typeof fakeWords)[0]) => (
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
                    <p className="text-muted-foreground">{w.translation}</p>
                </div>
            </div>
            <button className="p-2 -m-2 rounded-full pointer-events-none">
                <Star className={cn(
                    "h-3.5 w-3.5 transition-all",
                    favorites.includes(w.word)
                        ? "text-amber fill-amber"
                        : "text-muted-foreground/40"
                )} />
            </button>
        </div>
    );

    const tutorialFocusWords = sortedWords.slice(0, 3);
    const restOfWords = sortedWords.slice(3);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Palette className="h-8 w-8" />
                        <CardTitle className="text-3xl">Colors</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96 w-full pr-4">
                        <div className="flex flex-col">
                            <div data-tutorial-id="dictionary-word-list" className="py-1 -my-1">
                                {tutorialFocusWords.map((w, index) => (
                                    <React.Fragment key={`${w.word}-focus-${index}`}>
                                        {renderWord(w)}
                                        {index < tutorialFocusWords.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </div>
                            
                            {restOfWords.length > 0 && <Separator />}

                            {restOfWords.map((w, index) => (
                                <React.Fragment key={`${w.word}-rest-${index}`}>
                                    {renderWord(w)}
                                    {index < restOfWords.length - 1 && <Separator />}
                                </React.Fragment>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" className="pointer-events-none">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dictionary
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
