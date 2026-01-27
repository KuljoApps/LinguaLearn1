import type { Language } from '../storage';
import type { OddOneOutSet } from './odd-one-out/odd-one-out-data';
import { oddOneOutQuestionsEn } from './odd-one-out/odd-one-out-questions-en';
import { oddOneOutQuestionsDe } from './odd-one-out/odd-one-out-questions-de';
import { oddOneOutQuestionsFr } from './odd-one-out/odd-one-out-questions-fr';
import { oddOneOutQuestionsIt } from './odd-one-out/odd-one-out-questions-it';
import { oddOneOutQuestionsEs } from './odd-one-out/odd-one-out-questions-es';

export type { OddOneOutSet };

export const allOddOneOutQuestions: Record<Language, OddOneOutSet[]> = {
    en: oddOneOutQuestionsEn,
    de: oddOneOutQuestionsDe,
    fr: oddOneOutQuestionsFr,
    it: oddOneOutQuestionsIt,
    es: oddOneOutQuestionsEs,
};
