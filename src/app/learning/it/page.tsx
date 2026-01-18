"use client"

import { BookCopy, ArrowLeft, GraduationCap, Clock, FilePenLine, MessageSquareText, BookText, Landmark, AudioLines, Languages, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from 'react';

const EXTRAS_COLLAPSIBLE_STATE_KEY = 'linguaLearnExtrasOpen';

export default function LearningItPage() {
    const [isExtrasOpen, setIsExtrasOpen] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem(EXTRAS_COLLAPSIBLE_STATE_KEY);
        if (savedState === 'true') {
            setIsExtrasOpen(true);
        }
    }, []);

    const handleExtrasOpenChange = (open: boolean) => {
        setIsExtrasOpen(open);
        localStorage.setItem(EXTRAS_COLLAPSIBLE_STATE_KEY, JSON.stringify(open));
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-center gap-4">
                        <GraduationCap className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Apprendimento</h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 px-6 pt-2 pb-2">
                    <Link href="/learning/it/questions" passHref>
                        <Button className="w-full h-12 text-lg">
                            <BookCopy className="mr-2 h-5 w-5" />
                            Base di Domande
                        </Button>
                    </Link>
                    <Link href="/learning/it/tenses" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Clock className="mr-2 h-5 w-5 text-deep-purple" />
                            Tempi Verbali
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <FilePenLine className="mr-2 h-5 w-5 text-deep-purple" />
                            Grammatica Generale
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <MessageSquareText className="mr-2 h-5 w-5 text-deep-purple" />
                            Espressioni e Frasi
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookText className="mr-2 h-5 w-5 text-deep-purple" />
                            Dizionario
                        </Button>
                    </Link>
                    
                    <Collapsible open={isExtrasOpen} onOpenChange={handleExtrasOpenChange} className="w-full">
                        <div className="flex items-center justify-center -mb-2">
                             <Separator className="flex-grow" />
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 px-3">
                                    <span className="text-sm italic text-muted-foreground">Extra</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExtrasOpen ? 'rotate-180' : ''}`} />
                                </Button>
                            </CollapsibleTrigger>
                             <Separator className="flex-grow" />
                        </div>
                        <CollapsibleContent className="pt-4">
                           <div className="grid grid-cols-2 gap-2">
                               <Link href="/learning/it/culture" passHref>
                                    <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                                        <Landmark className="mr-1 h-5 w-5 text-deep-purple" />
                                        Cultura
                                    </Button>
                                </Link>
                                <Link href="/learning/it/phonetics" passHref>
                                    <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                                        <AudioLines className="mr-1 h-5 w-5 text-deep-purple" />
                                        Fonetica
                                    </Button>
                                </Link>
                           </div>
                           <div className="mt-4">
                               <Link href="/learning/it/tongue-twisters" passHref>
                                    <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                                        <Languages className="mr-2 h-5 w-5 text-deep-purple" />
                                        Scioglilingua
                                    </Button>
                               </Link>
                           </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-2">
                    <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Torna alla Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
