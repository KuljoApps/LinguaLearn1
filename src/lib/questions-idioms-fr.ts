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
  { id: 11, language: 'French', word: 'Avoir la frite', options: ['Być smutnym', 'Być w świetnej formie', 'Jeść frytki', 'Być zmęczonym'], correctAnswer: 'Być w świetnej formie' },
  { id: 12, language: 'French', word: 'Se creuser la tête', options: ['Masować głowę', 'Być zmęczonym', 'Głowić się', 'Odpoczywać'], correctAnswer: 'Głowić się' },
  { id: 13, language: 'French', word: 'Boire comme un trou', options: ['Pić przez słomkę', 'Być spragnionym', 'Pić na umór', 'Mało pić'], correctAnswer: 'Pić na umór' },
  { id: 14, language: 'French', word: 'Avoir le cafard', options: ['Mieć karalucha', 'Mieć chandrę', 'Bać się owadów', 'Być wesołym'], correctAnswer: 'Mieć chandrę' },
  { id: 15, language: 'French', word: 'Faire la sourde oreille', options: ['Być głuchym', 'Słuchać uważnie', 'Puszczać mimo uszu', 'Nosic aparat słuchowy'], correctAnswer: 'Puszczać mimo uszu' },
  { id: 16, language: 'French', word: 'Donner sa langue au chat', options: ['Dać język kotu', 'Poddawać się (nie znając odpowiedzi)', 'Rozmawiać z kotem', 'Być gadułą'], correctAnswer: 'Poddawać się (nie znając odpowiedzi)' },
  { id: 17, language: 'French', word: 'En faire tout un fromage', options: ['Robić z tego ser', 'Robić z igły widły', 'Jeść ser', 'Sprzedawać nabiał'], correctAnswer: 'Robić z igły widły' },
  { id: 18, language: 'French', word: 'Mettre son grain de sel', options: ['Dodać ziarnko soli', 'Wtrącać swoje trzy grosze', 'Gotować', 'Być pomocnym'], correctAnswer: 'Wtrącać swoje trzy grosze' },
  { id: 19, language: 'French', word: 'Avoir le cœur sur la main', options: ['Mieć serce na dłoni', 'Być hojnym', 'Być zakochanym', 'Mieć problemy z sercem'], correctAnswer: 'Być hojnym' },
  { id: 20, language: 'French', word: 'Ne pas y aller par quatre chemins', options: ['Nie iść czterema drogami', 'Mówić prosto z mostu', 'Gubić się', 'Być niezdecydowanym'], correctAnswer: 'Mówić prosto z mostu' },
  { id: 21, language: 'French', word: 'Rouler sur l\'or', options: ['Toczyć się po złocie', 'Być bardzo bogatym', 'Szukać złota', 'Być biednym'], correctAnswer: 'Być bardzo bogatym' },
  { id: 22, language: 'French', word: 'Avoir la gueule de bois', options: ['Mieć drewnianą twarz', 'Mieć kaca', 'Być zmęczonym', 'Być smutnym'], correctAnswer: 'Mieć kaca' },
  { id: 23, language: 'French', word: 'Ne pas être sorti de l\'auberge', options: ['Nie wyjść z gospody', 'Być w trudnej sytuacji', 'Dobrze się bawić', 'Być na wakacjach'], correctAnswer: 'Być w trudnej sytuacji' },
  { id: 24, language: 'French', word: 'Prendre ses jambes à son cou', options: ['Wziąć nogi za pas', 'Biec bardzo szybko', 'Być zmęczonym', 'Iść na spacer'], correctAnswer: 'Wziąć nogi za pas' },
  { id: 25, language: 'French', word: 'Mener quelqu\'un en bateau', options: ['Prowadzić kogoś na łódce', 'Wodzić kogoś za nos', 'Iść na rejs', 'Pomagać komuś'], correctAnswer: 'Wodzić kogoś za nos' },
  { id: 26, language: 'French', word: 'Avoir un poil dans la main', options: ['Mieć włos w dłoni', 'Być leniwym', 'Być pracowitym', 'Mieć brudne ręce'], correctAnswer: 'Być leniwym' },
  { id: 27, language: 'French', word: 'Se jeter dans la gueule du loup', options: ['Rzucić się w paszczę wilka', 'Pchać się w kłopoty', 'Być odważnym', 'Polować na wilki'], correctAnswer: 'Pchać się w kłopoty' },
  { id: 28, language: 'French', word: 'Filer à l\'anglaise', options: ['Uciec po angielsku', 'Wyjść niepostrzeżenie', 'Uczyć się angielskiego', 'Podróżować do Anglii'], correctAnswer: 'Wyjść niepostrzeżenie' },
  { id: 29, language: 'French', word: 'Avoir la chair de poule', options: ['Mieć skórę z kurczaka', 'Mieć gęsią skórkę', 'Bać się', 'Być głodnym'], correctAnswer: 'Mieć gęsią skórkę' },
  { id: 30, language: 'French', word: 'Casser les pieds à quelqu\'un', options: ['Łamać komuś stopy', 'Zawracać komuś głowę', 'Masować stopy', 'Pomagać komuś'], correctAnswer: 'Zawracać komuś głowę' },
];
