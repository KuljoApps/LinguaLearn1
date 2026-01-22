"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trash2, Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
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
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl" data-tutorial-id="settings-card">
                <CardHeader className="items-center text-center">
                    <div className="flex items-center justify-center gap-4">
                        <SettingsIcon className="h-8 w-8" />
                        <CardTitle className="text-3xl">Settings</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div data-tutorial-id="settings-switches" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sounds-switch" className="text-lg">Sounds</Label>
                            <Switch id="sounds-switch" checked={true} className="pointer-events-none" />
                        </div>
                        <Separator/>
                        <div className="space-y-2">
                            <Label htmlFor="volume-slider" className="text-lg">Volume</Label>
                            <Slider id="volume-slider" defaultValue={[50]} className="pointer-events-none" />
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="vibrations-switch" className="text-lg">Vibrations</Label>
                            <Switch id="vibrations-switch" checked={true} className="pointer-events-none" />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2 py-2" data-tutorial-id="settings-eyecare">
                        <Label htmlFor="eyecare-slider" className="text-lg">Eye Care</Label>
                        <Slider id="eyecare-slider" defaultValue={[20]} className="pointer-events-none" />
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About the app</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground pr-4">
                                This application builds your language skills with quick fun quizzes.
                            </p>
                            <Button variant="outline" size="sm" className="pointer-events-none">More</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-2">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="pointer-events-none">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <Button variant="destructive" className="pointer-events-none">
                            <Trash2 className="mr-2 h-4 w-4" /> Reset Settings
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
