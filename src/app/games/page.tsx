"use client";

import { ArrowLeft, Gamepad2, Swords, Puzzle, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function GamesPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Gamepad2 className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Design Showcase</h1>
                    </div>
                     <p className="text-muted-foreground pt-2">Here are 4 design proposals for the game buttons. Choose one!</p>
                </CardHeader>
                <CardContent className="flex flex-col space-y-6 p-6 pt-0 pb-4 max-h-[70vh] overflow-y-auto">
                    
                    {/* Proposal 1: Gradient & Glow */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-center">Proposal 1: Gradient & Glow</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button className="w-full h-28 flex-col gap-2 text-lg text-white bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition-all pointer-events-none">
                                <Swords className="h-12 w-12" />
                                <span>Duel</span>
                            </Button>
                             <Button className="w-full h-28 flex-col gap-2 text-lg text-white bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition-all pointer-events-none">
                                <Puzzle className="h-12 w-12" />
                                <span>Puzzle</span>
                            </Button>
                        </div>
                        <div className="mt-4 flex flex-col space-y-2">
                             <Button className="w-full h-12 text-lg text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:shadow-md hover:shadow-indigo-500/40 transition-all pointer-events-none">
                                <BrainCircuit className="h-5 w-5 mr-2" />
                                <span>Logic Game</span>
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Proposal 2: Neon Outline */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-center">Proposal 2: Neon Outline</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg bg-gray-900 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400)] hover:bg-gray-800 hover:text-cyan-300 hover:border-cyan-300 transition-all pointer-events-none">
                                <Swords className="h-12 w-12" />
                                <span>Duel</span>
                            </Button>
                             <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg bg-gray-900 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400)] hover:bg-gray-800 hover:text-cyan-300 hover:border-cyan-300 transition-all pointer-events-none">
                                <Puzzle className="h-12 w-12" />
                                <span>Puzzle</span>
                            </Button>
                        </div>
                         <div className="mt-4 flex flex-col space-y-2">
                             <Button variant="outline" className="w-full h-12 text-lg bg-gray-900 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400)] hover:bg-gray-800 hover:text-cyan-300 hover:border-cyan-300 transition-all pointer-events-none">
                                <BrainCircuit className="h-5 w-5 mr-2" />
                                <span>Logic Game</span>
                            </Button>
                        </div>
                    </div>

                     <Separator />

                    {/* Proposal 3: Soft & Minimalist */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-center">Proposal 3: Soft & Minimalist</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="secondary" className="w-full h-28 flex-col gap-2 text-lg text-muted-foreground shadow-inner hover:bg-accent hover:text-accent-foreground transition-colors pointer-events-none">
                                <Swords className="h-12 w-12 text-primary" />
                                <span>Duel</span>
                            </Button>
                             <Button variant="secondary" className="w-full h-28 flex-col gap-2 text-lg text-muted-foreground shadow-inner hover:bg-accent hover:text-accent-foreground transition-colors pointer-events-none">
                                <Puzzle className="h-12 w-12 text-primary" />
                                <span>Puzzle</span>
                            </Button>
                        </div>
                         <div className="mt-4 flex flex-col space-y-2">
                             <Button variant="secondary" className="w-full h-12 text-lg text-muted-foreground shadow-inner hover:bg-accent hover:text-accent-foreground transition-colors pointer-events-none">
                                <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
                                <span>Logic Game</span>
                            </Button>
                        </div>
                    </div>

                     <Separator />

                    {/* Proposal 4: Bold & 3D Effect */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-center">Proposal 4: Bold & 3D Effect</h2>
                        <div className="grid grid-cols-2 gap-4">
                             <Button className="w-full h-28 flex-col gap-2 text-lg bg-amber-400 text-black border-b-4 border-amber-600 hover:bg-amber-300 active:border-b-2 active:translate-y-0.5 transition-all pointer-events-none">
                                <Swords className="h-12 w-12" />
                                <span>Duel</span>
                            </Button>
                            <Button className="w-full h-28 flex-col gap-2 text-lg bg-amber-400 text-black border-b-4 border-amber-600 hover:bg-amber-300 active:border-b-2 active:translate-y-0.5 transition-all pointer-events-none">
                                <Puzzle className="h-12 w-12" />
                                <span>Puzzle</span>
                            </Button>
                        </div>
                         <div className="mt-4 flex flex-col space-y-2">
                             <Button className="w-full h-12 text-lg bg-amber-400 text-black border-b-4 border-amber-600 hover:bg-amber-300 active:border-b-2 active:translate-y-0.5 transition-all pointer-events-none">
                                <BrainCircuit className="h-5 w-5 mr-2" />
                                <span>Logic Game</span>
                            </Button>
                        </div>
                    </div>


                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
