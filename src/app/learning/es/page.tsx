import { BookCopy, ArrowLeft, GraduationCap, BookMarked, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

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
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookCopy className="mr-2 h-5 w-5" />
                            Base de Preguntas
                        </Button>
                    </Link>
                    <Link href="/learning/es/tenses" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookMarked className="mr-2 h-5 w-5" />
                            Tiempos Verbales
                        </Button>
                    </Link>
                    <Link href="/learning/es/grammar" passHref>
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <BookText className="mr-2 h-5 w-5" />
                            Gramática General
                        </Button>
                    </Link>
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
