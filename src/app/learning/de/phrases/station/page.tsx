"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { Train } from 'lucide-react';

export default function GermanStationPhrases() {
    const phraseData = allPhrases.de['station'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/de/phrases"
            >
                <Train className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}