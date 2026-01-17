"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Users } from 'lucide-react';

export default function FrenchFamilyDictionary() {
    const dictionaryData = allDictionaries.fr['family'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/fr/dictionary"
            >
                <Users className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
