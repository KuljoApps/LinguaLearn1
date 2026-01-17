
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import type { Phrase } from '@/lib/phrases';

interface PhrasesPageProps {
    title: string;
    backHref: string;
    phrases: Phrase[];
    children: React.ReactNode;
}

export default function PhrasesPage({ title, backHref, phrases, children }: PhrasesPageProps) {
    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-4">
                    {children}
                    <CardTitle className="text-3xl">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full pr-4">
                    <div className="flex flex-col gap-3">
                        {phrases.map((p, index) => (
                            <React.Fragment key={index}>
                                <div className="text-sm">
                                    <p className="font-bold">{p.phrase}</p>
                                    {p.translation && <p className="text-muted-foreground">{p.translation}</p>}
                                </div>
                                {index < phrases.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center p-6 border-t">
                <Link href={backHref} passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Powrót
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
