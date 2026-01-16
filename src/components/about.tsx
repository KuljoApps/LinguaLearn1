"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LinguaLearnLogo from "@/components/LinguaLearnLogo";

export default function AboutPage() {
    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="items-center text-center">
                <LinguaLearnLogo width="48" height="48" />
                <CardTitle className="text-3xl">About LinguaLearn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">
                    This application is a language learning tool designed to help you expand your vocabulary through interactive quizzes.
                </p>
                <p className="text-muted-foreground">
                    Built with Next.js, React, ShadCN UI, Tailwind CSS, and Genkit.
                </p>
                <p className="font-bold pt-4">
                    Version 1.0.0
                </p>
            </CardContent>
            <CardFooter className="flex justify-center p-6">
                <Link href="/settings" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
