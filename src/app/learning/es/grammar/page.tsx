import { ArrowLeft, FilePenLine, Split, HelpCircle, Ban, Palette, Newspaper, UserSquare, BookType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarEsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <FilePenLine className="h-8 w-8 flex-shrink-0" />
                        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left break-words">
                            Gramática General
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-4">
                    <Link href="/learning/es/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5 text-deep-purple" />
                            Estructura de la Oración
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5 text-deep-purple" />
                            Preguntas
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5 text-deep-purple" />
                            Negaciones
                        </Button>
                    </Link>
                     <Link href="/learning/es/grammar/articles" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookType className="mr-2 h-5 w-5 text-deep-purple" />
                            Artículos
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar/adjectives" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Palette className="mr-2 h-5 w-5 text-deep-purple" />
                            Adjetivos
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar/adverbs" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Newspaper className="mr-2 h-5 w-5 text-deep-purple" />
                            Adverbios
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar/pronouns" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <UserSquare className="mr-2 h-5 w-5 text-deep-purple" />
                            Pronombres
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/es" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Aprendizaje
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
