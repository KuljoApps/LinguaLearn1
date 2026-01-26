'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, AudioWaveform, Volume2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function MissingWordPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <AudioWaveform className="h-8 w-8" />
                        <CardTitle className="text-3xl">Missing Word</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Listen to the sentence with a missing word and select the correct option.</p>
                     <div className="flex items-center justify-center gap-4 text-xl font-semibold flex-wrap">
                       <Button variant="outline" size="icon" className="h-16 w-16">
                            <Volume2 className="h-8 w-8" />
                        </Button>
                    </div>
                    <p className="text-lg font-semibold">"I went to the [beep] to buy some bread."</p>
                     <RadioGroup className="flex flex-col items-start mx-auto w-fit gap-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="library" id="library" />
                            <Label htmlFor="library">Library</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bakery" id="bakery" />
                            <Label htmlFor="bakery">Bakery</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="park" id="park" />
                            <Label htmlFor="park">Park</Label>
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
