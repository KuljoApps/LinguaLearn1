"use client";

import { ArrowLeft, PencilLine, FileText, MessagesSquare, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function FillTheGapPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl text-center">
                <CardHeader className="text-center p-6 pb-2">
                    <div className="flex items-center justify-center gap-4">
                        <PencilLine className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            Fill the{' '}
                            <span className="relative inline-block">
                                Gap
                                <span className="absolute right-[16px] -top-0.5 text-sm font-semibold tracking-normal text-amber">
                                    Lite
                                </span>
                            </span>
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2 p-6 pt-0 pb-4">
                    <p className="text-muted-foreground text-center pb-4">
                        Practice your language skills by filling in the missing parts.
                    </p>
                    <div>
                        <Link href="/fill-the-gap/gap-words" passHref>
                            <Button className="w-full h-16 text-lg" size="lg">
                                <FileText className="mr-2 h-5 w-5" />
                                Gap in the Words
                            </Button>
                        </Link>
                         <p className="text-xs italic text-muted-foreground mt-1 px-2">Complete words by filling in the missing letters. A great way to practice spelling.</p>
                    </div>
                    <div>
                        <Link href="/fill-the-gap/gap-sentences" passHref>
                            <Button className="w-full h-16 text-lg" size="lg">
                                <MessagesSquare className="mr-2 h-5 w-5" />
                                Gap in the Sentences
                            </Button>
                        </Link>
                        <p className="text-xs italic text-muted-foreground mt-1 px-2">Complete sentences by filling in the missing words. Test your grammar and vocabulary.</p>
                    </div>
                    <div>
                        <Link href="/fill-the-gap/gap-text" passHref>
                            <Button className="w-full h-16 text-lg" size="lg">
                                <AlignLeft className="mr-2 h-5 w-5" />
                                Gap in the Text
                            </Button>
                        </Link>
                         <p className="text-xs italic text-muted-foreground mt-1 px-2">Uzupełnij brakujące zdanie w tekście, wybierając najlepszą opcję, aby sprawdzić zrozumienie jego spójności i logicznego przepływu.</p>
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
        </main>
    );
}
