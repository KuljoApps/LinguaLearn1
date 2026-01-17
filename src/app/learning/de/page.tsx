import { BookCopy, ArrowLeft, GraduationCap, Clock, FilePenLine, MessageSquareText, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function LearningDePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4">
                        <GraduationCap className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Lernen</h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-6">
                    <Link href="/learning/de/questions" passHref>
                        <Button className="w-full h-12 text-lg">
                            <BookCopy className="mr-2 h-5 w-5" />
                            Fragendatenbank
                        </Button>
                    </Link>
                    <Link href="/learning/de/tenses" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Clock className="mr-2 h-5 w-5" />
                            Zeiten
                        </Button>
                    </Link>
                    <Link href="/learning/de/grammar" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <FilePenLine className="mr-2 h-5 w-5" />
                            Allgemeine Grammatik
                        </Button>
                    </Link>
                    <Link href="/learning/de/phrases" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <MessageSquareText className="mr-2 h-5 w-5" />
                            Ausdrücke & Sätze
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookText className="mr-2 h-5 w-5" />
                            Wörterbuch
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Startseite
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
