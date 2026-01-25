import type { Language } from './storage';
import { bodyPartsDictionary } from './dictionary/dictionary-body-parts';
import { colorsDictionary } from './dictionary/dictionary-colors';
import { familyDictionary } from './dictionary/dictionary-family';
import { foodDictionary } from './dictionary/dictionary-food';
import { homeDictionary } from './dictionary/dictionary-home';
import { numbersDictionary } from './dictionary/dictionary-numbers';
import { timeDictionary } from './dictionary/dictionary-time';
import { workDictionary } from './dictionary/dictionary-work';
import type { DictionaryContent, DictionaryWord } from './types';

export type { DictionaryWord };

const languages: Language[] = ['en', 'de', 'es', 'fr', 'it'];
export const allDictionaries: DictionaryContent = {};

languages.forEach(lang => {
  allDictionaries[lang] = {
    ...(bodyPartsDictionary[lang] || {}),
    ...(colorsDictionary[lang] || {}),
    ...(familyDictionary[lang] || {}),
    ...(foodDictionary[lang] || {}),
    ...(homeDictionary[lang] || {}),
    ...(numbersDictionary[lang] || {}),
    ...(timeDictionary[lang] || {}),
    ...(workDictionary[lang] || {}),
  };
});
