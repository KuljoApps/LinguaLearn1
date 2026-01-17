"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { Utensils } from 'lucide-react';

export default function EnglishRestaurantPhrases() {
    const phraseData = allPhrases.en['restaurant'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/en/phrases"
            >
                <Utensils className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}