import { ArrowLeft, Utensils, Plane, ShoppingCart, Train, PartyPopper, Siren, MessageSquareText, Hotel, CloudSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function PhrasesEnPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <MessageSquareText className="h-8 w-8 flex-shrink-0" />
                        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left break-words">Expressions & Phrases</h1>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <Link href="/learning/en/phrases/restaurant" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Utensils className="h-12 w-12 text-deep-purple" />
                            Restaurant
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/airport" passHref data-tutorial-id="phrases-airport">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Plane className="h-12 w-12 text-deep-purple" />
                            Airport
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/shop" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <ShoppingCart className="h-12 w-12 text-deep-purple" />
                            Shop
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/station" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Train className="h-12 w-12 text-deep-purple" />
                            Station
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/party" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <PartyPopper className="h-12 w-12 text-deep-purple" />
                            Party
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/emergency" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Siren className="h-12 w-12 text-deep-purple" />
                            Emergency
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/hotel" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <Hotel className="h-12 w-12 text-deep-purple" />
                            Hotel
                        </Button>
                    </Link>
                    <Link href="/learning/en/phrases/weather" passHref>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                            <CloudSun className="h-12 w-12 text-deep-purple" />
                            Weather
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/en" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
