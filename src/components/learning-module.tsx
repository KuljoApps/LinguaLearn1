
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Search, GraduationCap } from 'lucide-react';
import type { Language } from '@/lib/storage';

// A union type for all possible question structures
type AnyQuestion = (
    { id: number; word: string; correctAnswer: string; options?: string[] } |
    { id: number; verb: string; form2: string; form3: string; correctTranslation: string; translationOptions?: string[] }
);

interface LearningModuleProps {
    language: Language;
    uiTexts: {
        title: string;
        searchPlaceholder: string;
        noResults: string;
        back: string;
    };
    questionSets: {
        title: string;
        questions: AnyQuestion[];
    }[];
    backHref: string;
}

// Type guard to differentiate between question types
function isIrregularVerb(q: AnyQuestion): q is { id: number; verb: string; form2: string; form3: string; correctTranslation: string } {
    return 'verb' in q;
}

export default function LearningModule({ uiTexts, questionSets, backHref }: LearningModuleProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSets = useMemo(() => {
        if (!searchTerm.trim()) {
            return questionSets;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        return questionSets.map(set => {
            const filteredQuestions = set.questions.filter(q => {
                if (isIrregularVerb(q)) {
                    return (
                        q.verb.toLowerCase().includes(lowerCaseSearch) ||
                        q.form2.toLowerCase().includes(lowerCaseSearch) ||
                        q.form3.toLowerCase().includes(lowerCaseSearch) ||
                        q.correctTranslation.toLowerCase().includes(lowerCaseSearch)
                    );
                } else {
                    return (
                        q.word.toLowerCase().includes(lowerCaseSearch) ||
                        q.correctAnswer.toLowerCase().includes(lowerCaseSearch) ||
                        (q.options && q.options.some(opt => opt.toLowerCase().includes(lowerCaseSearch)))
                    );
                }
            });
            return { ...set, questions: filteredQuestions };
        }).filter(set => set.questions.length > 0);

    }, [searchTerm, questionSets]);

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                    <GraduationCap className="h-8 w-8" />
                    <CardTitle className="text-3xl">{uiTexts.title}</CardTitle>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={uiTexts.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4">
                    {filteredSets.length > 0 ? (
                        <Accordion type="multiple" className="w-full">
                            {filteredSets.map((set) => (
                                <AccordionItem value={set.title} key={set.title}>
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                        {set.title} ({set.questions.length})
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-3">
                                            {set.questions.map((q, index) => (
                                                <React.Fragment key={q.id}>
                                                    <div className="text-sm">
                                                        {isIrregularVerb(q) ? (
                                                            <>
                                                                <p><span className="font-bold">{q.verb}</span> - {q.correctTranslation}</p>
                                                                <p className="text-muted-foreground">{q.form2}, {q.form3}</p>
                                                            </>
                                                        ) : (
                                                            <p><span className="font-bold">{q.word}</span> - {q.correctAnswer}</p>
                                                        )}
                                                    </div>
                                                    {index < set.questions.length - 1 && <Separator />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <p className="text-center text-muted-foreground pt-10">{uiTexts.noResults}</p>
                    )}
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href={backHref} passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {uiTexts.back}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
