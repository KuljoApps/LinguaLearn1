'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Keyboard, Volume2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function DictationPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Keyboard className="h-8 w-8" />
                        <CardTitle className="text-3xl">Dictation</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Listen to the sentence and write it down.</p>
                    <div className="flex items-center justify-center gap-4 text-xl font-semibold flex-wrap">
                       <Button variant="outline" size="icon" className="h-16 w-16">
                            <Volume2 className="h-8 w-8" />
                        </Button>
                    </div>
                    <Textarea placeholder="Type what you hear..." />
                    <Button>Check</Button>
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
