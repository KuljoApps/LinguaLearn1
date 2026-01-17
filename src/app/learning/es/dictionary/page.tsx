import { ArrowLeft, Hash, Palette, Clock, Users, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function DictionaryEsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Diccionario</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/es/dictionary/numbers" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hash className="h-12 w-12" />
                            Números
                        </Button>
                    </Link>
                    <Link href="/learning/es/dictionary/colors" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Palette className="h-12 w-12" />
                            Colores
                        </Button>
                    </Link>
                    <Link href="/learning/es/dictionary/time" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Clock className="h-12 w-12" />
                            Tiempo
                        </Button>
                    </Link>
                    <Link href="/learning/es/dictionary/family" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Users className="h-12 w-12" />
                            Familia
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
