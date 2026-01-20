"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Trash2, Trophy, Sparkles, Star, Crown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Achievements() {
    const router = useRouter();

    useEffect(() => {
        const tutorialState = getTutorialState();
        if (!tutorialState || !tutorialState.isActive) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [router]);

    const apprenticeProgress = (159 / 250) * 100;
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Trophy className="h-8 w-8" />
                        <CardTitle className="text-3xl">Achievements</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto p-6">
                     <TooltipProvider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div data-tutorial-id="achievements-grid" className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Card className="flex flex-col items-center justify-center p-4 text-center transition-all">
                                            <div className="relative">
                                                <Sparkles className="h-12 w-12 mb-2 text-amber" />
                                                <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-success bg-background rounded-full" />
                                            </div>
                                            <h3 className="font-semibold">Novice</h3>
                                            <p className="text-xs text-muted-foreground mt-1">Answer 50 questions correctly.</p>
                                        </Card>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Unlocked: Jul 24, 2024</p>
                                    </TooltipContent>
                                </Tooltip>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Card className="flex flex-col items-center justify-center p-4 text-center transition-all bg-muted/50 opacity-60">
                                            <div className="relative">
                                                <Star className="h-12 w-12 mb-2 text-muted-foreground" />
                                            </div>
                                            <h3 className="font-semibold">Apprentice</h3>
                                            <p className="text-xs text-muted-foreground mt-1">Answer 250 questions correctly.</p>
                                            <div className="w-full mt-2">
                                                <Progress value={apprenticeProgress} className="h-2" />
                                                <p className="text-xs font-mono mt-1">159 / 250</p>
                                            </div>
                                        </Card>
                                    </TooltipTrigger>
                                </Tooltip>
                            </div>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="flex flex-col items-center justify-center p-4 text-center transition-all bg-muted/50 opacity-60">
                                        <div className="relative">
                                            <Crown className="h-12 w-12 mb-2 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-semibold">Master</h3>
                                        <p className="text-xs text-muted-foreground mt-1">Answer 1000 questions correctly.</p>
                                        <div className="w-full mt-2">
                                            <Progress value={27} className="h-2" />
                                            <p className="text-xs font-mono mt-1">273 / 1000</p>
                                        </div>
                                    </Card>
                                </TooltipTrigger>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </CardContent>
                <CardFooter className="flex justify-center p-6 border-t">
                     <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="pointer-events-none">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <Button variant="destructive" className="pointer-events-none">
                            <Trash2 className="mr-2 h-4 w-4" /> Reset Achievements
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
