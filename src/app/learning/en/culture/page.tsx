
import { ArrowLeft, Landmark, Building2, Handshake, ScrollText, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';

export default function CultureEnPage() {
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
                    <Link href="/learning/en/culture/about" passHref>
                        <Button className="w-full h-12 text-lg">
                            <Globe className="mr-2 h-5 w-5" />
                            About England
                        </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                         <Link href="/learning/en/culture/cities" passHref>
                            <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                                <Building2 className="h-12 w-12 text-deep-purple" />
                                Most Important Cities
                            </Button>
                        </Link>
                        <Link href="/learning/en/culture/monuments" passHref>
                            <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                                <Landmark className="h-12 w-12 text-deep-purple" />
                                Most Important Monuments
                            </Button>
                        </Link>
                        <Link href="/learning/en/culture/traditions" passHref>
                            <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                                <Handshake className="h-12 w-12 text-deep-purple" />
                                Traditions & Customs
                            </Button>
                        </Link>
                        <Link href="/learning/en/culture/history" passHref>
                            <Button variant="outline" className="w-full h-24 flex-col gap-2 text-lg border-2 border-primary">
                                <ScrollText className="h-12 w-12 text-deep-purple" />
                                History in Brief
                            </Button>
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center p-6 pt-2">
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
