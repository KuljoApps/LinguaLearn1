"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Palette } from 'lucide-react';

export default function EnglishColorsDictionary() {
    const dictionaryData = allDictionaries.en['colors'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/en/dictionary"
            >
                <Palette className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
