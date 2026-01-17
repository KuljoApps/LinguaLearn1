"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { Siren } from 'lucide-react';

export default function FrenchEmergencyPhrases() {
    const phraseData = allPhrases.fr['emergency'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/fr/phrases"
            >
                <Siren className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}