import type { Language } from '@/lib/storage';
import { gapWordsQuestionsEn } from './gap-words-questions-en';
import { gapWordsQuestionsDe } from './gap-words-questions-de';
import { gapWordsQuestionsFr } from './gap-words-questions-fr';
import { gapWordsQuestionsEs } from './gap-words-questions-es';
import { gapWordsQuestionsIt } from './gap-words-questions-it';

export interface GapWordQuestion {
  wordWithGap: string;
  missingLetters: string;
  fullWord: string;
  hint: string;
}

export interface GapWordCategory {
  title: string;
  words: GapWordQuestion[];
}

export const allGapWordQuestions: Record<Language, GapWordCategory[]> = {
  en: gapWordsQuestionsEn,
  de: gapWordsQuestionsDe,
  fr: gapWordsQuestionsFr,
  es: gapWordsQuestionsEs,
  it: gapWordsQuestionsIt,
};
