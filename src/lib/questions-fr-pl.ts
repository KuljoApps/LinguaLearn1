export interface Question {
  id: number;
  language: 'French';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'French', word: 'Bonjour', options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Cześć' },
  { id: 2, language: 'French', word: 'Au revoir', options: ['Cześć', 'Dzień dobry', 'Dobranoc', 'Do widzenia'], correctAnswer: 'Do widzenia' },
  { id: 3, language: 'French', word: 'Merci', options: ['Proszę', 'Nie ma za co', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Dziękuję' },
  { id: 4, language: 'French', word: 'Oui', options: ['Tak', 'Nie', 'Może', 'Zawsze'], correctAnswer: 'Tak' },
  { id: 5, language: 'French', word: 'Non', options: ['Dobrze', 'Nigdy', 'Dlaczego', 'Nie'], correctAnswer: 'Nie' },
  { id: 6, language: 'French', word: 'Homme', options: ['Kobieta', 'Mężczyzna', 'Dziecko', 'Osoba'], correctAnswer: 'Mężczyzna' },
  { id: 7, language: 'French', word: 'Femme', options: ['Mężczyzna', 'Dziewczyna', 'Kobieta', 'Chłopiec'], correctAnswer: 'Kobieta' },
  { id: 8, language: 'French', word: 'Manger', options: ['Pić', 'Spać', 'Jeść', 'Biegać'], correctAnswer: 'Jeść' },
  { id: 9, language: 'French', word: 'Eau', options: ['Ogień', 'Woda', 'Ziemia', 'Powietrze'], correctAnswer: 'Woda' },
  { id: 10, language: 'French', word: 'Chat', options: ['Pies', 'Ptak', 'Ryba', 'Kot'], correctAnswer: 'Kot' },
  { id: 11, language: 'French', word: 'Chien', options: ['Kot', 'Pies', 'Lew', 'Tygrys'], correctAnswer: 'Pies' },
  { id: 12, language: 'French', word: 'Maison', options: ['Samochód', 'Szkoła', 'Dom', 'Sklep'], correctAnswer: 'Dom' },
  { id: 13, language: 'French', word: 'Voiture', options: ['Rower', 'Pociąg', 'Autobus', 'Samochód'], correctAnswer: 'Samochód' },
  { id: 14, language: 'French', word: 'École', options: ['Szpital', 'Szkoła', 'Uniwersytet', 'Biblioteka'], correctAnswer: 'Szkoła' },
  { id: 15, language: 'French', word: 'Livre', options: ['Film', 'Piosenka', 'Książka', 'Obraz'], correctAnswer: 'Książka' },
  { id: 16, language: 'French', word: 'Soleil', options: ['Księżyc', 'Gwiazda', 'Słońce', 'Chmura'], correctAnswer: 'Słońce' },
  { id: 17, language: 'French', word: 'Lune', options: ['Słońce', 'Planeta', 'Księżyc', 'Kometa'], correctAnswer: 'Księżyc' },
  { id: 18, language: 'French', word: 'Amour', options: ['Nienawiść', 'Radość', 'Smutek', 'Miłość'], correctAnswer: 'Miłość' },
  { id: 19, language: 'French', word: 'Ami', options: ['Wróg', 'Sąsiad', 'Przyjaciel', 'Rodzina'], correctAnswer: 'Przyjaciel' },
  { id: 20, language: 'French', word: 'Famille', options: ['Znajomi', 'Rodzina', 'Krewni', 'Sąsiedzi'], correctAnswer: 'Rodzina' },
  { id: 21, language: 'French', word: 'Matin', options: ['Wieczór', 'Noc', 'Popołudnie', 'Rano'], correctAnswer: 'Rano' },
  { id: 22, language: 'French', word: 'Nuit', options: ['Dzień', 'Noc', 'Zmierzch', 'Świt'], correctAnswer: 'Noc' },
  { id: 23, language: 'French', word: 'Jour', options: ['Tydzień', 'Miesiąc', 'Rok', 'Dzień'], correctAnswer: 'Dzień' },
  { id: 24, language: 'French', word: 'Semaine', options: ['Dzień', 'Tydzień', 'Weekend', 'Miesiąc'], correctAnswer: 'Tydzień' },
  { id: 25, language: 'French', word: 'Mois', options: ['Rok', 'Wiek', 'Dekada', 'Miesiąc'], correctAnswer: 'Miesiąc' },
  { id: 26, language: 'French', word: 'An', options: ['Miesiąc', 'Rok', 'Dzień', 'Godzina'], correctAnswer: 'Rok' },
  { id: 27, language: 'French', word: 'Aujourd\'hui', options: ['Wczoraj', 'Jutro', 'Dzisiaj', 'Pojutrze'], correctAnswer: 'Dzisiaj' },
  { id: 28, language: 'French', word: 'Demain', options: ['Dzisiaj', 'Wczoraj', 'Przedwczoraj', 'Jutro'], correctAnswer: 'Jutro' },
  { id: 29, language: 'French', word: 'S\'il vous plaît', options: ['Dziękuję', 'Proszę', 'Przepraszam', 'Nie ma za co'], correctAnswer: 'Proszę' },
  { id: 30, language: 'French', word: 'Pomme', options: ['Banan', 'Pomarańcza', 'Jabłko', 'Gruszka'], correctAnswer: 'Jabłko' },
];
