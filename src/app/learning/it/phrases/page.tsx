import { ArrowLeft, Utensils, Plane, ShoppingCart, Train, PartyPopper, Siren, MessageSquareText, Hotel, CloudSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function PhrasesItPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <MessageSquareText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Espressioni e Frasi</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/it/phrases/restaurant" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12 text-deep-purple" />
                            Ristorante
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/airport" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Plane className="h-12 w-12 text-deep-purple" />
                            Aeroporto
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/shop" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <ShoppingCart className="h-12 w-12 text-deep-purple" />
                            Negozio
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/station" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Train className="h-12 w-12 text-deep-purple" />
                            Stazione
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/party" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PartyPopper className="h-12 w-12 text-deep-purple" />
                            Festa
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/emergency" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Siren className="h-12 w-12 text-deep-purple" />
                            Emergenza
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/hotel" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hotel className="h-12 w-12 text-deep-purple" />
                            Hotel
                        </Button>
                    </Link>
                    <Link href="/learning/it/phrases/weather" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <CloudSun className="h-12 w-12 text-deep-purple" />
                            Meteo
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
