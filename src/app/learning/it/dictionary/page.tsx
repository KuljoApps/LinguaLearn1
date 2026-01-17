import { ArrowLeft, Hash, Palette, Clock, Users, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function DictionaryItPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Dizionario</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/it/dictionary/numbers" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hash className="h-12 w-12" />
                            Numeri
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/colors" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Palette className="h-12 w-12" />
                            Colori
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/time" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Clock className="h-12 w-12" />
                            Tempo
                        </Button>
                    </Link>
                    <Link href="/learning/it/dictionary/family" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Users className="h-12 w-12" />
                            Famiglia
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
