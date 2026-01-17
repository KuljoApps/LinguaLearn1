
import { ArrowLeft, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function MonumentsEsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Landmark className="h-8 w-8" />
                        <CardTitle className="text-3xl">Monumentos más importantes</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Contenido próximamente...</p>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/es/culture" passHref>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Cultura
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
