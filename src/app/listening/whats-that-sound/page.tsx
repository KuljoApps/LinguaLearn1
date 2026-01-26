'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Puzzle, Volume2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function WhatsThatSoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Puzzle className="h-8 w-8" />
                        <CardTitle className="text-3xl">What's that sound?</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Listen to the sound and choose the correct answer.</p>
                     <div className="flex items-center justify-center gap-4 text-xl font-semibold flex-wrap">
                       <Button variant="outline" size="icon" className="h-16 w-16">
                            <Volume2 className="h-8 w-8" />
                        </Button>
                    </div>
                     <RadioGroup className="flex flex-col items-start mx-auto w-fit gap-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dog" id="dog" />
                            <Label htmlFor="dog">Dog barking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cat" id="cat" />
                            <Label htmlFor="cat">Cat meowing</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bird" id="bird" />
                            <Label htmlFor="bird">Bird chirping</Label>
                        </div>
                    </RadioGroup>
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
