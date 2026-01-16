"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getSettings, saveSettings, clearSettings, type Settings as AppSettings } from "@/lib/storage";
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

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>(getSettings);
    const [isResetAlertOpen, setIsResetAlertOpen] = useState(false);

    const handleSettingChange = (key: keyof AppSettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        saveSettings(newSettings);

        if (key === 'vibrationsEnabled' && value === true) {
            if (typeof window !== 'undefined' && 'vibrate' in window.navigator) {
                // A short vibration to confirm the setting is on.
                window.navigator.vibrate(100);
            }
        }
    }

    const handleResetSettings = () => {
        clearSettings();
        setSettings(getSettings());
        setIsResetAlertOpen(false);
    };

    return (
        <>
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="sounds-switch" className="text-lg">Sounds</Label>
                        <Switch
                            id="sounds-switch"
                            checked={settings.soundsEnabled}
                            onCheckedChange={(checked) => handleSettingChange('soundsEnabled', checked)}
                            suppressHydrationWarning
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="volume-slider" className="text-lg">Volume</Label>
                        <Slider
                            id="volume-slider"
                            min={0}
                            max={100}
                            step={1}
                            value={[settings.volume]}
                            onValueChange={(value) => handleSettingChange('volume', value[0])}
                            disabled={!settings.soundsEnabled}
                            suppressHydrationWarning
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <Label htmlFor="vibrations-switch" className="text-lg">Vibrations</Label>
                        <Switch
                            id="vibrations-switch"
                            checked={settings.vibrationsEnabled}
                            onCheckedChange={(checked) => handleSettingChange('vibrationsEnabled', checked)}
                            suppressHydrationWarning
                        />
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About the app</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground pr-4">
                                This application builds your language skills with quick fun quizzes.
                            </p>
                            <Link href="/settings/about" passHref>
                                <Button variant="outline" size="sm">More</Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsResetAlertOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Reset Settings
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isResetAlertOpen} onOpenChange={setIsResetAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will reset all settings to their default values. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetSettings} className="bg-destructive hover:bg-destructive/90">
                            Reset
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
