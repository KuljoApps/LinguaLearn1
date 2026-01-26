'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GapWordsPage() {
    const [inputValue, setInputValue] = useState('');
    const { toast } = useToast();

    const wordWithGap = 'compl_te';
    const correctAnswer = 'ete';
    const fullWord = 'complete';

    const checkAnswer = () => {
        if (inputValue.toLowerCase() === correctAnswer) {
            toast({ title: 'Correct!', description: `The full word is "${fullWord}".` });
        } else {
            toast({ variant: 'destructive', title: 'Incorrect', description: `Try again! The full word is "${fullWord}".` });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <FileText className="h-8 w-8" />
                        <CardTitle className="text-3xl">Gap in the Words</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Complete the word:</p>
                    <p className="text-4xl font-bold tracking-widest">{wordWithGap}</p>
                    <Input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type the missing letters"
                        className="text-center text-lg"
                    />
                    <Button onClick={checkAnswer}>Check</Button>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/fill-the-gap" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
