"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LinguaLearnLogo from '@/components/LinguaLearnLogo';
import { Clock, Pause, Home, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function FakeQuizCorrectPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-center gap-2">
                        <LinguaLearnLogo className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold tracking-tight">
                            Lingua<span className="relative inline-block">Learn<span className="absolute -right-0.5 -bottom-3 text-sm font-semibold tracking-normal text-amber">Lite</span></span>
                        </CardTitle>
                    </div>
                    <CardDescription className="pt-2">Wybierz poprawną odpowiedź</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
                    <div className="w-full space-y-4">
                        <div className="w-full flex justify-around gap-4 text-center">
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className="text-2xl font-bold">11s</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className="text-2xl font-bold">00:04</span>
                            </div>
                        </div>
                        <Progress value={(11 / 15) * 100} className="w-full h-2" />
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground">What is the Polish meaning of</p>
                        <p className="font-headline font-bold text-4xl">"Hello"?</p>
                    </div>
                    
                    <div data-tutorial-id="quiz-correct-answer" className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Button className="h-auto text-lg p-4 whitespace-normal bg-muted text-muted-foreground opacity-70">Do widzenia</Button>
                        <Button className="h-auto text-lg p-4 whitespace-normal bg-success text-success-foreground">Cześć</Button>
                        <Button className="h-auto text-lg p-4 whitespace-normal bg-muted text-muted-foreground opacity-70">Dziękuję</Button>
                        <Button className="h-auto text-lg p-4 whitespace-normal bg-muted text-muted-foreground opacity-70">Przepraszam</Button>
                    </div>
                    <div className="flex justify-center gap-4 w-full pt-4 border-t">
                        <Button variant="outline" size="icon" className="pointer-events-none opacity-50"><Home /></Button>
                        <Button variant="outline" size="icon" className="pointer-events-none opacity-50"><RefreshCw /></Button>
                        <Button variant="outline" size="icon" className="pointer-events-none opacity-50"><Pause /></Button>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4 p-6 pt-0">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-muted-foreground">Pytanie 1 z 2</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Punkty:</span>
                            <div className="text-2xl font-bold text-primary">1</div>
                        </div>
                    </div>
                    <Progress value={50} className="w-full h-2" />
                </CardFooter>
            </Card>
        </main>
    );
}
