import type { Language } from '../storage';
import { synonymQuestionsEn } from './synonym-match/synonym-questions-en';
import { synonymQuestionsDe } from './synonym-match/synonym-questions-de';
import { synonymQuestionsFr } from './synonym-match/synonym-questions-fr';
import { synonymQuestionsIt } from './synonym-match/synonym-questions-it';
import { synonymQuestionsEs } from './synonym-match/synonym-questions-es';
import type { SynonymPair } from './synonym-match/synonym-match-data';

export type { SynonymPair };

export const allSynonymQuestions: Record<Language, SynonymPair[]> = {
    en: synonymQuestionsEn,
    de: synonymQuestionsDe,
    fr: synonymQuestionsFr,
    it: synonymQuestionsIt,
    es: synonymQuestionsEs,
};
