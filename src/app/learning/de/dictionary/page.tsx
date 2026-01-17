import { ArrowLeft, Hash, Palette, Clock, Users, BookText, PersonStanding, Utensils, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function DictionaryDePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <BookText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Wörterbuch</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/de/dictionary/numbers" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hash className="h-12 w-12" />
                            Zahlen
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary/colors" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Palette className="h-12 w-12" />
                            Farben
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary/time" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Clock className="h-12 w-12" />
                            Zeit
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary/family" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Users className="h-12 w-12" />
                            Familie
                        </Button>
                    </Link>
                     <Link href="/learning/de/dictionary/body-parts" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PersonStanding className="h-12 w-12" />
                            Körperteile
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary/food" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12" />
                            Essen
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary/home" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Home className="h-12 w-12" />
                            Wohnung
                        </Button>
                    </Link>
                    <Link href="/learning/de/dictionary/work" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Briefcase className="h-12 w-12" />
                            Arbeit
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/de" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Lernen
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
