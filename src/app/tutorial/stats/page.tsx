"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CheckCircle, Flame, Percent, ShieldX, Trash2, ArrowUpRight } from "lucide-react";
import React from 'react';

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakeStatisticsPage() {

    const renderLastFiftyAnswersGrid = () => {
        const gridItems = [];
        const fakeAnswers = React.useMemo(() => {
            const answers = Array(40).fill(true).concat(Array(10).fill(false));
            return answers.sort(() => 0.5 - Math.random());
        }, []);

        for (let i = 0; i < 50; i++) {
            const answer = fakeAnswers[i];
            if (answer) {
                 gridItems.push(<div key={`correct-${i}`} className="h-4 w-4 rounded-sm bg-success" />);
            } else {
                 gridItems.push(
                    <Popover key={`error-${i}`}>
                        <PopoverTrigger asChild>
                            <button
                                aria-label="Show error details"
                                className="h-4 w-4 rounded-sm bg-destructive cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto max-w-xs text-sm">
                             <div className="space-y-2">
                                <h4 className="font-medium leading-none text-center">Error Details</h4>
                                <p className="text-muted-foreground">
                                    From quiz: <span className="font-semibold text-foreground">English - Polish</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Word: </span>
                                    <span className="font-bold">Reliable</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Correct: </span>
                                    <span className="font-bold text-success">Niezawodny</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Your answer: </span>
                                    <span className="font-bold text-destructive">Religijny</span>
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>
                 )
            }
        }
        return gridItems;
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl" data-tutorial-id="stats-card">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4" data-tutorial-id="stats-cards">
                        <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
                                <CheckCircle className="h-5 w-5 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">128</div>
                            </CardContent>
                             <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                        </Card>
                        <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
                                <ShieldX className="h-5 w-5 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">17</div>
                            </CardContent>
                            <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                        </Card>
                        <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <Percent className="h-5 w-5 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">87%</div>
                            </CardContent>
                             <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                        </Card>
                        <Card className="relative cursor-pointer transition-colors hover:bg-muted/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
                                <Flame className="h-6 w-6 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">23</div>
                            </CardContent>
                             <ArrowUpRight className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground/40" />
                        </Card>
                    </div>
                    <Card data-tutorial-id="last-50-grid">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Last 50 Answers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-1">
                                {renderLastFiftyAnswersGrid()}
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" disabled>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <Button variant="destructive" disabled>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Stats
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}