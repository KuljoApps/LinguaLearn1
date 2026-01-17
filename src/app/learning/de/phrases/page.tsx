import { ArrowLeft, Utensils, Plane, ShoppingCart, Train, PartyPopper, Siren, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function PhrasesDePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <MessageSquareText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Ausdrücke & Sätze</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-6">
                    <Link href="/learning/de/phrases/restaurant" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12" />
                            Im Restaurant
                        </Button>
                    </Link>
                    <Link href="/learning/de/phrases/airport" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Plane className="h-12 w-12" />
                            Am Flughafen
                        </Button>
                    </Link>
                    <Link href="/learning/de/phrases/shop" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <ShoppingCart className="h-12 w-12" />
                            Im Geschäft
                        </Button>
                    </Link>
                    <Link href="/learning/de/phrases/station" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Train className="h-12 w-12" />
                            Am Bahnhof
                        </Button>
                    </Link>
                    <Link href="/learning/de/phrases/party" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PartyPopper className="h-12 w-12" />
                            Auf einer Party
                        </Button>
                    </Link>
                    <Link href="/learning/de/phrases/emergency" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Siren className="h-12 w-12" />
                            Notfall
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
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
