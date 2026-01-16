export interface Question {
  id: number;
  language: 'French';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'French', word: 'Pleuvoir des cordes', options: ['Padać sznurkami', 'Lać jak z cebra', 'Słoneczna pogoda', 'Lekki deszczyk'], correctAnswer: 'Lać jak z cebra' },
  { id: 2, language: 'French', word: 'Quand les poules auront des dents', options: ['Kiedy kury będą miały zęby', 'Na święty nigdy', 'Już wkrótce', 'Za rok'], correctAnswer: 'Na święty nigdy' },
  { id: 3, language: 'French', word: 'Avoir un chat dans la gorge', options: ['Mieć kota w gardle', 'Chrypieć', 'Być głodnym', 'Głaskać kota'], correctAnswer: 'Chrypieć' },
  { id: 4, language: 'French', word: 'Revenons à nos moutons', options: ['Wróćmy do naszych owiec', 'Wróćmy do tematu', 'Idźmy na farmę', 'Liczyć barany'], correctAnswer: 'Wróćmy do tematu' },
  { id: 5, language: 'French', word: 'Faire d\'une pierre deux coups', options: ['Zrobić z kamienia dwa uderzenia', 'Upiec dwie pieczenie na jednym ogniu', 'Rzucać kamieniami', 'Budować dom'], correctAnswer: 'Upiec dwie pieczenie na jednym ogniu' },
  { id: 6, language: 'French', word: 'Poser un lapin à quelqu\'un', options: ['Położyć królika na kimś', 'Wystawić kogoś do wiatru', 'Dać komuś prezent', 'Gotować królika'], correctAnswer: 'Wystawić kogoś do wiatru' },
  { id: 7, language: 'French', word: 'Raconter des salades', options: ['Opowiadać o sałatkach', 'Mówić prawdę', 'Opowiadać bzdury', 'Jeść sałatkę'], correctAnswer: 'Opowiadać bzdury' },
  { id: 8, language: 'French', word: 'Tomber sur quelqu\'un', options: ['Upaść na kogoś', 'Spotkać kogoś przypadkiem', 'Zaatakować kogoś', 'Zakochać się'], correctAnswer: 'Spotkać kogoś przypadkiem' },
  { id: 9, language: 'French', word: 'Chercher midi à quatorze heures', options: ['Szukać południa o czternastej', 'Komplikować proste sprawy', 'Być punktualnym', 'Spóźniać się'], correctAnswer: 'Komplikować proste sprawy' },
  { id: 10, language: 'French', word: 'Appeler un chat un chat', options: ['Nazywać kota kotem', 'Nazywać rzeczy po imieniu', 'Mówić niejasno', 'Bawić się z kotem'], correctAnswer: 'Nazywać rzeczy po imieniu' },
];
