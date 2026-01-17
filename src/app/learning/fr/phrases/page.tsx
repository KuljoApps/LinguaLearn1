import { ArrowLeft, Utensils, Plane, ShoppingCart, Train, PartyPopper, Siren, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function PhrasesFrPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <MessageSquareText className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Expressions & Phrases</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-6">
                    <Link href="/learning/fr/phrases/restaurant" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12" />
                            Restaurant
                        </Button>
                    </Link>
                    <Link href="/learning/fr/phrases/airport" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Plane className="h-12 w-12" />
                            Aéroport
                        </Button>
                    </Link>
                    <Link href="/learning/fr/phrases/shop" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <ShoppingCart className="h-12 w-12" />
                            Magasin
                        </Button>
                    </Link>
                    <Link href="/learning/fr/phrases/station" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Train className="h-12 w-12" />
                            Gare
                        </Button>
                    </Link>
                    <Link href="/learning/fr/phrases/party" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PartyPopper className="h-12 w-12" />
                            Fête
                        </Button>
                    </Link>
                    <Link href="/learning/fr/phrases/emergency" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Siren className="h-12 w-12" />
                            Urgence
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
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
