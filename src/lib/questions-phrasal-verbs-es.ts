
export interface Question {
  id: number;
  language: 'Spanish';
  word: string;
  options: string[];
  correctAnswer: string;
}

// Spanish prepositional verbs
export const questions: Question[] = [
  { id: 1, language: 'Spanish', word: 'pensar en', options: ['myśleć o', 'myśleć, że', 'śnić o', 'zapominać o'], correctAnswer: 'myśleć o' },
  { id: 2, language: 'Spanish', word: 'soñar con', options: ['marzyć o', 'wiedzieć o', 'myśleć o', 'pamiętać o'], correctAnswer: 'marzyć o' },
  { id: 3, language: 'Spanish', word: 'acabar de', options: ['zacząć coś robić', 'właśnie coś zrobić', 'skończyć coś robić', 'próbować coś zrobić'], correctAnswer: 'właśnie coś zrobić' },
  { id: 4, language: 'Spanish', word: 'darse cuenta de', options: ['pokazywać coś', 'zdać sobie sprawę z', 'ignorować coś', 'wiedzieć o czymś'], correctAnswer: 'zdać sobie sprawę z' },
  { id: 5, language: 'Spanish', word: 'empezar a', options: ['zaczynać coś robić', 'kończyć coś robić', 'kontynuować robienie', 'przestać robić'], correctAnswer: 'zaczynać coś robić' },
  { id: 6, language: 'Spanish', word: 'dejar de', options: ['zacząć', 'próbować', 'kontynuować', 'przestać'], correctAnswer: 'przestać' },
  { id: 7, language: 'Spanish', word: 'tratar de', options: ['odnosić sukces', 'próbować', 'unikać', 'kontynuować'], correctAnswer: 'próbować' },
  { id: 8, language: 'Spanish', word: 'enamorarse de', options: ['przyjaźnić się z', 'kłócić się z', 'zakochać się w', 'rozstać się z'], correctAnswer: 'zakochać się w' },
  { id: 9, language: 'Spanish', word: 'depender de', options: ['zależeć od', 'pomagać komuś', 'ufać komuś', 'nie zgadzać się z'], correctAnswer: 'zależeć od' },
  { id: 10, language: 'Spanish', word: 'consistir en', options: ['wykluczać coś', 'zawierać coś', 'polegać na', 'różnić się od'], correctAnswer: 'polegać na' },
  { id: 11, language: 'Spanish', word: 'contar con', options: ['liczyć coś', 'liczyć na kogoś', 'opowiadać o', 'ignorować kogoś'], correctAnswer: 'liczyć na kogoś' },
  { id: 12, language: 'Spanish', word: 'aprender a', options: ['uczyć kogoś', 'uczyć się (czegoś robić)', 'wiedzieć jak', 'zapominać jak'], correctAnswer: 'uczyć się (czegoś robić)' },
  { id: 13, language: 'Spanish', word: 'ayudar a', options: ['przeszkadzać', 'prosić o pomoc', 'pomagać', 'patrzeć na'], correctAnswer: 'pomagać' },
  { id: 14, language: 'Spanish', word: 'invitar a', options: ['zapraszać na', 'odmawiać', 'wychodzić z', 'płacić za'], correctAnswer: 'zapraszać na' },
  { id: 15, language: 'Spanish', word: 'quejarse de', options: ['chwalić coś', 'narzekać na', 'cieszyć się z', 'być zadowolonym z'], correctAnswer: 'narzekać na' },
  { id: 16, language: 'Spanish', word: 'reírse de', options: ['śmiać się z', 'płakać przez', 'być poważnym', 'żartować z'], correctAnswer: 'śmiać się z' },
  { id: 17, language: 'Spanish', word: 'acordarse de', options: ['zapominać o', 'pamiętać o', 'zgadzać się z', 'marzyć o'], correctAnswer: 'pamiętać o' },
  { id: 18, language: 'Spanish', word: 'olvidarse de', options: ['pamiętać o', 'zapominać o', 'wspominać', 'notować'], correctAnswer: 'zapominać o' },
  { id: 19, language: 'Spanish', word: 'preocuparse por', options: ['martwić się o', 'cieszyć się z', 'być obojętnym na', 'śmiać się z'], correctAnswer: 'martwić się o' },
  { id: 20, language: 'Spanish', word: 'confiar en', options: ['wątpić w', 'ufać komuś/czemuś', 'bać się', 'nie wierzyć'], correctAnswer: 'ufać komuś/czemuś' },
  { id: 21, language: 'Spanish', word: 'disfrutar de', options: ['cierpieć z powodu', 'cieszyć się z / korzystać z', 'unikać', 'narzekać na'], correctAnswer: 'cieszyć się z / korzystać z' },
  { id: 22, language: 'Spanish', word: 'fijarse en', options: ['ignorować', 'zwracać uwagę na', 'patrzeć przez', 'zapominać o'], correctAnswer: 'zwracać uwagę na' },
  { id: 23, language: 'Spanish', word: 'influir en', options: ['mieć wpływ na', 'być pod wpływem', 'ignorować', 'przeciwstawiać się'], correctAnswer: 'mieć wpływ na' },
  { id: 24, language: 'Spanish', word: 'participar en', options: ['obserwować', 'brać udział w', 'organizować', 'rezygnować z'], correctAnswer: 'brać udział w' },
  { id: 25, language: 'Spanish', word: 'preguntar por', options: ['odpowiadać na', 'pytać o', 'ignorować pytanie', 'wiedzieć'], correctAnswer: 'pytać o' },
  { id: 26, language: 'Spanish', word: 'tardar en', options: ['spóźniać się z', 'robić coś szybko', 'śpieszyć się', 'kończyć na czas'], correctAnswer: 'spóźniać się z' },
  { id: 27, language: 'Spanish', word: 'insistir en', options: ['nalegać na', 'rezygnować z', 'wątpić w', 'zgadzać się na'], correctAnswer: 'nalegać na' },
  { id: 28, language: 'Spanish', word: 'alegrarse de', options: ['smucić się z powodu', 'cieszyć się z', 'być złym na', 'narzekać na'], correctAnswer: 'cieszyć się z' },
  { id: 29, language: 'Spanish', word: 'casarse con', options: ['rozwodzić się z', 'wychodzić za mąż za / żenić się z', 'spotykać się z', 'zerwać z'], correctAnswer: 'wychodzić za mąż za / żenić się z' },
  { id: 30, language: 'Spanish', word: 'terminar de', options: ['zaczynać coś robić', 'kończyć coś robić', 'kontynuować', 'przerywać'], correctAnswer: 'kończyć coś robić' },
];
