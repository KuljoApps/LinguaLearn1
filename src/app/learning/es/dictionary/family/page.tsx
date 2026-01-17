"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Users } from 'lucide-react';

export default function SpanishFamilyDictionary() {
    const dictionaryData = allDictionaries.es['family'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/es/dictionary"
            >
                <Users className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
