import { ArrowLeft, FilePenLine, Split, HelpCircle, Ban, Palette, Newspaper, UserSquare, BookType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarDePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <FilePenLine className="h-8 w-8 flex-shrink-0" />
                        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left break-words">
                            Allgemeine Grammatik
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-4">
                    <Link href="/learning/de/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5 text-deep-purple" />
                            Satzbau
                        </Button>
                    </Link>
                    <Link href="/learning/de/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5 text-deep-purple" />
                            Fragen
                        </Button>
                    </Link>
                    <Link href="/learning/de/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5 text-deep-purple" />
                            Verneinung
                        </Button>
                    </Link>
                     <Link href="/learning/de/grammar/articles" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookType className="mr-2 h-5 w-5 text-deep-purple" />
                            Artikel
                        </Button>
                    </Link>
                    <Link href="/learning/de/grammar/adjectives" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Palette className="mr-2 h-5 w-5 text-deep-purple" />
                            Adjektive
                        </Button>
                    </Link>
                    <Link href="/learning/de/grammar/adverbs" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Newspaper className="mr-2 h-5 w-5 text-deep-purple" />
                            Adverbien
                        </Button>
                    </Link>
                    <Link href="/learning/de/grammar/pronouns" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <UserSquare className="mr-2 h-5 w-5 text-deep-purple" />
                            Pronomen
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/de" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Lernen
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
