'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Volume2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function StoryComprehensionPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <BookOpen className="h-8 w-8" />
                        <CardTitle className="text-3xl">Story Comprehension</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6 text-center">
                    <p className="text-muted-foreground">Listen to the story and answer the question.</p>
                     <div className="flex items-center justify-center gap-4 text-xl font-semibold flex-wrap">
                       <Button variant="outline" size="icon" className="h-16 w-16">
                            <Volume2 className="h-8 w-8" />
                        </Button>
                    </div>
                    <div className="text-left space-y-4">
                        <h3 className="font-semibold text-lg">What did John do after he finished his breakfast?</h3>
                         <RadioGroup className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="park" id="park" />
                                <Label htmlFor="park">He went to the park.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="work" id="work" />
                                <Label htmlFor="work">He went to work.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sleep" id="sleep" />
                                <Label htmlFor="sleep">He went back to sleep.</Label>
                            </div>
                        </RadioGroup>
                    </div>
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
