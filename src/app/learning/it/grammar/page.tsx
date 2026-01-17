import { ArrowLeft, FilePenLine, Split, HelpCircle, Ban, Palette, ChevronsRight, UserSquare, BookType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarItPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <FilePenLine className="h-8 w-8 flex-shrink-0" />
                        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left break-words">
                            Grammatica Generale
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-4">
                    <Link href="/learning/it/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5 text-deep-purple" />
                            Struttura della Frase
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5 text-deep-purple" />
                            Domande
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5 text-deep-purple" />
                            Negazioni
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/articles" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookType className="mr-2 h-5 w-5 text-deep-purple" />
                            Articoli
                        </Button>
                    </Link>
                     <Link href="/learning/it/grammar/adjectives" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Palette className="mr-2 h-5 w-5 text-deep-purple" />
                            Aggettivi
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/adverbs" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <ChevronsRight className="mr-2 h-5 w-5 text-deep-purple" />
                            Avverbi
                        </Button>
                    </Link>
                    <Link href="/learning/it/grammar/pronouns" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <UserSquare className="mr-2 h-5 w-5 text-deep-purple" />
                            Pronomi
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
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
