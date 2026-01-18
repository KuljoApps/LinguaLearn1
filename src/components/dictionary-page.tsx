"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star } from 'lucide-react';
import type { DictionaryWord } from '@/lib/dictionary';
import type { Language } from '@/lib/storage';
import { getFavorites, toggleFavorite } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface DictionaryPageProps {
    title: string;
    backHref: string;
    words: DictionaryWord[];
    children: React.ReactNode;
}

const WordItem = ({ word, isFavorite, onToggleFavorite }: { word: DictionaryWord, isFavorite: boolean, onToggleFavorite: (word: string) => void }) => (
    <div className="flex items-center justify-between text-sm">
        <div>
            <p className="font-bold">{word.word}</p>
            <div className="flex items-center gap-2">
                {word.colorCode && (
                    <div
                        className="h-4 w-4 shrink-0 rounded-full border"
                        style={{ backgroundColor: word.colorCode }}
                    />
                )}
                <p className="text-muted-foreground">
                    {word.translation}
                    {word.numeric && <span className="font-mono text-xs ml-2 tracking-tighter">({word.numeric})</span>}
                </p>
            </div>
        </div>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(word.word);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="p-2 -mr-2 rounded-full"
        >
            <Star
                className={cn(
                    "h-[1.125rem] w-[1.125rem] transition-colors", // 18px (~10% smaller than 20px)
                    isFavorite
                        ? "fill-amber text-amber"
                        : "text-muted-foreground hover:fill-amber/50 hover:text-amber/80"
                )}
            />
        </button>
    </div>
);


export default function DictionaryPage({ title, backHref, words, children }: DictionaryPageProps) {
    
    const { lang, category, backText } = useMemo(() => {
        const pathParts = backHref.split('/');
        const lang = pathParts[2] as Language;
        const categoryFromFile = pathParts[pathParts.length - 1]; 
        
        const backButtonTexts = {
            en: 'Back to Dictionary',
            de: 'Zurück zum Wörterbuch',
            es: 'Volver al Diccionario',
            fr: 'Retour au Dictionnaire',
            it: 'Torna al Dizionario',
        };
        const backText = backButtonTexts[lang] || 'Back to Dictionary';

        return { lang, category: categoryFromFile, backText };
    }, [backHref]);

    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        setFavorites(getFavorites(lang, category));
    }, [lang, category]);

    const handleToggleFavorite = (word: string) => {
        toggleFavorite(lang, category, word);
        setFavorites(getFavorites(lang, category));
    };
    
    const favoriteWords = useMemo(() => words.filter(w => !w.isHeader && favorites.includes(w.word)), [words, favorites]);

    const wordGroups = useMemo(() => {
        const groups: { header: string; words: DictionaryWord[] }[] = [];
        let currentGroup: { header: string; words: DictionaryWord[] } | null = null;

        words.forEach(word => {
            if (word.isHeader) {
                if (currentGroup && currentGroup.words.length > 0) {
                    groups.push(currentGroup);
                }
                currentGroup = { header: word.word, words: [] };
            } else if (currentGroup && !favorites.includes(word.word)) {
                currentGroup.words.push(word);
            }
        });
        if (currentGroup && currentGroup.words.length > 0) {
            groups.push(currentGroup);
        }
        return groups;
    }, [words, favorites]);


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
                        {favoriteWords.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-xl font-bold italic tracking-tight text-amber mb-2">Ulubione</h3>
                                {favoriteWords.map((word, index) => (
                                    <React.Fragment key={`fav-${word.word}`}>
                                        <WordItem 
                                            word={word} 
                                            isFavorite={true} 
                                            onToggleFavorite={handleToggleFavorite} 
                                        />
                                        {index < favoriteWords.length - 1 && <Separator className="my-2" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        
                        {wordGroups.map((group) => (
                             <div key={group.header} className="mb-4">
                                <h3 className="text-xl font-bold italic tracking-tight text-primary mb-2">{group.header}</h3>
                                {group.words.map((word, wordIndex) => (
                                    <React.Fragment key={word.word}>
                                        <WordItem 
                                            word={word} 
                                            isFavorite={favorites.includes(word.word)}
                                            onToggleFavorite={handleToggleFavorite} 
                                        />
                                        {wordIndex < group.words.length - 1 && <Separator className="my-2" />}
                                    </React.Fragment>
                                ))}
                            </div>
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