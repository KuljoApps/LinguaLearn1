import { ArrowLeft, Landmark, Building2, Handshake, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

// This is a static, non-interactive "fake" page for the tutorial.

export default function FakeCultureEnPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center p-6">
                    <div className="flex items-center justify-center gap-4">
                        <Landmark className="h-8 w-8" />
                        <h1 className="text-3xl font-bold tracking-tight">Culture</h1>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 px-6 pt-0 pb-4">
                    <div data-tutorial-id="culture-about">
                         <Button className="w-full h-16 text-lg flex items-center justify-center" disabled>
                            <span className="text-4xl mr-4">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                            About England
                        </Button>
                    </div>
                    <div data-tutorial-id="culture-places" className="grid grid-cols-2 gap-4 pt-2">
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary whitespace-normal text-center" disabled>
                            <Building2 className="h-12 w-12 text-deep-purple" />
                            Important Cities
                        </Button>
                        <Button variant="outline" className="w-full h-28 flex-col gap-2 text-lg border-2 border-primary whitespace-normal text-center" disabled>
                            <Landmark className="h-12 w-12 text-deep-purple" />
                            Important Monuments
                        </Button>
                    </div>
                    <div data-tutorial-id="culture-history" className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary whitespace-normal text-center" disabled>
                            <Handshake className="h-12 w-12 text-deep-purple" />
                            Traditions
                        </Button>
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary whitespace-normal text-center" disabled>
                            <ScrollText className="h-12 w-12 text-deep-purple" />
                            History
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-2">
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
