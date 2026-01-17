"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, BookText } from 'lucide-react';
import type { GrammarRule } from '@/lib/grammar';

interface GrammarPageProps {
    title: string;
    backHref: string;
    content: GrammarRule[];
}

export default function GrammarPage({ title, backHref, content }: GrammarPageProps) {
    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center">
                <div className="inline-flex items-center gap-4">
                    <BookText className="h-8 w-8" />
                    <CardTitle className="text-3xl text-center">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4">
                    <Accordion type="single" collapsible className="w-full" defaultValue={content[0]?.heading}>
                        {content.map((rule) => (
                            <AccordionItem value={rule.heading} key={rule.heading}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                                    {rule.heading}
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <p className="text-base">{rule.text}</p>
                                    {rule.example && (
                                        <div className="p-3 bg-muted rounded-md">
                                            <p className="font-semibold text-sm">Przykład:</p>
                                            <p className="italic">"{rule.example}"</p>
                                            {rule.example_pl && (
                                                <p className="text-sm text-muted-foreground mt-1">Tłumaczenie: "{rule.example_pl}"</p>
                                            )}
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href={backHref} passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Powrót
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}