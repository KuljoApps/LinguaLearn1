"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTutorialState } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Trash2, ArrowUpDown, ShieldX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from 'react';

export default function Errors() {
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
            <Card className="w-full max-w-4xl shadow-2xl" data-tutorial-id="errors-card">
                <CardHeader className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-4">
                        <ShieldX className="h-8 w-8" />
                        <CardTitle className="text-3xl">Common Errors</CardTitle>
                    </div>
                    <div className="flex flex-col gap-2" data-tutorial-id="errors-controls">
                        <Select open={false}>
                            <SelectTrigger className="pointer-events-none">
                                <SelectValue placeholder="Filter by quiz" />
                            </SelectTrigger>
                        </Select>
                        <Button variant="outline" className="pointer-events-none">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            View Most Frequent
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-96 w-full py-0 px-4" data-tutorial-id="errors-table">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button variant="ghost" className="justify-start px-0 font-bold text-foreground pointer-events-none">
                                        Word
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="justify-start px-0 font-bold text-foreground pointer-events-none">
                                        Correct Answer
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="justify-start px-0 font-bold text-foreground pointer-events-none">
                                        Your Answer
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="justify-start px-0 font-bold text-foreground pointer-events-none">
                                        Quiz
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="justify-start px-0 font-bold text-foreground pointer-events-none">
                                        Date
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Reliable</TableCell>
                                <TableCell className="text-success whitespace-nowrap">Niezawodny</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">Religijny</TableCell>
                                <TableCell className="whitespace-nowrap">English - Polish</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    2 minutes ago
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Accomplish</TableCell>
                                <TableCell className="text-success whitespace-nowrap">Osiągnąć</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">Akompaniować</TableCell>
                                <TableCell className="whitespace-nowrap">English - Polish</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    1 day ago
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Wytrwać</TableCell>
                                <TableCell className="text-success whitespace-nowrap">Persevere</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">Survive</TableCell>
                                <TableCell className="whitespace-nowrap">Polish - English</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">
                                    3 days ago
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Conscious</TableCell>
                                <TableCell className="text-success whitespace-nowrap">Świadomy</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">Sumienny</TableCell>
                                <TableCell className="whitespace-nowrap">English - Polish</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">4 days ago</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Osiągnąć</TableCell>
                                <TableCell className="text-success whitespace-nowrap">Achieve</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">Reach</TableCell>
                                <TableCell className="whitespace-nowrap">Polish - English</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">5 days ago</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">go</TableCell>
                                <TableCell className="text-success whitespace-nowrap">went, gone</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">goed, gone</TableCell>
                                <TableCell className="whitespace-nowrap">Irregular Verbs</TableCell>
                                <TableCell className="whitespace-nowrap text-muted-foreground">1 week ago</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" className="pointer-events-none">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <Button variant="destructive" className="pointer-events-none">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Errors
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
