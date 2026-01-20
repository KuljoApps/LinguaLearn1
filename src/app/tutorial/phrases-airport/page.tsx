"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plane } from 'lucide-react';
import React from "react";

const fakePhrases = [
    { phrase: 'I\'d like to check in for my flight to Warsaw.', translation: 'Chciałbym/Chciałabym odprawić się na lot do Warszawy.' },
    { phrase: 'I have a connecting flight.', translation: 'Mam lot z przesiadką.' },
    { phrase: 'Where is the boarding gate for flight LO382?', translation: 'Gdzie jest bramka do wejścia na pokład dla lotu LO382?' },
    { phrase: 'Is my flight on time?', translation: 'Czy mój lot jest o czasie?' },
    { phrase: 'My flight has been delayed/cancelled.', translation: 'Mój lot jest opóźniony/odwołany.' },
    { phrase: 'What time is boarding?', translation: 'O której godzinie jest wejście na pokład?' },
    { phrase: 'A window/aisle seat, please.', translation: 'Poproszę miejsce przy oknie/od przejścia.' },
    { phrase: 'Can I take this as carry-on luggage?', translation: 'Czy mogę to wziąć jako bagaż podręczny?' },
    { phrase: 'How much is the fee for excess baggage?', translation: 'Ile wynosi opłata za nadbagaż?' },
    { phrase: 'Please take out your laptops and liquids.', translation: 'Proszę wyjąć laptopy i płyny.' },
];

export default function PhrasesAirport() {
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [router]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Plane className="h-8 w-8" />
                        <CardTitle className="text-3xl">Airport</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96 w-full pr-4">
                        <div className="flex flex-col gap-3">
                            <div data-tutorial-id="airport-first-phrases" className="flex flex-col">
                                <div className="text-sm py-1">
                                    <p className="font-bold">{fakePhrases[0].phrase}</p>
                                    <p className="text-muted-foreground">{fakePhrases[0].translation}</p>
                                </div>
                                <Separator className="my-1.5" />
                                <div className="text-sm py-1">
                                    <p className="font-bold">{fakePhrases[1].phrase}</p>
                                    <p className="text-muted-foreground">{fakePhrases[1].translation}</p>
                                </div>
                            </div>
                            
                            {fakePhrases.slice(2).map((p, index) => (
                                 <React.Fragment key={index + 2}>
                                    <Separator />
                                    <div className="text-sm py-1.5">
                                        <p className="font-bold">{p.phrase}</p>
                                        <p className="text-muted-foreground">{p.translation}</p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" className="pointer-events-none">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Expressions
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}