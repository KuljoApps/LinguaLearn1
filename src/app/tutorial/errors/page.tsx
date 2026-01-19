import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Trash2, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from 'react';

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakeErrorsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-2xl" data-tutorial-id="errors-card">
                <CardHeader className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
                    <CardTitle className="text-3xl">Częste Błędy</CardTitle>
                    <div className="flex flex-col gap-2" data-tutorial-id="errors-controls">
                        <Select disabled>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtruj wg quizu" />
                            </SelectTrigger>
                        </Select>
                        <Button variant="outline" disabled>
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Zobacz najczęstsze
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-96 w-full p-0" data-tutorial-id="errors-table">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Słowo</TableHead>
                                <TableHead>Poprawna odpowiedź</TableHead>
                                <TableHead>Twoja odpowiedź</TableHead>
                                <TableHead>Quiz</TableHead>
                                <TableHead>Data</TableHead>
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
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" disabled>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Wróć do strony głównej
                        </Button>
                        <Button variant="destructive" disabled>
                            <Trash2 className="mr-2 h-4 w-4" /> Wyczyść błędy
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}
