import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Languages } from 'lucide-react';

// This is a static, non-interactive "fake" page for the tutorial.

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

export default function FakeTongueTwistersPage() {
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
                                {fakePhrases.map((p, index) => (
                                    <React.Fragment key={index}>
                                        <div className="text-sm">
                                            <p className="font-bold">{p.phrase}</p>
                                            <p className="text-muted-foreground">{p.translation}</p>
                                        </div>
                                        {index < fakePhrases.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                           </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}