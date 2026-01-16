export interface Question {
  id: number;
  language: 'French';
  word: string;
  options: string[];
  correctAnswer: string;
}

// Note: Phrasal verbs are less common in French. This list contains common verb expressions.
export const questions: Question[] = [
  { id: 1, language: 'French', word: 'en avoir marre', options: ['mieć dość', 'być szczęśliwym', 'kochać kogoś', 'nudzić się'], correctAnswer: 'mieć dość' },
  { id: 2, language: 'French', word: 'jeter un œil', options: ['stracić oko', 'płakać', 'rzucać okiem', 'patrzeć w lustro'], correctAnswer: 'rzucać okiem' },
  { id: 3, language: 'French', word: 'faire la grasse matinée', options: ['wcześnie wstawać', 'jeść śniadanie', 'długo spać', 'pracować rano'], correctAnswer: 'długo spać' },
  { id: 4, language: 'French', word: 'tomber dans les pommes', options: ['jeść jabłka', 'zbierać owoce', 'zakochać się', 'zemdleć'], correctAnswer: 'zemdleć' },
  { id: 5, language: 'French', word: 'donner un coup de main', options: ['podać rękę', 'uderzyć kogoś', 'pomóc komuś', 'odmówić pomocy'], correctAnswer: 'pomóc komuś' },
  { id: 6, language: 'French', word: 'se prendre la tête', options: ['trzymać się za głowę', 'myśleć intensywnie', 'denerwować się', 'być dumnym'], correctAnswer: 'denerwować się' },
  { id: 7, language: 'French', word: 'mettre les pieds dans le plat', options: ['włożyć stopy do naczynia', 'gotować obiad', 'popełnić gafę', 'tańczyć'], correctAnswer: 'popełnić gafę' },
  { id: 8, language: 'French', word: 'coûter les yeux de la tête', options: ['kosztować oczy', 'być tanim', 'być bardzo drogim', 'patrzeć na cenę'], correctAnswer: 'być bardzo drogim' },
  { id: 9, language: 'French', word: 'ne pas être dans son assiette', options: ['nie być na talerzu', 'być głodnym', 'źle się czuć', 'być na diecie'], correctAnswer: 'źle się czuć' },
  { id: 10, language: 'French', word: 'arriver comme un cheveu sur la soupe', options: ['być jak włos w zupie', 'przyjść w samą porę', 'pojawić się nie w porę', 'gotować zupę'], correctAnswer: 'pojawić się nie w porę' },
];
