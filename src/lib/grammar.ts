import type { Language } from './storage';
import { sentenceStructureContent } from './grammar/grammar-sentence-structure';
import { questionsContent } from './grammar/grammar-questions';
import { negationsContent } from './grammar/grammar-negations';
import { articlesContent } from './grammar/grammar-articles';
import { adjectivesContent } from './grammar/grammar-adjectives';
import { adverbsContent } from './grammar/grammar-adverbs';
import { pronounsContent } from './grammar/grammar-pronouns';
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
