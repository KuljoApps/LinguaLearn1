"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { PartyPopper } from 'lucide-react';

export default function FrenchPartyPhrases() {
    const phraseData = allPhrases.fr['party'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/fr/phrases"
            >
                <PartyPopper className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}