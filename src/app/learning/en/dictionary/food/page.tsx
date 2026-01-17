"use client";

import DictionaryPage from '@/components/dictionary-page';
import { allDictionaries } from '@/lib/dictionary';
import { Utensils } from 'lucide-react';

export default function EnglishFoodDictionary() {
    const dictionaryData = allDictionaries.en['food'];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <DictionaryPage 
                title={dictionaryData.title} 
                words={dictionaryData.words} 
                backHref="/learning/en/dictionary"
            >
                <Utensils className="h-8 w-8" />
            </DictionaryPage>
        </main>
    );
}
