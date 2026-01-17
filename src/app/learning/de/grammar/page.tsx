import {
    ArrowLeft,
    BookText,
    Split,
    HelpCircle,
    Ban,
    Palette,
    Rabbit,
    UserSquare,
    Newspaper
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function GrammarDePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl">
                
                {/* ===== HEADER ===== */}
                <CardHeader className="pb-4">
                    <div className="grid grid-cols-[auto_1fr_auto] items-center">
                        
                        {/* LEWA KOLUMNA – IKONA */}
                        <BookText className="h-8 w-8 justify-self-start" />

                        {/* ŚRODEK – TYTUŁ (ZAWSZE IDEALNIE WYŚRODKOWANY) */}
                        <h1 className="text-3xl font-bold tracking-tight leading-tight text-center px-2">
                            Allgemeine Grammatik
                        </h1>

                        {/* PRAWA KOLUMNA – PLACEHOLDER (TAKA SAMA SZEROKOŚĆ JAK IKONA) */}
                        <div className="h-8 w-8" />
                    </div>
                </CardHeader>

                {/* ===== CONTENT ===== */}
                <CardContent className="flex flex-col space-y-4 p-4">
                    <Link href="/learning/de/grammar/sentence-structure">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Split className="mr-2 h-5 w-5 text-deep-purple" />
                            Satzbau
                        </Button>
                    </Link>

                    <Link href="/learning/de/grammar/questions">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <HelpCircle className="mr-2 h-5 w-5 text-deep-purple" />
                            Fragen
                        </Button>
                    </Link>

                    <Link href="/learning/de/grammar/negations">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Ban className="mr-2 h-5 w-5 text-deep-purple" />
                            Verneinung
                        </Button>
                    </Link>

                    <Link href="/learning/de/grammar/articles">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Newspaper className="mr-2 h-5 w-5 text-deep-purple" />
                            Artikel
                        </Button>
                    </Link>

                    <Link href="/learning/de/grammar/adjectives">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Palette className="mr-2 h-5 w-5 text-deep-purple" />
                            Adjektive
                        </Button>
                    </Link>

                    <Link href="/learning/de/grammar/adverbs">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <Rabbit className="mr-2 h-5 w-5 text-deep-purple" />
                            Adverbien
                        </Button>
                    </Link>

                    <Link href="/learning/de/grammar/pronouns">
                        <Button variant="outline" className="w-full h-12 text-lg border-2 border-primary">
                            <UserSquare className="mr-2 h-5 w-5 text-deep-purple" />
                            Pronomen
                        </Button>
                    </Link>
                </CardContent>

                {/* ===== FOOTER ===== */}
                <CardFooter className="flex justify-center p-4">
                    <Link href="/learning/de">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zurück zum Lernen
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
