"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Hash } from 'lucide-react';

export default function ItalianNumbersDictionary() {
    const dictionaryData = allDictionaries.it['numbers'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/it/dictionary"
            >
                <Hash className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
