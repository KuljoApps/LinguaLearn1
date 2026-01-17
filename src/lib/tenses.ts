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
  { language: 'en', name: 'Present Perfect', usage: 'Używany do czynności, które miały miejsce w nieokreślonej przeszłości lub mają związek z teraźniejszością.', example: 'He has lost his keys.', example_pl: 'On zgubił klucze.' },
  { language: 'en', name: 'Present Perfect Continuous', usage: 'Podkreśla ciągłość czynności, która zaczęła się w przeszłości i trwa do teraz.', example: 'They have been talking for an hour.', example_pl: 'Oni rozmawiają od godziny.' },
  { language: 'en', name: 'Past Simple', usage: 'Używany do opisywania zakończonych czynności w przeszłości.', example: 'They visited Paris last year.', example_pl: 'Oni odwiedzili Paryż w zeszłym roku.' },
  { language: 'en', name: 'Past Continuous', usage: 'Opisuje czynność trwającą w określonym momencie w przeszłości, często jako tło dla innego wydarzenia.', example: 'I was watching TV when you called.', example_pl: 'Oglądałem telewizję, kiedy zadzwoniłeś.' },
  { language: 'en', name: 'Past Perfect', usage: 'Używany do opisu czynności, która zakończyła się przed inną czynnością w przeszłości (czas "zaprzzeszły").', example: 'The train had left when I arrived at the station.', example_pl: 'Pociąg już odjechał, kiedy dotarłem na stację.' },
  { language: 'en', name: 'Past Perfect Continuous', usage: 'Podkreśla ciągłość czynności, która trwała przez pewien czas przed innym wydarzeniem w przeszłości.', example: 'He had been working there for five years before he quit.', example_pl: 'Pracował tam przez pięć lat, zanim zrezygnował.' },
  { language: 'en', name: 'Future Simple', usage: 'Używany do spontanicznych decyzji, obietnic i przewidywań opartych na opinii.', example: 'I will help you with your homework.', example_pl: 'Pomogę ci z zadaniem domowym.' },
  { language: 'en', name: 'Future Continuous', usage: 'Opisuje czynność, która będzie trwała w określonym momencie w przyszłości.', example: 'This time tomorrow, I will be flying to Spain.', example_pl: 'Jutro o tej porze będę lecieć do Hiszpanii.' },
  { language: 'en', name: 'Future Perfect', usage: 'Wyraża czynność, która zostanie zakończona przed określonym momentem w przyszłości.', example: 'By 2025, they will have finished the project.', example_pl: 'Do 2025 roku skończą ten projekt.' },
  { language: 'en', name: 'Future Perfect Continuous', usage: 'Podkreśla, jak długo będzie trwała czynność do określonego momentu w przyszłości.', example: 'By next year, I will have been living here for ten years.', example_pl: 'W przyszłym roku minie dziesięć lat, odkąd tu mieszkam.' },
  { language: 'en', name: 'Zero Conditional', usage: 'Używany do opisywania faktów, ogólnych prawd i sytuacji, które zawsze są prawdziwe.', example: 'If you heat water to 100 degrees, it boils.', example_pl: 'Jeśli podgrzejesz wodę do 100 stopni, zagotuje się.' },
  { language: 'en', name: 'First Conditional', usage: 'Okres warunkowy I: Opisuje realne, prawdopodobne sytuacje w przyszłości.', example: 'If it rains tomorrow, we will stay at home.', example_pl: 'Jeśli jutro będzie padać, zostaniemy w domu.' },
  { language: 'en', name: 'Second Conditional', usage: 'Okres warunkowy II: Używany do opisywania hipotetycznych, mało prawdopodobnych sytuacji w teraźniejszości lub przyszłości (tzw. "gdybanie").', example: 'If I won the lottery, I would buy a big house.', example_pl: 'Gdybym wygrał na loterii, kupiłbym duży dom.' },
  { language: 'en', name: 'Third Conditional', usage: 'Okres warunkowy III: Opisuje hipotetyczne sytuacje z przeszłości, które się nie wydarzyły i ich hipotetyczne skutki.', example: 'If you had studied harder, you would have passed the exam.', example_pl: 'Gdybyś uczył się pilniej, zdałbyś egzamin.' },

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
