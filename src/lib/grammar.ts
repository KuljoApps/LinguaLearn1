import type { Language } from './storage';
import { sentenceStructureContent } from './grammar-sentence-structure';
import { questionsContent } from './grammar-questions';
import { negationsContent } from './grammar-negations';
import { articlesContent } from './grammar-articles';
import { adjectivesContent } from './grammar-adjectives';
import { adverbsContent } from './grammar-adverbs';
import { pronounsContent } from './grammar-pronouns';
import type { GrammarContent, GrammarRule } from './types';

export type { GrammarRule };

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
