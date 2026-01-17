"use client";

import PhrasesPage from '@/components/phrases-page';
import { allPhrases } from '@/lib/phrases';
import { ShoppingCart } from 'lucide-react';

export default function ItalianShopPhrases() {
    const phraseData = allPhrases.it['shop'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <PhrasesPage 
                title={phraseData.title} 
                phrases={phraseData.phrases} 
                backHref="/learning/it/phrases"
            >
                <ShoppingCart className="h-8 w-8" />
            </PhrasesPage>
        </main>
    );
}