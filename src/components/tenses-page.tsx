"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, BookMarked } from 'lucide-react';
import type { Tense } from '@/lib/tenses';

interface TensesPageProps {
    title: string;
    backHref: string;
    tenses: Tense[];
}

export default function TensesPage({ title, backHref, tenses }: TensesPageProps) {
    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                    <BookMarked className="h-8 w-8" />
                    <CardTitle className="text-3xl">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4">
                    <Accordion type="single" collapsible className="w-full">
                        {tenses.map((tense) => (
                            <AccordionItem value={tense.name} key={tense.name}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                    {tense.name}
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3">
                                    <p className="text-muted-foreground">{tense.usage}</p>
                                    <div>
                                        <p className="font-semibold">Przykład:</p>
                                        <p className="italic">"{tense.example}"</p>
                                        <p className="text-sm text-muted-foreground">Tłumaczenie: "{tense.example_pl}"</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href={backHref} passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Powrót do nauki
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
