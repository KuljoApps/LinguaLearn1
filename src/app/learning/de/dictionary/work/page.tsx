"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Briefcase } from 'lucide-react';

export default function GermanWorkDictionary() {
    const dictionaryData = allDictionaries.de['work'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/de/dictionary"
            >
                <Briefcase className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
