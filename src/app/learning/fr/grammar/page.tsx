import { ArrowLeft, FilePenLine, Split, HelpCircle, Ban, Palette, ChevronsRight, UserSquare, BookType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarFrPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <FilePenLine className="h-8 w-8 flex-shrink-0" />
                        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left break-words">
                            Grammaire Générale
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-4">
                    <Link href="/learning/fr/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5 text-deep-purple" />
                            Structure de la Phrase
                        </Button>
                    </Link>
                    <Link href="/learning/fr/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5 text-deep-purple" />
                            Les Questions
                        </Button>
                    </Link>
                    <Link href="/learning/fr/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5 text-deep-purple" />
                            La Négation
                        </Button>
                    </Link>
                    <Link href="/learning/fr/grammar/articles" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookType className="mr-2 h-5 w-5 text-deep-purple" />
                            Les Articles
                        </Button>
                    </Link>
                    <Link href="/learning/fr/grammar/adjectives" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Palette className="mr-2 h-5 w-5 text-deep-purple" />
                            Adjectifs
                        </Button>
                    </Link>
                    <Link href="/learning/fr/grammar/adverbs" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <ChevronsRight className="mr-2 h-5 w-5 text-deep-purple" />
                            Adverbes
                        </Button>
                    </Link>
                    <Link href="/learning/fr/grammar/pronouns" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <UserSquare className="mr-2 h-5 w-5 text-deep-purple" />
                            Pronoms
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/fr" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'Apprentissage
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
