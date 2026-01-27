import type { Language } from "@/lib/storage";

export interface OddOneOutSet {
  words: string[];
  correct: string;
  category: Record<Language, string>;
}
