"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Percent, ShieldX, Trash2 } from "lucide-react";
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

export default function StatisticsPage() {
    const [stats, setStats] = useState<Stats>({ totalAnswers: 0, totalErrors: 0 });
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);

    useEffect(() => {
        setStats(getStats());
    }, []);

    const handleClearStats = () => {
        clearStats();
        setStats({ totalAnswers: 0, totalErrors: 0 });
        setIsClearAlertOpen(false);
    }

    const successRate = stats.totalAnswers > 0
        ? Math.round(((stats.totalAnswers - stats.totalErrors) / stats.totalAnswers) * 100)
        : 0;

    return (
        <>
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalAnswers.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
                            <ShieldX className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalErrors.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <Percent className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{successRate}%</div>
                        </CardContent>
                    </Card>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                    <Button variant="destructive" onClick={() => setIsClearAlertOpen(true)} disabled={stats.totalAnswers === 0}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Stats
                    </Button>
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
