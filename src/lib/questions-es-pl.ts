
export interface Question {
  id: number;
  language: 'Spanish';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'Spanish', word: 'Hola', options: ['Do widzenia', 'Cześć', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Cześć' },
  { id: 2, language: 'Spanish', word: 'Adiós', options: ['Cześć', 'Dzień dobry', 'Dobranoc', 'Do widzenia'], correctAnswer: 'Do widzenia' },
  { id: 3, language: 'Spanish', word: 'Gracias', options: ['Proszę', 'Nie ma za co', 'Dziękuję', 'Przepraszam'], correctAnswer: 'Dziękuję' },
  { id: 4, language: 'Spanish', word: 'Sí', options: ['Tak', 'Nie', 'Może', 'Zawsze'], correctAnswer: 'Tak' },
  { id: 5, language: 'Spanish', word: 'No', options: ['Dobrze', 'Nigdy', 'Dlaczego', 'Nie'], correctAnswer: 'Nie' },
  { id: 6, language: 'Spanish', word: 'Hombre', options: ['Kobieta', 'Mężczyzna', 'Dziecko', 'Osoba'], correctAnswer: 'Mężczyzna' },
  { id: 7, language: 'Spanish', word: 'Mujer', options: ['Mężczyzna', 'Dziewczyna', 'Kobieta', 'Chłopiec'], correctAnswer: 'Kobieta' },
  { id: 8, language: 'Spanish', word: 'Comer', options: ['Pić', 'Spać', 'Jeść', 'Biegać'], correctAnswer: 'Jeść' },
  { id: 9, language: 'Spanish', word: 'Agua', options: ['Ogień', 'Woda', 'Ziemia', 'Powietrze'], correctAnswer: 'Woda' },
  { id: 10, language: 'Spanish', word: 'Gato', options: ['Pies', 'Ptak', 'Ryba', 'Kot'], correctAnswer: 'Kot' },
  { id: 11, language: 'Spanish', word: 'Perro', options: ['Kot', 'Pies', 'Lew', 'Tygrys'], correctAnswer: 'Pies' },
  { id: 12, language: 'Spanish', word: 'Casa', options: ['Samochód', 'Szkoła', 'Dom', 'Sklep'], correctAnswer: 'Dom' },
  { id: 13, language: 'Spanish', word: 'Coche', options: ['Rower', 'Pociąg', 'Autobus', 'Samochód'], correctAnswer: 'Samochód' },
  { id: 14, language: 'Spanish', word: 'Escuela', options: ['Szpital', 'Szkoła', 'Uniwersytet', 'Biblioteka'], correctAnswer: 'Szkoła' },
  { id: 15, language: 'Spanish', word: 'Libro', options: ['Film', 'Piosenka', 'Książka', 'Obraz'], correctAnswer: 'Książka' },
  { id: 16, language: 'Spanish', word: 'Sol', options: ['Księżyc', 'Gwiazda', 'Słońce', 'Chmura'], correctAnswer: 'Słońce' },
  { id: 17, language: 'Spanish', word: 'Luna', options: ['Słońce', 'Planeta', 'Księżyc', 'Kometa'], correctAnswer: 'Księżyc' },
  { id: 18, language: 'Spanish', word: 'Amor', options: ['Nienawiść', 'Radość', 'Smutek', 'Miłość'], correctAnswer: 'Miłość' },
  { id: 19, language: 'Spanish', word: 'Amigo', options: ['Wróg', 'Sąsiad', 'Przyjaciel', 'Rodzina'], correctAnswer: 'Przyjaciel' },
  { id: 20, language: 'Spanish', word: 'Familia', options: ['Znajomi', 'Rodzina', 'Krewni', 'Sąsiedzi'], correctAnswer: 'Rodzina' },
  { id: 21, language: 'Spanish', word: 'Mañana', options: ['Wieczór', 'Noc', 'Popołudnie', 'Rano'], correctAnswer: 'Rano' },
  { id: 22, language: 'Spanish', word: 'Noche', options: ['Dzień', 'Noc', 'Zmierzch', 'Świt'], correctAnswer: 'Noc' },
  { id: 23, language: 'Spanish', word: 'Día', options: ['Tydzień', 'Miesiąc', 'Rok', 'Dzień'], correctAnswer: 'Dzień' },
  { id: 24, language: 'Spanish', word: 'Semana', options: ['Dzień', 'Tydzień', 'Weekend', 'Miesiąc'], correctAnswer: 'Tydzień' },
  { id: 25, language: 'Spanish', word: 'Mes', options: ['Rok', 'Wiek', 'Dekada', 'Miesiąc'], correctAnswer: 'Miesiąc' },
  { id: 26, language: 'Spanish', word: 'Año', options: ['Miesiąc', 'Rok', 'Dzień', 'Godzina'], correctAnswer: 'Rok' },
  { id: 27, language: 'Spanish', word: 'Hoy', options: ['Wczoraj', 'Jutro', 'Dzisiaj', 'Pojutrze'], correctAnswer: 'Dzisiaj' },
  { id: 28, language: 'Spanish', word: 'Mañana (jutro)', options: ['Dzisiaj', 'Wczoraj', 'Przedwczoraj', 'Jutro'], correctAnswer: 'Jutro' },
  { id: 29, language: 'Spanish', word: 'Por favor', options: ['Dziękuję', 'Proszę', 'Przepraszam', 'Nie ma za co'], correctAnswer: 'Proszę' },
  { id: 30, language: 'Spanish', word: 'Manzana', options: ['Banan', 'Pomarańcza', 'Jabłko', 'Gruszka'], correctAnswer: 'Jabłko' },
];
