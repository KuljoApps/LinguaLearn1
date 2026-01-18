import type { Language } from './storage';
import { bodyPartsDictionary } from './dictionary-body-parts';
import { colorsDictionary } from './dictionary-colors';
import { familyDictionary } from './dictionary-family';
import { foodDictionary } from './dictionary-food';
import { homeDictionary } from './dictionary-home';
import { numbersDictionary } from './dictionary-numbers';
import { timeDictionary } from './dictionary-time';
import { workDictionary } from './dictionary-work';
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
