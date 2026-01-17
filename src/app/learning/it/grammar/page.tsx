import { ArrowLeft, BookText, Split, HelpCircle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarItPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="flex-row items-center justify-center gap-4">
                    <BookText className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-center">Grammatica Generale</h1>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-6">
                    <Link href="/learning/it/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5" />
                            Struttura della Frase
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5" />
                            Domande
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5" />
                            Negazioni
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Link href="/learning/it" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Torna ad Apprendimento
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
