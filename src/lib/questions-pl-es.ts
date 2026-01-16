
export interface Question {
  id: number;
  language: 'Polish';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'Polish', word: 'Cześć', options: ['Adiós', 'Hola', 'Gracias', 'Perdón'], correctAnswer: 'Hola' },
  { id: 2, language: 'Polish', word: 'Do widzenia', options: ['Hola', 'Buenos días', 'Buenas noches', 'Adiós'], correctAnswer: 'Adiós' },
  { id: 3, language: 'Polish', word: 'Dziękuję', options: ['De nada', 'Por favor', 'Gracias', 'Perdón'], correctAnswer: 'Gracias' },
  { id: 4, language: 'Polish', word: 'Tak', options: ['Sí', 'No', 'Quizás', 'Siempre'], correctAnswer: 'Sí' },
  { id: 5, language: 'Polish', word: 'Nie', options: ['Bien', 'Nunca', 'Por qué', 'No'], correctAnswer: 'No' },
  { id: 6, language: 'Polish', word: 'Mężczyzna', options: ['Mujer', 'Hombre', 'Niño', 'Persona'], correctAnswer: 'Hombre' },
  { id: 7, language: 'Polish', word: 'Kobieta', options: ['Hombre', 'Chica', 'Mujer', 'Chico'], correctAnswer: 'Mujer' },
  { id: 8, language: 'Polish', word: 'Jeść', options: ['Beber', 'Dormir', 'Comer', 'Correr'], correctAnswer: 'Comer' },
  { id: 9, language: 'Polish', word: 'Woda', options: ['Fuego', 'Agua', 'Tierra', 'Aire'], correctAnswer: 'Agua' },
  { id: 10, language: 'Polish', word: 'Kot', options: ['Perro', 'Pájaro', 'Pez', 'Gato'], correctAnswer: 'Gato' },
  { id: 11, language: 'Polish', word: 'Pies', options: ['Gato', 'Perro', 'León', 'Tigre'], correctAnswer: 'Perro' },
  { id: 12, language: 'Polish', word: 'Dom', options: ['Coche', 'Escuela', 'Casa', 'Tienda'], correctAnswer: 'Casa' },
  { id: 13, language: 'Polish', word: 'Samochód', options: ['Bicicleta', 'Tren', 'Autobús', 'Coche'], correctAnswer: 'Coche' },
  { id: 14, language: 'Polish', word: 'Szkoła', options: ['Hospital', 'Escuela', 'Universidad', 'Biblioteca'], correctAnswer: 'Escuela' },
  { id: 15, language: 'Polish', word: 'Książka', options: ['Película', 'Canción', 'Libro', 'Pintura'], correctAnswer: 'Libro' },
  { id: 16, language: 'Polish', word: 'Słońce', options: ['Luna', 'Estrella', 'Sol', 'Nube'], correctAnswer: 'Sol' },
  { id: 17, language: 'Polish', word: 'Księżyc', options: ['Sol', 'Planeta', 'Luna', 'Cometa'], correctAnswer: 'Luna' },
  { id: 18, language: 'Polish', word: 'Miłość', options: ['Odio', 'Alegría', 'Tristeza', 'Amor'], correctAnswer: 'Amor' },
  { id: 19, language: 'Polish', word: 'Przyjaciel', options: ['Enemigo', 'Vecino', 'Amigo', 'Familia'], correctAnswer: 'Amigo' },
  { id: 20, language: 'Polish', word: 'Rodzina', options: ['Amigos', 'Familia', 'Parientes', 'Vecinos'], correctAnswer: 'Familia' },
  { id: 21, language: 'Polish', word: 'Rano', options: ['Tarde', 'Noche', 'Mediodía', 'Mañana'], correctAnswer: 'Mañana' },
  { id: 22, language: 'Polish', word: 'Noc', options: ['Día', 'Noche', 'Atardecer', 'Amanecer'], correctAnswer: 'Noche' },
  { id: 23, language: 'Polish', word: 'Dzień', options: ['Semana', 'Mes', 'Año', 'Día'], correctAnswer: 'Día' },
  { id: 24, language: 'Polish', word: 'Tydzień', options: ['Día', 'Semana', 'Fin de semana', 'Mes'], correctAnswer: 'Semana' },
  { id: 25, language: 'Polish', word: 'Miesiąc', options: ['Año', 'Siglo', 'Década', 'Mes'], correctAnswer: 'Mes' },
  { id: 26, language: 'Polish', word: 'Rok', options: ['Mes', 'Año', 'Día', 'Hora'], correctAnswer: 'Año' },
  { id: 27, language: 'Polish', word: 'Dzisiaj', options: ['Ayer', 'Mañana', 'Hoy', 'Pasado mañana'], correctAnswer: 'Hoy' },
  { id: 28, language: 'Polish', word: 'Jutro', options: ['Hoy', 'Ayer', 'Anteayer', 'Mañana'], correctAnswer: 'Mañana' },
  { id: 29, language: 'Polish', word: 'Proszę', options: ['Gracias', 'Por favor', 'Perdón', 'De nada'], correctAnswer: 'Por favor' },
  { id: 30, language: 'Polish', word: 'Jabłko', options: ['Plátano', 'Naranja', 'Manzana', 'Pera'], correctAnswer: 'Manzana' },
];
