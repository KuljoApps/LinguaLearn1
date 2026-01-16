"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Flame, Percent, ShieldX, Trash2 } from "lucide-react";
import { getStats, clearStats, type Stats, getErrors, type ErrorRecord } from "@/lib/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const defaultStats: Stats = { totalAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [] };

export default function StatisticsPage() {
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [errors, setErrors] = useState<ErrorRecord[]>([]);
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);

    useEffect(() => {
        setStats(getStats());
        setErrors(getErrors());
    }, []);

    const handleClearStats = () => {
        clearStats();
        setStats(getStats());
        setIsClearAlertOpen(false);
    }

    const successRate = stats.totalAnswers > 0
        ? Math.round(((stats.totalAnswers - stats.totalErrors) / stats.totalAnswers) * 100)
        : 0;

    const renderLastFiftyAnswersGrid = () => {
        const gridItems = [];
        let errorIndex = -1;

        for (let i = 0; i < 50; i++) {
            const answer = stats.lastFiftyAnswers[i];

            if (answer === undefined) {
                gridItems.push(<div key={`empty-${i}`} className="h-4 w-4 rounded-sm bg-muted/20" />);
                continue;
            }

            if (answer) {
                 gridItems.push(
                    <div
                        key={`correct-${i}`}
                        className="h-4 w-4 rounded-sm bg-success"
                    />
                );
            } else {
                errorIndex++;
                const currentError = errors[errorIndex];

                if (!currentError) {
                    gridItems.push(
                        <div
                            key={`error-no-data-${i}`}
                            className="h-4 w-4 rounded-sm bg-destructive"
                        />
                    );
                    continue;
                }
                
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
                                    From quiz: <span className="font-semibold text-foreground">{currentError.quiz}</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Word: </span>
                                    <span className="font-bold">{currentError.word}</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Correct: </span>
                                    <span className="font-bold text-success">{currentError.correctAnswer}</span>
                                </p>
                                {currentError.userAnswer !== 'No answer' && (
                                    <p>
                                        <span className="text-muted-foreground">Your answer: </span>
                                        <span className="font-bold text-destructive">{currentError.userAnswer}</span>
                                    </p>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                );
            }
        }
        return gridItems;
    };


    return (
        <>
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
                                <CheckCircle className="h-5 w-5 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalAnswers.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
                                <ShieldX className="h-5 w-5 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalErrors.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <Percent className="h-5 w-5 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{successRate}%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
                                <Flame className="h-6 w-6 text-amber" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.longestStreak.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
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
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsClearAlertOpen(true)} disabled={stats.totalAnswers === 0}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Stats
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete all your statistics. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearStats} className="bg-destructive hover:bg-destructive/90">
                            Clear
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
