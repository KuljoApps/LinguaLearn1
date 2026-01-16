
export interface Question {
  id: number;
  language: 'German';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  { id: 1, language: 'German', word: 'Tomaten auf den Augen haben', options: ['mieć pomidory na oczach', 'być ślepym na coś oczywistego', 'jeść sałatkę', 'mieć czerwone oczy'], correctAnswer: 'być ślepym na coś oczywistego' },
  { id: 2, language: 'German', word: 'Ich verstehe nur Bahnhof', options: ['rozumiem tylko dworzec', 'nic nie rozumiem', 'jadę pociągiem', 'czekam na pociąg'], correctAnswer: 'nic nie rozumiem' },
  { id: 3, language: 'German', word: 'Da steppt der Bär', options: ['tam stepuje niedźwiedź', 'jest super impreza', 'jest niebezpiecznie', 'jest nudno'], correctAnswer: 'jest super impreza' },
  { id: 4, language: 'German', word: 'eine Extrawurst verlangen', options: ['zamawiać dodatkową kiełbasę', 'chcieć specjalnego traktowania', 'być głodnym', 'jeść obiad'], correctAnswer: 'chcieć specjalnego traktowania' },
  { id: 5, language: 'German', word: 'Schwein haben', options: ['mieć świnię', 'mieć szczęście', 'brudzić się', 'jeść wieprzowinę'], correctAnswer: 'mieć szczęście' },
  { id: 6, language: 'German', word: 'die Daumen drücken', options: ['ściskać kciuki', 'trzymać kciuki', 'mieć bolące palce', 'pokazywać kciuk w górę'], correctAnswer: 'trzymać kciuki' },
  { id: 7, language: 'German', word: 'jemandem auf den Wecker gehen', options: ['iść komuś na budzik', 'działać komuś na nerwy', 'budzić kogoś', 'naprawiać zegarek'], correctAnswer: 'działać komuś na nerwy' },
  { id: 8, language: 'German', word: 'zwei Fliegen mit einer Klappe schlagen', options: ['uderzyć dwie muchy jedną packą', 'upiec dwie pieczenie na jednym ogniu', 'polować na muchy', 'być szybkim'], correctAnswer: 'upiec dwie pieczenie na jednym ogniu' },
  { id: 9, language: 'German', word: 'den Nagel auf den Kopf treffen', options: ['uderzyć gwóźdź w głowę', 'trafić w sedno', 'popełnić błąd', 'budować coś'], correctAnswer: 'trafić w sedno' },
  { id: 10, language: 'German', word: 'Hals- und Beinbruch!', options: ['złamania szyi i nogi', 'połamania nóg!', 'życzyć komuś źle', 'iść do lekarza'], correctAnswer: 'połamania nóg!' },
  { id: 11, language: 'German', word: 'ins Fettnäpfchen treten', options: ['wdepnąć w miskę z tłuszczem', 'popełnić gafę', 'gotować', 'brudzić buty'], correctAnswer: 'popełnić gafę' },
  { id: 12, language: 'German', word: 'die Katze im Sack kaufen', options: ['kupować kota w worku', 'kupować coś w ciemno', 'iść na zakupy z kotem', 'adoptować kota'], correctAnswer: 'kupować coś w ciemno' },
  { id: 13, language: 'German', word: 'Krokodilstränen weinen', options: ['płakać krokodylimi łzami', 'udawać smutek', 'bać się krokodyli', 'płakać ze szczęścia'], correctAnswer: 'udawać smutek' },
  { id: 14, language: 'German', word: 'aus einer Mücke einen Elefanten machen', options: ['robić z komara słonia', 'robić z igły widły', 'przesadzać', 'lubić zwierzęta'], correctAnswer: 'robić z igły widły' },
  { id: 15, language: 'German', word: 'das Haar in der Suppe finden', options: ['znaleźć włos w zupie', 'szukać dziury w całym', 'być wybrednym', 'narzekać na jedzenie'], correctAnswer: 'szukać dziury w całym' },
  { id: 16, language: 'German', word: 'jemandem einen Bären aufbinden', options: ['przywiązać komuś niedźwiedzia', 'wciskać komuś kit', 'opowiadać bajki', 'żartować'], correctAnswer: 'wciskać komuś kit' },
  { id: 17, language: 'German', word: 'nicht alle Tassen im Schrank haben', options: ['nie mieć wszystkich filiżanek w szafie', 'mieć nie po kolei w głowie', 'być roztargnionym', 'robić porządki'], correctAnswer: 'mieć nie po kolei w głowie' },
  { id: 18, language: 'German', word: 'das Kind mit dem Bade ausschütten', options: ['wylać dziecko z kąpielą', 'działać zbyt pochopnie', 'pozbywać się czegoś dobrego wraz ze złym', 'kąpać dziecko'], correctAnswer: 'wylać dziecko z kąpielą' },
  { id: 19, language: 'German', word: 'blau machen', options: ['robić na niebiesko', 'iść na wagary', 'malować', 'być smutnym'], correctAnswer: 'iść na wagary' },
  { id: 20, language: 'German', word: 'auf dem Holzweg sein', options: ['być na drewnianej drodze', 'być w błędzie', 'spacerować po lesie', 'gubić się'], correctAnswer: 'być w błędzie' },
  { id: 21, language: 'German', word: 'ins kalte Wasser springen', options: ['skakać do zimnej wody', 'zostać rzuconym na głęboką wodę', 'pływać', 'podejmować ryzyko'], correctAnswer: 'zostać rzuconym na głęboką wodę' },
  { id: 22, language: 'German', word: 'den Faden verlieren', options: ['zgubić nić', 'stracić wątek', 'szyć', 'być zdezorientowanym'], correctAnswer: 'stracić wątek' },
  { id: 23, language: 'German', word: 'Geld zum Fenster hinauswerfen', options: ['wyrzucać pieniądze przez okno', 'trwonić pieniądze', 'być rozrzutnym', 'wietrzyć pokój'], correctAnswer: 'trwonić pieniądze' },
  { id: 24, language: 'German', word: 'seinem Senf dazugeben', options: ['dodać swoją musztardę', 'wtrącać swoje trzy grosze', 'przyprawiać danie', 'mieć własne zdanie'], correctAnswer: 'wtrącać swoje trzy grosze' },
  { id: 25, language: 'German', word: 'jemandem die Show stehlen', options: ['ukraść komuś przedstawienie', 'skraść komuś show', 'być w centrum uwagi', 'występować na scenie'], correctAnswer: 'skraść komuś show' },
  { id: 26, language: 'German', word: 'Haare auf den Zähnen haben', options: ['mieć włosy na zębach', 'być wyszczekanym', 'być niegrzecznym', 'iść do dentysty'], correctAnswer: 'być wyszczekanym' },
  { id: 27, language: 'German', word: 'Öl ins Feuer gießen', options: ['dolewać oliwy do ognia', 'pogarszać sytuację', 'gasić pożar', 'gotować na oleju'], correctAnswer: 'dolewać oliwy do ognia' },
  { id: 28, language: 'German', word: 'in den sauren Apfel beißen', options: ['ugryźć kwaśne jabłko', 'zacisnąć zęby i coś zrobić', 'jeść owoce', 'podejmować trudną decyzję'], correctAnswer: 'zacisnąć zęby i coś zrobić' },
  { id: 29, language: 'German', word: 'ein Brett vor dem Kopf haben', options: ['mieć deskę przed głową', 'myśleć wolno', 'być tępym', 'nie rozumieć czegoś oczywistego'], correctAnswer: 'nie rozumieć czegoś oczywistego' },
  { id: 30, language: 'German', word: 'die Kirche im Dorf lassen', options: ['zostawić kościół we wsi', 'nie przesadzać', 'zachować umiar', 'iść do kościoła'], correctAnswer: 'nie przesadzać' },
];
