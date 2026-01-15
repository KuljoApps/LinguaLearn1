import { BrainCircuit, BookOpen, Dumbbell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl text-center">
            <CardHeader>
                <div className="flex items-center justify-center gap-4 mb-4">
                    <BrainCircuit className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-bold tracking-tight">LinguaLearn</h1>
                </div>
                <p className="text-muted-foreground">
                    Ready to question your life choices in another language? Let's go!
                </p>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 p-6">
                <Link href="/quiz" passHref>
                    <Button className="w-full h-12 text-lg" size="lg">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Polish - English Quiz
                    </Button>
                </Link>
                <Button className="w-full h-12 text-lg" size="lg" disabled>
                    <Dumbbell className="mr-2 h-5 w-5" />
                    Coming Soon...
                </Button>
                <Button className="w-full h-12 text-lg" size="lg" disabled>
                    <Star className="mr-2 h-5 w-5" />
                    Coming Soon...
                </Button>
            </CardContent>
        </Card>
    </main>
  );
}