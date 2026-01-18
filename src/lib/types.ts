import type { LucideIcon } from 'lucide-react';

// --- Shared Types ---
export type Language = 'en' | 'fr' | 'de' | 'it' | 'es';

// --- Achievement Types ---
export interface Achievement {
  id: string;
  name: string;
  description: string;
  name_fr?: string;
  description_fr?: string;
  name_de?: string;
  description_de?: string;
  name_it?: string;
  description_it?: string;
  name_es?: string;
  description_es?: string;
  icon: LucideIcon;
  goal: number;
}

// --- Dictionary Types ---
export interface DictionaryWord {
  word: string;
  translation: string;
  colorCode?: string;
  numeric?: string;
  isHeader?: boolean;
  special?: string;
}

export interface DictionaryCategory {
  [category: string]: {
    title: string;
    words: DictionaryWord[];
  };
}

export interface DictionaryContent {
  [lang: string]: DictionaryCategory;
}

// --- Grammar Types ---
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

// --- Phrases Types ---
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
