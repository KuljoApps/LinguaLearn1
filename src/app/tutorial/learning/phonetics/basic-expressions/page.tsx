import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Volume2, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils';

// This is a static, non-interactive "fake" page for the tutorial.

const fakePhrases = [
    { phrase: 'Hello, how are you?', phonetic: '/həˈloʊ, haʊ ɑːr juː?/', translation: 'Cześć, jak się masz?' },
    { phrase: 'What is your name?', phonetic: '/wʌt ɪz jʊər neɪm?/', translation: 'Jak masz na imię?' },
];

export default function FakeBasicExpressionsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <MessageSquareText className="h-8 w-8" />
                        <CardTitle className="text-3xl">Basic Expressions</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96 w-full pr-4">
                        <Accordion type="single" collapsible className="w-full" value="item-0">
                             <AccordionItem value="item-0" data-tutorial-id="phonetics-first-item">
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left" disabled>
                                    {fakePhrases[0].phrase}
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-muted-foreground font-mono text-sm">{fakePhrases[0].phonetic}</p>
                                            <p className="text-sm">{fakePhrases[0].translation}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" disabled>
                                            <Volume2 className="h-6 w-6 text-deep-purple animate-pulse-strong" />
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left" disabled>
                                    {fakePhrases[1].phrase}
                                </AccordionTrigger>
                                <AccordionContent>
                                    ...
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Phonetics
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
