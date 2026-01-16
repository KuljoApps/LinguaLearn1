export interface Question {
  id: number;
  language: 'English';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'English', word: 'Bite the bullet', options: ['Zacisnąć zęby', 'Zjeść nabój', 'Strzelać ślepakami', 'Ugryźć w język'], correctAnswer: 'Zacisnąć zęby' },
  { id: 2, language: 'English', word: 'Break a leg', options: ['Złamać nogę', 'Połamania nóg', 'Skręcić kostkę', 'Iść na spacer'], correctAnswer: 'Połamania nóg' },
  { id: 3, language: 'English', word: 'Hit the sack', options: ['Uderzyć w worek', 'Pójść spać', 'Dostać w kość', 'Zacząć pracę'], correctAnswer: 'Pójść spać' },
  { id: 4, language: 'English', word: 'Once in a blue moon', options: ['Raz na ruski rok', 'Pod osłoną nocy', 'Każdej pełni', 'Nigdy'], correctAnswer: 'Raz na ruski rok' },
  { id: 5, language: 'English', word: 'A piece of cake', options: ['Kawałek ciasta', 'Bułka z masłem', 'Słodka niespodzianka', 'Deser'], correctAnswer: 'Bułka z masłem' },
  { id: 6, language: 'English', word: 'Let the cat out of the bag', options: ['Wypuścić kota z worka', 'Puścić farbę', 'Nakrzyczeć na kogoś', 'Mieć kota w worku'], correctAnswer: 'Puścić farbę' },
  { id: 7, language: 'English', word: 'Spill the beans', options: ['Rozsypać fasolki', 'Wygadać się', 'Zrobić bałagan', 'Ugotować zupę'], correctAnswer: 'Wygadać się' },
  { id: 8, language: 'English', word: 'The ball is in your court', options: ['Piłka jest po twojej stronie', 'Teraz twoja kolej', 'Grać w tenisa', 'Zostać na lodzie'], correctAnswer: 'Teraz twoja kolej' },
  { id: 9, language: 'English', word: 'To feel under the weather', options: ['Czuć się źle', 'Obserwować pogodę', 'Być na zewnątrz', 'Zmarznąć'], correctAnswer: 'Czuć się źle' },
  { id: 10, language: 'English', word: 'When pigs fly', options: ['Gdy świnie zaczną latać', 'W odległej przyszłości', 'Na święty nigdy', 'Jutro'], correctAnswer: 'Na święty nigdy' },
  { id: 11, language: 'English', word: 'Cost an arm and a leg', options: ['Kosztować fortunę', 'Być tanim jak barszcz', 'Mieć długie ręce', 'Płacić z własnej kieszeni'], correctAnswer: 'Kosztować fortunę' },
  { id: 12, language: 'English', word: 'Cross that bridge when you come to it', options: ['Będziemy się martwić, jak przyjdzie czas', 'Przechodzić na drugą stronę', 'Planować z góry', 'Budować mosty'], correctAnswer: 'Będziemy się martwić, jak przyjdzie czas' },
  { id: 13, language: 'English', word: 'Cut corners', options: ['Iść na skróty / Oszczędzać', 'Być dokładnym', 'Ciąć papier', 'Robić coś powoli'], correctAnswer: 'Iść na skróty / Oszczędzać' },
  { id: 14, language: 'English', word: 'Get out of hand', options: ['Wymknąć się spod kontroli', 'Trzymać rękę na pulsie', 'Umywać ręce', 'Mieć coś w garści'], correctAnswer: 'Wymknąć się spod kontroli' },
  { id: 15, language: 'English', word: 'Go back to the drawing board', options: ['Zacząć od nowa', 'Skończyć pracę', 'Iść na przerwę', 'Poprawić rysunek'], correctAnswer: 'Zacząć od nowa' },
  { id: 16, language: 'English', word: 'Hang in there', options: ['Powieś to tam', 'Iść na spacer', 'Trzymaj się', 'Zrezygnuj'], correctAnswer: 'Trzymaj się' },
  { id: 17, language: 'English', word: 'Let someone off the hook', options: ['Zdjąć kogoś z haka', 'Darować komuś winę', 'Złapać rybę', 'Pomóc komuś'], correctAnswer: 'Darować komuś winę' },
  { id: 18, language: 'English', word: 'Miss the boat', options: ['Spóźnić się na statek', 'Ominąć łódkę', 'Przegapić okazję', 'Płynąć łódką'], correctAnswer: 'Przegapić okazję' },
  { id: 19, language: 'English', word: 'Pull yourself together', options: ['Wziąć się w garść', 'Ciągnąć za sznurki', 'Ubrać się', 'Rozciągać się'], correctAnswer: 'Wziąć się w garść' },
  { id: 20, language: 'English', word: 'Sit on the fence', options: ['Siedzieć na płocie', 'Być niezdecydowanym', 'Odpoczywać', 'Obserwować'], correctAnswer: 'Być niezdecydowanym' },
  { id: 21, language: 'English', word: 'Speak of the devil', options: ['Mówić o diable', 'Kłamać', 'O wilku mowa', 'Modlić się'], correctAnswer: 'O wilku mowa' },
  { id: 22, language: 'English', word: 'Steal someone\'s thunder', options: ['Ukraść komuś grzmot', 'Być głośniejszym', 'Ukraść komuś show', 'Pomóc komuś'], correctAnswer: 'Ukraść komuś show' },
  { id: 23, language: 'English', word: 'The last straw', options: ['Ostatnia słomka', 'Ostatnia kropla', 'Koniec picia', 'Ostatnia szansa'], correctAnswer: 'Ostatnia kropla' },
  { id: 24, language: 'English', word: 'Throw caution to the wind', options: ['Rzucać ostrożność na wiatr', 'Być ostrożnym', 'Zrobić coś bez zastanowienia', 'Czekać na wiatr'], correctAnswer: 'Zrobić coś bez zastanowienia' },
  { id: 25, language: 'English', word: 'You can\'t judge a book by its cover', options: ['Nie oceniaj książki po okładce', 'Kupować drogie książki', 'Czytać tylko okładki', 'Oceniać wygląd'], correctAnswer: 'Nie oceniaj książki po okładce' },
  { id: 26, language: 'English', word: 'A blessing in disguise', options: ['Błogosławieństwo w przebraniu', 'Ukryty prezent', 'Szczęście w nieszczęściu', 'Zły omen'], correctAnswer: 'Szczęście w nieszczęściu' },
  { id: 27, language: 'English', word: 'Call it a day', options: ['Nazwać to dniem', 'Zakończyć na dziś', 'Pracować cały dzień', 'Zacząć od nowa'], correctAnswer: 'Zakończyć na dziś' },
  { id: 28, language: 'English', word: 'Get your act together', options: ['Zorganizować przedstawienie', 'Weź się do roboty', 'Pozbierać swoje rzeczy', 'Oglądać sztukę'], correctAnswer: 'Weź się do roboty' },
  { id: 29, language: 'English', word: 'Better late than never', options: ['Być spóźnionym', 'Nigdy nie jest za późno', 'Lepiej późno niż wcale', 'Zawsze na czas'], correctAnswer: 'Lepiej późno niż wcale' },
  { id: 30, language: 'English', word: 'Add insult to injury', options: ['Dodać obrazę do rany', 'Pogarszać sytuację', 'Leczyć rany', 'Dolewać oliwy do ognia'], correctAnswer: 'Dolewać oliwy do ognia' },
];
