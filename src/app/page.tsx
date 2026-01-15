import { BookOpen, Dumbbell, Sparkles, Settings, BarChart, ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const BrainCircuit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: 'hsl(var(--chart-1))', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'hsl(var(--chart-3))', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M12 5a3 3 0 1 0-5.997.125" stroke="url(#grad1)"/>
        <path d="M12 5a3 3 0 1 1 5.997.125" stroke="url(#grad1)"/>
        <path d="M15 5a3 3 0 0 0-3-3" />
        <path d="M9 5a3 3 0 0 1 3-3" />
        <path d="M12 12a3 3 0 1 0-5.997.125" />
        <path d="M12 12a3 3 0 1 1 5.997.125" />
        <path d="M15 12a3 3 0 0 0-3-3" />
        <path d="M9 12a3 3 0 0 1 3-3" />
        <path d="M12 19a3 3 0 1 0-5.997.125" />
        <path d="M12 19a3 3 0 1 1 5.997.125" />
        <path d="M15 19a3 3 0 0 0-3-3" />
        <path d="M9 19a3 3 0 0 1 3-3" />
        <path d="M6 7.65V10.35" />
        <path d="M18 7.65V10.35" />
        <path d="M6 14.65V17.35" />
        <path d="M18 14.65V17.35" />
    </svg>
);


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl text-center">
            <CardHeader>
                <div className="flex items-center justify-center gap-4 mb-4">
                    <BrainCircuit />
                    <h1 className="text-4xl font-bold tracking-tight">LinguaLearn</h1>
                </div>
                <p className="text-muted-foreground">
                    Ready to question your life choices in another language? Let's go!
                </p>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 p-6 pt-0">
                <Link href="/quiz/en-pl" passHref>
                    <Button className="w-full h-12 text-lg" size="lg">
                        <BookOpen className="mr-2 h-5 w-5" />
                        English - Polish Quiz
                    </Button>
                </Link>
                <Link href="/quiz/pl-en" passHref>
                    <Button className="w-full h-12 text-lg" size="lg">
                        <Dumbbell className="mr-2 h-5 w-5" />
                        Polish - English Quiz
                    </Button>
                </Link>
                <Link href="/quiz/irregular-verbs" passHref>
                    <Button className="w-full h-12 text-lg" size="lg">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Irregular Verbs
                    </Button>
                </Link>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 p-6 pt-0">
                <Link href="/settings" passHref>
                    <Button variant="outline" size="icon">
                        <Settings />
                    </Button>
                </Link>
                <Link href="/stats" passHref>
                    <Button variant="outline" size="icon">
                        <BarChart />
                    </Button>
                </Link>
                <Link href="/errors" passHref>
                    <Button variant="outline" size="icon">
                        <ShieldX />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </main>
  );
}
