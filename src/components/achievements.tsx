"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { getAchievements, type AchievementStatus } from '@/lib/storage';
import { allAchievements, type Achievement } from '@/lib/achievements';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<Record<string, AchievementStatus>>({});

    useEffect(() => {
        setAchievements(getAchievements());
    }, []);

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader>
                <CardTitle className="text-center text-3xl">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto p-6">
                 <TooltipProvider>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {allAchievements.map((achievement: Achievement) => {
                            const status = achievements[achievement.id] || { progress: 0, unlockedAt: null };
                            const isUnlocked = !!status.unlockedAt;
                            const progressPercentage = isUnlocked ? 100 : (status.progress / achievement.goal) * 100;
                            const Icon = achievement.icon;

                            return (
                                <Tooltip key={achievement.id}>
                                    <TooltipTrigger asChild>
                                        <Card className={cn(
                                            "flex flex-col items-center justify-center p-4 text-center transition-all",
                                            !isUnlocked && "bg-muted/50 opacity-60"
                                        )}>
                                            <div className="relative">
                                                <Icon className={cn("h-12 w-12 mb-2", isUnlocked ? "text-amber" : "text-muted-foreground")} />
                                                 {isUnlocked && (
                                                    <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-success bg-background rounded-full" />
                                                )}
                                            </div>
                                            <h3 className="font-semibold">{achievement.name}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                                            
                                            {!isUnlocked && achievement.goal > 1 && (
                                                <div className="w-full mt-2">
                                                    <Progress value={progressPercentage} className="h-2" />
                                                    <p className="text-xs font-mono mt-1">{Math.floor(status.progress)} / {achievement.goal}</p>
                                                </div>
                                            )}
                                        </Card>
                                    </TooltipTrigger>
                                    {isUnlocked && status.unlockedAt && (
                                        <TooltipContent>
                                            <p>Unlocked: {format(new Date(status.unlockedAt), "PPP")}</p>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            );
                        })}
                    </div>
                </TooltipProvider>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href="/" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
