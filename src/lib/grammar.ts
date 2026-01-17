
import type { Language } from './storage';

export interface GrammarRule {
  heading: string;
  text: string;
  examples?: {
    original: string;
    translation: string;
  }[];
}

export interface GrammarContent {
  [lang: string]: {
    [topic: string]: {
      title: string;
      content: GrammarRule[];
    };
  };
}

export const allGrammar: GrammarContent = {
  en: {
    'sentence-structure': {
      title: 'Sentence Structure',
      content: [
        { 
          heading: 'Zdanie oznajmujące (SVO)', 
          text: 'Podstawowy szyk zdania w języku angielskim to SVO: Podmiot (Subject) + Orzeczenie (Verb) + Dopełnienie (Object). Ten porządek jest stosunkowo sztywny i jego zachowanie jest kluczowe dla zrozumiałości.',
          examples: [
            { original: 'She (S) reads (V) books (O).', translation: 'Ona czyta książki.' },
            { original: 'The students (S) finished (V) their homework (O).', translation: 'Uczniowie skończyli swoje zadanie domowe.' }
          ]
        },
        { 
          heading: 'Pytania ogólne (Yes/No Questions) - Podstawy', 
          text: 'Podstawowe pytania tworzy się przez inwersję, czyli postawienie czasownika posiłkowego (do, does, is, are, have) przed podmiotem. To jedna z fundamentalnych zasad tworzenia pytań.',
          examples: [
            { original: 'Do you like music?', translation: 'Czy lubisz muzykę?' },
            { original: 'Is he a doctor?', translation: 'Czy on jest lekarzem?' }
          ]
        },
        { 
          heading: 'Przeczenia (z "not") - Podstawy', 
          text: 'Przeczenie tworzy się, dodając "not" po pierwszym czasowniku posiłkowym. W czasie Present Simple i Past Simple, jeśli nie ma innego czasownika posiłkowego, dodaje się "do not" (don\'t) / "does not" (doesn\'t) lub "did not" (didn\'t).',
          examples: [
            { original: 'They are not from Canada.', translation: 'Oni nie są z Kanady.' },
            { original: 'I do not understand the question.', translation: 'Nie rozumiem tego pytania.' }
          ]
        },
        { 
          heading: 'Zdania z dopełnieniem', 
          text: 'Dopełnienie (kogo? co? komu? czemu?) zazwyczaj występuje po czasowniku. Jeśli używamy zaimków dopełnienia (me, you, him, her, it, us, them), również stoją one bezpośrednio po czasowniku.',
          examples: [
            { original: 'He called me yesterday.', translation: 'On zadzwonił do mnie wczoraj.' },
            { original: 'She gave them the keys.', translation: 'Ona dała im klucze.' }
          ]
        },
        { 
          heading: 'Okoliczniki miejsca i czasu', 
          text: 'Określenia miejsca i czasu zazwyczaj umieszcza się na końcu zdania. Standardowa kolejność to: sposób (how), miejsce (where), a następnie czas (when).',
          examples: [
            { original: 'We went to the cinema (miejsce) yesterday (czas).', translation: 'Poszliśmy wczoraj do kina.' },
            { original: 'She drives her car carefully (sposób) in the city (miejsce).', translation: 'Ona ostrożnie prowadzi samochód w mieście.' }
          ]
        }
      ],
    },
    questions: {
      title: 'Questions',
      content: [
        { 
          heading: 'Pytania ogólne (Yes/No Questions)', 
          text: 'Tworzy się je przez inwersję, czyli zamianę miejscami podmiotu i czasownika posiłkowego (auxiliary verb) jak "be", "have", "will" lub dodanie operatora "do/does/did" na początku zdania.',
          examples: [
            { original: 'Are you a student?', translation: 'Czy jesteś studentem?' },
            { original: 'Did she finish her work?', translation: 'Czy ona skończyła swoją pracę?' }
          ]
        },
        { 
          heading: 'Pytania szczegółowe (Wh-Questions)', 
          text: 'Zaczynają się od zaimków pytających (what, where, when, who, why, how). Szyk zdania jest podobny do pytań ogólnych: zaimek pytający + czasownik posiłkowy + podmiot + reszta zdania.',
          examples: [
            { original: 'Where did you go yesterday?', translation: 'Gdzie wczoraj poszedłeś?' },
            { original: 'What is she doing?', translation: 'Co ona robi?' }
          ]
        },
        {
          heading: 'Pytania o podmiot vs. dopełnienie',
          text: 'W pytaniach o podmiot (kto/co wykonuje czynność) nie używamy operatora "do/does/did". Czasownik występuje w formie twierdzącej. W pytaniach o dopełnienie (na kogo/co skierowana jest czynność) operator jest konieczny.',
          examples: [
            { original: 'Who called you? (podmiot) vs. Who did you call? (dopełnienie)', translation: 'Kto do ciebie dzwonił? vs. Do kogo dzwoniłeś?' },
            { original: 'What happened? (podmiot) vs. What did you see? (dopełnienie)', translation: 'Co się stało? vs. Co zobaczyłeś?' }
          ]
        },
        {
          heading: 'Pytania rozłączne (Question Tags)',
          text: 'To krótkie pytania dodawane na końcu zdania twierdzącego lub przeczącego, aby poprosić o potwierdzenie. Jeśli zdanie jest twierdzące, pytanie jest przeczące, i na odwrót.',
          examples: [
            { original: 'It\'s a beautiful day, isn\'t it?', translation: 'To piękny dzień, prawda?' },
            { original: 'You haven\'t seen my keys, have you?', translation: 'Nie widziałeś moich kluczy, prawda?' }
          ]
        },
        {
          heading: 'Pytania pośrednie (Indirect Questions)',
          text: 'Są to bardziej uprzejme formy pytań, często zaczynające się od zwrotów takich jak "Could you tell me..." lub "I was wondering...". W pytaniach pośrednich szyk zdania jest taki jak w zdaniu twierdzącym (brak inwersji).',
          examples: [
            { original: 'Could you tell me where the station is?', translation: 'Czy mógłbyś mi powiedzieć, gdzie jest stacja?' },
            { original: 'I wonder if she will come to the party.', translation: 'Zastanawiam się, czy ona przyjdzie na imprezę.' }
          ]
        }
      ],
    },
    negations: {
      title: 'Negations',
      content: [
        { 
          heading: 'Przeczenie z "not" i czasownikami posiłkowymi', 
          text: 'Głównym sposobem tworzenia przeczeń jest dodanie "not" po czasowniku posiłkowym (auxiliary verb) takim jak "be", "have", "will", "can". W mowie potocznej często używa się form skróconych (n\'t).',
          examples: [
            { original: 'She is not (isn\'t) a doctor.', translation: 'Ona nie jest lekarką.' },
            { original: 'We have not (haven\'t) finished yet.', translation: 'Jeszcze nie skończyliśmy.' }
          ]
        },
        { 
          heading: 'Przeczenia z "do/does/did"', 
          text: 'W czasach Present Simple i Past Simple, jeśli w zdaniu nie ma innego czasownika posiłkowego, do tworzenia przeczeń używa się operatora "do/does/did" + "not".',
          examples: [
            { original: 'I do not (don\'t) like coffee.', translation: 'Nie lubię kawy.' },
            { original: 'He did not (didn\'t) go to the party.', translation: 'On nie poszedł na imprezę.' }
          ]
        },
        { 
          heading: 'Przeczenie rzeczowników z "no"', 
          text: 'Aby zaprzeczyć istnieniu czegoś, używa się słówka "no" bezpośrednio przed rzeczownikiem. W takim zdaniu czasownik pozostaje w formie twierdzącej.',
          examples: [
            { original: 'There is no milk in the fridge.', translation: 'W lodówce nie ma mleka.' },
            { original: 'I have no idea what you are talking about.', translation: 'Nie mam pojęcia, o czym mówisz.' }
          ]
        },
        { 
          heading: 'Inne słowa przeczące', 
          text: 'Słowa takie jak "never" (nigdy), "nobody" (nikt), "nothing" (nic) same w sobie nadają zdaniu sens negatywny. W standardowym angielskim nie stosuje się podwójnego przeczenia.',
          examples: [
            { original: 'She never eats meat.', translation: 'Ona nigdy nie je mięsa.' },
            { original: 'Nobody knows the answer.', translation: 'Nikt nie zna odpowiedzi.' }
          ]
        }
      ],
    },
    'adjectives': {
      title: 'Adjectives',
      content: [
          { 
              heading: 'Pozycja przymiotnika', 
              text: 'Przymiotniki w języku angielskim prawie zawsze występują przed rzeczownikiem, który opisują. To jedna z kluczowych różnic w porównaniu z wieloma językami romańskimi.',
              examples: [
                  { original: 'I drive a black car.', translation: 'Jeżdżę czarnym samochodem.' },
                  { original: 'She is an intelligent woman.', translation: 'Ona jest inteligentną kobietą.' }
              ]
          },
          { 
              heading: 'Kolejność przymiotników', 
              text: 'Gdy używamy kilku przymiotników, zazwyczaj układamy je w określonej kolejności: opinia, rozmiar, wiek, kształt, kolor, pochodzenie, materiał, przeznaczenie.',
              examples: [
                  { original: 'She has a beautiful small new red Italian leather bag.', translation: 'Ona ma piękną, małą, nową, czerwoną, włoską, skórzaną torbę.' },
                  { original: 'He is a friendly tall young man.', translation: 'On jest przyjacielskim, wysokim, młodym mężczyzną.' }
              ]
          },
           { 
              heading: 'Stopniowanie przymiotników', 
              text: 'Przymiotniki krótkie (jednosylabowe) stopniuje się przez dodanie końcówek "-er" i "-est". Dłuższe przymiotniki stopniuje się opisowo za pomocą "more" i "the most".',
              examples: [
                  { original: 'This car is faster than that one.', translation: 'Ten samochód jest szybszy niż tamten.' },
                  { original: 'This is the most interesting book I have ever read.', translation: 'To jest najciekawsza książka, jaką kiedykolwiek czytałem.' }
              ]
          }
      ],
  },
    'adverbs': {
        title: 'Adverbs',
        content: [],
    },
    'pronouns': {
        title: 'Pronouns',
        content: [],
    },
    'articles': {
      title: 'Articles',
      content: [
          { 
              heading: 'Rodzajnik określony (the)', 
              text: 'Używany, gdy mówimy o czymś konkretnym, już znanym lub jedynym w swoim rodzaju.',
              examples: [
                  { original: 'The dog I saw was very friendly.', translation: '(Ten konkretny) pies, którego widziałem, był bardzo przyjazny.' },
                  { original: 'The sun is shining today.', translation: 'Słońce dzisiaj świeci.' }
              ]
          },
          { 
              heading: 'Rodzajniki nieokreślone (a/an)', 
              text: '"A" używamy przed spółgłoskami, "an" przed samogłoskami. Stosujemy je, mówiąc o czymś po raz pierwszy lub o jednej rzeczy z wielu.',
              examples: [
                  { original: 'I bought a new car.', translation: 'Kupiłem (jakiś) nowy samochód.' },
                  { original: 'She is an excellent student.', translation: 'Ona jest znakomitą studentką.' }
              ]
          },
          { 
              heading: 'Rodzajnik zerowy (Zero Article)', 
              text: 'Nie używamy rodzajnika, mówiąc o rzeczach w ogólności (rzeczowniki niepoliczalne lub w liczbie mnogiej), a także przed nazwami własnymi, posiłkami czy sportami.',
              examples: [
                  { original: 'I like music.', translation: 'Lubię muzykę (ogólnie).' },
                  { original: 'We play tennis every Saturday.', translation: 'Gramy w tenisa w każdą sobotę.' }
              ]
          }
      ],
  },
  },
  de: {
    'sentence-structure': {
      title: 'Satzbau',
      content: [
        { 
          heading: 'Zdanie oznajmujące (Szyk V2)', 
          text: 'W niemieckim zdaniu oznajmującym odmieniony czasownik (orzeczenie) zawsze zajmuje drugą pozycję. Na pierwszej pozycji może stać podmiot lub inny element zdania (np. określenie czasu).',
          examples: [
            { original: 'Ich lerne heute Deutsch.', translation: 'Uczę się dzisiaj niemieckiego. (szyk prosty)' },
            { original: 'Heute lerne ich Deutsch.', translation: 'Dzisiaj uczę się niemieckiego. (szyk przestawny)' }
          ]
        },
        { 
          heading: 'Pytania ogólne (Ja/Nein-Fragen) - Podstawy', 
          text: 'Podstawowe pytania, na które można odpowiedzieć "tak" lub "nie", tworzy się przez postawienie odmienionego czasownika na pierwszym miejscu.',
          examples: [
            { original: 'Lernst du Deutsch?', translation: 'Czy uczysz się niemieckiego?' },
            { original: 'Hast du einen Hund?', translation: 'Czy masz psa?' }
          ]
        },
        { 
          heading: 'Przeczenia (nicht / kein) - Podstawy', 
          text: 'Przeczenie "nicht" neguje czasownik lub całe zdanie i zazwyczaj stoi na końcu. Przeczenie "kein" neguje rzeczownik i stoi przed nim, odmieniając się jak rodzajnik nieokreślony.',
          examples: [
            { original: 'Ich spiele nicht gern Tennis.', translation: 'Nie lubię grać w tenisa.' },
            { original: 'Er hat kein Auto.', translation: 'On nie ma samochodu.' }
          ]
        },
        { 
          heading: 'Zdania z dopełnieniem (Akkusativ / Dativ)', 
          text: 'W niemieckim ważny jest przypadek (case). Dopełnienie w bierniku (Akkusativ) odpowiada na pytanie "kogo? co?", a w celowniku (Dativ) na "komu? czemu?". Standardowa kolejność to: Dativ przed Akkusativ.',
          examples: [
            { original: 'Der Lehrer gibt dem Schüler (Dativ) ein Buch (Akkusativ).', translation: 'Nauczyciel daje uczniowi książkę.' },
            { original: 'Ich sehe ihn (Akkusativ) im Park.', translation: 'Widzę go w parku.' }
          ]
        },
        { 
          heading: 'Okoliczniki czasu i miejsca (TeKaMoLo)', 
          text: 'Określenia w zdaniu często podążają za regułą TeKaMoLo: Temporal (kiedy?), Kausal (dlaczego?), Modal (jak?), Lokal (gdzie?). Czas zazwyczaj występuje przed miejscem.',
          examples: [
            { original: 'Ich fahre morgen (Zeit) nach Berlin (Ort).', translation: 'Jadę jutro do Berlina.' },
            { original: 'Wir treffen uns um 18 Uhr (Zeit) vor dem Kino (Ort).', translation: 'Spotykamy się o 18:00 przed kinem.' }
          ]
        }
      ],
    },
      questions: {
        title: 'Fragen',
        content: [
          { 
            heading: 'Pytania rozstrzygnięcia (Ja/Nein-Fragen)', 
            text: 'Tworzy się je przez inwersję, czyli postawienie odmienionego czasownika (orzeczenia) na pierwszym miejscu w zdaniu. Podmiot znajduje się zaraz po nim.', 
            examples: [
              { original: 'Lernst du Deutsch?', translation: 'Czy uczysz się niemieckiego?' },
              { original: 'Haben Sie Kinder?', translation: 'Czy ma Pan/Pani dzieci?' }
            ]
          },
          { 
            heading: 'Pytania szczegółowe (W-Fragen)', 
            text: 'Zaczynają się od zaimka pytającego (Was, Wer, Wo, Wann, Warum, Wie itp.), po którym na drugim miejscu zawsze stoi odmieniony czasownik, a zaraz po nim podmiot.', 
            examples: [
              { original: 'Warum lernst du Deutsch?', translation: 'Dlaczego uczysz się niemieckiego?' },
              { original: 'Wo ist der Bahnhof?', translation: 'Gdzie jest dworzec?' }
            ]
          },
          {
            heading: 'Pytania z przyimkami',
            text: 'Gdy pytanie dotyczy rzeczy i wymaga użycia przyimka, tworzy się je za pomocą "wo(r)-" + przyimek. Jeśli pytanie dotyczy osoby, przyimek stawia się przed zaimkiem pytającym "wem" lub "wen".',
            examples: [
              { original: 'Worüber sprecht ihr?', translation: 'O czym rozmawiacie?' },
              { original: 'Mit wem gehst du ins Kino?', translation: 'Z kim idziesz do kina?' }
            ]
          },
           {
            heading: 'Pytania rozłączne (Frageanhängsel)',
            text: 'Są to krótkie zwroty dodawane na końcu zdania, aby poprosić o potwierdzenie, podobnie jak polskie "prawda?". Najczęstsze to "oder?", "nicht wahr?" lub "nicht?".',
            examples: [
              { original: 'Du kommst aus Polen, oder?', translation: 'Pochodzisz z Polski, prawda?' },
              { original: 'Das Wetter ist schön, nicht wahr?', translation: 'Pogoda jest piękna, nieprawdaż?' }
            ]
          },
          {
            heading: 'Pytania pośrednie (Indirekte Fragen)',
            text: 'W pytaniach pośrednich, wprowadzanych zwrotem (np. "Ich möchte wissen..."), zdanie pytające staje się zdaniem podrzędnym. Czasownik odmieniony ląduje na końcu zdania.',
            examples: [
              { original: 'Ich möchte wissen, wann der Zug abfährt.', translation: 'Chciałbym wiedzieć, kiedy odjeżdża pociąg.' },
              { original: 'Können Sie mir sagen, wo die Toilette ist?', translation: 'Czy może mi Pan/Pani powiedzieć, gdzie jest toaleta?' }
            ]
          }
        ],
      },
      negations: {
        title: 'Verneinung',
        content: [
          { 
            heading: 'Przeczenie za pomocą "nicht"', 
            text: '"Nicht" jest używane do negowania czasowników, przymiotników, przysłówków lub całych zdań. Jego pozycja w zdaniu jest kluczowa i zależy od tego, co chcemy zanegować.',
            examples: [
              { original: 'Ich komme heute nicht.', translation: 'Nie przyjdę dzisiaj (negacja całego zdania, "nicht" na końcu).' },
              { original: 'Das Auto ist nicht neu, sondern alt.', translation: 'Samochód nie jest nowy, lecz stary (negacja przymiotnika, "nicht" przed nim).' }
            ]
          },
          { 
            heading: 'Przeczenie za pomocą "kein"', 
            text: '"Kein" służy do negowania rzeczowników z rodzajnikiem nieokreślonym (ein/eine) lub rzeczowników bez rodzajnika. Odmienia się przez przypadki i rodzaje tak jak rodzajnik nieokreślony.',
            examples: [
              { original: 'Das ist kein Apfel, das ist eine Birne.', translation: 'To nie jest jabłko, to jest gruszka.' },
              { original: 'Ich habe keine Zeit.', translation: 'Nie mam czasu.' }
            ]
          },
          { 
            heading: 'Inne słowa przeczące', 
            text: 'Język niemiecki posiada wiele innych słów przeczących, które zastępują swoje twierdzące odpowiedniki. Należą do nich m.in. "nichts" (nic), "niemand" (nikt), "nie/niemals" (nigdy).',
            examples: [
              { original: 'Ich habe nichts gesehen.', translation: 'Nic nie widziałem.' },
              { original: 'Niemand hat mich angerufen.', translation: 'Nikt do mnie nie dzwonił.' }
            ]
          },
          { 
            heading: 'Podwójne przeczenie', 
            text: 'W standardowym języku niemieckim, w przeciwieństwie do polskiego, generalnie unika się podwójnego przeczenia. Użycie jednego słowa przeczącego (np. "nie", "nichts") wystarcza do zanegowania całego zdania.',
            examples: [
              { original: 'Er hat nie Zeit.', translation: 'On nigdy nie ma czasu (a nie: Er hat nie keine Zeit).' },
              { original: 'Ich sehe niemanden.', translation: 'Nikogo nie widzę (a nie: Ich sehe nicht niemanden).' }
            ]
          }
        ],
      },
      'adjectives': {
        title: 'Adjektive',
        content: [
            { 
                heading: 'Odmiana przymiotnika', 
                text: 'Gdy przymiotnik stoi przed rzeczownikiem, musi otrzymać odpowiednią końcówkę. Końcówka ta zależy od rodzajnika (określonego, nieokreślonego lub jego braku), przypadku, rodzaju i liczby rzeczownika.',
                examples: [
                    { original: 'Der rote Apfel schmeckt gut.', translation: 'To czerwone jabłko dobrze smakuje (odmiana słaba po rodzajniku określonym).' },
                    { original: 'Ich habe einen neuen Computer.', translation: 'Mam nowy komputer (odmiana mieszana po rodzajniku nieokreślonym).' }
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
                heading: 'Stopniowanie przymiotników', 
                text: 'Regularne przymiotniki stopniuje się przez dodanie końcówek "-er" (stopień wyższy) i "-(e)st" (stopień najwyższy). Wiele popularnych przymiotników ma formy nieregularne.',
                examples: [
                    { original: 'Mein Bruder ist größer als ich.', translation: 'Mój brat jest wyższy ode mnie.' },
                    { original: 'Das ist der beste Film, den ich je gesehen habe.', translation: 'To jest najlepszy film, jaki kiedykolwiek widziałem (stopniowanie nieregularne: gut-besser-am besten).' }
                ]
            }
        ],
    },
    'adverbs': {
        title: 'Adverbien',
        content: [],
    },
    'pronouns': {
        title: 'Pronomen',
        content: [],
    },
    'articles': {
      title: 'Artikel',
      content: [
          { 
              heading: 'Rodzajnik określony (der, die, das)', 
              text: 'Odnosi się do konkretnych, znanych osób lub rzeczy. Forma zależy od rodzaju gramatycznego (męski, żeński, nijaki), liczby i przypadku.',
              examples: [
                  { original: 'Der Hund ist groß.', translation: '(Ten konkretny) pies jest duży.' },
                  { original: 'Ich gebe der Frau das Buch.', translation: 'Daję (tej konkretnej) kobiecie książkę.' }
              ]
          },
          { 
              heading: 'Rodzajnik nieokreślony (ein, eine)', 
              text: 'Odnosi się do nieokreślonej, jednej osoby lub rzeczy. Odmienia się przez przypadki i rodzaje, ale nie ma formy liczby mnogiej.',
              examples: [
                  { original: 'Ich sehe einen Hund.', translation: 'Widzę (jakiegoś) psa.' },
                  { original: 'Das ist eine interessante Frage.', translation: 'To jest (jakieś) interesujące pytanie.' }
              ]
          },
          { 
              heading: 'Rodzajnik zerowy (Nullartikel)', 
              text: 'Brak rodzajnika stosuje się przed nazwami własnymi, nazwami miast i większości krajów, materiałami, a także przed rzeczownikami w liczbie mnogiej, jeśli mówimy o nich w sposób ogólny.',
              examples: [
                  { original: 'Ich trinke gern Milch.', translation: 'Chętnie piję mleko.' },
                  { original: 'Kinder spielen gern.', translation: 'Dzieci chętnie się bawią.' }
              ]
          }
      ],
  },
  },
  es: {
    'sentence-structure': {
      title: 'Estructura de la Oración',
      content: [
        { 
          heading: 'Zdanie oznajmujące (Elastyczny SVO)', 
          text: 'Podstawowy szyk to Podmiot-Orzeczenie-Dopełnienie (SVO), ale jest on bardzo elastyczny. Często pomija się podmiot (zaimek osobowy), ponieważ forma czasownika jasno go wskazuje.',
          examples: [
            { original: '(Yo) como una manzana.', translation: '(Ja) jem jabłko.' },
            { original: 'Mi amigo lee un libro en la biblioteca.', translation: 'Mój przyjaciel czyta książkę w bibliotece.' }
          ]
        },
        { 
          heading: 'Pytania ogólne', 
          text: 'Najprostszym sposobem jest zmiana intonacji zdania twierdzącego na pytającą. W piśmie zdanie otacza się znakami zapytania (¿...?). Możliwa jest też inwersja (zamiana miejscami czasownika i podmiotu).',
          examples: [
            { original: '¿Hablas español?', translation: 'Mówisz po hiszpańsku? (przez intonację)' },
            { original: '¿Viene Juan a la fiesta?', translation: 'Czy Juan przychodzi na imprezę? (przez inwersję)' }
          ]
        },
        { 
          heading: 'Przeczenia (z "no")', 
          text: 'Przeczenie tworzy się bardzo prosto, stawiając słówko "no" bezpośrednio przed odmienionym czasownikiem.',
          examples: [
            { original: 'No quiero ir al cine.', translation: 'Nie chcę iść do kina.' },
            { original: 'Ellos no tienen coche.', translation: 'Oni nie mają samochodu.' }
          ]
        },
        { 
          heading: 'Zdania z zaimkami dopełnienia', 
          text: 'Zaimki dopełnienia (me, te, lo, la, le...) stoją zazwyczaj przed odmienionym czasownikiem lub są "doklejone" na końcu bezokolicznika.',
          examples: [
            { original: 'Lo veo todos los días.', translation: 'Widzę go codziennie.' },
            { original: 'Quiero comprarlo.', translation: 'Chcę to kupić.' }
          ]
        },
        { 
          heading: 'Okoliczniki miejsca i czasu', 
          text: 'Mają dużą swobodę w zdaniu. Najczęściej umieszcza się je na początku lub na końcu zdania.',
          examples: [
            { original: 'Ayer fuimos a la playa.', translation: 'Wczoraj poszliśmy na plażę.' },
            { original: 'Mi hermana vive en Madrid desde hace cinco años.', translation: 'Moja siostra mieszka w Madrycie od pięciu lat.' }
          ]
        }
      ],
    },
      questions: {
        title: 'Preguntas',
        content: [
          { 
            heading: 'Pytania przez intonację i znaki zapytania (¿...?)', 
            text: 'Najprostszy sposób na zadanie pytania to użycie intonacji wznoszącej. W piśmie kluczowe jest użycie odwróconego znaku zapytania na początku i normalnego na końcu.', 
            examples: [
              { original: '¿Trabajas aquí?', translation: 'Pracujesz tutaj?' },
              { original: '¿Tienes hambre?', translation: 'Jesteś głodny/a?' }
            ] 
          },
          { 
            heading: 'Pytania przez inwersję', 
            text: 'Można również zamienić miejscami podmiot i orzeczenie. Jest to częste, zwłaszcza w bardziej formalnym języku.', 
            examples: [
              { original: '¿Viene Juan a la fiesta?', translation: 'Czy Juan przychodzi na imprezę?' },
              { original: '¿Ha llegado ya el tren?', translation: 'Czy pociąg już przyjechał?' }
            ]
          },
          { 
            heading: 'Pytania z zaimkami pytającymi', 
            text: 'Pytania szczegółowe zaczynają się od zaimków takich jak Qué (co), Quién (kto), Dónde (gdzie), Cuándo (kiedy), Por qué (dlaczego), Cómo (jak), Cuál (który), Cuánto (ile).', 
            examples: [
              { original: '¿Dónde vives?', translation: 'Gdzie mieszkasz?' },
              { original: '¿Qué hora es?', translation: 'Która jest godzina?' }
            ]
          },
          {
            heading: 'Pytania z "tagami" (tag questions)',
            text: 'Podobnie jak w angielskim, na końcu zdania można dodać krótkie pytanie, aby poprosić o potwierdzenie, np. ¿no?, ¿verdad?',
            examples: [
              { original: 'Hace buen tiempo, ¿verdad?', translation: 'Jest ładna pogoda, prawda?' },
              { original: 'No vas a salir, ¿no?', translation: 'Nie wychodzisz, prawda?' }
            ]
          },
          {
            heading: 'Pytania alternatywne',
            text: 'Używa się ich, aby dać rozmówcy wybór między dwiema lub więcej opcjami, używając spójnika "o" (lub).',
            examples: [
              { original: '¿Prefieres té o café?', translation: 'Wolisz herbatę czy kawę?' },
              { original: '¿Vamos al cine o nos quedamos en casa?', translation: 'Idziemy do kina czy zostajemy w domu?' }
            ]
          }
        ],
      },
      negations: {
        title: 'Negaciones',
        content: [
          { 
            heading: 'Podstawowe przeczenie z "no"', 
            text: 'Najprostszym sposobem tworzenia przeczeń jest umieszczenie słówka "no" bezpośrednio przed odmienionym czasownikiem.',
            examples: [
              { original: 'No hablo español muy bien.', translation: 'Nie mówię zbyt dobrze po hiszpańsku.' },
              { original: 'Ellos no quieren salir esta noche.', translation: 'Oni nie chcą wychodzić dziś wieczorem.' }
            ]
          },
          { 
            heading: 'Podwójne przeczenie', 
            text: 'W języku hiszpańskim podwójne przeczenie jest nie tylko dopuszczalne, ale często konieczne. Jeśli słowo przeczące (np. "nadie", "nada", "nunca") występuje po czasowniku, przed czasownikiem musi pojawić się "no".',
            examples: [
              { original: 'No veo a nadie.', translation: 'Nikogo nie widzę (dosł. Nie widzę nikogo).' },
              { original: 'Ella no come nunca carne.', translation: 'Ona nigdy nie je mięsa.' }
            ]
          },
          { 
            heading: 'Pojedyncze przeczenie', 
            text: 'Jeśli słowo takie jak "nadie", "nada" czy "nunca" postawimy na początku zdania (przed czasownikiem), wtedy "no" jest pomijane.',
            examples: [
              { original: 'Nadie me ha llamado.', translation: 'Nikt do mnie nie dzwonił.' },
              { original: 'Nunca he estado en Argentina.', translation: 'Nigdy nie byłem w Argentynie.' }
            ]
          },
          { 
            heading: 'Przeczenie rzeczowników z "ningún/ninguna"', 
            text: 'Słówko "ningún" (przed rzeczownikami męskimi) lub "ninguna" (przed żeńskimi) oznacza "żaden/żadna". Wymaga podwójnego przeczenia z "no", jeśli występuje po czasowniku.',
            examples: [
              { original: 'No tengo ningún problema.', translation: 'Nie mam żadnego problemu.' },
              { original: 'No conozco a ninguna persona aquí.', translation: 'Nie znam tu żadnej osoby.' }
            ]
          }
        ],
      },
      'adjectives': {
        title: 'Adjetivos',
        content: [
            { 
                heading: 'Zgodność rodzaju i liczby', 
                text: 'Przymiotniki w języku hiszpańskim muszą zgadzać się z rzeczownikiem, który opisują, pod względem rodzaju (męski/żeński) i liczby (pojedyncza/mnoga).',
                examples: [
                    { original: 'El coche es rojo.', translation: 'Samochód jest czerwony.' },
                    { original: 'Las casas son rojas.', translation: 'Domy są czerwone.' }
                ]
            },
            { 
                heading: 'Pozycja przymiotnika', 
                text: 'Zazwyczaj przymiotniki umieszcza się po rzeczowniku. Niektóre, zwłaszcza te krótkie i popularne, mogą stać przed rzeczownikiem, co czasem zmienia ich znaczenie.',
                examples: [
                    { original: 'Tengo un amigo pobre (biedny).', translation: 'Mam biednego przyjaciela.' },
                    { original: 'Es un pobre hombre (godny pożałowania).', translation: 'To biedny (godny pożałowania) człowiek.' }
                ]
            },
             { 
                heading: 'Stopniowanie przymiotników', 
                text: 'Stopień wyższy tworzy się opisowo za pomocą "más" (bardziej) i "menos" (mniej), a najwyższy przez dodanie rodzajnika określonego przed "más/menos". Istnieją też formy nieregularne.',
                examples: [
                    { original: 'Esta casa es más grande que la tuya.', translation: 'Ten dom jest większy niż twój.' },
                    { original: 'Es el mejor restaurante de la ciudad.', translation: 'To jest najlepsza restauracja w mieście (stopniowanie nieregularne: bueno-mejor-el mejor).' }
                ]
            }
        ],
    },
    'adverbs': {
        title: 'Adverbios',
        content: [],
    },
    'pronouns': {
        title: 'Pronombres',
        content: [],
    },
    'articles': {
      title: 'Artículos',
      content: [
          { 
              heading: 'Rodzajniki określone (el, la, los, las)', 
              text: 'Odnoszą się do konkretnych, znanych osób lub rzeczy i muszą zgadzać się z rzeczownikiem co do rodzaju i liczby.',
              examples: [
                  { original: 'El perro es mi mejor amigo.', translation: '(Ten konkretny) pies jest moim najlepszym przyjacielem.' },
                  { original: 'Las casas en esta calle son muy bonitas.', translation: 'Domy na tej ulicy są bardzo ładne.' }
              ]
          },
          { 
              heading: 'Rodzajniki nieokreślone (un, una, unos, unas)', 
              text: 'Używane, gdy mówimy o czymś po raz pierwszy lub o jednej rzeczy z wielu. Również muszą zgadzać się co do rodzaju i liczby.',
              examples: [
                  { original: 'Necesito un bolígrafo.', translation: 'Potrzebuję (jakiegoś) długopisu.' },
                  { original: 'Compraron unas flores para su madre.', translation: 'Kupili (jakieś) kwiaty dla swojej mamy.' }
              ]
          },
          { 
              heading: 'Kontrakcje (al, del)', 
              text: 'Gdy przyimki "a" lub "de" występują przed rodzajnikiem męskim liczby pojedynczej "el", łączą się, tworząc formy "al" (a + el) i "del" (de + el).',
              examples: [
                  { original: 'Vamos al cine esta noche.', translation: 'Idziemy dziś wieczorem do kina.' },
                  { original: 'El coche del vecino es nuevo.', translation: 'Samochód sąsiada jest nowy.' }
              ]
          }
      ],
  },
  },
  fr: {
    'sentence-structure': {
      title: 'Structure de la Phrase',
      content: [
        { 
          heading: 'Zdanie oznajmujące (SVO)', 
          text: 'Podstawowy szyk zdania to Podmiot (Sujet) + Orzeczenie (Verbe) + Dopełnienie (Objet). Jest on dość rygorystyczny.',
          examples: [
            { original: 'Le chat (S) mange (V) la souris (O).', translation: 'Kot je mysz.' },
            { original: 'Mon ami (S) regarde (V) un film (O).', translation: 'Mój przyjaciel ogląda film.' }
          ]
        },
        { 
          heading: 'Pytania (Est-ce que)', 
          text: 'Standardowy i neutralny sposób tworzenia pytań to dodanie "Est-ce que" na początku zdania twierdzącego.',
          examples: [
            { original: 'Est-ce que tu parles français?', translation: 'Czy mówisz po francusku?' },
            { original: 'Est-ce qu\'il vient à la fête?', translation: 'Czy on przychodzi na imprezę?' }
          ]
        },
        { 
          heading: 'Przeczenia (ne ... pas)', 
          text: 'Przeczenie tworzy się za pomocą dwóch części: "ne" i "pas", które "otaczają" odmieniony czasownik. W języku mówionym "ne" jest często pomijane.',
          examples: [
            { original: 'Je ne comprends pas la question.', translation: 'Nie rozumiem pytania.' },
            { original: 'Elle n\'est pas ici aujourd\'hui.', translation: 'Jej tu dzisiaj nie ma.' }
          ]
        },
        { 
          heading: 'Zdania z zaimkami dopełnienia', 
          text: 'Zaimki dopełnienia (np. le, la, lui, me, te) zawsze stoją bezpośrednio przed czasownikiem (lub czasownikiem posiłkowym w czasach złożonych).',
          examples: [
            { original: 'Je le vois.', translation: 'Widzę go.' },
            { original: 'Tu me donnes le livre.', translation: 'Dajesz mi książkę.' }
          ]
        },
        { 
          heading: 'Okoliczniki miejsca i czasu', 
          text: 'Zwykle umieszcza się je na końcu zdania, ale mogą też stać na początku dla emfazy.',
          examples: [
            { original: 'Nous allons au cinéma ce soir.', translation: 'Idziemy dziś wieczorem do kina.' },
            { original: 'Hier, il a beaucoup plu.', translation: 'Wczoraj mocno padało.' }
          ]
        }
      ],
    },
      questions: {
        title: 'Les Questions',
        content: [
          { 
            heading: 'Pytania przez "Est-ce que" (standard)', 
            text: 'To najczęstszy i najbardziej neutralny sposób tworzenia pytań. Po prostu dodaje się "Est-ce que" na początku zdania oznajmującego.', 
            examples: [
              { original: 'Est-ce que tu parles français?', translation: 'Czy mówisz po francusku?' },
              { original: 'Est-ce qu\'elle aime le chocolat?', translation: 'Czy ona lubi czekoladę?' }
            ]
          },
          { 
            heading: 'Pytania przez inwersję (formalnie)', 
            text: 'To bardziej formalny sposób, polegający na zamianie miejscami podmiotu (zaimka) i orzeczenia. Są one połączone myślnikiem. Jeśli czasownik kończy się na samogłoskę, a zaimek zaczyna, dodaje się "-t-".', 
            examples: [
              { original: 'Parlez-vous français?', translation: 'Czy mówi Pan/Pani po francusku?' },
              { original: 'Aime-t-il le chocolat?', translation: 'Czy on lubi czekoladę?' }
            ]
          },
          { 
            heading: 'Pytania przez intonację (nieformalnie)', 
            text: 'W mowie potocznej najczęściej zadaje się pytanie po prostu zmieniając intonację zdania oznajmującego na wznoszącą na końcu.', 
            examples: [
              { original: 'Tu parles français?', translation: 'Mówisz po francusku?' },
              { original: 'Il vient ce soir?', translation: 'On przychodzi dziś wieczorem?' }
            ]
          },
          { 
            heading: 'Pytania z zaimkami pytającymi (mots interrogatifs)', 
            text: 'Używa się słów takich jak Où (gdzie), Quand (kiedy), Comment (jak), Pourquoi (dlaczego), Qui (kto), Que (co). Mogą one występować z "est-ce que" lub z inwersją.', 
            examples: [
              { original: 'Où est-ce que tu habites?', translation: 'Gdzie mieszkasz?' },
              { original: 'Comment allez-vous?', translation: 'Jak się Pan/Pani miewa?' }
            ]
          },
          {
            heading: 'Pytania o "co" (Que vs Qu\'est-ce que)',
            text: 'Pytając o "co" (dopełnienie), można użyć "Qu\'est-ce que" (standard) lub "Que" z inwersją (formalnie). W mowie potocznej często używa się "quoi" na końcu zdania.',
            examples: [
              { original: 'Qu\'est-ce que tu fais?', translation: 'Co robisz?' },
              { original: 'Tu fais quoi?', translation: '(potocznie) Co robisz?' }
            ]
          }
        ],
      },
      negations: {
        title: 'La Négation',
        content: [
          { 
            heading: 'Podstawowa konstrukcja "ne ... pas"', 
            text: 'Standardowe przeczenie w języku francuskim tworzy się za pomocą dwóch części: "ne" (przed czasownikiem) i "pas" (po czasowniku), które "otaczają" odmieniony czasownik.',
            examples: [
              { original: 'Je ne comprends pas.', translation: 'Nie rozumiem.' },
              { original: 'Elle ne veut pas venir.', translation: 'Ona nie chce przyjść.' }
            ]
          },
          { 
            heading: 'Przeczenia w czasach złożonych', 
            text: 'W czasach złożonych, takich jak Passé Composé, "ne" i "pas" otaczają czasownik posiłkowy ("avoir" lub "être"), a nie imiesłów.',
            examples: [
              { original: 'Je n\'ai pas mangé.', translation: 'Nie jadłem/am.' },
              { original: 'Nous ne sommes pas allés au cinéma.', translation: 'Nie poszliśmy do kina.' }
            ]
          },
          { 
            heading: 'Inne konstrukcje przeczące', 
            text: 'Istnieje wiele innych wyrażeń przeczących, które zastępują "pas", np. "ne ... jamais" (nigdy), "ne ... rien" (nic), "ne ... personne" (nikt), "ne ... plus" (już nie).',
            examples: [
              { original: 'Il ne mange jamais de viande.', translation: 'On nigdy nie je mięsa.' },
              { original: 'Je ne vois personne dans la rue.', translation: 'Nikogo nie widzę na ulicy.' }
            ]
          },
          { 
            heading: 'Przeczenie w języku mówionym', 
            text: 'W codziennym, nieformalnym języku mówionym, partykuła "ne" jest bardzo często pomijana. Samo "pas" (lub inne słowo, np. "jamais") wystarcza do wyrażenia przeczenia.',
            examples: [
              { original: 'Je sais pas. (zamiast: Je ne sais pas.)', translation: 'Nie wiem.' },
              { original: 'Il veut plus manger. (zamiast: Il ne veut plus manger.)', translation: 'On nie chce już jeść.' }
            ]
          }
        ],
      },
      'adjectives': {
        title: 'Adjectifs',
        content: [
            { 
                heading: 'Zgodność rodzaju i liczby', 
                text: 'Przymiotniki muszą zgadzać się z rzeczownikiem, który opisują, pod względem rodzaju (męski/żeński) i liczby (pojedyncza/mnoga). Zazwyczaj formę żeńską tworzy się przez dodanie "-e", a liczbę mnogą przez dodanie "-s".',
                examples: [
                    { original: 'un petit garçon, une petite fille', translation: 'mały chłopiec, mała dziewczynka' },
                    { original: 'des livres intéressants, des histoires intéressantes', translation: 'interesujące książki, interesujące historie' }
                ]
            },
            { 
                heading: 'Pozycja przymiotnika', 
                text: 'Większość przymiotników stoi po rzeczowniku (np. kolory, narodowości). Jednak krótkie i często używane przymiotniki (tzw. BAGS - Beauty, Age, Goodness, Size) stoją przed rzeczownikiem.',
                examples: [
                    { original: 'une voiture rouge (po rzeczowniku)', translation: 'czerwony samochód' },
                    { original: 'une belle journée (przed rzeczownikiem)', translation: 'piękny dzień' }
                ]
            },
             { 
                heading: 'Stopniowanie przymiotników', 
                text: 'Stopień wyższy tworzy się za pomocą "plus" (bardziej), a najwyższy za pomocą "le/la/les plus". Istnieją też formy nieregularne, np. dla "bon" (dobry).',
                examples: [
                    { original: 'Cette ville est plus grande que la mienne.', translation: 'To miasto jest większe niż moje.' },
                    { original: 'C\'est le meilleur film de l\'année.', translation: 'To najlepszy film roku (stopniowanie nieregularne: bon-meilleur-le meilleur).' }
                ]
            }
        ],
    },
    'adverbs': {
        title: 'Adverbes',
        content: [],
    },
    'pronouns': {
        title: 'Pronoms',
        content: [],
    },
    'articles': {
      title: 'Les Articles',
      content: [
          { 
              heading: 'Rodzajniki określone (le, la, l\', les)', 
              text: 'Używane przed rzeczownikami znanymi lub określonymi. Forma zależy od rodzaju i liczby rzeczownika oraz od tego, czy zaczyna się on od samogłoski.',
              examples: [
                  { original: 'J\'aime le chocolat.', translation: 'Lubię czekoladę (ogólnie, jako znaną substancję).' },
                  { original: 'Les enfants jouent dans le jardin.', translation: '(Te konkretne) dzieci bawią się w ogrodzie.' }
              ]
          },
          { 
              heading: 'Rodzajniki nieokreślone (un, une, des)', 
              text: 'Wprowadzają nowy, nieokreślony rzeczownik. "Des" jest formą liczby mnogiej i oznacza "kilka", "jakieś".',
              examples: [
                  { original: 'J\'ai acheté un livre.', translation: 'Kupiłem/am (jakąś) książkę.' },
                  { original: 'Il y a des nuages dans le ciel.', translation: 'Na niebie są (jakieś) chmury.' }
              ]
          },
          { 
              heading: 'Rodzajniki cząstkowe (du, de la, de l\', des)', 
              text: 'Używane do określenia niepoliczalnej ilości czegoś, czego nie da się policzyć na sztuki (np. woda, chleb, odwaga). Tłumaczone jako "trochę", "część".',
              examples: [
                  { original: 'Je voudrais de l\'eau, s\'il vous plaît.', translation: 'Chciałbym/abym (trochę) wody, proszę.' },
                  { original: 'Il a du courage.', translation: 'On ma (trochę) odwagi.' }
              ]
          }
      ],
  },
  },
  it: {
    'sentence-structure': {
      title: 'Struttura della Frase',
      content: [
        { 
          heading: 'Zdanie oznajmujące (Elastyczny SVO)', 
          text: 'Podstawowy szyk zdania to Podmiot-Orzeczenie-Dopełnienie (SVO), ale jest on bardzo elastyczny. Podmiot (zaimek osobowy) jest często pomijany, ponieważ forma czasownika go wskazuje.',
          examples: [
            { original: '(Io) mangio la pasta.', translation: '(Ja) jem makaron.' },
            { original: 'Mia sorella legge un libro.', translation: 'Moja siostra czyta książkę.' }
          ]
        },
        { 
          heading: 'Pytania ogólne', 
          text: 'Najprostszym i najczęstszym sposobem tworzenia pytań jest zmiana intonacji zdania twierdzącego na wznoszącą na końcu.',
          examples: [
            { original: 'Parli italiano?', translation: 'Mówisz po włosku?' },
            { original: 'Vieni alla festa stasera?', translation: 'Idziesz dziś wieczorem na imprezę?' }
          ]
        },
        { 
          heading: 'Przeczenia (z "non")', 
          text: 'Przeczenia tworzy się bardzo prosto, umieszczając słówko "non" bezpośrednio przed odmienionym czasownikiem.',
          examples: [
            { original: 'Non capisco la lezione.', translation: 'Nie rozumiem lekcji.' },
            { original: 'Lui non ha una macchina.', translation: 'On nie ma samochodu.' }
          ]
        },
        { 
          heading: 'Zdania z zaimkami dopełnienia', 
          text: 'Zaimki dopełnienia (mi, ti, lo, la...) zazwyczaj stoją przed odmienionym czasownikiem.',
          examples: [
            { original: 'La vedo ogni giorno.', translation: 'Widzę ją codziennie.' },
            { original: 'Ti ho dato il mio numero.', translation: 'Dałem/am ci mój numer.' }
          ]
        },
        { 
          heading: 'Okoliczniki miejsca i czasu', 
          text: 'Mają dużą swobodę w zdaniu, ale najczęściej występują na początku lub na końcu zdania.',
          examples: [
            { original: 'Domani andiamo al mare.', translation: 'Jutro jedziemy nad morze.' },
            { original: 'Lavoro in ufficio ogni giorno.', translation: 'Pracuję w biurze każdego dnia.' }
          ]
        }
      ],
    },
      questions: {
        title: 'Domande',
        content: [
          { 
            heading: 'Pytania przez intonację', 
            text: 'Najczęstszym sposobem zadawania pytań, zwłaszcza w mowie, jest po prostu zmiana intonacji zdania oznajmującego na pytającą (wznoszącą na końcu). Szyk zdania pozostaje bez zmian.', 
            examples: [
              { original: 'Parli italiano?', translation: 'Mówisz po włosku?' },
              { original: 'Hai fame?', translation: 'Jesteś głodny/a?' }
            ]
          },
          { 
            heading: 'Pytania z zaimkami pytającymi', 
            text: 'Pytania szczegółowe tworzy się za pomocą zaimków pytających, takich jak "Che cosa?" (co?), "Chi?" (kto?), "Dove?" (gdzie?), "Quando?" (kiedy?), "Perché?" (dlaczego?), "Come?" (jak?). Zazwyczaj stoją one na początku zdania.', 
            examples: [
              { original: 'Dove abiti?', translation: 'Gdzie mieszkasz?' },
              { original: 'Perché studi l\'italiano?', translation: 'Dlaczego uczysz się włoskiego?' }
            ]
          },
          {
            heading: 'Pytania z inwersją (rzadkie)',
            text: 'Inwersja (przesunięcie podmiotu na koniec zdania) nie jest konieczna, ale może być użyta dla emfazy lub w bardziej formalnym, pisanym języku.',
            examples: [
              { original: 'Che cosa vuole la signora?', translation: 'Czego pani sobie życzy?' },
              { original: 'È arrivato Paolo?', translation: 'Czy Paweł przyjechał?' }
            ]
          },
          {
            heading: 'Pytania rozłączne (vero? / no?)',
            text: 'Aby poprosić o potwierdzenie, na końcu zdania dodaje się krótkie pytanie, takie jak "vero?" (prawda?) lub "no?".',
            examples: [
              { original: 'È una bella giornata, vero?', translation: 'To piękny dzień, prawda?' },
              { original: 'Vieni con noi, no?', translation: 'Idziesz z nami, nie?' }
            ]
          }
        ],
      },
      negations: {
        title: 'Negazioni',
        content: [
          { 
            heading: 'Podstawowe przeczenie z "non"', 
            text: 'Najprostszym sposobem tworzenia przeczeń jest umieszczenie słówka "non" bezpośrednio przed odmienionym czasownikiem.',
            examples: [
              { original: 'Non parlo italiano.', translation: 'Nie mówię po włosku.' },
              { original: 'Lei non è qui.', translation: 'Jej tu nie ma.' }
            ]
          },
          { 
            heading: 'Podwójne przeczenie', 
            text: 'Podobnie jak w hiszpańskim, słowa takie jak "niente" (nic) czy "nessuno" (nikt) wymagają "non" przed czasownikiem, jeśli stoją po nim.',
            examples: [
              { original: 'Non ho visto niente.', translation: 'Nic nie widziałem.' },
              { original: 'Non parlo mai con lui.', translation: 'Nigdy z nim nie rozmawiam.' }
            ]
          },
          { 
            heading: 'Pojedyncze przeczenie', 
            text: 'Jeśli słowo przeczące, takie jak "nessuno" (jako podmiot) lub "niente", stoi na początku zdania (przed czasownikiem), wtedy pomija się "non".',
            examples: [
              { original: 'Nessuno mi ha chiamato.', translation: 'Nikt do mnie nie dzwonił.' },
              { original: 'Niente è impossibile.', translation: 'Nic nie jest niemożliwe.' }
            ]
          },
          { 
            heading: 'Przeczenie z "né ... né"', 
            text: 'Konstrukcja "né ... né" odpowiada polskiemu "ani ... ani" i służy do łączenia dwóch lub więcej elementów w zdaniu przeczącym. Zwykle wymaga użycia "non" przed czasownikiem.',
            examples: [
              { original: 'Non mi piace né il tè né il caffè.', translation: 'Nie lubię ani herbaty, ani kawy.' },
              { original: 'Non ho né tempo né soldi.', translation: 'Nie mam ani czasu, ani pieniędzy.' }
            ]
          }
        ],
      },
      'adjectives': {
        title: 'Aggettivi',
        content: [
            { 
                heading: 'Zgodność rodzaju i liczby', 
                text: 'Przymiotniki muszą zgadzać się z rzeczownikiem pod względem rodzaju i liczby. Przymiotniki zakończone na "-o" mają cztery formy (-o, -a, -i, -e), a te zakończone na "-e" mają tylko dwie (-e, -i).',
                examples: [
                    { original: 'un ragazzo alto, una ragazza alta, dei ragazzi alti, delle ragazze alte', translation: 'wysoki chłopak, wysoka dziewczyna, wysocy chłopcy, wysokie dziewczynki' },
                    { original: 'un esame difficile, una lezione difficile, degli esami difficili, delle lezioni difficili', translation: 'trudny egzamin, trudna lekcja, trudne egzaminy, trudne lekcje' }
                ]
            },
            { 
                heading: 'Pozycja przymiotnika', 
                text: 'Większość przymiotników (kolory, narodowości, kształty) stoi po rzeczowniku. Niektóre powszechne przymiotniki, takie jak "bello", "bravo", "buono", "nuovo", "piccolo", mogą stać przed rzeczownikiem.',
                examples: [
                    { original: 'Ho comprato una macchina rossa.', translation: 'Kupiłem czerwony samochód.' },
                    { original: 'Questa è una bella casa.', translation: 'To jest piękny dom.' }
                ]
            },
             { 
                heading: 'Stopniowanie przymiotników', 
                text: 'Stopień wyższy tworzy się za pomocą "più" (bardziej) i "meno" (mniej). Stopień najwyższy absolutny tworzy się przez dodanie końcówki "-issimo/-issima", a względny przez rodzajnik + "più/meno".',
                examples: [
                    { original: 'Questa pizza è più buona di quella.', translation: 'Ta pizza jest lepsza od tamtej.' },
                    { original: 'È un film bellissimo.', translation: 'To jest przepiękny film (stopień najwyższy absolutny).' }
                ]
            }
        ],
    },
    'adverbs': {
        title: 'Avverbi',
        content: [],
    },
    'pronouns': {
        title: 'Pronomi',
        content: [],
    },
    'articles': {
      title: 'Articoli',
      content: [
          { 
              heading: 'Rodzajniki określone (Determinativi)', 
              text: 'Ich forma (il, lo, la, l\', i, gli, le) zależy od rodzaju, liczby i pierwszej litery rzeczownika. Używane przed konkretnymi, znanymi rzeczownikami.',
              examples: [
                  { original: 'il cane (pies), lo studente (student), l\'amica (przyjaciółka)', translation: 'Pies, student, przyjaciółka.' },
                  { original: 'Mi piace la pizza che abbiamo mangiato ieri.', translation: 'Smakuje mi ta pizza, którą jedliśmy wczoraj.' }
              ]
          },
          { 
              heading: 'Rodzajniki nieokreślone (Indeterminativi)', 
              text: 'Ich forma (un, uno, una, un\') również zależy od rodzaju i pierwszej litery rzeczownika. Używane do wprowadzenia nowej, nieokreślonej rzeczy.',
              examples: [
                  { original: 'Ho visto un film interessante.', translation: 'Obejrzałem/am interesujący film.' },
                  { original: 'C\'è uno zaino sul tavolo.', translation: 'Na stole jest (jakiś) plecak.' }
              ]
          },
          { 
              heading: 'Rodzajniki cząstkowe (Partitivi)', 
              text: 'Tworzone przez połączenie przyimka "di" z rodzajnikiem określonym (del, dello, della...). Używane do określenia niepoliczalnej lub nieokreślonej ilości czegoś.',
              examples: [
                  { original: 'Vorrei del vino rosso, per favore.', translation: 'Chciałbym/abym trochę czerwonego wina, proszę.' },
                  { original: 'Ho comprato dei libri nuovi.', translation: 'Kupiłem/am (kilka) nowych książek.' }
              ]
          }
      ],
  },
  },
};
