import { ArrowLeft, AudioLines, CaseUpper, HelpCircle, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function PhoneticsEsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <AudioLines className="h-8 w-8" />
                        <CardTitle className="text-3xl">Fonética</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                    <Link href="/learning/es/phonetics/alphabet" passHref>
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary">
                            <CaseUpper className="h-12 w-12 text-deep-purple" />
                            Alfabeto
                        </Button>
                    </Link>
                    <Link href="/learning/es/phonetics/basic-expressions" passHref>
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary">
                            <MessageSquareText className="h-12 w-12 text-deep-purple" />
                            Expresiones Básicas
                        </Button>
                    </Link>
                    <Link href="/learning/es/phonetics/difficult-pronunciation" passHref className="col-span-1 sm:col-span-2">
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary">
                            <HelpCircle className="h-12 w-12 text-deep-purple" />
                            Pronunciación Difícil
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
