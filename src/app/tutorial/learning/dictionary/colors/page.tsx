import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

// This is a static, non-interactive "fake" page for the tutorial.

const fakeWords = [
    { word: 'white', translation: 'biały', colorCode: '#FFFFFF' },
    { word: 'black', translation: 'czarny', colorCode: '#000000' },
    { word: 'red', translation: 'czerwony', colorCode: '#FF0000' },
    { word: 'blue', translation: 'niebieski', colorCode: '#0000FF' },
    { word: 'green', translation: 'zielony', colorCode: '#008000' },
    { word: 'yellow', translation: 'żółty', colorCode: '#FFFF00' },
];

export default function FakeColorsDictionaryPage() {
    const favorites = ['blue']; // Simulate one favorited item

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
                        <div className="flex flex-col" data-tutorial-id="dictionary-word-list">
                           {fakeWords.map((w, index) => (
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
                                                <p className="text-muted-foreground">{w.translation}</p>
                                            </div>
                                        </div>
                                        <button disabled className="p-2 -m-2 rounded-full">
                                            <Star className={cn(
                                                "h-3.5 w-3.5 transition-all",
                                                favorites.includes(w.word)
                                                    ? "text-amber fill-amber"
                                                    : "text-muted-foreground/40"
                                            )} />
                                        </button>
                                    </div>
                                    {index < fakeWords.length - 1 && <Separator />}
                                </React.Fragment>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dictionary
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
