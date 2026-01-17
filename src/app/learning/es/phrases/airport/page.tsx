"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { Plane } from 'lucide-react';

export default function SpanishAirportPhrases() {
    const phraseData = allPhrases.es['airport'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/es/phrases"
            >
                <Plane className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}