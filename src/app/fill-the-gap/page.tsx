"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Info, FileText, MessagesSquare, AlignLeft } from 'lucide-react';
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

const DESCRIPTIONS_VISIBLE_KEY = 'fillTheGapDescriptionsVisible';

export default function FillTheGapPage() {
    const [showDescriptions, setShowDescriptions] = useState(false);

    useEffect(() => {
        const savedPreference = localStorage.getItem(DESCRIPTIONS_VISIBLE_KEY);
        if (savedPreference !== null) {
            setShowDescriptions(JSON.parse(savedPreference));
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
                                Lingua
                                <span className="relative inline-block">
                                    Learn
                                    <span className="absolute -right-1 -bottom-4 text-lg font-semibold tracking-normal text-amber">
                                    Lite
                                    </span>
                                </span>
                            </h1>
                        </div>
                        <p className="text-muted-foreground">
                            Practice your language skills by filling in the missing parts.
                        </p>
                        <div className="flex items-center justify-center pt-4">
                             <div className="w-10" />
                            <CardTitle className="text-3xl font-bold tracking-tight flex-1">
                                Fill the{' '}
                                <span className="relative inline-block">
                                    Gap
                                    <span className="absolute right-px -bottom-[10px] text-sm font-semibold tracking-normal text-amber">
                                        Lite
                                    </span>
                                </span>
                            </CardTitle>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={handleToggleDescriptions}>
                                        <Info className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{showDescriptions ? 'Hide descriptions' : 'Show descriptions'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2 p-6 pt-2 pb-4">
                        <div>
                            <Link href="/fill-the-gap/gap-words" passHref>
                                <Button className="w-full h-16 text-lg" size="lg">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Gap in the Words
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Complete words by filling in the missing letters. A great way to practice spelling.</p>}
                        </div>
                        <div>
                            <Link href="/fill-the-gap/gap-sentences" passHref>
                                <Button className="w-full h-16 text-lg" size="lg">
                                    <MessagesSquare className="mr-2 h-5 w-5" />
                                    Gap in the Sentences
                                </Button>
                            </Link>
                            {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Complete sentences by filling in the missing words. Test your grammar and vocabulary.</p>}
                        </div>
                        <div>
                            <Link href="/fill-the-gap/gap-text" passHref>
                                <Button className="w-full h-16 text-lg" size="lg">
                                    <AlignLeft className="mr-2 h-5 w-5" />
                                    Gap in the Text
                                </Button>
                            </Link>
                             {showDescriptions && <p className="text-xs italic text-muted-foreground mt-1 px-2">Read a short text and fill in multiple missing words to test your comprehension.</p>}
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
