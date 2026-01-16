
export interface Question {
  id: number;
  language: 'Spanish';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'Spanish', word: 'Estar en las nubes', options: ['Być w chmurach', 'chodzić z głową w chmurach', 'latać samolotem', 'być na szczycie'], correctAnswer: 'chodzić z głową w chmurach' },
  { id: 2, language: 'Spanish', word: 'Costar un ojo de la cara', options: ['kosztować oko', 'być bardzo drogim', 'być tanim', 'płacić gotówką'], correctAnswer: 'być bardzo drogim' },
  { id: 3, language: 'Spanish', word: 'Tomar el pelo', options: ['obcinać włosy', 'czesać się', 'nabierać kogoś', 'być poważnym'], correctAnswer: 'nabierać kogoś' },
  { id: 4, language: 'Spanish', word: 'Ser pan comido', options: ['jeść chleb', 'bułka z masłem', 'być trudnym', 'być głodnym'], correctAnswer: 'bułka z masłem' },
  { id: 5, language: 'Spanish', word: 'No tener pelos en la lengua', options: ['nie mieć włosów na języku', 'mówić prosto z mostu', 'być nieśmiałym', 'kłamać'], correctAnswer: 'mówić prosto z mostu' },
  { id: 6, language: 'Spanish', word: 'Echar una mano', options: ['odrzucić rękę', 'podać rękę / pomóc', 'walczyć', 'machnąć ręką'], correctAnswer: 'podać rękę / pomóc' },
  { id: 7, language: 'Spanish', word: 'Tirar la toalla', options: ['rzucić ręcznik', 'poddawać się', 'iść pod prysznic', 'wycierać się'], correctAnswer: 'poddawać się' },
  { id: 8, language: 'Spanish', word: 'Hablar por los codos', options: ['mówić łokciami', 'dużo mówić / paplać', 'szeptać', 'milczeć'], correctAnswer: 'dużo mówić / paplać' },
  { id: 9, language: 'Spanish', word: 'Ponerse las pilas', options: ['wkładać baterie', 'wziąć się do roboty', 'odpoczywać', 'być zmęczonym'], correctAnswer: 'wziąć się do roboty' },
  { id: 10, language: 'Spanish', word: 'Matar dos pájaros de un tiro', options: ['zabić dwa ptaki jednym strzałem', 'upiec dwie pieczenie na jednym ogniu', 'polować', 'chronić ptaki'], correctAnswer: 'upiec dwie pieczenie na jednym ogniu' },
  { id: 11, language: 'Spanish', word: 'Ser un trozo de pan', options: ['być kawałkiem chleba', 'być dobrym jak chleb', 'być piekarzem', 'jeść kanapki'], correctAnswer: 'być dobrym jak chleb' },
  { id: 12, language: 'Spanish', word: 'Estar como una cabra', options: ['być jak koza', 'być szalonym', 'wspinać się po górach', 'jeść trawę'], correctAnswer: 'być szalonym' },
  { id: 13, language: 'Spanish', word: 'No pegar ojo', options: ['nie zmrużyć oka', 'nie spać całą noc', 'dobrze spać', 'być ślepym'], correctAnswer: 'nie zmrużyć oka' },
  { id: 14, language: 'Spanish', word: 'Importar un pimiento', options: ['importować paprykę', 'w ogóle się nie liczyć', 'być ważnym', 'gotować leczo'], correctAnswer: 'w ogóle się nie liczyć' },
  { id: 15, language: 'Spanish', word: 'Dar en el clavo', options: ['uderzyć w gwóźdź', 'trafić w sedno', 'popełnić błąd', 'budować dom'], correctAnswer: 'trafić w sedno' },
  { id: 16, language: 'Spanish', word: 'Cuando las ranas críen pelo', options: ['kiedy żaby zapuszczą włosy', 'na święty nigdy', 'wkrótce', 'za rok'], correctAnswer: 'na święty nigdy' },
  { id: 17, language: 'Spanish', word: 'Tener mala leche', options: ['mieć złe mleko', 'mieć zły humor / być wrednym', 'pić mleko', 'być miłym'], correctAnswer: 'mieć zły humor / być wrednym' },
  { id: 18, language: 'Spanish', word: 'Buscarle tres pies al gato', options: ['szukać trzeciej nogi u kota', 'szukać dziury w całym', 'bawić się z kotem', 'być realistą'], correctAnswer: 'szukać dziury w całym' },
  { id: 19, language: 'Spanish', word: 'Ahogarse en un vaso de agua', options: ['utopić się w szklance wody', 'robić z igły widły', 'pić wodę', 'zachować spokój'], correctAnswer: 'robić z igły widły' },
  { id: 20, language: 'Spanish', word: 'Andar con pies de plomo', options: ['chodzić ołowianymi stopami', 'postępować ostrożnie', 'ciężko stąpać', 'być niezdarnym'], correctAnswer: 'postępować ostrożnie' },
  { id: 21, language: 'Spanish', word: 'Bailar con la más fea', options: ['tańczyć z najbrzydszą', 'wykonywać najgorszą pracę', 'iść na imprezę', 'dobrze się bawić'], correctAnswer: 'wykonywać najgorszą pracę' },
  { id: 22, language: 'Spanish', word: 'Caerse del guindo', options: ['spaść z wiśni', 'urodzić się wczoraj', 'być naiwnym', 'zbierać owoce'], correctAnswer: 'urodzić się wczoraj' },
  { id: 23, language: 'Spanish', word: 'Cruzar el charco', options: ['przekroczyć kałużę', 'przekroczyć Atlantyk', 'pływać w basenie', 'unikać wody'], correctAnswer: 'przekroczyć Atlantyk' },
  { id: 24, language: 'Spanish', word: 'Dormir a pierna suelta', options: ['spać z luźną nogą', 'spać kamiennym snem', 'mieć bezsenność', 'wiercić się w nocy'], correctAnswer: 'spać kamiennym snem' },
  { id: 25, language: 'Spanish', word: 'Estar hasta en la sopa', options: ['być nawet w zupie', 'być wszędzie', 'gotować zupę', 'być rzadko spotykanym'], correctAnswer: 'być wszędzie' },
  { id: 26, language: 'Spanish', word: 'Faltarle un tornillo', options: ['brakować śruby', 'brakować piątej klepki', 'być roztargnionym', 'naprawiać coś'], correctAnswer: 'brakować piątej klepki' },
  { id: 27, language: 'Spanish', word: 'Hacerse el sueco', options: ['robić się Szwedem', 'udawać głupiego', 'uczyć się szwedzkiego', 'podróżować do Szwecji'], correctAnswer: 'udawać głupiego' },
  { id: 28, language: 'Spanish', word: 'Irse por las ramas', options: ['iść po gałęziach', 'odchodzić od tematu / owijać w bawełnę', 'mówić na temat', 'wspinać się na drzewa'], correctAnswer: 'odchodzić od tematu / owijać w bawełnę' },
  { id: 29, language: 'Spanish', word: 'Verle las orejas al lobo', options: ['zobaczyć uszy wilka', 'znaleźć się w niebezpieczeństwie', 'polować na wilki', 'być odważnym'], correctAnswer: 'znaleźć się w niebezpieczeństwie' },
  { id: 30, language: 'Spanish', word: 'Tener la sartén por el mango', options: ['trzymać patelnię za rączkę', 'mieć władzę / kontrolować sytuację', 'gotować', 'myć naczynia'], correctAnswer: 'mieć władzę / kontrolować sytuację' },
];
