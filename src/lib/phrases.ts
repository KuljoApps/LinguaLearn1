
import type { Language } from './storage';
import { airportPhrases } from './phrases/phrases-airport';
import { emergencyPhrases } from './phrases/phrases-emergency';
import { hotelPhrases } from './phrases/phrases-hotel';
import { partyPhrases } from './phrases/phrases-party';
import { restaurantPhrases } from './phrases/phrases-restaurant';
import { shopPhrases } from './phrases/phrases-shop';
import { stationPhrases } from './phrases/phrases-station';
import { weatherPhrases } from './phrases/phrases-weather';
import { tongueTwistersContent } from './tongue-twisters';

export interface Phrase {
  phrase: string;
  translation: string;
}

export interface PhraseCategory {
  [category: string]: {
    title: string;
    phrases: Phrase[];
  };
}

export interface PhrasesContent {
  [lang: string]: PhraseCategory;
}

const languages: Language[] = ['en', 'de', 'es', 'fr', 'it'];
export const allPhrases: PhrasesContent = {};

languages.forEach(lang => {
  allPhrases[lang] = {
    ...(airportPhrases[lang] || {}),
    ...(emergencyPhrases[lang] || {}),
    ...(hotelPhrases[lang] || {}),
    ...(partyPhrases[lang] || {}),
    ...(restaurantPhrases[lang] || {}),
    ...(shopPhrases[lang] || {}),
    ...(stationPhrases[lang] || {}),
    ...(weatherPhrases[lang] || {}),
    ...(tongueTwistersContent[lang] || {}),
  };
});
