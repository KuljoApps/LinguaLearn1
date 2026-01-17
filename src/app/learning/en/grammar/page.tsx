import { ArrowLeft, FilePenLine, Split, HelpCircle, Ban, Palette, ChevronsRight, UserSquare, BookType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function GrammarEnPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <FilePenLine className="h-8 w-8 flex-shrink-0" />
                        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left break-words">
                            General Grammar
                        </h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-4">
                    <Link href="/learning/en/grammar/sentence-structure" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5 text-deep-purple" />
                            Sentence Structure
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/questions" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5 text-deep-purple" />
                            Questions
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/negations" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5 text-deep-purple" />
                            Negations
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/articles" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookType className="mr-2 h-5 w-5 text-deep-purple" />
                            Articles
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/adjectives" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Palette className="mr-2 h-5 w-5 text-deep-purple" />
                            Adjectives
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/adverbs" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <ChevronsRight className="mr-2 h-5 w-5 text-deep-purple" />
                            Adverbs
                        </Button>
                    </Link>
                    <Link href="/learning/en/grammar/pronouns" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <UserSquare className="mr-2 h-5 w-5 text-deep-purple" />
                            Pronouns
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
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
