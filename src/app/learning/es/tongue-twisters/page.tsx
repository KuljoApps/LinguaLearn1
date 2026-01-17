
"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { Languages } from 'lucide-react';

export default function SpanishTongueTwisters() {
    const phraseData = allPhrases.es['tongue-twisters'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/es"
            >
                <Languages className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}
