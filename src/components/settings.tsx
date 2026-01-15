"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSettings, saveSettings, type Settings as AppSettings } from "@/lib/storage";

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>({
        soundsEnabled: true,
        vibrationsEnabled: true,
        volume: 50
    });

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const handleSettingChange = (key: keyof AppSettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        saveSettings(newSettings);
    }

    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
                <CardTitle className="text-center text-3xl">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <Label htmlFor="sounds-switch" className="text-lg">Sounds</Label>
                    <Switch
                        id="sounds-switch"
                        checked={settings.soundsEnabled}
                        onCheckedChange={(checked) => handleSettingChange('soundsEnabled', checked)}
                    />
                </div>
                <div className="space-y-4">
                    <Label htmlFor="volume-slider" className="text-base">Volume</Label>
                    <Slider
                        id="volume-slider"
                        min={0}
                        max={100}
                        step={1}
                        value={[settings.volume]}
                        onValueChange={(value) => handleSettingChange('volume', value[0])}
                        disabled={!settings.soundsEnabled}
                    />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <Label htmlFor="vibrations-switch" className="text-lg">Vibrations</Label>
                    <Switch id="vibrations-switch" />
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">
                        LinguaLearn is an app designed to help you learn new languages in a fun and interactive way.
                        <br />
                        Version 1.0.0
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link href="/" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
