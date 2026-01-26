'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, AlignLeft } from 'lucide-react';

export default function GapTextPage() {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const { toast } = useToast();

    const correctAnswer1 = 'learning';
    const correctAnswer2 = 'fun';

    const checkAnswers = () => {
        const isCorrect1 = input1.toLowerCase().trim() === correctAnswer1;
        const isCorrect2 = input2.toLowerCase().trim() === correctAnswer2;

        if (isCorrect1 && isCorrect2) {
            toast({ title: 'Perfect!', description: 'You got everything right!' });
        } else {
            let incorrectFields = [];
            if (!isCorrect1) incorrectFields.push('first blank');
            if (!isCorrect2) incorrectFields.push('second blank');
            toast({ variant: 'destructive', title: 'Some are incorrect', description: `Check the ${incorrectFields.join(' and ')}.` });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <AlignLeft className="h-8 w-8" />
                        <CardTitle className="text-3xl">Gap in the Text</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <p className="text-muted-foreground text-center">Complete the text:</p>
                    <div className="text-lg leading-relaxed text-center">
                        I am really enjoying {' '}
                        <Input 
                            value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                            className="inline-block w-32 h-8 text-center"
                        />
                        {' '} a new language. It is a lot of {' '}
                        <Input 
                             value={input2}
                            onChange={(e) => setInput2(e.target.value)}
                            className="inline-block w-24 h-8 text-center"
                        />
                        {' '} and very rewarding.
                    </div>
                    <div className="text-center">
                        <Button onClick={checkAnswers}>Check</Button>
                    </div>
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
