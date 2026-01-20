"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Languages } from 'lucide-react';

const fakePhrases = [
    { phrase: 'Peter Piper picked a peck of pickled peppers.', translation: 'Piotr Piper zebrał miarkę marynowanej papryki.' },
    { phrase: 'She sells seashells by the seashore.', translation: 'Ona sprzedaje muszelki nad brzegiem morza.' },
    { phrase: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', translation: 'Ile drewna rzuciłby świstak, gdyby świstak potrafił rzucać drewnem?' },
    { phrase: 'A proper copper coffee pot.', translation: 'Prawidłowy miedziany dzbanek do kawy.' },
    { phrase: 'Red lorry, yellow lorry.', translation: 'Czerwona ciężarówka, żółta ciężarówka.' },
    { phrase: 'I scream, you scream, we all scream for ice cream.', translation: 'Ja krzyczę, ty krzyczysz, wszyscy krzyczymy za lodami.' },
    { phrase: 'Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair.', translation: 'Puszysty Wuzzy był niedźwiedziem. Puszysty Wuzzy nie miał włosów.' },
    { phrase: 'I saw Susie sitting in a shoeshine shop.', translation: 'Zobaczyłem Susie siedzącą w zakładzie czyszczenia butów.' },
];

export default function TongueTwisters() {
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
                        <Languages className="h-8 w-8" />
                        <CardTitle className="text-3xl">Tongue Twisters</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96 w-full pr-4">
                        <div className="flex flex-col gap-3">
                           <div data-tutorial-id="tongue-twisters-first-two" className="flex flex-col gap-3">
                                {fakePhrases.slice(0, 2).map((p, index) => (
                                    <React.Fragment key={index}>
                                        <div className="text-sm">
                                            <p className="font-bold">{p.phrase}</p>
                                            <p className="text-muted-foreground">{p.translation}</p>
                                        </div>
                                        {index < 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                           </div>
                           {fakePhrases.length > 2 && <Separator />}
                           {fakePhrases.slice(2).map((p, index) => (
                                <React.Fragment key={index + 2}>
                                    <div className="text-sm">
                                        <p className="font-bold">{p.phrase}</p>
                                        <p className="text-muted-foreground">{p.translation}</p>
                                    </div>
                                    {index < fakePhrases.length - 3 && <Separator />}
                                </React.Fragment>
                           ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" className="pointer-events-none">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}