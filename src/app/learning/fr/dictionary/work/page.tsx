"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Briefcase } from 'lucide-react';

export default function FrenchWorkDictionary() {
    const dictionaryData = allDictionaries.fr['work'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/fr/dictionary"
            >
                <Briefcase className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
