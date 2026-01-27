import type { Language } from '../storage';
import type { HangmanQuestion } from './hangman/hangman-data';
import { hangmanQuestionsEn } from './hangman/hangman-questions-en';
import { hangmanQuestionsDe } from './hangman/hangman-questions-de';
import { hangmanQuestionsFr } from './hangman/hangman-questions-fr';
import { hangmanQuestionsIt } from './hangman/hangman-questions-it';
import { hangmanQuestionsEs } from './hangman/hangman-questions-es';

export type { HangmanQuestion };

export const allHangmanQuestions: Record<Language, HangmanQuestion[]> = {
    en: hangmanQuestionsEn,
    de: hangmanQuestionsDe,
    fr: hangmanQuestionsFr,
    it: hangmanQuestionsIt,
    es: hangmanQuestionsEs,
};
