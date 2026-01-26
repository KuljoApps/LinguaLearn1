"use client";

import { ArrowLeft, Gamepad2, Brain, Type, Shuffle, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function GamesPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Gamepad2 className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Game Center</h1>
                    </div>
                     <p className="text-muted-foreground pt-2">Choose a game to practice your language skills in a fun way!</p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                    <Card>
                        <CardHeader className="items-center">
                            <Brain className="h-12 w-12 text-primary" />
                            <CardTitle className="pt-2">Memory</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-center text-muted-foreground">Match pairs of words and their translations. A classic game to test and improve your vocabulary retention.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled>Play</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="items-center">
                            <Type className="h-12 w-12 text-primary" />
                            <CardTitle className="pt-2">Wordfall</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-center text-muted-foreground">Words are falling from the top. Type them correctly before they hit the bottom to score points. Great for spelling!</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled>Play</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="items-center">
                            <Shuffle className="h-12 w-12 text-primary" />
                            <CardTitle className="pt-2">Sentence Scramble</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-center text-muted-foreground">Unscramble the words to form a correct sentence. A perfect way to practice grammar and sentence structure.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled>Play</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="items-center">
                            <Puzzle className="h-12 w-12 text-primary" />
                            <CardTitle className="pt-2">Crossword</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-center text-muted-foreground">Solve the crossword puzzle where clues are in one language and answers in another. A fun vocabulary challenge.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled>Play</Button>
                        </CardFooter>
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> 
                            <span>Back to Home</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}