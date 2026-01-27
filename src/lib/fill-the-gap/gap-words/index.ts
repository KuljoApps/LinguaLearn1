import type { Language } from '@/lib/storage';
import { gapWordsQuestionsEn } from './questions-en';
import { gapWordsQuestionsDe } from './questions-de';
import { gapWordsQuestionsFr } from './questions-fr';
import { gapWordsQuestionsEs } from './questions-es';
import { gapWordsQuestionsIt } from './questions-it';

export interface GapWordQuestion {
  wordWithGap: string;
  missingLetters: string;
  fullWord: string;
  hint: string;
}

export const allGapWordQuestions: Record<Language, GapWordQuestion[]> = {
  en: gapWordsQuestionsEn,
  de: gapWordsQuestionsDe,
  fr: gapWordsQuestionsFr,
  es: gapWordsQuestionsEs,
  it: gapWordsQuestionsIt,
};
