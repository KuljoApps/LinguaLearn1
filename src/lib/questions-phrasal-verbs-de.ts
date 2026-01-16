
export interface Question {
  id: number;
  language: 'German';
  word: string;
  options: string[];
  correctAnswer: string;
}

// German separable verbs (trennbare Verben)
export const questions: Question[] = [
  { id: 1, language: 'German', word: 'aufstehen', options: ['wstawać', 'siadać', 'leżeć', 'zasypiać'], correctAnswer: 'wstawać' },
  { id: 2, language: 'German', word: 'anrufen', options: ['pisać', 'dzwonić', 'spotykać', 'słuchać'], correctAnswer: 'dzwonić' },
  { id: 3, language: 'German', word: 'einkaufen', options: ['sprzedawać', 'gotować', 'robić zakupy', 'pracować'], correctAnswer: 'robić zakupy' },
  { id: 4, language: 'German', word: 'fernsehen', options: ['czytać', 'oglądać telewizję', 'słuchać radia', 'grać w gry'], correctAnswer: 'oglądać telewizję' },
  { id: 5, language: 'German', word: 'mitkommen', options: ['iść samemu', 'iść z kimś', 'wracać', 'zostawać'], correctAnswer: 'iść z kimś' },
  { id: 6, language: 'German', word: 'zumachen', options: ['otwierać', 'zamykać', 'pchać', 'ciągnąć'], correctAnswer: 'zamykać' },
  { id: 7, language: 'German', word: 'aufmachen', options: ['zamykać', 'otwierać', 'naprawiać', 'niszczyć'], correctAnswer: 'otwierać' },
  { id: 8, language: 'German', word: 'vorbereiten', options: ['kończyć', 'zaczynać', 'przygotowywać', 'odpoczywać'], correctAnswer: 'przygotowywać' },
  { id: 9, language: 'German', word: 'abholen', options: ['wysyłać', 'odbierać', 'przynosić', 'zostawiać'], correctAnswer: 'odbierać' },
  { id: 10, language: 'German', word: 'zurückgeben', options: ['brać', 'dawać', 'zwracać', 'pożyczać'], correctAnswer: 'zwracać' },
  { id: 11, language: 'German', word: 'aussehen', options: ['patrzeć do środka', 'wyglądać', 'widzieć', 'przymierzać'], correctAnswer: 'wyglądać' },
  { id: 12, language: 'German', word: 'einladen', options: ['wychodzić', 'zapraszać', 'odmawiać', 'odwiedzać'], correctAnswer: 'zapraszać' },
  { id: 13, language: 'German', word: 'teilnehmen', options: ['obserwować', 'brać udział', 'rezygnować', 'organizować'], correctAnswer: 'brać udział' },
  { id: 14, language: 'German', word: 'herstellen', options: ['niszczyć', 'importować', 'produkować', 'sprzedawać'], correctAnswer: 'produkować' },
  { id: 15, language: 'German', word: 'stattfinden', options: ['anulować', 'przekładać', 'odbywać się', 'kończyć'], correctAnswer: 'odbywać się' },
  { id: 16, language: 'German', word: 'vorschlagen', options: ['odrzucać', 'zgadzać się', 'proponować', 'dyskutować'], correctAnswer: 'proponować' },
  { id: 17, language: 'German', word: 'weggehen', options: ['przychodzić', 'zostawać', 'odchodzić', 'wracać'], correctAnswer: 'odchodzić' },
  { id: 18, language: 'German', word: 'zuhören', options: ['mówić', 'przerywać', 'słuchać uważnie', 'ignorować'], correctAnswer: 'słuchać uważnie' },
  { id: 19, language: 'German', word: 'mitbringen', options: ['zostawiać', 'przynosić ze sobą', 'wysyłać', 'otrzymywać'], correctAnswer: 'przynosić ze sobą' },
  { id: 20, language: 'German', word: 'anfangen', options: ['kończyć', 'przerywać', 'zaczynać', 'kontynuować'], correctAnswer: 'zaczynać' },
  { id: 21, language: 'German', word: 'aufhören', options: ['zaczynać', 'kontynuować', 'przestawać', 'próbować'], correctAnswer: 'przestawać' },
  { id: 22, language: 'German', word: 'umziehen', options: ['zostawać', 'przeprowadzać się', 'podróżować', 'odwiedzać'], correctAnswer: 'przeprowadzać się' },
  { id: 23, language: 'German', word: 'ankommen', options: ['wyjeżdżać', 'przybywać', 'spóźniać się', 'czekać'], correctAnswer: 'przybywać' },
  { id: 24, language: 'German', word: 'abfahren', options: ['przyjeżdżać', 'odjeżdżać', 'zostawać', 'czekać'], correctAnswer: 'odjeżdżać' },
  { id: 25, language: 'German', word: 'ausschlafen', options: ['wcześnie wstawać', 'zasypiać', 'wyspać się', 'drzemać'], correctAnswer: 'wyspać się' },
  { id: 26, language: 'German', word: 'wegwerfen', options: ['zbierać', 'znajdować', 'wyrzucać', 'przechowywać'], correctAnswer: 'wyrzucać' },
  { id: 27, language: 'German', word: 'vorlesen', options: ['pisać', 'czytać na głos', 'słuchać', 'uczyć się na pamięć'], correctAnswer: 'czytać na głos' },
  { id: 28, language: 'German', word: 'mitmachen', options: ['obserwować', 'przyłączać się', 'rezygnować', 'krytykować'], correctAnswer: 'przyłączać się' },
  { id: 29, language: 'German', word: 'nachdenken', options: ['zapominać', 'działać impulsywnie', 'rozmyślać', 'ignorować'], correctAnswer: 'rozmyślać' },
  { id: 30, language: 'German', word: 'reinkommen', options: ['wychodzić', 'wchodzić do środka', 'stać na zewnątrz', 'pukać'], correctAnswer: 'wchodzić do środka' },
];
