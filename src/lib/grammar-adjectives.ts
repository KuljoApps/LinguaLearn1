import type { GrammarContent } from './grammar';

export const adjectivesContent: GrammarContent = {
    en: {
        'adjectives': {
          title: 'Adjectives',
          content: [
            {
              heading: 'Pozycja przymiotnika',
              text: 'Przymiotniki w języku angielskim prawie zawsze występują przed rzeczownikiem, który opisują. Jest to jedna z fundamentalnych zasad gramatycznych tego języka.',
              examples: [
                { original: 'I drive a black car.', translation: 'Jeżdżę czarnym samochodem.' },
                { original: 'She is an intelligent woman.', translation: 'Ona jest inteligentną kobietą.' }
              ]
            },
            {
              heading: 'Kolejność przymiotników (Royal Order of Adjectives)',
              text: 'Gdy używamy kilku przymiotników, zazwyczaj układamy je w określonej kolejności: opinia (opinion), rozmiar (size), wiek (age), kształt (shape), kolor (color), pochodzenie (origin), materiał (material), przeznaczenie (purpose).',
              examples: [
                { original: 'She has a beautiful small new red Italian leather bag.', translation: 'Ona ma piękną, małą, nową, czerwoną, włoską, skórzaną torbę.' },
                { original: 'It’s a lovely old wooden table.', translation: 'To jest uroczy, stary, drewniany stół.' }
              ]
            },
            {
              heading: 'Stopniowanie przymiotników',
              text: 'Przymiotniki krótkie (jednosylabowe) stopniuje się przez dodanie końcówek "-er" i "-est". Dłuższe przymiotniki (zazwyczaj od dwóch sylab w górę) stopniuje się opisowo za pomocą "more" i "the most".',
              examples: [
                { original: 'This car is faster than that one.', translation: 'Ten samochód jest szybszy niż tamten.' },
                { original: 'This is the most interesting book I have ever read.', translation: 'To jest najciekawsza książka, jaką kiedykolwiek czytałem.' }
              ]
            },
            {
              heading: 'Przymiotniki nieregularne w stopniowaniu',
              text: 'Niektóre z najczęściej używanych przymiotników mają nieregularne formy stopniowania, które należy zapamiętać (np. good, bad, far).',
              examples: [
                { original: 'Her cooking is better than mine. (good-better-best)', translation: 'Jej gotowanie jest lepsze niż moje.' },
                { original: 'This is the worst movie I have seen this year. (bad-worse-worst)', translation: 'To najgorszy film, jaki widziałem w tym roku.' }
              ]
            }
          ],
        },
    },
    de: {
        'adjectives': {
            title: 'Adjektive',
            content: [
                {
                    heading: 'Odmiana przymiotnika (Adjektivdeklination)',
                    text: 'Gdy przymiotnik stoi przed rzeczownikiem, musi otrzymać odpowiednią końcówkę. Końcówka zależy od rodzajnika (określony, nieokreślony, brak), przypadku, rodzaju i liczby rzeczownika.',
                    examples: [
                        { original: 'Der rote Apfel schmeckt gut. (odmiana słaba po rodzajniku określonym)', translation: 'To czerwone jabłko dobrze smakuje.' },
                        { original: 'Ich habe einen neuen Computer gekauft. (odmiana mieszana po rodzajniku nieokreślonym)', translation: 'Kupiłem nowy komputer.' }
                    ]
                },
                {
                    heading: 'Przymiotnik jako orzecznik i przysłówek',
                    text: 'Gdy przymiotnik występuje po czasownikach takich jak "sein" (być), "werden" (stawać się), "bleiben" (pozostawać) lub opisuje czasownik (jako przysłówek), pozostaje w formie podstawowej, nieodmiennej.',
                    examples: [
                        { original: 'Das Auto ist schnell.', translation: 'Samochód jest szybki.' },
                        { original: 'Sie fährt schnell.', translation: 'Ona jedzie szybko.' }
                    ]
                },
                {
                    heading: 'Stopniowanie przymiotników (Komparation)',
                    text: 'Regularne przymiotniki stopniuje się przez dodanie końcówek "-er" (stopień wyższy) i "-(e)st" (stopień najwyższy). Stopień najwyższy w funkcji orzecznika tworzy się za pomocą "am ...-sten".',
                    examples: [
                        { original: 'Mein Bruder ist größer als ich.', translation: 'Mój brat jest wyższy ode mnie.' },
                        { original: 'Dieses Hotel ist am teuersten.', translation: 'Ten hotel jest najdroższy.' }
                    ]
                },
                {
                    heading: 'Przymiotniki nieregularne w stopniowaniu',
                    text: 'Niektóre kluczowe przymiotniki, takie jak "gut", "gern" czy "viel", mają całkowicie nieregularne formy stopniowania, które trzeba zapamiętać.',
                    examples: [
                        { original: 'Er schwimmt gut, aber sie schwimmt besser.', translation: 'On pływa dobrze, ale ona pływa lepiej.' },
                        { original: 'Ich esse gern Pizza, aber am liebsten esse ich Pasta.', translation: 'Chętnie jem pizzę, ale najchętniej jem makaron.' }
                    ]
                }
            ],
        },
    },
    es: {
        'adjectives': {
            title: 'Adjetivos',
            content: [
                {
                    heading: 'Zgodność rodzaju i liczby (Concordancia)',
                    text: 'Przymiotniki w języku hiszpańskim muszą zgadzać się z rzeczownikiem, który opisują, pod względem rodzaju (męski/żeński) i liczby (pojedyncza/mnoga). Przymiotniki zakończone na -o zmieniają je na -a w rodzaju żeńskim.',
                    examples: [
                        { original: 'El coche es rojo.', translation: 'Samochód jest czerwony.' },
                        { original: 'Las casas son rojas.', translation: 'Domy są czerwone.' }
                    ]
                },
                {
                    heading: 'Pozycja przymiotnika',
                    text: 'Zazwyczaj przymiotniki umieszcza się po rzeczowniku. Niektóre, zwłaszcza te krótkie i popularne (np. "bueno", "grande"), mogą stać przed rzeczownikiem, co czasem zmienia ich znaczenie.',
                    examples: [
                        { original: 'Tengo un amigo pobre (biedny, w sensie finansowym).', translation: 'Mam biednego przyjaciela.' },
                        { original: 'Es un pobre hombre (godny pożałowania).', translation: 'To biedny (godny pożałowania) człowiek.' }
                    ]
                },
                {
                    heading: 'Skracanie przymiotników (Apócope)',
                    text: 'Niektóre przymiotniki, takie jak "bueno", "malo" i "grande", skracają swoją formę do "buen", "mal" i "gran", gdy stoją przed rzeczownikiem rodzaju męskiego w liczbie pojedynczej.',
                    examples: [
                        { original: 'Hace un buen día.', translation: 'Jest ładny dzień.' },
                        { original: 'Es un gran artista.', translation: 'To wielki artysta.' }
                    ]
                },
                {
                    heading: 'Stopniowanie przymiotników (Comparación)',
                    text: 'Stopień wyższy tworzy się opisowo za pomocą "más" (bardziej) i "menos" (mniej), a najwyższy przez dodanie rodzajnika określonego. Istnieją też ważne formy nieregularne.',
                    examples: [
                        { original: 'Esta casa es más grande que la tuya.', translation: 'Ten dom jest większy niż twój.' },
                        { original: 'Es el mejor restaurante de la ciudad. (bueno-mejor-el mejor)', translation: 'To jest najlepsza restauracja w mieście.' }
                    ]
                }
            ],
        },
    },
    fr: {
        'adjectives': {
            title: 'Adjectifs',
            content: [
                {
                    heading: 'Zgodność rodzaju i liczby (Accord)',
                    text: 'Przymiotniki muszą zgadzać się z rzeczownikiem pod względem rodzaju (męski/żeński) i liczby (pojedyncza/mnoga). Zazwyczaj formę żeńską tworzy się przez dodanie "-e", a liczbę mnogą przez dodanie "-s", choć istnieje wiele wyjątków.',
                    examples: [
                        { original: 'un petit garçon, une petite fille', translation: 'mały chłopiec, mała dziewczynka' },
                        { original: 'des livres intéressants, des histoires intéressantes', translation: 'interesujące książki, interesujące historie' }
                    ]
                },
                {
                    heading: 'Pozycja przymiotnika (Place de l\'adjectif)',
                    text: 'Większość przymiotników stoi po rzeczowniku (np. kolory, narodowości, kształty). Jednak krótkie i często używane przymiotniki (tzw. BAGS - Beauty, Age, Goodness, Size) stoją przed rzeczownikiem.',
                    examples: [
                        { original: 'une voiture rouge (po rzeczowniku)', translation: 'czerwony samochód' },
                        { original: 'une belle journée (przed rzeczownikiem)', translation: 'piękny dzień' }
                    ]
                },
                {
                    heading: 'Stopniowanie przymiotników (Comparaison)',
                    text: 'Stopień wyższy tworzy się za pomocą "plus" (bardziej), a najwyższy za pomocą "le/la/les plus". Istnieją też ważne formy nieregularne, np. dla "bon" (dobry).',
                    examples: [
                        { original: 'Cette ville est plus grande que la mienne.', translation: 'To miasto jest większe niż moje.' },
                        { original: 'C\'est le meilleur film de l\'année. (bon - meilleur - le meilleur)', translation: 'To najlepszy film roku.' }
                    ]
                },
                {
                    heading: 'Przymiotniki o zmiennym znaczeniu w zależności od pozycji',
                    text: 'Niektóre przymiotniki zmieniają znaczenie w zależności od tego, czy stoją przed rzeczownikiem (często znaczenie przenośne), czy po nim (znaczenie dosłowne).',
                    examples: [
                        { original: 'un homme grand (wysoki) vs. un grand homme (wielki)', translation: 'wysoki mężczyzna vs. wielki człowiek' },
                        { original: 'mon propre (własny) stylo vs. un stylo propre (czysty)', translation: 'mój własny długopis vs. czysty długopis' }
                    ]
                }
            ],
        },
    },
    it: {
        'adjectives': {
            title: 'Aggettivi',
            content: [
                {
                    heading: 'Zgodność rodzaju i liczby (Concordanza)',
                    text: 'Przymiotniki muszą zgadzać się z rzeczownikiem pod względem rodzaju i liczby. Przymiotniki zakończone na "-o" mają cztery formy (-o, -a, -i, -e), a te zakończone na "-e" mają tylko dwie (-e, -i) dla obu rodzajów.',
                    examples: [
                        { original: 'un ragazzo alto, una ragazza alta, dei ragazzi alti, delle ragazze alte', translation: 'wysoki chłopak, wysoka dziewczyna, wysocy chłopcy, wysokie dziewczynki' },
                        { original: 'un esame difficile, una lezione difficile, degli esami difficili, delle lezioni difficili', translation: 'trudny egzamin, trudna lekcja, trudne egzaminy, trudne lekcje' }
                    ]
                },
                {
                    heading: 'Pozycja przymiotnika (Posizione)',
                    text: 'Większość przymiotników (kolory, narodowości, kształty) stoi po rzeczowniku. Niektóre powszechne przymiotniki, takie jak "bello", "bravo", "buono", "nuovo", "piccolo", mogą stać przed rzeczownikiem, co czasem może nieznacznie zmienić ich znaczenie.',
                    examples: [
                        { original: 'Ho comprato una macchina rossa.', translation: 'Kupiłem czerwony samochód.' },
                        { original: 'Questa è una bella casa.', translation: 'To jest piękny dom.' }
                    ]
                },
                {
                    heading: 'Stopniowanie przymiotników (Comparazione)',
                    text: 'Stopień wyższy tworzy się opisowo za pomocą "più" (bardziej) i "meno" (mniej). Stopień najwyższy względny tworzy się przez rodzajnik + "più/meno", a absolutny przez dodanie końcówki "-issimo/-issima".',
                    examples: [
                        { original: 'Questa pizza è più buona di quella. (stopień wyższy)', translation: 'Ta pizza jest lepsza od tamtej.' },
                        { original: 'È un film bellissimo. (stopień najwyższy absolutny)', translation: 'To jest przepiękny film.' }
                    ]
                },
                {
                    heading: 'Specjalne formy przymiotników (Forme speciali)',
                    text: 'Niektóre przymiotniki, jak "bello", "quello" czy "santo", mają specjalne formy, które zmieniają się w zależności od pierwszej litery następującego po nim słowa, podobnie jak rodzajniki określone.',
                    examples: [
                        { original: 'un bel libro, un bello stadio', translation: 'piękna książka, piękny stadion' },
                        { original: 'quel ragazzo, quello specchio', translation: 'tamten chłopak, tamto lustro' }
                    ]
                }
            ],
        },
    },
};
