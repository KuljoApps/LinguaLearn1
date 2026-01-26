'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Mic } from 'lucide-react';

export default function ListenAndRepeatPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Mic className="h-8 w-8" />
                        <CardTitle className="text-3xl">Listen & Repeat</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Listen to the sentence and repeat it.</p>
                    <div className="flex items-center justify-center gap-4 text-xl font-semibold flex-wrap">
                        <Button variant="outline" size="icon" className="h-16 w-16">
                            <Mic className="h-8 w-8" />
                        </Button>
                    </div>
                     <p className="text-lg font-semibold">"The quick brown fox jumps over the lazy dog."</p>
                    <Button disabled>Check</Button>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                    <Link href="/listening" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
