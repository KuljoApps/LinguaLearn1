"use client";

import { 
    ArrowLeft, Gamepad2, Zap, Sparkles, Heart, 
    Star, Rocket, Cloud, Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { setAppTheme, type AppTheme } from '@/lib/storage';
import { useRouter } from 'next/navigation';

// 5 podstawowych ikon do rotacji
const icons = [Zap, Sparkles, Heart, Star, Rocket];

export default function GamesPage() {
    const router = useRouter();

    const handleThemeSelect = (theme: AppTheme) => {
        setAppTheme(theme);
        router.push('/');
    };

    // Funkcja do pobierania ikony na podstawie indeksu
    const getIcon = (index: number) => {
        const IconComponent = icons[index % icons.length];
        return <IconComponent className="h-10 w-10" />;
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl flex flex-col h-[90vh]">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Gamepad2 className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Design Showcase</h1>
                    </div>
                    <p className="text-muted-foreground pt-2">Color variations for selected styles</p>
                </CardHeader>
                <CardContent className="flex flex-col space-y-8 p-6 pt-0 pb-4 overflow-y-auto">
                    
                    {/* CATEGORY 1: NEON CYBERPUNK */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300 bg-gray-900 py-2 rounded-lg border border-cyan-500/30">
                            NEON CYBERPUNK
                        </h2>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-amber-300">Amber & Gold</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-amber-500 hover:brightness-125 transition-all shadow-[0_0_25px_#ff6b00] border border-amber-600/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-amber-500 hover:brightness-125 transition-all shadow-[0_0_25px_#ff6b00] border border-amber-600/50">
                                {getIcon(0)}
                                <span>GOLDEN CIRCUIT</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ff8c00] border border-yellow-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ff8c00] border border-yellow-400/50">
                                {getIcon(1)}
                                <span>AMBER NETWORK</span>
                                {getIcon(1)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-white bg-amber-700 hover:brightness-125 transition-all shadow-[0_0_15px_#b35900] border border-amber-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-white bg-amber-700 hover:brightness-125 transition-all shadow-[0_0_15px_#b35900] border border-amber-700/50">
                                {getIcon(2)}
                                <span>SUNFIRE CORE</span>
                                {getIcon(2)}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-purple-400">Deep Purple</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-purple-500 via-violet-600 to-purple-700 hover:brightness-125 transition-all shadow-[0_0_25px_#9d4edd] border border-purple-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-purple-500 via-violet-600 to-purple-700 hover:brightness-125 transition-all shadow-[0_0_25px_#9d4edd] border border-purple-500/50">
                                {getIcon(2)}
                                <span>DEEP MATRIX</span>
                                {getIcon(2)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-violet-600 via-purple-700 to-indigo-600 hover:brightness-125 transition-all shadow-[0_0_20px_#7b2cbf] border border-violet-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-violet-600 via-purple-700 to-indigo-600 hover:brightness-125 transition-all shadow-[0_0_20px_#7b2cbf] border border-violet-500/50">
                                {getIcon(3)}
                                <span>VOID NETWORK</span>
                                {getIcon(3)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-purple-600 via-indigo-500 to-violet-700 hover:brightness-125 transition-all shadow-[0_0_15px_#5a189a] border border-purple-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-purple-600 via-indigo-500 to-violet-700 hover:brightness-125 transition-all shadow-[0_0_15px_#5a189a] border border-purple-700/50">
                                {getIcon(4)}
                                <span>NEXUS VOID</span>
                                {getIcon(4)}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-green-400">Green</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 hover:brightness-125 transition-all shadow-[0_0_25px_#00ff88] border border-green-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 hover:brightness-125 transition-all shadow-[0_0_25px_#00ff88] border border-green-400/50">
                                {getIcon(4)}
                                <span>GREEN CORE</span>
                                {getIcon(4)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 hover:brightness-125 transition-all shadow-[0_0_20px_#38b000] border border-lime-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 hover:brightness-125 transition-all shadow-[0_0_20px_#38b000] border border-lime-400/50">
                                {getIcon(0)}
                                <span>SYSTEM ROOT</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-emerald-400 via-green-600 to-lime-600 hover:brightness-125 transition-all shadow-[0_0_15px_#007200] border border-emerald-600/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-emerald-400 via-green-600 to-lime-600 hover:brightness-125 transition-all shadow-[0_0_15px_#007200] border border-emerald-600/50">
                                {getIcon(1)}
                                <span>BIOSPHERE GRID</span>
                                {getIcon(1)}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-red-400">Red</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-red-500 via-rose-600 to-red-600 hover:brightness-125 transition-all shadow-[0_0_25px_#ff3c00] border border-red-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-red-500 via-rose-600 to-red-600 hover:brightness-125 transition-all shadow-[0_0_25px_#ff3c00] border border-red-500/50">
                                {getIcon(1)}
                                <span>RED ALERT</span>
                                {getIcon(1)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 hover:brightness-125 transition-all shadow-[0_0_20px_#ff0055] border border-rose-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 hover:brightness-125 transition-all shadow-[0_0_20px_#ff0055] border border-rose-500/50">
                                {getIcon(2)}
                                <span>CRITICAL SYSTEM</span>
                                {getIcon(2)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-red-600 via-rose-700 to-red-700 hover:brightness-125 transition-all shadow-[0_0_15px_#cc0000] border border-red-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-red-600 via-rose-700 to-red-700 hover:brightness-125 transition-all shadow-[0_0_15px_#cc0000] border border-red-700/50">
                                {getIcon(3)}
                                <span>BLOOD CODE</span>
                                {getIcon(3)}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-blue-400">Blue</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:brightness-125 transition-all shadow-[0_0_25px_#0099ff] border border-blue-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:brightness-125 transition-all shadow-[0_0_25px_#0099ff] border border-blue-500/50">
                                {getIcon(3)}
                                <span>BLUE MATRIX</span>
                                {getIcon(3)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 hover:brightness-125 transition-all shadow-[0_0_20px_#0066ff] border border-sky-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 hover:brightness-125 transition-all shadow-[0_0_20px_#0066ff] border border-sky-500/50">
                                {getIcon(4)}
                                <span>DATA OCEAN</span>
                                {getIcon(4)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-700 hover:brightness-125 transition-all shadow-[0_0_15px_#0044cc] border border-blue-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-700 hover:brightness-125 transition-all shadow-[0_0_15px_#0044cc] border border-blue-700/50">
                                {getIcon(0)}
                                <span>DEEP STREAM</span>
                                {getIcon(0)}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Yellow</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 hover:brightness-125 transition-all shadow-[0_0_25px_#ffdd00] border border-yellow-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 hover:brightness-125 transition-all shadow-[0_0_25px_#ffdd00] border border-yellow-500/50">
                                {getIcon(0)}
                                <span>YELLOW GRID</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ffcc00] border border-amber-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ffcc00] border border-amber-500/50">
                                {getIcon(1)}
                                <span>PULSE LIGHT</span>
                                {getIcon(1)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-amber-600 hover:brightness-125 transition-all shadow-[0_0_15px_#e68a00] border border-yellow-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-amber-600 hover:brightness-125 transition-all shadow-[0_0_15px_#e68a00] border border-yellow-700/50">
                                {getIcon(2)}
                                <span>SOLAR FLARE</span>
                                {getIcon(2)}
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* CATEGORY 2: PASTEL DREAM */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center text-pink-500 bg-gradient-to-r from-pink-100 to-purple-100 py-2 rounded-lg border border-pink-300">
                            ✨ PASTEL DREAM ✨
                        </h2>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-amber-600">Amber & Gold</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl text-gray-800 bg-amber-300 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-amber-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl text-gray-800 bg-amber-300 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-amber-400/50">
                                <Sun className="h-10 w-10 text-amber-700" />
                                <span className="font-semibold">GOLDEN HOUR</span>
                                <Sun className="h-10 w-10 text-amber-700" />
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl text-gray-800 bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-100 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-yellow-300/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl text-gray-800 bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-100 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-yellow-300/50">
                                {getIcon(1)}
                                <span className="font-semibold">AMBER GLOW</span>
                                {getIcon(1)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl text-gray-800 bg-amber-400 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-amber-500/30' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl text-gray-800 bg-amber-400 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-amber-500/30">
                                {getIcon(2)}
                                <span className="font-semibold">HONEY SUNDROP</span>
                                {getIcon(2)}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-purple-600">Deep Purple</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl text-gray-800 bg-gradient-to-r from-purple-200 via-violet-200 to-purple-100 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-purple-300/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl text-gray-800 bg-gradient-to-r from-purple-200 via-violet-200 to-purple-100 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-purple-300/50">
                                <Moon className="h-10 w-10 text-purple-500" />
                                <span className="font-semibold">DEEP TWILIGHT</span>
                                <Moon className="h-10 w-10 text-purple-500" />
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl text-gray-800 bg-gradient-to-r from-violet-200 via-purple-100 to-indigo-200 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-violet-300/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl text-gray-800 bg-gradient-to-r from-violet-200 via-purple-100 to-indigo-200 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-violet-300/50">
                                {getIcon(3)}
                                <span className="font-semibold">ROYAL DREAM</span>
                                {getIcon(3)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl text-gray-800 bg-gradient-to-r from-purple-100 via-violet-300 to-purple-200 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-purple-400/30' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl text-gray-800 bg-gradient-to-r from-purple-100 via-violet-300 to-purple-200 hover:opacity-90 transition-all rounded-2xl shadow-inner border border-purple-400/30">
                                {getIcon(4)}
                                <span className="font-semibold">LAVENDER MIST</span>
                                {getIcon(4)}
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 mt-auto border-t">
                    <Link href="/" passHref>
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> 
                            <span>Back to Home</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
