// --- Dictionary Types ---
export interface DictionaryWord {
  word: string;
  translation: string;
  colorCode?: string;
  numeric?: string;
  isHeader?: boolean;
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
