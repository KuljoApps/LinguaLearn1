import type { Language } from './storage';

export interface Tense {
  language: Language;
  name: string;
  usage: string;
  example: string;
  example_pl: string;
}

export const allTenses: Tense[] = [
  // English
  { language: 'en', name: 'Present Simple', usage: 'Używany do opisywania nawyków, faktów i regularnych czynności.', example: 'She works in a hospital.', example_pl: 'Ona pracuje w szpitalu.' },
  { language: 'en', name: 'Present Continuous', usage: 'Używany do czynności dziejących się w momencie mówienia lub tymczasowych sytuacji.', example: 'I am reading a book right now.', example_pl: 'Czytam teraz książkę.' },
  { language: 'en', name: 'Past Simple', usage: 'Używany do opisywania zakończonych czynności w przeszłości.', example: 'They visited Paris last year.', example_pl: 'Oni odwiedzili Paryż w zeszłym roku.' },
  { language: 'en', name: 'Present Perfect', usage: 'Używany do czynności, które miały miejsce w nieokreślonej przeszłości lub mają związek z teraźniejszością.', example: 'He has lost his keys.', example_pl: 'On zgubił klucze.' },
  { language: 'en', name: 'Future Simple (will)', usage: 'Używany do spontanicznych decyzji, obietnic i przewidywań.', example: 'I will help you with your homework.', example_pl: 'Pomogę ci z zadaniem domowym.' },

  // French
  { language: 'fr', name: 'Présent de l\'indicatif', usage: 'Opisuje czynności teraźniejsze, nawyki i ogólne prawdy.', example: 'Il parle français.', example_pl: 'On mówi po francusku.' },
  { language: 'fr', name: 'Passé Composé', usage: 'Główny czas przeszły dokonany, używany do opisywania jednorazowych, zakończonych czynności w przeszłości.', example: 'J\'ai mangé une pomme.', example_pl: 'Zjadłem/am jabłko.' },
  { language: 'fr', name: 'Imparfait', usage: 'Czas przeszły niedokonany, używany do opisywania tła, nawyków, stanów i czynności trwających w przeszłości.', example: 'Quand j\'étais petit, je jouais au football.', example_pl: 'Kiedy byłem mały, grałem w piłkę nożną.' },
  { language: 'fr', name: 'Futur Simple', usage: 'Używany do opisywania czynności, które odbędą się w przyszłości.', example: 'Nous voyagerons en Italie.', example_pl: 'Pojedziemy do Włoch.' },

  // German
  { language: 'de', name: 'Präsens', usage: 'Używany do czynności teraźniejszych, nawyków, ogólnych prawd i zaplanowanej przyszłości.', example: 'Er lernt Deutsch.', example_pl: 'On uczy się niemieckiego.' },
  { language: 'de', name: 'Perfekt', usage: 'Najczęściej używany czas przeszły w mowie potocznej do opisywania zakończonych czynności.', example: 'Ich habe ein Buch gelesen.', example_pl: 'Przeczytałem/am książkę.' },
  { language: 'de', name: 'Präteritum (Imperfekt)', usage: 'Czas przeszły prosty, używany głównie w języku pisanym (książki, gazety) oraz z czasownikami modalnymi i "sein", "haben".', example: 'Er war gestern im Kino.', example_pl: 'On był wczoraj w kinie.' },
  { language: 'de', name: 'Futur I', usage: 'Używany do wyrażania przyszłych zamiarów, obietnic i prognoz.', example: 'Wir werden morgen ankommen.', example_pl: 'Przyjedziemy jutro.' },

  // Spanish
  { language: 'es', name: 'Presente de Indicativo', usage: 'Opisuje czynności teraźniejsze, nawyki i prawdy ogólne.', example: 'Ella habla español.', example_pl: 'Ona mówi po hiszpańsku.' },
  { language: 'es', name: 'Pretérito Perfecto', usage: 'Używany do opisywania czynności, które wydarzyły się niedawno i mają związek z teraźniejszością.', example: 'Esta mañana he bebido café.', example_pl: 'Dziś rano piłem/am kawę.' },
  { language: 'es', name: 'Pretérito Indefinido', usage: 'Używany do opisywania zakończonych, jednorazowych czynności w przeszłości.', example: 'Ayer comimos paella.', example_pl: 'Wczoraj zjedliśmy paellę.' },
  { language: 'es', name: 'Imperfecto', usage: 'Używany do opisywania tła, zwyczajów, czynności powtarzających się i stanów w przeszłości.', example: 'Cuando era niño, jugaba mucho.', example_pl: 'Kiedy byłem dzieckiem, dużo się bawiłem.' },
  { language: 'es', name: 'Futuro Simple', usage: 'Używany do wyrażania przyszłych czynności, przypuszczeń i obietnic.', example: 'Mañana te llamaré.', example_pl: 'Zadzwonię do ciebie jutro.' },

  // Italian
  { language: 'it', name: 'Presente Indicativo', usage: 'Opisuje czynności teraźniejsze, nawyki i prawdy ogólne.', example: 'Lui legge un libro.', example_pl: 'On czyta książkę.' },
  { language: 'it', name: 'Passato Prossimo', usage: 'Najczęściej używany czas przeszły, opisuje czynności zakończone w przeszłości, które mają związek z teraźniejszością.', example: 'Ho mangiato la pizza.', example_pl: 'Zjadłem/am pizzę.' },
  { language: 'it', name: 'Imperfetto', usage: 'Używany do opisywania tła, zwyczajów, czynności powtarzających się i stanów w przeszłości.', example: 'Da bambino, andavo al mare ogni estate.', example_pl: 'Jako dziecko, jeździłem nad morze każdego lata.' },
  { language: 'it', name: 'Futuro Semplice', usage: 'Używany do wyrażania przyszłych czynności, prognoz i obietnic.', example: 'Domani studierò la storia.', example_pl: 'Jutro będę się uczyć historii.' },
];
