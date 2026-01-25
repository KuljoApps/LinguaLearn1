"use client";

import { 
    ArrowLeft, Gamepad2, Zap, Sparkles, Heart, 
    Star, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
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
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center text-amber-300 bg-gray-900 py-2 rounded-lg border border-amber-500/30">
                           🏆 FINALISTS 🏆
                        </h2>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-amber-300">Amber Network</h3>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ff8c00] border border-yellow-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ff8c00] border border-yellow-400/50">
                                {getIcon(1)}
                                <span>AMBER NETWORK</span>
                                {getIcon(1)}
                            </Button>
                             <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-amber-500 hover:brightness-125 transition-all shadow-[0_0_25px_#f59e0b] border border-amber-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-amber-500 hover:brightness-125 transition-all shadow-[0_0_25px_#f59e0b] border border-amber-500/50">
                                {getIcon(0)}
                                <span>AMBER VARIANT 1</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-white bg-orange-500 hover:brightness-125 transition-all shadow-[0_0_25px_#f97316] border border-orange-600/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-white bg-orange-500 hover:brightness-125 transition-all shadow-[0_0_25px_#f97316] border border-orange-600/50">
                                {getIcon(2)}
                                <span>AMBER VARIANT 2</span>
                                {getIcon(2)}
                            </Button>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Toxic Waste</h3>
                             <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-amber-200 bg-yellow-600 hover:brightness-125 transition-all shadow-[0_0_15px_#ca8a04] border border-yellow-600/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-amber-200 bg-yellow-600 hover:brightness-125 transition-all shadow-[0_0_15px_#ca8a04] border border-yellow-600/50">
                                {getIcon(0)}
                                <span>TOXIC WASTE</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-lime-400 via-yellow-500 to-lime-600 hover:brightness-125 transition-all shadow-[0_0_20px_#84cc16] border border-lime-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-lime-400 via-yellow-500 to-lime-600 hover:brightness-125 transition-all shadow-[0_0_20px_#84cc16] border border-lime-500/50">
                                {getIcon(3)}
                                <span>TOXIC VARIANT 1</span>
                                {getIcon(3)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-br from-yellow-600 via-lime-500 to-green-700 hover:brightness-125 transition-all shadow-[0_0_25px_#a3e635] border border-lime-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-br from-yellow-600 via-lime-500 to-green-700 hover:brightness-125 transition-all shadow-[0_0_25px_#a3e635] border border-lime-400/50">
                                {getIcon(4)}
                                <span>TOXIC VARIANT 2</span>
                                {getIcon(4)}
                            </Button>
                        </div>
                    </div>

                    {/* CATEGORY 1: NEON CYBERPUNK */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300 bg-gray-900 py-2 rounded-lg border border-cyan-500/30">
                            NEON CYBERPUNK
                        </h2>

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
                         <div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-400">Others</h3>
                             <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 hover:brightness-125 transition-all shadow-[0_0_25px_#f59e0b] border border-amber-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 hover:brightness-125 transition-all shadow-[0_0_25px_#f59e0b] border border-amber-500/50">
                                {getIcon(0)}
                                <span>GOLDEN CIRCUIT</span>
                                {getIcon(0)}
                            </Button>
                             <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-white bg-gradient-to-b from-red-500 via-orange-600 to-yellow-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ef4444] border border-red-600/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-white bg-gradient-to-b from-red-500 via-orange-600 to-yellow-500 hover:brightness-125 transition-all shadow-[0_0_20px_#ef4444] border border-red-600/50">
                                {getIcon(2)}
                                <span>SUNFIRE CORE</span>
                                {getIcon(2)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 hover:brightness-125 transition-all shadow-[0_0_25px_#f97316] border border-orange-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 hover:brightness-125 transition-all shadow-[0_0_25px_#f97316] border border-orange-500/50">
                                {getIcon(3)}
                                <span>SOLARIS FLARE</span>
                                {getIcon(3)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-yellow-200 bg-gradient-to-tr from-red-800 via-red-900 to-black hover:brightness-150 transition-all shadow-[0_0_30px_#b91c1c] border border-red-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-yellow-200 bg-gradient-to-tr from-red-800 via-red-900 to-black hover:brightness-150 transition-all shadow-[0_0_30px_#b91c1c] border border-red-700/50">
                                {getIcon(4)}
                                <span>INFERNO CORE</span>
                                {getIcon(4)}
                            </Button>
                             <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-yellow-300 bg-gradient-to-tr from-yellow-600 to-amber-800 hover:brightness-125 transition-all shadow-[0_0_20px_#b45309] border border-yellow-700/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-yellow-300 bg-gradient-to-tr from-yellow-600 to-amber-800 hover:brightness-125 transition-all shadow-[0_0_20px_#b45309] border border-yellow-700/50">
                                {getIcon(0)}
                                <span>MOLTEN GOLD</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 hover:brightness-125 transition-all shadow-[0_0_25px_#ffdd00] border border-yellow-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 hover:brightness-125 transition-all shadow-[0_0_25px_#ffdd00] border border-yellow-500/50">
                                {getIcon(0)}
                                <span>YELLOW GRID</span>
                                {getIcon(0)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-r from-yellow-200 via-white to-yellow-300 hover:brightness-125 transition-all shadow-[0_0_25px_#fde047] border border-yellow-300/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-200 via-white to-yellow-300 hover:brightness-125 transition-all shadow-[0_0_25px_#fde047] border border-yellow-300/50">
                                {getIcon(2)}
                                <span>SOLAR FLARE</span>
                                {getIcon(2)}
                            </Button>
                             <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-br from-lime-400 to-yellow-400 hover:brightness-125 transition-all shadow-[0_0_20px_#84cc16] border border-lime-500/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-br from-lime-400 to-yellow-400 hover:brightness-125 transition-all shadow-[0_0_20px_#84cc16] border border-lime-500/50">
                                {getIcon(3)}
                                <span>LEMON RUSH</span>
                                {getIcon(3)}
                            </Button>
                            <Button 
                                onClick={() => handleThemeSelect({ className: 'text-xl font-bold text-black bg-gradient-to-br from-lime-400 via-yellow-400 to-amber-500 hover:brightness-125 transition-all shadow-[0_0_25px_#a3e635] border border-lime-400/50' })}
                                className="w-full h-20 mb-2 flex items-center justify-center gap-4 text-xl font-bold text-black bg-gradient-to-br from-lime-400 via-yellow-400 to-amber-500 hover:brightness-125 transition-all shadow-[0_0_25px_#a3e635] border border-lime-400/50">
                                {getIcon(4)}
                                <span>CYBER BEE</span>
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
