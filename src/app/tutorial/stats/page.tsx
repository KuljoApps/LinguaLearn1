
"use client";

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Flame, Percent, ShieldX, Trash2, BarChart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function StatsTutorialPage() {
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

    const fakeStats = {
      totalAnswers: 128,
      totalErrors: 17,
      longestStreak: 23,
    };
    const successRate = Math.round(((fakeStats.totalAnswers - fakeStats.totalErrors) / fakeStats.totalAnswers) * 100);
    
    const fakeAnswers = useMemo(() => Array.from({ length: 50 }, (_, i) => i > 40 || (i > 20 && i < 25) ? false : Math.random() > 0.2), []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="p-6 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <BarChart className="h-8 w-8" />
                        <CardTitle className="text-3xl">Statistics</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4" data-tutorial-id="stats-cards">
                        <Popover>
                            <PopoverTrigger asChild><Card className="cursor-pointer"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Answers</CardTitle><CheckCircle className="h-5 w-5 text-amber" /></CardHeader><CardContent><div className="text-2xl font-bold">{fakeStats.totalAnswers}</div></CardContent></Card></PopoverTrigger>
                            <PopoverContent className="w-56"><h4 className="font-medium text-center mb-2">Answers per Quiz</h4></PopoverContent>
                        </Popover>
                         <Popover>
                            <PopoverTrigger asChild><Card className="cursor-pointer"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Errors</CardTitle><ShieldX className="h-5 w-5 text-amber" /></CardHeader><CardContent><div className="text-2xl font-bold">{fakeStats.totalErrors}</div></CardContent></Card></PopoverTrigger>
                            <PopoverContent className="w-56"><h4 className="font-medium text-center mb-2">Errors per Quiz</h4></PopoverContent>
                        </Popover>
                         <Popover>
                            <PopoverTrigger asChild><Card className="cursor-pointer"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Success Rate</CardTitle><Percent className="h-5 w-5 text-amber" /></CardHeader><CardContent><div className="text-2xl font-bold">{successRate}%</div></CardContent></Card></PopoverTrigger>
                            <PopoverContent className="w-56"><h4 className="font-medium text-center mb-2">Success Rate per Quiz</h4></PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild><Card className="cursor-pointer"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Longest Streak</CardTitle><Flame className="h-6 w-6 text-amber" /></CardHeader><CardContent><div className="text-2xl font-bold">{fakeStats.longestStreak}</div></CardContent></Card></PopoverTrigger>
                            <PopoverContent className="w-auto"><div className="text-center space-y-1"><h4 className="font-medium mb-1">Longest Streak Achieved</h4></div></PopoverContent>
                        </Popover>
                    </div>
                    <Card data-tutorial-id="last-50-grid">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Last 50 Answers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-1">
                                {fakeAnswers.map((answer, i) => (
                                    <Popover key={`answer-${i}`}>
                                        <PopoverTrigger asChild>
                                            <button
                                                aria-label="Answer detail"
                                                className={`h-4 w-4 rounded-sm ${answer ? 'bg-success' : 'bg-destructive'}`}
                                            />
                                        </PopoverTrigger>
                                        {!answer && <PopoverContent className="w-auto max-w-xs text-sm"><div className="space-y-2"><h4 className="font-medium leading-none text-center">Error Details</h4></div></PopoverContent>}
                                    </Popover>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" disabled><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
                        <Button variant="destructive" disabled><Trash2 className="mr-2 h-4 w-4" /> Clear Stats</Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
