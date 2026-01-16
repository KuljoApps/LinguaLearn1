"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ArrowLeft, Trash2, ArrowUpDown } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface AggregatedError {
    word: string;
    correctAnswer: string;
    quiz: string;
    count: number;
    userAnswers: Set<string>;
}

type QuizFilter = 'all' | 'English - Polish' | 'Polish - English' | 'Irregular Verbs' | 'Phrasal Verbs' | 'Idioms';

export default function ErrorsPage() {
    const [errors, setErrors] = useState<ErrorRecord[]>([]);
    const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
    const [view, setView] = useState<'latest' | 'frequent'>('latest');
    const [quizFilter, setQuizFilter] = useState<QuizFilter>('all');
    const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

    useEffect(() => {
        setErrors(getErrors());
    }, []);

    const handleRowClick = (id: string | number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const truncateText = (text: string, length = 15) => {
        if (!text || text.length <= length) {
            return text;
        }
        return `${text.substring(0, length)}...`;
    };

    const filteredErrors = useMemo(() => {
        if (quizFilter === 'all') {
            return errors;
        }
        return errors.filter(error => error.quiz === quizFilter);
    }, [errors, quizFilter]);

    const handleClearErrors = () => {
        clearErrors();
        setErrors([]);
        setIsClearAlertOpen(false);
    }

    const frequentErrors = useMemo((): AggregatedError[] => {
        if (view !== 'frequent') return [];

        const errorCounts = new Map<string, AggregatedError>();

        for (const error of filteredErrors) {
            const key = `${error.quiz}|${error.word}|${error.correctAnswer}`;
            let entry = errorCounts.get(key);

            if (!entry) {
                entry = {
                    word: error.word,
                    correctAnswer: error.correctAnswer,
                    quiz: error.quiz,
                    count: 0,
                    userAnswers: new Set<string>(),
                };
                errorCounts.set(key, entry);
            }

            entry.count++;
            if (error.userAnswer && error.userAnswer !== 'No answer') {
                entry.userAnswers.add(error.userAnswer);
            }
        }
        
        return Array.from(errorCounts.values()).sort((a, b) => b.count - a.count);
    }, [filteredErrors, view]);

    const renderTable = () => {
        if (filteredErrors.length === 0) {
            return <p className="text-center text-muted-foreground pt-10">No errors recorded for this filter.</p>;
        }

        if (view === 'frequent') {
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Count</TableHead>
                            <TableHead>Word</TableHead>
                            <TableHead>Your Answers</TableHead>
                            <TableHead>Correct Answer</TableHead>
                            <TableHead>Quiz</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {frequentErrors.map((error, index) => {
                            const isExpanded = expandedRows.has(index);
                            const userAnswersText = Array.from(error.userAnswers).join(', ');
                            const uniqueKey = `${error.word}-${error.correctAnswer}-${index}`;
                            return (
                                <TableRow key={uniqueKey} onClick={() => handleRowClick(uniqueKey)} className="cursor-pointer">
                                    <TableCell className="font-bold text-center whitespace-nowrap">{error.count}</TableCell>
                                    <TableCell className="font-medium whitespace-nowrap">{isExpanded ? error.word : truncateText(error.word)}</TableCell>
                                    <TableCell className="text-destructive whitespace-nowrap">
                                        {isExpanded ? userAnswersText : truncateText(userAnswersText)}
                                    </TableCell>
                                    <TableCell className="text-success whitespace-nowrap">{isExpanded ? error.correctAnswer : truncateText(error.correctAnswer)}</TableCell>
                                    <TableCell className="whitespace-nowrap">{error.quiz}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }

        return (
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
                    {filteredErrors.map((error) => {
                        const isExpanded = expandedRows.has(error.id);
                        return (
                            <TableRow key={error.id} onClick={() => handleRowClick(error.id)} className="cursor-pointer">
                                <TableCell className="font-medium whitespace-nowrap">{isExpanded ? error.word : truncateText(error.word)}</TableCell>
                                <TableCell className="text-destructive whitespace-nowrap">{isExpanded ? error.userAnswer : truncateText(error.userAnswer)}</TableCell>
                                <TableCell className="text-success whitespace-nowrap">{isExpanded ? error.correctAnswer : truncateText(error.correctAnswer)}</TableCell>
                                <TableCell className="whitespace-nowrap">{error.quiz}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    return (
        <>
            <Card className="w-full max-w-4xl shadow-2xl">
                <CardHeader className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
                    <CardTitle className="text-3xl">Common Errors</CardTitle>
                    <div className="flex flex-col gap-2">
                        <Select value={quizFilter} onValueChange={(value) => setQuizFilter(value as QuizFilter)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by quiz" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Quizzes</SelectItem>
                                <SelectItem value="English - Polish">English - Polish</SelectItem>
                                <SelectItem value="Polish - English">Polish - English</SelectItem>
                                <SelectItem value="Irregular Verbs">Irregular Verbs</SelectItem>
                                <SelectItem value="Phrasal Verbs">Phrasal Verbs</SelectItem>
                                <SelectItem value="Idioms">Idioms</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={() => setView(view === 'latest' ? 'frequent' : 'latest')}>
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            View {view === 'latest' ? 'Most Frequent' : 'Latest'}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-96 w-full p-0">
                    {renderTable()}
                </CardContent>
                <CardFooter className="flex justify-center py-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/" passHref>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={() => setIsClearAlertOpen(true)} disabled={errors.length === 0}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Errors
                        </Button>
                    </div>
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
