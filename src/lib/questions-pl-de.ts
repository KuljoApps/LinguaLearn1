
export interface Question {
  id: number;
  language: 'Polish';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'Polish', word: 'Cześć', options: ['Auf Wiedersehen', 'Hallo', 'Danke', 'Entschuldigung'], correctAnswer: 'Hallo' },
  { id: 2, language: 'Polish', word: 'Do widzenia', options: ['Hallo', 'Guten Morgen', 'Gute Nacht', 'Auf Wiedersehen'], correctAnswer: 'Auf Wiedersehen' },
  { id: 3, language: 'Polish', word: 'Dziękuję', options: ['Bitte', 'Gern geschehen', 'Danke', 'Entschuldigung'], correctAnswer: 'Danke' },
  { id: 4, language: 'Polish', word: 'Tak', options: ['Ja', 'Nein', 'Vielleicht', 'Immer'], correctAnswer: 'Ja' },
  { id: 5, language: 'Polish', word: 'Nie', options: ['Gut', 'Niemals', 'Warum', 'Nein'], correctAnswer: 'Nein' },
  { id: 6, language: 'Polish', word: 'Mężczyzna', options: ['die Frau', 'der Mann', 'das Kind', 'die Person'], correctAnswer: 'der Mann' },
  { id: 7, language: 'Polish', word: 'Kobieta', options: ['der Mann', 'das Mädchen', 'die Frau', 'der Junge'], correctAnswer: 'die Frau' },
  { id: 8, language: 'Polish', word: 'Jeść', options: ['trinken', 'schlafen', 'essen', 'laufen'], correctAnswer: 'essen' },
  { id: 9, language: 'Polish', word: 'Woda', options: ['das Feuer', 'das Wasser', 'die Erde', 'die Luft'], correctAnswer: 'das Wasser' },
  { id: 10, language: 'Polish', word: 'Kot', options: ['der Hund', 'der Vogel', 'der Fisch', 'die Katze'], correctAnswer: 'die Katze' },
  { id: 11, language: 'Polish', word: 'Pies', options: ['die Katze', 'der Hund', 'der Löwe', 'der Tiger'], correctAnswer: 'der Hund' },
  { id: 12, language: 'Polish', word: 'Dom', options: ['das Auto', 'die Schule', 'das Haus', 'das Geschäft'], correctAnswer: 'das Haus' },
  { id: 13, language: 'Polish', word: 'Samochód', options: ['das Fahrrad', 'der Zug', 'der Bus', 'das Auto'], correctAnswer: 'das Auto' },
  { id: 14, language: 'Polish', word: 'Szkoła', options: ['das Krankenhaus', 'die Schule', 'die Universität', 'die Bibliothek'], correctAnswer: 'die Schule' },
  { id: 15, language: 'Polish', word: 'Książka', options: ['der Film', 'das Lied', 'das Buch', 'das Bild'], correctAnswer: 'das Buch' },
  { id: 16, language: 'Polish', word: 'Słońce', options: ['der Mond', 'der Stern', 'die Sonne', 'die Wolke'], correctAnswer: 'die Sonne' },
  { id: 17, language: 'Polish', word: 'Księżyc', options: ['die Sonne', 'der Planet', 'der Mond', 'der Komet'], correctAnswer: 'der Mond' },
  { id: 18, language: 'Polish', word: 'Miłość', options: ['der Hass', 'die Freude', 'die Traurigkeit', 'die Liebe'], correctAnswer: 'die Liebe' },
  { id: 19, language: 'Polish', word: 'Przyjaciel', options: ['der Feind', 'der Nachbar', 'der Freund', 'die Familie'], correctAnswer: 'der Freund' },
  { id: 20, language: 'Polish', word: 'Rodzina', options: ['die Freunde', 'die Familie', 'die Verwandten', 'die Nachbarn'], correctAnswer: 'die Familie' },
  { id: 21, language: 'Polish', word: 'Rano', options: ['der Abend', 'die Nacht', 'der Nachmittag', 'der Morgen'], correctAnswer: 'der Morgen' },
  { id: 22, language: 'Polish', word: 'Noc', options: ['der Tag', 'die Nacht', 'die Dämmerung', 'die Morgendämmerung'], correctAnswer: 'die Nacht' },
  { id: 23, language: 'Polish', word: 'Dzień', options: ['die Woche', 'der Monat', 'das Jahr', 'der Tag'], correctAnswer: 'der Tag' },
  { id: 24, language: 'Polish', word: 'Tydzień', options: ['der Tag', 'die Woche', 'das Wochenende', 'der Monat'], correctAnswer: 'die Woche' },
  { id: 25, language: 'Polish', word: 'Miesiąc', options: ['das Jahr', 'das Jahrhundert', 'das Jahrzehnt', 'der Monat'], correctAnswer: 'der Monat' },
  { id: 26, language: 'Polish', word: 'Rok', options: ['der Monat', 'das Jahr', 'der Tag', 'die Stunde'], correctAnswer: 'das Jahr' },
  { id: 27, language: 'Polish', word: 'Dzisiaj', options: ['gestern', 'morgen', 'heute', 'übermorgen'], correctAnswer: 'heute' },
  { id: 28, language: 'Polish', word: 'Jutro', options: ['heute', 'gestern', 'vorgestern', 'morgen'], correctAnswer: 'morgen' },
  { id: 29, language: 'Polish', word: 'Proszę', options: ['Danke', 'Bitte', 'Entschuldigung', 'Gern geschehen'], correctAnswer: 'Bitte' },
  { id: 30, language: 'Polish', word: 'Jabłko', options: ['die Banane', 'die Orange', 'der Apfel', 'die Birne'], correctAnswer: 'der Apfel' },
];
