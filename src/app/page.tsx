import { BookOpen, Dumbbell, Sparkles, Settings, BarChart, ShieldX, MessageSquareQuote, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const LinguaLearnLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'hsl(var(--chart-2))', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: 'hsl(var(--chart-4))', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M22 22H2" stroke="url(#grad1)" />
        <path d="M19 22V9.33a2 2 0 0 0-.64-1.42l-5-5.01a2 2 0 0 0-2.72 0l-5 5.01A2 2 0 0 0 5 9.33V22" stroke="url(#grad1)" />
        <path d="M9 13h6" stroke="url(#grad1)" />
        <path d="M9 17h6" stroke="url(#grad1)" />
        <path d="M15 22v-5a3 3 0 0 0-6 0v5" stroke="url(#grad1)" />
    </svg>
);


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl text-center">
            <CardHeader>
                <div className="flex items-center justify-center gap-4 mb-4">
                    <LinguaLearnLogo />
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
                <Link href="/quiz/phrasal-verbs" passHref>
                    <Button className="w-full h-12 text-lg" size="lg">
                        <Layers className="mr-2 h-5 w-5" />
                        Phrasal Verbs
                    </Button>
                </Link>
                <Link href="/quiz/idioms" passHref>
                    <Button className="w-full h-12 text-lg" size="lg">
                        <MessageSquareQuote className="mr-2 h-5 w-5" />
                        Idioms
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
