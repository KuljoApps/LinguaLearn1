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
  { id: 11, language: 'Polish', word: 'Cześć', options: ['Au revoir', 'Bonjour', 'Merci', 'Pardon'], correctAnswer: 'Bonjour' },
  { id: 12, language: 'Polish', word: 'Do widzenia', options: ['Bonjour', 'Bon matin', 'Bonne nuit', 'Au revoir'], correctAnswer: 'Au revoir' },
  { id: 13, language: 'Polish', word: 'Dziękuję', options: ['S\'il vous plaît', 'De rien', 'Merci', 'Pardon'], correctAnswer: 'Merci' },
  { id: 14, language: 'Polish', word: 'Tak', options: ['Oui', 'Non', 'Peut-être', 'Toujours'], correctAnswer: 'Oui' },
  { id: 15, language: 'Polish', word: 'Nie', options: ['Bien', 'Jamais', 'Pourquoi', 'Non'], correctAnswer: 'Non' },
  { id: 16, language: 'Polish', word: 'Mężczyzna', options: ['Femme', 'Homme', 'Enfant', 'Personne'], correctAnswer: 'Homme' },
  { id: 17, language: 'Polish', word: 'Kobieta', options: ['Homme', 'Fille', 'Femme', 'Garçon'], correctAnswer: 'Femme' },
  { id: 18, language: 'Polish', word: 'Jeść', options: ['Boire', 'Dormir', 'Manger', 'Courir'], correctAnswer: 'Manger' },
  { id: 19, language: 'Polish', word: 'Woda', options: ['Feu', 'Eau', 'Terre', 'Air'], correctAnswer: 'Eau' },
  { id: 20, language: 'Polish', word: 'Kot', options: ['Chien', 'Oiseau', 'Poisson', 'Chat'], correctAnswer: 'Chat' },
  { id: 21, language: 'Polish', word: 'Noc', options: ['Jour', 'Nuit', 'Soir', 'Matin'], correctAnswer: 'Nuit' },
  { id: 22, language: 'Polish', word: 'Dzień', options: ['Semaine', 'Mois', 'An', 'Jour'], correctAnswer: 'Jour' },
  { id: 23, language: 'Polish', word: 'Tydzień', options: ['Jour', 'Semaine', 'Weekend', 'Mois'], correctAnswer: 'Semaine' },
  { id: 24, language: 'Polish', word: 'Miesiąc', options: ['An', 'Siècle', 'Décennie', 'Mois'], correctAnswer: 'Mois' },
  { id: 25, language: 'Polish', word: 'Rok', options: ['Mois', 'An', 'Jour', 'Heure'], correctAnswer: 'An' },
  { id: 26, language: 'Polish', word: 'Dzisiaj', options: ['Hier', 'Demain', 'Aujourd\'hui', 'Après-demain'], correctAnswer: 'Aujourd\'hui' },
  { id: 27, language: 'Polish', word: 'Jutro', options: ['Aujourd\'hui', 'Hier', 'Avant-hier', 'Demain'], correctAnswer: 'Demain' },
  { id: 28, language: 'Polish', word: 'Szkoła', options: ['Hôpital', 'École', 'Université', 'Bibliothèque'], correctAnswer: 'École' },
  { id: 29, language: 'Polish', word: 'Samochód', options: ['Vélo', 'Train', 'Bus', 'Voiture'], correctAnswer: 'Voiture' },
  { id: 30, language: 'Polish', word: 'Księżyc', options: ['Soleil', 'Planète', 'Lune', 'Comète'], correctAnswer: 'Lune' },
];
