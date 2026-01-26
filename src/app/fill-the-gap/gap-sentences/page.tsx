'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, MessagesSquare } from 'lucide-react';

export default function GapSentencesPage() {
    const [inputValue, setInputValue] = useState('');
    const { toast } = useToast();

    const sentencePart1 = 'The quick brown fox';
    const sentencePart2 = 'over the lazy dog.';
    const missingWord = 'jumps';

    const checkAnswer = () => {
        if (inputValue.toLowerCase().trim() === missingWord) {
            toast({ title: 'Correct!', description: 'Excellent!' });
        } else {
            toast({ variant: 'destructive', title: 'Incorrect', description: `The missing word was: "${missingWord}"` });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <MessagesSquare className="h-8 w-8" />
                        <CardTitle className="text-3xl">Gap in the Sentences</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Complete the sentence:</p>
                    <div className="flex items-center justify-center gap-2 text-xl font-semibold flex-wrap">
                        <span>{sentencePart1}</span>
                        <Input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-28 h-10 text-center text-xl font-semibold"
                        />
                         <span>{sentencePart2}</span>
                    </div>
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
