export interface Question {
  id: number;
  language: 'Polish';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'Polish', word: 'Pies', options: ['Chat', 'Chien', 'Lion', 'Tigre'], correctAnswer: 'Chien' },
  { id: 2, language: 'Polish', word: 'Dom', options: ['Voiture', 'École', 'Maison', 'Magasin'], correctAnswer: 'Maison' },
  { id: 3, language: 'Polish', word: 'Książka', options: ['Film', 'Chanson', 'Livre', 'Tableau'], correctAnswer: 'Livre' },
  { id: 4, language: 'Polish', word: 'Słońce', options: ['Lune', 'Étoile', 'Soleil', 'Nuage'], correctAnswer: 'Soleil' },
  { id: 5, language: 'Polish', word: 'Miłość', options: ['Haine', 'Joie', 'Tristesse', 'Amour'], correctAnswer: 'Amour' },
  { id: 6, language: 'Polish', word: 'Przyjaciel', options: ['Ennemi', 'Voisin', 'Ami', 'Famille'], correctAnswer: 'Ami' },
  { id: 7, language: 'Polish', word: 'Rodzina', options: ['Amis', 'Famille', 'Parents', 'Voisins'], correctAnswer: 'Famille' },
  { id: 8, language: 'Polish', word: 'Rano', options: ['Soir', 'Nuit', 'Après-midi', 'Matin'], correctAnswer: 'Matin' },
  { id: 9, language: 'Polish', word: 'Proszę', options: ['Merci', 'S\'il vous plaît', 'Pardon', 'De rien'], correctAnswer: 'S\'il vous plaît' },
  { id: 10, language: 'Polish', word: 'Jabłko', options: ['Banane', 'Orange', 'Pomme', 'Poire'], correctAnswer: 'Pomme' },
];
