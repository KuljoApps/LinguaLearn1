import { BookOpen, Dumbbell, Sparkles, Settings, BarChart, ShieldX, MessageSquareQuote, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const LinguaLearnLogo = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
        {/* Mortarboard */}
        <polygon
            points="256 40 460 120 256 200 52 120"
            fill="#012169"/>

        {/* Mortarboard base */}
        <rect
            x="176"
            y="200"
            width="160"
            height="28"
            rx="6"
            fill="#C8102E"/>

        {/* Tassel */}
        <line
            x1="460"
            y1="120"
            x2="460"
            y2="260"
            stroke="#FFFFFF"
            strokeWidth="8"/>

        <circle
            cx="460"
            cy="270"
            r="10"
            fill="#FFFFFF"/>

        {/* Book: left page */}
        <path
            d="M96 280
               Q176 250 256 280
               V420
               Q176 400 96 420 Z"
            fill="#FFFFFF"
            stroke="#012169"
            strokeWidth="8"/>

        {/* Book: right page */}
        <path
            d="M256 280
               Q336 250 416 280
               V420
               Q336 400 256 420 Z"
            fill="#FFFFFF"
            stroke="#012169"
            strokeWidth="8"/>

        {/* Book spine */}
        <line
            x1="256"
            y1="280"
            x2="256"
            y2="420"
            stroke="#C8102E"
            strokeWidth="6"/>

        {/* Page details */}
        <line x1="140" y1="320" x2="230" y2="330" stroke="#012169" strokeWidth="4"/>
        <line x1="140" y1="350" x2="230" y2="360" stroke="#012169" strokeWidth="4"/>
        <line x1="282" y1="330" x2="372" y2="320" stroke="#012169" strokeWidth="4"/>
        <line x1="282" y1="360" x2="372" y2="350" stroke="#012169" strokeWidth="4"/>
    </svg>
);


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl text-center">
            <CardHeader>
                <div className="flex items-center justify-center gap-4 mb-4">
                    <LinguaLearnLogo width="48" height="48" />
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
