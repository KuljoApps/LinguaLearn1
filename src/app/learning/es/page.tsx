import { BookCopy, ArrowLeft, GraduationCap, Clock, FilePenLine, MessageSquareText, BookText, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LearningEsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader>
                    <div className="flex items-center justify-center gap-4">
                        <GraduationCap className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Aprendizaje</h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 p-6">
                    <Link href="/learning/es/questions" passHref>
                        <Button className="w-full h-12 text-lg">
                            <BookCopy className="mr-2 h-5 w-5" />
                            Base de Preguntas
                        </Button>
                    </Link>
                    <Link href="/learning/es/tenses" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Clock className="mr-2 h-5 w-5 text-deep-purple" />
                            Tiempos Verbales
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <FilePenLine className="mr-2 h-5 w-5 text-deep-purple" />
                            Gramática General
                        </Button>
                    </Link>
                    <Link href="/learning/es/phrases" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <MessageSquareText className="mr-2 h-5 w-5 text-deep-purple" />
                            Expresiones y Frases
                        </Button>
                    </Link>
                    <Link href="/learning/es/dictionary" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookText className="mr-2 h-5 w-5 text-deep-purple" />
                            Diccionario
                        </Button>
                    </Link>
                    <div className="pt-2">
                        <Separator />
                        <p className="text-center text-sm italic text-muted-foreground my-2">Extras</p>
                        <Link href="/learning/es/culture" passHref>
                            <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                                <Landmark className="mr-2 h-5 w-5 text-deep-purple" />
                                Cultura
                            </Button>
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Link href="/" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
