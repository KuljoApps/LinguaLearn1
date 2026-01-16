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
];
