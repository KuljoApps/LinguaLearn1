"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Briefcase } from 'lucide-react';

export default function ItalianWorkDictionary() {
    const dictionaryData = allDictionaries.it['work'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/it/dictionary"
            >
                <Briefcase className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
