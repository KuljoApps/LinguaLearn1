import type { Language } from '../storage';
import { memoryQuestionsEn } from './memory/memory-questions-en';
import { memoryQuestionsDe } from './memory/memory-questions-de';
import { memoryQuestionsFr } from './memory/memory-questions-fr';
import { memoryQuestionsIt } from './memory/memory-questions-it';
import { memoryQuestionsEs } from './memory/memory-questions-es';
import type { MemoryPair } from './memory/memory-data';

export type { MemoryPair };

export const allMemoryQuestions: Record<Language, MemoryPair[]> = {
    en: memoryQuestionsEn,
    de: memoryQuestionsDe,
    fr: memoryQuestionsFr,
    it: memoryQuestionsIt,
    es: memoryQuestionsEs,
};
