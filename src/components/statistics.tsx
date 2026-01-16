"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Flame, Percent, ShieldX, Trash2 } from "lucide-react";
import { getStats, clearStats, type Stats } from "@/lib/storage";
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
import { cn } from "@/lib/utils";

const defaultStats: Stats = { totalAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [] };

export default function StatisticsPage() {
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);

    useEffect(() => {
        setStats(getStats());
    }, []);

    const handleClearStats = () => {
        clearStats();
        setStats(getStats());
        setIsClearAlertOpen(false);
    }

    const successRate = stats.totalAnswers > 0
        ? Math.round(((stats.totalAnswers - stats.totalErrors) / stats.totalAnswers) * 100)
        : 0;

    const lastFiftyAnswersGrid = Array.from({ length: 50 }).map((_, index) => {
        const answer = stats.lastFiftyAnswers[index];
        if (answer === undefined) {
            return <div key={index} className="h-4 w-4 rounded-sm bg-muted/20" />;
        }
        return (
            <div
                key={index}
                className={cn(
                    "h-4 w-4 rounded-sm",
                    answer ? "bg-success" : "bg-destructive"
                )}
            />
        );
    });

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
                                {lastFiftyAnswersGrid}
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
