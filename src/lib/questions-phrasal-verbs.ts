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
  { id: 11, language: 'English', word: 'Break down', options: ['Naprawić', 'Zbudować', 'Zepsuć się / Załamać się', 'Rozbić na części'], correctAnswer: 'Zepsuć się / Załamać się' },
  { id: 12, language: 'English', word: 'Call off', options: ['Zadzwonić', 'Przełożyć', 'Odwołać', 'Zaprosić'], correctAnswer: 'Odwołać' },
  { id: 13, language: 'English', word: 'Catch up', options: ['Złapać coś', 'Nadrobić zaległości', 'Zwolnić', 'Pospieszyć się'], correctAnswer: 'Nadrobić zaległości' },
  { id: 14, language: 'English', word: 'Drop off', options: ['Upuścić', 'Podrzucić kogoś / Zasnąć', 'Odebrać', 'Wysiąść'], correctAnswer: 'Podrzucić kogoś / Zasnąć' },
  { id: 15, language: 'English', word: 'Figure out', options: ['Znaleźć figurę', 'Zgubić się', 'Zrozumieć / Rozwiązać', 'Ignorować'], correctAnswer: 'Zrozumieć / Rozwiązać' },
  { id: 16, language: 'English', word: 'Find out', options: ['Szukać na zewnątrz', 'Znaleźć wyjście', 'Dowiedzieć się', 'Ukrywać'], correctAnswer: 'Dowiedzieć się' },
  { id: 17, language: 'English', word: 'Hold on', options: ['Trzymać się mocno', 'Puścić', 'Poczekać', 'Iść dalej'], correctAnswer: 'Poczekać' },
  { id: 18, language: 'English', word: 'Look after', options: ['Patrzeć za kimś', 'Szukać czegoś', 'Opiekować się', 'Ignorować'], correctAnswer: 'Opiekować się' },
  { id: 19, language: 'English', word: 'Pass away', options: ['Podać dalej', 'Zdać egzamin', 'Odejść', 'Umrzeć'], correctAnswer: 'Umrzeć' },
  { id: 20, language: 'English', word: 'Show up', options: ['Pokazać coś', 'Pojawić się', 'Ukryć się', 'Zniknąć'], correctAnswer: 'Pojawić się' },
  { id: 21, language: 'English', word: 'Take up', options: ['Podnieść', 'Zająć miejsce', 'Zacząć (hobby)', 'Skończyć coś'], correctAnswer: 'Zacząć (hobby)' },
  { id: 22, language: 'English', word: 'Work out', options: ['Pracować na zewnątrz', 'Wyjść z pracy', 'Ćwiczyć / Rozwiązać problem', 'Znaleźć pracę'], correctAnswer: 'Ćwiczyć / Rozwiązać problem' },
  { id: 23, language: 'English', word: 'Back up', options: ['Cofać', 'Iść do tyłu', 'Wspierać / Robić kopię zapasową', 'Krytykować'], correctAnswer: 'Wspierać / Robić kopię zapasową' },
  { id: 24, language: 'English', word: 'Carry on', options: ['Nosić coś', 'Zabrać ze sobą', 'Kontynuować', 'Zatrzymać się'], correctAnswer: 'Kontynuować' },
  { id: 25, language: 'English', word: 'Check in', options: ['Sprawdzić coś', 'Wystawić rachunek', 'Zameldować się', 'Wymeldować się'], correctAnswer: 'Zameldować się' },
  { id: 26, language: 'English', word: 'Come up with', options: ['Podejść do kogoś', 'Spotkać się', 'Wymyślić coś', 'Zgodzić się'], correctAnswer: 'Wymyślić coś' },
  { id: 27, language: 'English', word: 'End up', options: ['Zakończyć coś', 'Poddać się', 'Skończyć (gdzieś/jakoś)', 'Zacząć od końca'], correctAnswer: 'Skończyć (gdzieś/jakoś)' },
  { id: 28, language: 'English', word: 'Get over', options: ['Przejść przez coś', 'Przeskoczyć', 'Dojść do siebie / Pogodzić się z czymś', 'Zachorować'], correctAnswer: 'Dojść do siebie / Pogodzić się z czymś' },
  { id: 29, language: 'English', word: 'Grow up', options: ['Rosnąć w górę', 'Uprawiać rośliny', 'Dorastać', 'Zmniejszać się'], correctAnswer: 'Dorastać' },
  { id: 30, language: 'English', word: 'Set up', options: ['Usiąść', 'Postawić', 'Założyć / Zorganizować', 'Zdemontować'], correctAnswer: 'Założyć / Zorganizować' },
];
