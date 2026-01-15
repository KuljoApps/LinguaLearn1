export interface Question {
  id: number;
  language: 'English';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'English', word: 'Look up', options: ['Spoglądać w dół', 'Wyszukać', 'Opiekować się', 'Podziwiać'], correctAnswer: 'Wyszukać' },
  { id: 2, language: 'English', word: 'Give up', options: ['Oddać', 'Poddawać się', 'Darować', 'Wręczyć'], correctAnswer: 'Poddawać się' },
  { id: 3, language: 'English', word: 'Take off', options: ['Zdjąć / Wystartować', 'Założyć', 'Wylądować', 'Przynieść'], correctAnswer: 'Zdjąć / Wystartować' },
  { id: 4, language: 'English', word: 'Turn down', options: ['Podgłośnić', 'Włączyć', 'Wyłączyć', 'Ściszyć / Odrzucić'], correctAnswer: 'Ściszyć / Odrzucić' },
  { id: 5, language: 'English', word: 'Go on', options: ['Wracaj', 'Zatrzymaj się', 'Kontynuować', 'Zakończyć'], correctAnswer: 'Kontynuować' },
  { id: 6, language: 'English', word: 'Run out of', options: ['Wbiec do', 'Wybiec z', 'Skończyć się (coś)', 'Zacząć coś'], correctAnswer: 'Skończyć się (coś)' },
  { id: 7, language: 'English', word: 'Come across', options: ['Przejść przez', 'Ominąć', 'Natknąć się na', 'Szukać'], correctAnswer: 'Natknąć się na' },
  { id: 8, language: 'English', word: 'Put off', options: ['Przełożyć na później', 'Założyć', 'Wyłączyć', 'Zgasić'], correctAnswer: 'Przełożyć na później' },
  { id: 9, language: 'English', word: 'Get along with', options: ['Dogadywać się z', 'Kłócić się z', 'Unikać kogoś', 'Spotykać się z'], correctAnswer: 'Dogadywać się z' },
  { id: 10, language: 'English', word: 'Bring up', options: ['Wychowywać / Poruszyć temat', 'Zaniedbywać', 'Przynieść na górę', 'Opuścić'], correctAnswer: 'Wychowywać / Poruszyć temat' },
];
