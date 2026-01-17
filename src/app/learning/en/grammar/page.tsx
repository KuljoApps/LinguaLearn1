import { ArrowLeft, BookText, Split, HelpCircle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarEnPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">General Grammar</h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-6">
                    <Link href="/learning/en/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5" />
                            Sentence Structure
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5" />
                            Questions
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5" />
                            Negations
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Link href="/learning/en" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
