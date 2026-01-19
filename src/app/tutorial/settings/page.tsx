"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trash2 } from "lucide-react";

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakeSettingsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl" data-tutorial-id="settings-card">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div data-tutorial-id="settings-switches" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sounds-switch" className="text-lg">Sounds</Label>
                            <Switch id="sounds-switch" checked={true} disabled />
                        </div>
                        <Separator/>
                        <div className="space-y-2">
                            <Label htmlFor="volume-slider" className="text-lg">Volume</Label>
                            <Slider id="volume-slider" defaultValue={[50]} disabled />
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="vibrations-switch" className="text-lg">Vibrations</Label>
                            <Switch id="vibrations-switch" checked={true} disabled />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2 py-2" data-tutorial-id="settings-eyecare">
                        <Label htmlFor="eyecare-slider" className="text-lg">Eye Care</Label>
                        <Slider id="eyecare-slider" defaultValue={[20]} disabled />
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About the app</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground pr-4">
                                This application builds your language skills with quick fun quizzes.
                            </p>
                            <Button variant="outline" size="sm" disabled>More</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-2">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" disabled>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <Button variant="destructive" disabled>
                            <Trash2 className="mr-2 h-4 w-4" /> Reset Settings
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}