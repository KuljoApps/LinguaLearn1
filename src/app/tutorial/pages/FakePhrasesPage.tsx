import { ArrowLeft, Utensils, Plane, ShoppingCart, Train, PartyPopper, Siren, MessageSquareText, Hotel, CloudSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakePhrasesEnPage() {
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
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <Utensils className="h-12 w-12 text-deep-purple" />
                        Restaurant
                    </Button>
                    <div data-tutorial-id="phrases-airport">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                            <Plane className="h-12 w-12 text-deep-purple" />
                            Airport
                        </Button>
                    </div>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <ShoppingCart className="h-12 w-12 text-deep-purple" />
                        Shop
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <Train className="h-12 w-12 text-deep-purple" />
                        Station
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <PartyPopper className="h-12 w-12 text-deep-purple" />
                        Party
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <Siren className="h-12 w-12 text-deep-purple" />
                        Emergency
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <Hotel className="h-12 w-12 text-deep-purple" />
                        Hotel
                    </Button>
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary pointer-events-none">
                        <CloudSun className="h-12 w-12 text-deep-purple" />
                        Weather
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Button variant="outline" className="pointer-events-none">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
