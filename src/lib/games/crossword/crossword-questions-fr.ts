
import type { CrosswordPuzzle } from '../crossword-data';

export const crosswordPuzzlesFr: CrosswordPuzzle[] = [
  {
    id: 1,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Nauczyciel', answer: 'PROF', options: ['PROF', 'ÉLÈVE', 'MÉDECIN'], x: 1, y: 1, direction: 'across' },
      { number: 2, clue: 'Uczyć się', answer: 'ÉTUDIER', options: ['ÉTUDIER', 'LIRE', 'ÉCRIRE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Szkoła', answer: 'ÉCOLE', options: ['ÉCOLE', 'CLASSE', 'LIVRE'], x: 6, y: 0, direction: 'down' },
      { number: 4, clue: 'Uczeń', answer: 'ÉLÈVE', options: ['ÉLÈVE', 'PROF', 'ENFANT'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Książka', answer: 'LIVRE', options: ['LIVRE', 'CAHIER', 'PAPIER'], x: 0, y: 3, direction: 'down' },
      { number: 6, clue: 'Klasa', answer: 'CLASSE', options: ['CLASSE', 'SALLE', 'ÉCOLE'], x: 2, y: 5, direction: 'across' },
      { number: 7, clue: 'Czytać', answer: 'LIRE', options: ['LIRE', 'ÉCRIRE', 'PARLER'], x: 0, y: 7, direction: 'across' },
    ],
  },
  {
    id: 2,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Kuchnia', answer: 'CUISINE', options: ['CUISINE', 'BAIN', 'CHAMBRE'], x: 0, y: 1, direction: 'across' },
      { number: 2, clue: 'Jeść', answer: 'MANGER', options: ['MANGER', 'BOIRE', 'DORMIR'], x: 1, y: 0, direction: 'down' },
      { number: 3, clue: 'Widelec', answer: 'FOURCHETTE', options: ['FOURCHETTE', 'CUILLÈRE', 'COUTEAU'], x: 5, y: 0, direction: 'down' },
      { number: 4, clue: 'Obiad', answer: 'DÎNER', options: ['DÎNER', 'DÉJEUNER', 'PETIT-DÉJ'], x: 0, y: 3, direction: 'across' },
      { number: 5, clue: 'Nóż', answer: 'COUTEAU', options: ['COUTEAU', 'FOURCHETTE', 'CUILLÈRE'], x: 1, y: 3, direction: 'down' },
      { number: 6, clue: 'Łyżka', answer: 'CUILLÈRE', options: ['CUILLÈRE', 'FOURCHETTE', 'ASSIETTE'], x: 0, y: 5, direction: 'across' },
      { number: 7, clue: 'Talerz', answer: 'ASSIETTE', options: ['ASSIETTE', 'VERRE', 'TASSE'], x: 0, y: 7, direction: 'across' },
    ],
  },
  {
    id: 3,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Zima', answer: 'HIVER', options: ['HIVER', 'ÉTÉ', 'PRINTEMPS'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Słońce', answer: 'SOLEIL', options: ['SOLEIL', 'LUNE', 'ÉTOILE'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Wiosna', answer: 'PRINTEMPS', options: ['PRINTEMPS', 'AUTOMNE', 'HIVER'], x: 6, y: 0, direction: 'down' },
      { number: 4, clue: 'Deszcz', answer: 'PLUIE', options: ['PLUIE', 'NEIGE', 'VENT'], x: 0, y: 2, direction: 'across' },
      { number: 5, clue: 'Lato', answer: 'ÉTÉ', options: ['ÉTÉ', 'HIVER', 'AUTOMNE'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Śnieg', answer: 'NEIGE', options: ['NEIGE', 'PLUIE', 'GLACE'], x: 0, y: 4, direction: 'down' },
      { number: 7, clue: 'Jesień', answer: 'AUTOMNE', options: ['AUTOMNE', 'PRINTEMPS', 'ÉTÉ'], x: 2, y: 6, direction: 'across' },
    ],
  },
  {
    id: 4,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Lekarz', answer: 'MÉDECIN', options: ['MÉDECIN', 'INFIRMIER', 'PATIENT'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Chory', answer: 'MALADE', options: ['MALADE', 'SAIN', 'BIEN'], x: 2, y: 0, direction: 'down' },
      { number: 3, clue: 'Pomoc', answer: 'AIDE', options: ['AIDE', 'DOULEUR', 'SOIN'], x: 5, y: 0, direction: 'down' },
      { number: 4, clue: 'Zdrowie', answer: 'SANTÉ', options: ['SANTÉ', 'MALADIE', 'DOULEUR'], x: 0, y: 2, direction: 'across' },
      { number: 5, clue: 'Ból', answer: 'DOULEUR', options: ['DOULEUR', 'BLESSURE', 'MAL'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Apteka', answer: 'PHARMACIE', options: ['PHARMACIE', 'HÔPITAL', 'CLINIQUE'], x: 3, y: 4, direction: 'down' },
    ],
  },
  {
    id: 5,
    gridSize: 7,
    clues: [
      { number: 1, clue: 'Świat', answer: 'MONDE', options: ['MONDE', 'TERRE', 'PAYS'], x: 1, y: 0, direction: 'across' },
      { number: 2, clue: 'Podróż', answer: 'VOYAGE', options: ['VOYAGE', 'EXCURSION', 'TOUR'], x: 3, y: 0, direction: 'down' },
      { number: 3, clue: 'Rzym', answer: 'ROME', options: ['ROME', 'PARIS', 'LONDRES'], x: 0, y: 2, direction: 'across' },
      { number: 4, clue: 'Madryt', answer: 'MADRID', options: ['MADRID', 'BERLIN', 'ROME'], x: 6, y: 2, direction: 'down' },
      { number: 5, clue: 'Paryż', answer: 'PARIS', options: ['PARIS', 'LONDRES', 'MADRID'], x: 0, y: 4, direction: 'across' },
      { number: 6, clue: 'Londyn', answer: 'LONDRES', options: ['LONDRES', 'PARIS', 'BERLIN'], x: 0, y: 6, direction: 'across' },
      { number: 7, clue: 'Berlin', answer: 'BERLIN', options: ['BERLIN', 'ROME', 'LONDRES'], x: 4, y: 4, direction: 'down' },
    ],
  },
];

    