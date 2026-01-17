import { ArrowLeft, Hash, Palette, Clock, Users, BookText, PersonStanding, Utensils, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function DictionaryFrPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Dictionnaire</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/fr/dictionary/numbers" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hash className="h-12 w-12" />
                            Nombres
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/colors" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Palette className="h-12 w-12" />
                            Couleurs
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/time" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Clock className="h-12 w-12" />
                            Temps
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/family" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Users className="h-12 w-12" />
                            Famille
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/body-parts" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PersonStanding className="h-12 w-12" />
                            Parties du Corps
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/food" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12" />
                            Nourriture
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/home" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Home className="h-12 w-12" />
                            Logement
                        </Button>
                    </Link>
                    <Link href="/learning/fr/dictionary/work" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Briefcase className="h-12 w-12" />
                            Travail
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
