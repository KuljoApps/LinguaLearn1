"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpenText, HelpCircle, Puzzle, CheckCircle2, ScanSearch, Tally5, Info, ListCollapse, PenTool, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DESCRIPTIONS_VISIBLE_KEY = 'readingDescriptionsVisible';

export default function ReadingPage() {
    const [showDescriptions, setShowDescriptions] = useState(false);

    useEffect(() => {
        const savedPreference = localStorage.getItem(DESCRIPTIONS_VISIBLE_KEY);
        if (savedPreference !== null) {
            setShowDescriptions(JSON.parse(savedPreference));
        } else {
            setShowDescriptions(false);
        }
    }, []);

    const handleToggleDescriptions = () => {
        const newValue = !showDescriptions;
        setShowDescriptions(newValue);
        localStorage.setItem(DESCRIPTIONS_VISIBLE_KEY, JSON.stringify(newValue));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <TooltipProvider>
                <Card className="w-full max-w-md shadow-2xl text-center">
                    <CardHeader>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <LinguaLearnLogo width="48" height="48" />
                            <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">
                                Lingua<span className="relative inline-block">Learn<span className="absolute -right-1 -bottom-4 text-lg font-semibold tracking-normal text-amber">Lite</span></span>
                            </h1>
                        </div>
                        <p className="text-muted-foreground">
                            Doskonal swoje umiejętności czytania ze zrozumieniem i słownictwo.
                        </p>
                        <div className="flex items-center justify-center">
                            <div className="w-10" />
                            <CardTitle className="text-3xl font-bold tracking-tight flex-1">
                                Reading
                            </CardTitle>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={handleToggleDescriptions}>
                                        <Info className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{showDescriptions ? 'Ukryj opisy' : 'Pokaż opisy'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2 p-6 pt-2 pb-4">
                        <div>
                            <Link href="/reading/read-and-answer" passHref>
                                <Button className="w-full h-12 text-lg" size="lg">
                                    <HelpCircle className="mr-2 h-5 w-5" />
                                    Read and Answer
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Przeczytaj krótki tekst i odpowiedz na pytania, aby sprawdzić swoje zrozumienie.</p>}
                        </div>
                        <div>
                            <Link href="/reading/true-false" passHref>
                                <Button className="w-full h-12 text-lg" size="lg">
                                    <CheckCircle2 className="mr-2 h-5 w-5" />
                                    True or False
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Przeczytaj stwierdzenia i zdecyduj, czy są prawdziwe, fałszywe, czy też informacja nie została podana w tekście.</p>}
                        </div>
                        <div>
                            <Link href="/reading/vocabulary-in-context" passHref>
                                <Button className="w-full h-12 text-lg" size="lg">
                                    <ScanSearch className="mr-2 h-5 w-5" />
                                    Vocabulary in Context
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Zidentyfikuj znaczenie wyróżnionych słów na podstawie kontekstu, w którym występują w tekście.</p>}
                        </div>
                         <div>
                            <Link href="/reading/matching-headings" passHref>
                                <Button className="w-full h-12 text-lg" size="lg">
                                    <ListCollapse className="mr-2 h-5 w-5" />
                                    Matching Headings
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Dopasuj nagłówki do odpowiednich akapitów tekstu, aby sprawdzić swoje zrozumienie głównej myśli każdej części.</p>}
                        </div>
                        <div>
                            <Link href="/reading/tone-analysis" passHref>
                                <Button className="w-full h-12 text-lg" size="lg">
                                    <PenTool className="mr-2 h-5 w-5" />
                                    Tone Analysis
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Określ ton autora tekstu (np. informacyjny, perswazyjny, humorystyczny), aby nauczyć się rozpoznawać głębsze intencje piszącego.</p>}
                        </div>
                        <div>
                            <Link href="/reading/fact-or-opinion" passHref>
                                <Button className="w-full h-12 text-lg" size="lg">
                                    <Scale className="mr-2 h-5 w-5" />
                                    Fact or Opinion
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Przeczytaj tekst i rozróżnij stwierdzenia oparte na faktach od tych, które wyrażają opinię autora, rozwijając swoje krytyczne myślenie.</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col p-6 pt-4 gap-4">
                        <Separator />
                         <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </TooltipProvider>
        </main>
    );
}
