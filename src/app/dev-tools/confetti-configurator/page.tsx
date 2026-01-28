"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, Beaker, CheckCircle, Clock, Palette, Shapes, SlidersHorizontal, Sparkles, ShieldX, Trophy } from 'lucide-react';
import Confetti from '@/components/Confetti';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';

type ConfettiShape = 'square' | 'circle';

interface ConfettiConfig {
  pieces: number;
  gravity: number;
  duration: number; // in seconds
  shape: ConfettiShape;
  colors: string[];
}

const STORAGE_KEY = 'linguaLearnConfettiConfig';

const defaultColors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

const presetColors: Record<string, string[]> = {
    'Rainbow': ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
    'Pastel': ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'],
    'Ocean': ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087'],
    'Forest': ['#004225', '#588157', '#a3b18a', '#dad7cd', '#3a5a40'],
};


export default function ConfettiConfiguratorPage() {
    const [config, setConfig] = useState<ConfettiConfig>({
        pieces: 200,
        gravity: 0.2,
        duration: 5,
        shape: 'square',
        colors: defaultColors,
    });
    const [isExploding, setIsExploding] = useState(false);
    
    useEffect(() => {
        try {
            const savedConfig = localStorage.getItem(STORAGE_KEY);
            if (savedConfig) {
                setConfig(JSON.parse(savedConfig));
            }
        } catch (e) {
            console.error("Failed to load confetti config:", e);
        }
    }, []);
    
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        } catch (e) {
            console.error("Failed to save confetti config:", e);
        }
    }, [config]);

    const handleTestClick = () => {
        if (isExploding) return;
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), config.duration * 1000);
    };

    const handleColorClick = (color: string) => {
        setConfig(prev => {
            const newColors = prev.colors.includes(color)
                ? prev.colors.filter(c => c !== color)
                : [...prev.colors, color];
            return { ...prev, colors: newColors };
        });
    };
    
    const handlePresetClick = (presetName: string) => {
        setConfig(prev => ({...prev, colors: presetColors[presetName]}));
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
            {isExploding && (
                <Confetti
                    recycle={true}
                    numberOfPieces={config.pieces}
                    gravity={config.gravity}
                    colors={config.colors}
                    confettiSource={{ w: 10, h: 10, x: window.innerWidth / 2, y: window.innerHeight / 2 }}
                    {...(config.shape === 'circle' && { drawShape: (ctx) => {
                        ctx.beginPath();
                        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.closePath();
                    }})}
                />
            )}
             <Card className="w-full max-w-lg shadow-2xl pointer-events-none mb-8">
                <CardHeader className="items-center text-center pb-4">
                    <Trophy className="h-16 w-16 text-amber" />
                    <CardTitle className="text-3xl font-bold">Perfect Score!</CardTitle>
                    <CardDescription>Amazing! You answered all questions correctly.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Card className="bg-muted/50">
                        <CardHeader className="pb-2 pt-4">
                            <CardTitle className="text-xl text-center">Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4 text-center">
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                <span className="text-2xl font-bold">30 / 30</span>
                                <span className="text-xs text-muted-foreground">Score</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                <span className="text-2xl font-bold">100%</span>
                                <span className="text-xs text-muted-foreground">Success Rate</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-success"/>
                                    <span className="text-2xl font-bold">30</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Correct</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background">
                                <div className="flex items-center gap-2">
                                    <ShieldX className="h-4 w-4 text-destructive"/>
                                    <span className="text-2xl font-bold">0</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Mistakes</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background col-span-2">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground"/>
                                    <span className="text-2xl font-bold">02:15</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Total Time</span>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <Card className="w-full max-w-2xl shadow-2xl">
                 <CardHeader className="p-4 pb-2 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Beaker className="h-8 w-8" />
                        <CardTitle className="text-2xl">Confetti Configurator</CardTitle>
                    </div>
                </CardHeader>
                 <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2"><SlidersHorizontal className="h-5 w-5"/> Parameters</h3>
                        <div className="space-y-4">
                            <Label htmlFor="amount">Amount: {config.pieces}</Label>
                            <Slider id="amount" value={[config.pieces]} onValueChange={(v) => setConfig(p => ({...p, pieces: v[0]}))} min={10} max={800} step={10} />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="duration">Duration: {config.duration}s</Label>
                            <Slider id="duration" value={[config.duration]} onValueChange={(v) => setConfig(p => ({...p, duration: v[0]}))} min={1} max={15} step={1} />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="gravity">Gravity: {config.gravity.toFixed(2)}</Label>
                            <Slider id="gravity" value={[config.gravity]} onValueChange={(v) => setConfig(p => ({...p, gravity: v[0]}))} min={0.05} max={0.7} step={0.01} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2"><Shapes className="h-5 w-5"/> Shape</h3>
                         <RadioGroup value={config.shape} onValueChange={(v) => setConfig(p => ({...p, shape: v as ConfettiShape}))} className="flex justify-center gap-4">
                            <Label htmlFor="square" className="cursor-pointer flex flex-col items-center gap-2 p-3 rounded-md border-2 has-[:checked]:border-primary">
                                <div className="h-8 w-8 bg-foreground rounded-sm" />
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="square" id="square" />
                                    Square
                                </div>
                            </Label>
                            <Label htmlFor="circle" className="cursor-pointer flex flex-col items-center gap-2 p-3 rounded-md border-2 has-[:checked]:border-primary">
                                <div className="h-8 w-8 bg-foreground rounded-full" />
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="circle" id="circle" />
                                    Circle
                                </div>
                            </Label>
                        </RadioGroup>
                         <Separator />
                        <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2"><Palette className="h-5 w-5"/> Colors</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {Object.entries(presetColors).map(([name, colors]) => (
                                <Button key={name} variant="outline" size="sm" onClick={() => handlePresetClick(name)}>{name}</Button>
                            ))}
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="col-span-1">Custom</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <HexColorPicker color={config.colors[0]} onChange={(c) => setConfig(p => ({ ...p, colors: [c] }))} />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {config.colors.map(color => (
                                <div key={color} style={{backgroundColor: color}} className="h-6 w-6 rounded-full border cursor-pointer" onClick={() => handleColorClick(color)}></div>
                            ))}
                        </div>
                    </div>
                 </CardContent>
                 <CardFooter className="flex-col gap-4 p-6 border-t">
                    <Button onClick={handleTestClick} disabled={isExploding} className="w-full max-w-xs">
                        <Sparkles className="mr-2 h-4 w-4"/>
                        Test Animation
                    </Button>
                    <Link href="/listening" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listening
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
