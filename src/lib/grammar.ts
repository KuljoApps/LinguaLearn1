
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
          text: 'Podstawowy szyk zdania w języku angielskim to SVO: Podmiot (Subject) + Orzeczenie (Verb) + Dopełnienie (Object). Ten porządek jest stosunkowo sztywny.',
          examples: [
            { original: 'She (S) reads (V) books (O).', translation: 'Ona czyta książki.' },
            { original: 'The students (S) finished (V) their homework (O).', translation: 'Uczniowie skończyli swoje zadanie domowe.' }
          ]
        },
        { 
          heading: 'Pytania ogólne (Yes/No)', 
          text: 'Podstawowe pytania tworzy się przez inwersję, czyli postawienie czasownika posiłkowego (do, does, is, are, have) przed podmiotem.',
          examples: [
            { original: 'Do you like music?', translation: 'Czy lubisz muzykę?' },
            { original: 'Is he a doctor?', translation: 'Czy on jest lekarzem?' }
          ]
        },
        { 
          heading: 'Przeczenia', 
          text: 'Przeczenie tworzy się dodając "not" po czasowniku posiłkowym. W czasie Present Simple i Past Simple dodaje się "do not" (don\'t) / "does not" (doesn\'t) lub "did not" (didn\'t).',
          examples: [
            { original: 'They are not from Canada.', translation: 'Oni nie są z Kanady.' },
            { original: 'I do not understand the question.', translation: 'Nie rozumiem tego pytania.' }
          ]
        },
        { 
          heading: 'Zdania z dopełnieniem', 
          text: 'Dopełnienie (kogo? co? komu? czemu?) zazwyczaj występuje po czasowniku. Jeśli używamy zaimków dopełnienia (me, you, him, her, it, us, them), również stoją one po czasowniku.',
          examples: [
            { original: 'He called me yesterday.', translation: 'On zadzwonił do mnie wczoraj.' },
            { original: 'She gave them the keys.', translation: 'Ona dała im klucze.' }
          ]
        },
        { 
          heading: 'Okoliczniki miejsca i czasu', 
          text: 'Określenia miejsca i czasu zazwyczaj umieszcza się na końcu zdania. Standardowa kolejność to: miejsce, a następnie czas.',
          examples: [
            { original: 'We went to the cinema yesterday.', translation: 'Poszliśmy wczoraj do kina.' },
            { original: 'She will be here in an hour.', translation: 'Ona będzie tutaj za godzinę.' }
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
          heading: 'Pytania rozłączne (Question Tags)',
          text: 'To krótkie pytania dodawane na końcu zdania twierdzącego lub przeczącego. Jeśli zdanie jest twierdzące, pytanie jest przeczące, i na odwrót.',
          examples: [
            { original: 'It\'s a beautiful day, isn\'t it?', translation: 'To piękny dzień, prawda?' },
            { original: 'You haven\'t seen my keys, have you?', translation: 'Nie widziałeś moich kluczy, prawda?' }
          ]
        },
        {
          heading: 'Pytania pośrednie (Indirect Questions)',
          text: 'Są to bardziej uprzejme formy pytań, często zaczynające się od zwrotów takich jak "Could you tell me..." lub "I was wondering...". W pytaniach pośrednich szyk zdania jest taki jak w zdaniu twierdzącym.',
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
        { heading: 'Przeczenia z "not"', text: 'Przeczenia tworzy się przez dodanie słówka "not" po czasowniku posiłkowym. W czasie Present Simple i Past Simple używa się operatora "do/does/did" z "not".', examples: [{original: 'She is not here. / I do not like spinach.', translation: 'Nie ma jej tutaj. / Nie lubię szpinaku.'}] },
        { heading: 'Skróty', text: 'W mowie potocznej często używa się form skróconych, np. "isn\'t", "don\'t", "can\'t".', examples: [{original: 'He can\'t swim.', translation: 'On nie umie pływać.'}] },
      ],
    },
    'adjectives': {
        title: 'Adjectives',
        content: [
            { heading: 'Position', text: 'Adjectives in English almost always come before the noun they describe.', examples: [{original: 'A beautiful cat', translation: 'Piękny kot'}] },
            { heading: 'Order of Adjectives', text: 'When using multiple adjectives, they usually follow a specific order: opinion, size, age, shape, color, origin, material, purpose.', examples: [{original: 'A lovely small old round black Italian leather riding boot.', translation: 'Uroczy mały stary okrągły czarny włoski skórzany but do jazdy konnej.'}] },
        ],
    },
    'adverbs': {
        title: 'Adverbs',
        content: [
            { heading: 'Adverbs of Manner', text: 'Describe how an action is performed. They often end in "-ly" and are placed after the verb or object.', examples: [{original: 'She sings beautifully.', translation: 'Ona pięknie śpiewa.'}] },
            { heading: 'Adverbs of Frequency', text: 'Describe how often an action happens (always, sometimes, never). They are usually placed before the main verb.', examples: [{original: 'I always drink coffee in the morning.', translation: 'Zawsze piję kawę rano.'}] },
        ],
    },
    'pronouns': {
        title: 'Pronouns',
        content: [
            { heading: 'Subject Pronouns', text: 'Replace the noun that is the subject of the sentence (I, you, he, she, it, we, they).', examples: [{original: 'She is my sister.', translation: 'Ona jest moją siostrą.'}] },
            { heading: 'Object Pronouns', text: 'Replace the noun that is the object of the sentence (me, you, him, her, it, us, them).', examples: [{original: 'He gave me the book.', translation: 'On dał mi książkę.'}] },
        ],
    },
    'articles': {
      title: 'Articles',
      content: [
          { heading: 'Definite Article (the)', text: 'The definite article "the" is used to refer to specific, known nouns.', examples: [{original: 'The dog is friendly.', translation: '(Ten konkretny) pies jest przyjazny.'}] },
          { heading: 'Indefinite Articles (a/an)', text: '"A" is used before words starting with a consonant sound, and "an" before words starting with a vowel sound. They refer to a non-specific noun.', examples: [{original: 'I saw a cat. / He wants an apple.', translation: 'Widziałem (jakiegoś) kota. / On chce (jakieś) jabłko.'}] },
          { heading: 'Zero Article', text: 'No article is used with plural countable nouns or uncountable nouns when speaking generally.', examples: [{original: 'Cats are independent. / I like music.', translation: 'Koty są niezależne. / Lubię muzykę.'}] },
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
          heading: 'Pytania ogólne (Ja/Nein-Fragen)', 
          text: 'Podstawowe pytania, na które można odpowiedzieć "tak" lub "nie", tworzy się przez postawienie odmienionego czasownika na pierwszym miejscu.',
          examples: [
            { original: 'Lernst du Deutsch?', translation: 'Czy uczysz się niemieckiego?' },
            { original: 'Hast du einen Hund?', translation: 'Czy masz psa?' }
          ]
        },
        { 
          heading: 'Przeczenia (nicht / kein)', 
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
          { heading: 'Przeczenie "nicht"', text: '"Nicht" służy do negowania czasowników, przymiotników, przysłówków i całych zdań. Zazwyczaj stoi na końcu zdania lub przed częścią, którą neguje.', examples: [{original: 'Ich lerne nicht. / Das ist nicht gut.', translation: 'Ja się nie uczę. / To nie jest dobre.'}] },
          { heading: 'Przeczenie "kein"', text: '"Kein" służy do negowania rzeczowników z rodzajnikiem nieokreślonym lub bez rodzajnika. Odmienia się jak rodzajnik nieokreślony.', examples: [{original: 'Ich habe keinen Hund.', translation: 'Nie mam (żadnego) psa.'}] },
        ],
    },
    'adjectives': {
        title: 'Adjektive',
        content: [
            { heading: 'Odmiana przymiotnika', text: 'W niemieckim przymiotniki odmieniają się, gdy stoją przed rzeczownikiem. Końcówka zależy od rodzajnika, przypadku i liczby.', examples: [{original: 'Ein guter Mann (mieszana), der gute Mann (słaba), guter Mann (mocna).', translation: 'Dobry mężczyzna.'}] },
            { heading: 'Przymiotnik jako orzecznik', text: 'Gdy przymiotnik występuje po czasownikach "sein", "werden", "bleiben" (jako orzecznik), pozostaje nieodmienny.', examples: [{original: 'Der Mann ist gut.', translation: 'Mężczyzna jest dobry.'}] },
        ],
    },
    'adverbs': {
        title: 'Adverbien',
        content: [
            { heading: 'Tworzenie przysłówków', text: 'Wiele przysłówków w języku niemieckim ma taką samą formę jak nieodmieniony przymiotnik.', examples: [{original: 'Er fährt schnell (szybko). Das schnelle Auto (szybki samochód).', translation: 'On jedzie szybko. Szybki samochód.'}] },
            { heading: 'Pozycja w zdaniu', text: 'Przysłówki czasu, przyczyny, sposobu i miejsca często występują w określonej kolejności (TeKaMoLo: Temporal, Kausal, Modal, Lokal).', examples: [{original: 'Ich fahre heute (Te) wegen des Wetters (Ka) langsam (Mo) nach Hause (Lo).', translation: 'Jadę dzisiaj z powodu pogody powoli do domu.'}] },
        ],
    },
    'pronouns': {
        title: 'Pronomen',
        content: [
            { heading: 'Zaimki osobowe', text: 'Zastępują osoby lub rzeczy i odmieniają się przez przypadki (Nominativ, Akkusativ, Dativ).', examples: [{original: 'Ich sehe ihn (Akk). Er gibt mir (Dat) das Buch.', translation: 'Widzę go. On daje mi książkę.'}] },
            { heading: 'Zaimki dzierżawcze', text: 'Określają przynależność (mein, dein, sein, ihr...). Odmieniają się jak rodzajnik nieokreślony i zależą od rodzaju i liczby rzeczownika.', examples: [{original: 'Das ist mein Hund.', translation: 'To jest mój pies.'}] },
        ],
    },
    'articles': {
      title: 'Artikel',
      content: [
          { heading: 'Bestimmte Artikel (der, die, das)', text: 'Rodzajniki określone odnoszą się do konkretnych, znanych osób lub rzeczy.', examples: [{original: 'Der Hund ist groß.', translation: '(Ten konkretny) pies jest duży.'}] },
          { heading: 'Unbestimmte Artikel (ein, eine)', text: 'Rodzajniki nieokreślone odnoszą się do nieokreślonej, jednej osoby lub rzeczy. Nie mają formy liczby mnogiej.', examples: [{original: 'Ich sehe einen Hund.', translation: 'Widzę (jakiegoś) psa.'}] },
          { heading: 'Nullartikel (brak rodzajnika)', text: 'Rodzajnika nie używa się m.in. przed nazwami własnymi, materiałami, rzeczownikami w liczbie mnogiej (gdy mowa ogólnie) i po określeniach miary.', examples: [{original: 'Ich trinke Milch. / Das sind Äpfel.', translation: 'Piję mleko. / To są jabłka.'}] },
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
          }
        ],
      },
      negations: {
        title: 'Negaciones',
        content: [
          { heading: 'Przeczenie "no"', text: 'Przeczenia tworzy się bardzo prosto, stawiając słówko "no" bezpośrednio przed odmienionym czasownikiem.', examples: [{original: 'No hablo español.', translation: 'Nie mówię po hiszpańsku.'}] },
          { heading: 'Podwójne przeczenie', text: 'W języku hiszpańskim podwójne przeczenie jest poprawne i konieczne, np. przy użyciu "nadie" (nikt), "nada" (nic), "nunca" (nigdy).', examples: [{original: 'No veo a nadie.', translation: 'Nikogo nie widzę (dosł. Nie widzę nikogo).'}] },
        ],
    },
    'adjectives': {
        title: 'Adjetivos',
        content: [
            { heading: 'Pozycja przymiotnika', text: 'Zazwyczaj przymiotnik stoi po rzeczowniku, który opisuje. Zmiana pozycji może zmienić znaczenie.', examples: [{original: 'Un coche grande (duży samochód) vs un gran coche (wspaniały samochód).', translation: 'Duży samochód vs wspaniały samochód.'}] },
            { heading: 'Zgodność rodzaju i liczby', text: 'Przymiotniki muszą zgadzać się co do rodzaju (męski/żeński) i liczby (pojedyncza/mnoga) z rzeczownikiem.', examples: [{original: 'La casa es bonita. Los coches son bonitos.', translation: 'Dom jest ładny. Samochody są ładne.'}] },
        ],
    },
    'adverbs': {
        title: 'Adverbios',
        content: [
            { heading: 'Tworzenie z przymiotników', text: 'Wiele przysłówków tworzy się, dodając końcówkę "-mente" do żeńskiej formy przymiotnika.', examples: [{original: 'rápido -> rápida -> rápidamente', translation: 'szybki -> szybko'}] },
            { heading: 'Pozycja w zdaniu', text: 'Przysłówki zazwyczaj stoją blisko słowa, które modyfikują (czasownika, przymiotnika lub innego przysłówka).', examples: [{original: 'Él corre muy rápido.', translation: 'On biega bardzo szybko.'}] },
        ],
    },
    'pronouns': {
        title: 'Pronombres',
        content: [
            { heading: 'Pominięcie zaimka podmiotowego', text: 'Zaimki podmiotowe (yo, tú, él...) są często pomijane, ponieważ forma czasownika jasno wskazuje, o kogo chodzi.', examples: [{original: '(Yo) hablo español.', translation: 'Mówię po hiszpańsku.'}] },
            { heading: 'Zaimki dopełnienia', text: 'Zaimki dopełnienia bliższego (lo, la, los, las) i dalszego (le, les) stoją przed odmienionym czasownikiem lub są dołączone do bezokolicznika/gerundio.', examples: [{original: 'Lo veo. / Quiero verlo.', translation: 'Widzę go. / Chcę go zobaczyć.'}] },
        ],
    },
    'articles': {
      title: 'Artículos',
      content: [
          { heading: 'Artículos Determinados (el, la, los, las)', text: 'Rodzajniki określone odnoszą się do konkretnych, znanych rzeczowników.', examples: [{original: 'El coche es rojo.', translation: '(Ten konkretny) samochód jest czerwony.'}] },
          { heading: 'Artículos Indeterminados (un, una, unos, unas)', text: 'Rodzajniki nieokreślone odnoszą się do niesprecyzowanych, jakichkolwiek rzeczowników.', examples: [{original: 'Veo un coche.', translation: 'Widzę (jakiś) samochód.'}] },
          { heading: 'Kontrakcje (al, del)', text: 'Przyimki "a" i "de" łączą się z rodzajnikiem "el", tworząc formy "al" (a + el) i "del" (de + el).', examples: [{original: 'Voy al cine. / Vengo del trabajo.', translation: 'Idę do kina. / Wracam z pracy.'}] },
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
          }
        ],
      },
      negations: {
        title: 'La Négation',
        content: [
          { heading: 'Konstrukcja "ne ... pas"', text: 'Podstawowe przeczenie tworzy się za pomocą dwóch słów: "ne" i "pas", które otaczają odmieniony czasownik.', examples: [{original: 'Je ne parle pas français.', translation: 'Nie mówię po francusku.'}] },
          { heading: 'Skracanie w mowie', text: 'W języku mówionym bardzo często pomija się "ne", pozostawiając tylko "pas".', examples: [{original: 'Je parle pas français.', translation: '(Potocznie) Nie mówię po francusku.'}] },
        ],
    },
    'adjectives': {
        title: 'Adjectifs',
        content: [
            { heading: 'Pozycja przymiotnika', text: 'Większość przymiotników stoi po rzeczowniku. Krótkie i powszechne przymiotniki (jak beau, grand, petit, bon) stoją przed rzeczownikiem.', examples: [{original: 'Une voiture rouge (czerwony samochód) vs une belle voiture (piękny samochód).', translation: 'Czerwony samochód vs piękny samochód.'}] },
            { heading: 'Zgodność rodzaju i liczby', text: 'Przymiotniki muszą zgadzać się co do rodzaju (męski/żeński) i liczby (pojedyncza/mnoga) z rzeczownikiem, który opisują.', examples: [{original: 'Un petit garçon, une petite fille, de petits garçons, de petites filles.', translation: 'Mały chłopiec, mała dziewczynka, mali chłopcy, małe dziewczynki.'}] },
        ],
    },
    'adverbs': {
        title: 'Adverbes',
        content: [
            { heading: 'Tworzenie z przymiotników', text: 'Wiele przysłówków tworzy się, dodając końcówkę "-ment" do żeńskiej formy przymiotnika.', examples: [{original: 'lent -> lente -> lentement', translation: 'wolny -> wolno'}] },
            { heading: 'Pozycja w zdaniu', text: 'W czasach prostych przysłówek stoi po czasowniku. W czasach złożonych (np. Passé Composé) krótki przysłówek stoi między czasownikiem posiłkowym a Participe Passé.', examples: [{original: 'Il parle lentement. / Il a bien mangé.', translation: 'On mówi powoli. / On dobrze zjadł.'}] },
        ],
    },
    'pronouns': {
        title: 'Pronoms',
        content: [
            { heading: 'Zaimki dopełnienia (COD/COI)', text: 'Stoją zawsze przed czasownikiem (lub czasownikiem posiłkowym w czasach złożonych).', examples: [{original: 'Je te vois. (Widzę cię) / Je lui parle. (Mówię do niego/niej).', translation: 'Widzę cię. / Mówię do niego/niej.'}] },
            { heading: 'Zaimki "en" i "y"', text: '"En" zastępuje rzeczowniki z "de" (np. de la, du, des), a "y" zastępuje rzeczowniki z "à" lub określenia miejsca.', examples: [{original: 'Tu as des frères? Oui, j\'en ai. / Tu vas à Paris? Oui, j\'y vais.', translation: 'Masz braci? Tak, mam. / Jedziesz do Paryża? Tak, jadę.'}] },
        ],
    },
    'articles': {
      title: 'Les Articles',
      content: [
          { heading: 'Articles Définis (le, la, l\', les)', text: 'Rodzajniki określone używane są przed rzeczownikami, które są konkretne lub już znane.', examples: [{original: 'J\'aime le chocolat.', translation: 'Lubię (tę konkretną, ogólnie znaną) czekoladę.'}] },
          { heading: 'Articles Indéfinis (un, une, des)', text: 'Rodzajniki nieokreślone wprowadzają nowy, nieokreślony rzeczownik.', examples: [{original: 'J\'ai acheté un livre.', translation: 'Kupiłem/am (jakąś) książkę.'}] },
          { heading: 'Articles Partitifs (du, de la, de l\', des)', text: 'Używane do określenia niepoliczalnej ilości czegoś (trochę, część).', examples: [{original: 'Je voudrais de l\'eau.', translation: 'Chciałbym/Chciałabym (trochę) wody.'}] },
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
          }
        ],
      },
      negations: {
        title: 'Negazioni',
        content: [
          { heading: 'Przeczenie "non"', text: 'Przeczenia tworzy się poprzez umieszczenie słówka "non" bezpośrednio przed odmienionym czasownikiem.', examples: [{original: 'Non parlo italiano.', translation: 'Nie mówię po włosku.'}] },
          { heading: 'Inne słowa przeczące', text: 'Podobnie jak w hiszpańskim, słowa takie jak "niente" (nic) czy "nessuno" (nikt) wymagają "non" przed czasownikiem, jeśli stoją po nim.', examples: [{original: 'Non ho visto nessuno.', translation: 'Nikogo nie widziałem.'}] },
        ],
    },
    'adjectives': {
        title: 'Aggettivi',
        content: [
            { heading: 'Pozycja przymiotnika', text: 'Podobnie jak w hiszpańskim, przymiotniki zazwyczaj stoją po rzeczowniku. Niektóre, jak "bello" czy "bravo", mogą stać przed.', examples: [{original: 'Una macchina rossa (czerwony samochód) vs una bella macchina (piękny samochód).', translation: 'Czerwony samochód vs piękny samochód.'}] },
            { heading: 'Zgodność', text: 'Przymiotniki muszą zgadzać się co do rodzaju i liczby z rzeczownikiem, który opisują. Mają różne końcówki w zależności od grupy.', examples: [{original: 'un ragazzo alto, una ragazza alta, due ragazzi alti, due ragazze alte.', translation: 'wysoki chłopak, wysoka dziewczyna, wysocy chłopcy, wysokie dziewczyny.'}] },
        ],
    },
    'adverbs': {
        title: 'Avverbi',
        content: [
            { heading: 'Tworzenie z przymiotników', text: 'Podobnie jak w hiszpańskim i francuskim, przysłówki tworzy się dodając końcówkę "-mente" do żeńskiej formy przymiotnika.', examples: [{original: 'lento -> lenta -> lentamente', translation: 'wolny -> wolno'}] },
            { heading: 'Pozycja w zdaniu', text: 'Przysłówki zazwyczaj umieszcza się po czasowniku, który modyfikują.', examples: [{original: 'Lui parla lentamente.', translation: 'On mówi powoli.'}] },
        ],
    },
    'pronouns': {
        title: 'Pronomi',
        content: [
            { heading: 'Pominięcie zaimka podmiotowego', text: 'Zaimki podmiotowe (io, tu, lui...) są bardzo często pomijane, ponieważ forma czasownika jest wystarczająca do identyfikacji podmiotu.', examples: [{original: '(Io) sono polacco.', translation: 'Jestem Polakiem.'}] },
            { heading: 'Połączone zaimki dopełnienia', text: 'Zaimki dopełnienia bliższego i dalszego mogą się łączyć, tworząc jedną formę (np. me lo, te la). Zawsze stoją przed odmienionym czasownikiem.', examples: [{original: 'Me lo dai?', translation: 'Dasz mi to?'}] },
        ],
    },
    'articles': {
      title: 'Articoli',
      content: [
          { heading: 'Articoli Determinativi (il, lo, la...)', text: 'Rodzajniki określone używane są przed znanymi, specyficznymi rzeczownikami. Ich forma zależy od rodzaju, liczby i pierwszej litery rzeczownika.', examples: [{original: 'Il cane, lo studente, la casa, l\'amica.', translation: 'Pies, student, dom, przyjaciółka.'}] },
          { heading: 'Articoli Indeterminativi (un, uno, una...)', text: 'Rodzajniki nieokreślone wprowadzają nowy rzeczownik. Ich forma również zależy od rodzaju i pierwszej litery rzeczownika.', examples: [{original: 'un cane, uno studente, una casa, un\'amica.', translation: '(jakiś) pies, (jakiś) student, (jakiś) dom, (jakaś) przyjaciółka.'}] },
      ],
  },
  },
};

    