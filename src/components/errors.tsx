"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getErrors, clearErrors, type ErrorRecord } from '@/lib/storage';
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
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ErrorsPage() {
    const [errors, setErrors] = useState<ErrorRecord[]>([]);
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);

    useEffect(() => {
        setErrors(getErrors());
    }, []);

    const handleClearErrors = () => {
        clearErrors();
        setErrors([]);
        setIsClearAlertOpen(false);
    }

    return (
        <>
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Common Errors</CardTitle>
                </CardHeader>
                <CardContent>
                    {errors.length === 0 ? (
                        <p className="text-center text-muted-foreground">No errors recorded yet. Keep practicing!</p>
                    ) : (
                        <ScrollArea className="h-72">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Word</TableHead>
                                        <TableHead>Your Answer</TableHead>
                                        <TableHead>Correct Answer</TableHead>
                                        <TableHead>Quiz</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {errors.map((error) => (
                                        <TableRow key={error.id}>
                                            <TableCell className="font-medium">{error.word}</TableCell>
                                            <TableCell className="text-destructive">{error.userAnswer}</TableCell>
                                            <TableCell className="text-success">{error.correctAnswer}</TableCell>
                                            <TableCell>{error.quiz}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center gap-4 pt-6">
                    <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                    <Button variant="destructive" onClick={() => setIsClearAlertOpen(true)} disabled={errors.length === 0}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Errors
                    </Button>
                </CardFooter>
            </Card>

            <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete all your recorded errors. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearErrors} className="bg-destructive hover:bg-destructive/90">
                            Clear
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
