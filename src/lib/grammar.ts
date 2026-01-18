import type { Language } from './storage';
import { sentenceStructureContent } from './grammar-sentence-structure';
import { questionsContent } from './grammar-questions';
import { negationsContent } from './grammar-negations';
import { articlesContent } from './grammar-articles';
import { adjectivesContent } from './grammar-adjectives';
import { adverbsContent } from './grammar-adverbs';
import { pronounsContent } from './grammar-pronouns';

export interface GrammarRule {
  heading: string;
  text: string;
  examples?: {
    original: string;
    translation: string;
  }[];
}

export interface GrammarContent {
  [lang: string]: {
    [topic: string]: {
      title: string;
      content: GrammarRule[];
    };
  };
}

const languages: Language[] = ['en', 'de', 'es', 'fr', 'it'];
export const allGrammar: GrammarContent = {};

languages.forEach(lang => {
  allGrammar[lang] = {
    ...sentenceStructureContent[lang],
    ...questionsContent[lang],
    ...negationsContent[lang],
    ...articlesContent[lang],
    ...adjectivesContent[lang],
    ...adverbsContent[lang],
    ...pronounsContent[lang],
  };
});
