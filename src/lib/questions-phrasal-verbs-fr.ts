export interface Question {
  id: number;
  language: 'French';
  word: string;
  options: string[];
  correctAnswer: string;
}

// Note: Phrasal verbs are less common in French. This list contains common verb expressions.
export const questions: Question[] = [
  { id: 1, language: 'French', word: 'en avoir marre', options: ['mieć dość', 'być szczęśliwym', 'kochać kogoś', 'nudzić się'], correctAnswer: 'mieć dość' },
  { id: 2, language: 'French', word: 'jeter un œil', options: ['stracić oko', 'płakać', 'rzucać okiem', 'patrzeć w lustro'], correctAnswer: 'rzucać okiem' },
  { id: 3, language: 'French', word: 'faire la grasse matinée', options: ['wcześnie wstawać', 'jeść śniadanie', 'długo spać', 'pracować rano'], correctAnswer: 'długo spać' },
  { id: 4, language: 'French', word: 'tomber dans les pommes', options: ['jeść jabłka', 'zbierać owoce', 'zakochać się', 'zemdleć'], correctAnswer: 'zemdleć' },
  { id: 5, language: 'French', word: 'donner un coup de main', options: ['podać rękę', 'uderzyć kogoś', 'pomóc komuś', 'odmówić pomocy'], correctAnswer: 'pomóc komuś' },
  { id: 6, language: 'French', word: 'se prendre la tête', options: ['trzymać się za głowę', 'myśleć intensywnie', 'denerwować się', 'być dumnym'], correctAnswer: 'denerwować się' },
  { id: 7, language: 'French', word: 'mettre les pieds dans le plat', options: ['włożyć stopy do naczynia', 'gotować obiad', 'popełnić gafę', 'tańczyć'], correctAnswer: 'popełnić gafę' },
  { id: 8, language: 'French', word: 'coûter les yeux de la tête', options: ['kosztować oczy', 'być tanim', 'być bardzo drogim', 'patrzeć na cenę'], correctAnswer: 'być bardzo drogim' },
  { id: 9, language: 'French', word: 'ne pas être dans son assiette', options: ['nie być na talerzu', 'być głodnym', 'źle się czuć', 'być na diecie'], correctAnswer: 'źle się czuć' },
  { id: 10, language: 'French', word: 'arriver comme un cheveu sur la soupe', options: ['być jak włos w zupie', 'przyjść w samą porę', 'pojawić się nie w porę', 'gotować zupę'], correctAnswer: 'pojawić się nie w porę' },
  { id: 11, language: 'French', word: 'passer l\'éponge', options: ['umyć gąbkę', 'puścić w niepamięć', 'wyczyścić tablicę', 'zmywać naczynia'], correctAnswer: 'puścić w niepamięć' },
  { id: 12, language: 'French', word: 'se mettre en colère', options: ['iść do łóżka', 'uspokoić się', 'zdenerwować się', 'schować się'], correctAnswer: 'zdenerwować się' },
  { id: 13, language: 'French', word: 'faire le pont', options: ['robić most', 'budować most', 'robić długi weekend', 'ćwiczyć gimnastykę'], correctAnswer: 'robić długi weekend' },
  { id: 14, language: 'French', word: 'prendre la mouche', options: ['złapać muchę', 'obrazić się bez powodu', 'polować na owady', 'być szybkim'], correctAnswer: 'obrazić się bez powodu' },
  { id: 15, language: 'French', word: 'faire un tour', options: ['zakręcić się', 'pójść na spacer', 'zrobić wycieczkę', 'odwrócić się'], correctAnswer: 'pójść na spacer' },
  { id: 16, language: 'French', word: 'se rendre compte de', options: ['pójść na spotkanie', 'zdać sobie sprawę z', 'liczyć coś', 'oddać coś'], correctAnswer: 'zdać sobie sprawę z' },
  { id: 17, language: 'French', word: 'avoir lieu', options: ['mieć miejsce', 'odbywać się', 'być gdzieś', 'posiadać przestrzeń'], correctAnswer: 'odbywać się' },
  { id: 18, language: 'French', word: 'tenir le coup', options: ['trzymać uderzenie', 'poddawać się', 'wytrzymywać', 'uderzyć kogoś'], correctAnswer: 'wytrzymywać' },
  { id: 19, language: 'French', word: 'se passer de', options: ['przejść obok', 'wydarzyć się', 'obywać się bez', 'potrzebować czegoś'], correctAnswer: 'obywać się bez' },
  { id: 20, language: 'French', word: 'mettre au courant', options: ['podłączyć do prądu', 'poinformować kogoś', 'oświetlić coś', 'wysuszyć coś'], correctAnswer: 'poinformować kogoś' },
  { id: 21, language: 'French', word: 'en vouloir à quelqu\'un', options: ['chcieć czegoś od kogoś', 'kochać kogoś', 'mieć do kogoś żal', 'podziwiać kogoś'], correctAnswer: 'mieć do kogoś żal' },
  { id: 22, language: 'French', word: 's\'en ficher', options: ['naprawiać coś', 'mieć to gdzieś', 'interesować się czymś', 'być ostrożnym'], correctAnswer: 'mieć to gdzieś' },
  { id: 23, language: 'French', word: 'faire attention', options: ['robić przedstawienie', 'zwracać uwagę', 'uważać', 'być nieostrożnym'], correctAnswer: 'uważać' },
  { id: 24, language: 'French', word: 'laisser tomber', options: ['upuścić coś', 'dać sobie spokój', 'podnieść coś', 'kontynuować'], correctAnswer: 'dać sobie spokój' },
  { id: 25, language: 'French', word: 'faire semblant', options: ['wyglądać podobnie', 'udawać', 'być szczerym', 'mówić prawdę'], correctAnswer: 'udawać' },
  { id: 26, language: 'French', word: 'se tromper', options: ['oszukiwać', 'mylić się', 'mieć rację', 'kłamać'], correctAnswer: 'mylić się' },
  { id: 27, language: 'French', word: 'y arriver', options: ['przybyć tam', 'osiągnąć cel / dać radę', 'opuścić miejsce', 'zgubić się'], correctAnswer: 'osiągnąć cel / dać radę' },
  { id: 28, language: 'French', word: 's\'occuper de', options: ['być zajętym', 'zajmować się czymś', 'ignorować coś', 'przeszkadzać'], correctAnswer: 'zajmować się czymś' },
  { id: 29, language: 'French', word: 'faire la tête', options: ['robić głowę', 'myśleć', 'denerwować się', 'durdzić się / stroić fochy'], correctAnswer: 'durdzić się / stroić fochy' },
  { id: 30, language: 'French', word: 'passer un savon à quelqu\'un', options: ['podać komuś mydło', 'zrobić komuś awanturę', 'umyć kogoś', 'pochwalić kogoś'], correctAnswer: 'zrobić komuś awanturę' },
];
