
export interface Question {
  id: number;
  language: 'German';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'German', word: 'Hallo', options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Cześć' },
  { id: 2, language: 'German', word: 'Auf Wiedersehen', options: ['Cześć', 'Dzień dobry', 'Dobranoc', 'Do widzenia'], correctAnswer: 'Do widzenia' },
  { id: 3, language: 'German', word: 'Danke', options: ['Proszę', 'Nie ma za co', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Dziękuję' },
  { id: 4, language: 'German', word: 'Ja', options: ['Tak', 'Nie', 'Może', 'Zawsze'], correctAnswer: 'Tak' },
  { id: 5, language: 'German', word: 'Nein', options: ['Dobrze', 'Nigdy', 'Dlaczego', 'Nie'], correctAnswer: 'Nie' },
  { id: 6, language: 'German', word: 'Mann', options: ['Kobieta', 'Mężczyzna', 'Dziecko', 'Osoba'], correctAnswer: 'Mężczyzna' },
  { id: 7, language: 'German', word: 'Frau', options: ['Mężczyzna', 'Dziewczyna', 'Kobieta', 'Chłopiec'], correctAnswer: 'Kobieta' },
  { id: 8, language: 'German', word: 'essen', options: ['pić', 'spać', 'jeść', 'biegać'], correctAnswer: 'jeść' },
  { id: 9, language: 'German', word: 'Wasser', options: ['Ogień', 'Woda', 'Ziemia', 'Powietrze'], correctAnswer: 'Woda' },
  { id: 10, language: 'German', word: 'Katze', options: ['Pies', 'Ptak', 'Ryba', 'Kot'], correctAnswer: 'Kot' },
  { id: 11, language: 'German', word: 'Hund', options: ['Kot', 'Pies', 'Lew', 'Tygrys'], correctAnswer: 'Pies' },
  { id: 12, language: 'German', word: 'Haus', options: ['Samochód', 'Szkoła', 'Dom', 'Sklep'], correctAnswer: 'Dom' },
  { id: 13, language: 'German', word: 'Auto', options: ['Rower', 'Pociąg', 'Autobus', 'Samochód'], correctAnswer: 'Samochód' },
  { id: 14, language: 'German', word: 'Schule', options: ['Szpital', 'Szkoła', 'Uniwersytet', 'Biblioteka'], correctAnswer: 'Szkoła' },
  { id: 15, language: 'German', word: 'Buch', options: ['Film', 'Piosenka', 'Książka', 'Obraz'], correctAnswer: 'Książka' },
  { id: 16, language: 'German', word: 'Sonne', options: ['Księżyc', 'Gwiazda', 'Słońce', 'Chmura'], correctAnswer: 'Słońce' },
  { id: 17, language: 'German', word: 'Mond', options: ['Słońce', 'Planeta', 'Księżyc', 'Kometa'], correctAnswer: 'Księżyc' },
  { id: 18, language: 'German', word: 'Liebe', options: ['Nienawiść', 'Radość', 'Smutek', 'Miłość'], correctAnswer: 'Miłość' },
  { id: 19, language: 'German', word: 'Freund', options: ['Wróg', 'Sąsiad', 'Przyjaciel', 'Rodzina'], correctAnswer: 'Przyjaciel' },
  { id: 20, language: 'German', word: 'Familie', options: ['Znajomi', 'Rodzina', 'Krewni', 'Sąsiedzi'], correctAnswer: 'Rodzina' },
  { id: 21, language: 'German', word: 'Morgen', options: ['Wieczór', 'Noc', 'Popołudnie', 'Rano'], correctAnswer: 'Rano' },
  { id: 22, language: 'German', word: 'Nacht', options: ['Dzień', 'Noc', 'Zmierzch', 'Świt'], correctAnswer: 'Noc' },
  { id: 23, language: 'German', word: 'Tag', options: ['Tydzień', 'Miesiąc', 'Rok', 'Dzień'], correctAnswer: 'Dzień' },
  { id: 24, language: 'German', word: 'Woche', options: ['Dzień', 'Tydzień', 'Weekend', 'Miesiąc'], correctAnswer: 'Tydzień' },
  { id: 25, language: 'German', word: 'Monat', options: ['Rok', 'Wiek', 'Dekada', 'Miesiąc'], correctAnswer: 'Miesiąc' },
  { id: 26, language: 'German', word: 'Jahr', options: ['Miesiąc', 'Rok', 'Dzień', 'Godzina'], correctAnswer: 'Rok' },
  { id: 27, language: 'German', word: 'heute', options: ['Wczoraj', 'Jutro', 'Dzisiaj', 'Pojutrze'], correctAnswer: 'Dzisiaj' },
  { id: 28, language: 'German', word: 'morgen', options: ['Dzisiaj', 'Wczoraj', 'Przedwczoraj', 'Jutro'], correctAnswer: 'Jutro' },
  { id: 29, language: 'German', word: 'Bitte', options: ['Dziękuję', 'Proszę', 'Przepraszam', 'Nie ma za co'], correctAnswer: 'Proszę' },
  { id: 30, language: 'German', word: 'Apfel', options: ['Banan', 'Pomarańcza', 'Jabłko', 'Gruszka'], correctAnswer: 'Jabłko' },
];
