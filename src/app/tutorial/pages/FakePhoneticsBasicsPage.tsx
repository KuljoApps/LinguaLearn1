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
    { phrase: 'My name is...', phonetic: '/maɪ neɪm ɪz.../', translation: 'Nazywam się...' },
    { phrase: 'Thank you very much.', phonetic: '/θæŋk juː ˈvɛri mʌtʃ./', translation: 'Dziękuję bardzo.' },
    { phrase: 'You\'re welcome.', phonetic: '/jʊər ˈwɛlkəm./', translation: 'Nie ma za co.' },
    { phrase: 'Excuse me / Sorry.', phonetic: '/ɪkˈskjuːs miː / ˈsɔːri./', translation: 'Przepraszam.' },
    { phrase: 'I don\'t understand.', phonetic: '/aɪ doʊnt ˌʌndərˈstænd./', translation: 'Nie rozumiem.' },
    { phrase: 'Can you speak more slowly?', phonetic: '/kæn juː spiːk mɔːr ˈsloʊli?/', translation: 'Czy możesz mówić wolniej?' },
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
                            {fakePhrases.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index} data-tutorial-id={index === 0 ? 'phonetics-first-item' : undefined}>
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left pointer-events-none">
                                        {item.phrase}
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-3 pt-2">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-muted-foreground font-mono text-sm">{item.phonetic}</p>
                                                <p className="text-sm">{item.translation}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" className="pointer-events-none">
                                                <Volume2 className={cn("h-6 w-6 text-deep-purple", index === 0 && "animate-pulse-strong")} />
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Button variant="outline" className="pointer-events-none">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Phonetics
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
