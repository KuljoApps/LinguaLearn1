import type { Language } from './storage';

export interface GrammarRule {
  heading: string;
  text: string;
  example?: string;
  example_pl?: string;
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
        { heading: 'Podstawowy szyk zdania (SVO)', text: 'W języku angielskim domyślnym szykiem zdania oznajmującego jest Podmiot (Subject) + Orzeczenie (Verb) + Dopełnienie (Object).', example: 'She (S) loves (V) pizza (O).', example_pl: 'Ona kocha pizzę.' },
        { heading: 'Przysłówki miejsca i czasu', text: 'Określenia miejsca i czasu zazwyczaj umieszcza się na końcu zdania, w kolejności: sposób, miejsce, czas (Manner, Place, Time).', example: 'He read the book quietly in the library yesterday.', example_pl: 'On wczoraj w ciszy czytał książkę w bibliotece.' },
        { heading: 'Inwersja w pytaniach', text: 'Pytania tworzy się przez inwersję, czyli zamianę miejscami podmiotu i czasownika posiłkowego (do, be, have).', example: 'Do you like coffee?', example_pl: 'Czy lubisz kawę?' },
        { heading: 'Szyk zdania przeczącego', text: 'Przeczenie "not" umieszcza się po czasowniku posiłkowym.', example: 'They have not finished their homework.', example_pl: 'Oni nie skończyli swojego zadania domowego.' },
      ],
    },
    questions: {
      title: 'Questions',
      content: [
        { heading: 'Pytania ogólne (Yes/No)', text: 'Tworzy się je przez inwersję, czyli zamianę miejscami podmiotu i czasownika posiłkowego (auxiliary verb) jak "be", "have", "will" lub dodanie "do/does/did".', example: 'Is she a doctor? / Do you like coffee?', example_pl: 'Czy ona jest lekarką? / Czy lubisz kawę?' },
        { heading: 'Pytania szczegółowe (Wh-questions)', text: 'Zaczynają się od zaimków pytających (what, where, when, who, why, how) i zazwyczaj zachowują szyk zdania pytającego (zaimek + czasownik posiłkowy + podmiot + reszta).', example: 'Where did you go yesterday?', example_pl: 'Gdzie wczoraj poszedłeś?' },
      ],
    },
    negations: {
      title: 'Negations',
      content: [
        { heading: 'Przeczenia z "not"', text: 'Przeczenia tworzy się przez dodanie słówka "not" po czasowniku posiłkowym. W czasie Present Simple i Past Simple używa się operatora "do/does/did" z "not".', example: 'She is not here. / I do not like spinach.', example_pl: 'Nie ma jej tutaj. / Nie lubię szpinaku.' },
        { heading: 'Skróty', text: 'W mowie potocznej często używa się form skróconych, np. "isn\'t", "don\'t", "can\'t".', example: 'He can\'t swim.', example_pl: 'On nie umie pływać.' },
      ],
    },
    'adjectives': {
        title: 'Adjectives',
        content: [
            { heading: 'Position', text: 'Adjectives in English almost always come before the noun they describe.', example: 'A beautiful cat', example_pl: 'Piękny kot' },
            { heading: 'Order of Adjectives', text: 'When using multiple adjectives, they usually follow a specific order: opinion, size, age, shape, color, origin, material, purpose.', example: 'A lovely small old round black Italian leather riding boot.', example_pl: 'Uroczy mały stary okrągły czarny włoski skórzany but do jazdy konnej.' },
        ],
    },
    'adverbs': {
        title: 'Adverbs',
        content: [
            { heading: 'Adverbs of Manner', text: 'Describe how an action is performed. They often end in "-ly" and are placed after the verb or object.', example: 'She sings beautifully.', example_pl: 'Ona pięknie śpiewa.' },
            { heading: 'Adverbs of Frequency', text: 'Describe how often an action happens (always, sometimes, never). They are usually placed before the main verb.', example: 'I always drink coffee in the morning.', example_pl: 'Zawsze piję kawę rano.' },
        ],
    },
    'pronouns': {
        title: 'Pronouns',
        content: [
            { heading: 'Subject Pronouns', text: 'Replace the noun that is the subject of the sentence (I, you, he, she, it, we, they).', example: 'She is my sister.', example_pl: 'Ona jest moją siostrą.' },
            { heading: 'Object Pronouns', text: 'Replace the noun that is the object of the sentence (me, you, him, her, it, us, them).', example: 'He gave me the book.', example_pl: 'On dał mi książkę.' },
        ],
    },
    'articles': {
      title: 'Articles',
      content: [
          { heading: 'Definite Article (the)', text: 'The definite article "the" is used to refer to specific, known nouns.', example: 'The dog is friendly.', example_pl: '(Ten konkretny) pies jest przyjazny.' },
          { heading: 'Indefinite Articles (a/an)', text: '"A" is used before words starting with a consonant sound, and "an" before words starting with a vowel sound. They refer to a non-specific noun.', example: 'I saw a cat. / He wants an apple.', example_pl: 'Widziałem (jakiegoś) kota. / On chce (jakieś) jabłko.' },
          { heading: 'Zero Article', text: 'No article is used with plural countable nouns or uncountable nouns when speaking generally.', example: 'Cats are independent. / I like music.', example_pl: 'Koty są niezależne. / Lubię muzykę.' },
      ],
  },
  },
  de: {
    'sentence-structure': {
        title: 'Satzbau',
        content: [
          { heading: 'Szyk prosty (V2)', text: 'W niemieckim zdaniu oznajmującym odmieniony czasownik (orzeczenie) zawsze zajmuje drugą pozycję.', example: 'Ich lerne heute Deutsch.', example_pl: 'Uczę się dzisiaj niemieckiego.' },
          { heading: 'Szyk przestawny (Inwersja)', text: 'Jeśli na pierwszej pozycji w zdaniu umieścimy inny element niż podmiot (np. przysłówek czasu), podmiot przesuwa się za orzeczenie.', example: 'Heute lerne ich Deutsch.', example_pl: 'Dzisiaj uczę się niemieckiego.' },
          { heading: 'Ramowa konstrukcja zdania (Satzklammer)', text: 'W czasach złożonych (np. Perfekt) lub z czasownikami modalnymi, druga część orzeczenia (Partizip II lub bezokolicznik) wędruje na sam koniec zdania.', example: 'Ich habe das Buch gelesen. / Ich will Deutsch lernen.', example_pl: 'Przeczytałem tę książkę. / Chcę uczyć się niemieckiego.' },
          { heading: 'Szyk końcowy w zdaniach podrzędnych', text: 'W zdaniach podrzędnych, wprowadzanych przez spójniki takie jak "weil" (ponieważ), "dass" (że), "wenn" (kiedy, jeśli), odmieniony czasownik przenosi się na koniec zdania.', example: 'Ich bleibe zu Hause, weil es regnet.', example_pl: 'Zostaję w domu, ponieważ pada deszcz.' },
        ],
      },
      questions: {
        title: 'Fragen',
        content: [
          { heading: 'Pytania rozstrzygnięcia (Ja/Nein-Fragen)', text: 'Tworzy się je przez postawienie orzeczenia na pierwszym miejscu w zdaniu (inwersja).', example: 'Lernst du Deutsch?', example_pl: 'Czy uczysz się niemieckiego?' },
          { heading: 'Pytania szczegółowe (W-Fragen)', text: 'Zaczynają się od zaimka pytającego (Was, Wer, Wo, Wann, Warum, Wie), po którym na drugim miejscu stoi orzeczenie.', example: 'Warum lernst du Deutsch?', example_pl: 'Dlaczego uczysz się niemieckiego?' },
        ],
      },
      negations: {
        title: 'Verneinung',
        content: [
          { heading: 'Przeczenie "nicht"', text: '"Nicht" służy do negowania czasowników, przymiotników, przysłówków i całych zdań. Zazwyczaj stoi na końcu zdania lub przed częścią, którą neguje.', example: 'Ich lerne nicht. / Das ist nicht gut.', example_pl: 'Ja się nie uczę. / To nie jest dobre.' },
          { heading: 'Przeczenie "kein"', text: '"Kein" służy do negowania rzeczowników z rodzajnikiem nieokreślonym lub bez rodzajnika. Odmienia się jak rodzajnik nieokreślony.', example: 'Ich habe keinen Hund.', example_pl: 'Nie mam (żadnego) psa.' },
        ],
    },
    'adjectives': {
        title: 'Adjektive',
        content: [
            { heading: 'Odmiana przymiotnika', text: 'W niemieckim przymiotniki odmieniają się, gdy stoją przed rzeczownikiem. Końcówka zależy od rodzajnika, przypadku i liczby.', example: 'Ein guter Mann (mieszana), der gute Mann (słaba), guter Mann (mocna).', example_pl: 'Dobry mężczyzna.' },
            { heading: 'Przymiotnik jako orzecznik', text: 'Gdy przymiotnik występuje po czasownikach "sein", "werden", "bleiben" (jako orzecznik), pozostaje nieodmienny.', example: 'Der Mann ist gut.', example_pl: 'Mężczyzna jest dobry.' },
        ],
    },
    'adverbs': {
        title: 'Adverbien',
        content: [
            { heading: 'Tworzenie przysłówków', text: 'Wiele przysłówków w języku niemieckim ma taką samą formę jak nieodmieniony przymiotnik.', example: 'Er fährt schnell (szybko). Das schnelle Auto (szybki samochód).', example_pl: 'On jedzie szybko. Szybki samochód.' },
            { heading: 'Pozycja w zdaniu', text: 'Przysłówki czasu, przyczyny, sposobu i miejsca często występują w określonej kolejności (TeKaMoLo: Temporal, Kausal, Modal, Lokal).', example: 'Ich fahre heute (Te) wegen des Wetters (Ka) langsam (Mo) nach Hause (Lo).', example_pl: 'Jadę dzisiaj z powodu pogody powoli do domu.' },
        ],
    },
    'pronouns': {
        title: 'Pronomen',
        content: [
            { heading: 'Zaimki osobowe', text: 'Zastępują osoby lub rzeczy i odmieniają się przez przypadki (Nominativ, Akkusativ, Dativ).', example: 'Ich sehe ihn (Akk). Er gibt mir (Dat) das Buch.', example_pl: 'Widzę go. On daje mi książkę.' },
            { heading: 'Zaimki dzierżawcze', text: 'Określają przynależność (mein, dein, sein, ihr...). Odmieniają się jak rodzajnik nieokreślony i zależą od rodzaju i liczby rzeczownika.', example: 'Das ist mein Hund.', example_pl: 'To jest mój pies.' },
        ],
    },
    'articles': {
      title: 'Artikel',
      content: [
          { heading: 'Bestimmte Artikel (der, die, das)', text: 'Rodzajniki określone odnoszą się do konkretnych, znanych osób lub rzeczy.', example: 'Der Hund ist groß.', example_pl: '(Ten konkretny) pies jest duży.' },
          { heading: 'Unbestimmte Artikel (ein, eine)', text: 'Rodzajniki nieokreślone odnoszą się do nieokreślonej, jednej osoby lub rzeczy. Nie mają formy liczby mnogiej.', example: 'Ich sehe einen Hund.', example_pl: 'Widzę (jakiegoś) psa.' },
          { heading: 'Nullartikel (brak rodzajnika)', text: 'Rodzajnika nie używa się m.in. przed nazwami własnymi, materiałami, rzeczownikami w liczbie mnogiej (gdy mowa ogólnie) i po określeniach miary.', example: 'Ich trinke Milch. / Das sind Äpfel.', example_pl: 'Piję mleko. / To są jabłka.' },
      ],
  },
  },
  es: {
    'sentence-structure': {
        title: 'Estructura de la Oración',
        content: [
          { heading: 'Elastyczny szyk SVO', text: 'Podstawowy szyk to Podmiot-Orzeczenie-Dopełnienie (SVO), ale jest on bardzo elastyczny. Często pomija się zaimek osobowy, ponieważ forma czasownika go wskazuje.', example: '(Yo) como una manzana.', example_pl: '(Ja) jem jabłko.' },
          { heading: 'Pozycja przymiotnika', text: 'W przeciwieństwie do polskiego, przymiotniki zazwyczaj umieszcza się PO rzeczowniku.', example: 'Tengo un coche rojo.', example_pl: 'Mam czerwony samochód.' },
          { heading: 'Szyk zdania przeczącego', text: 'Przeczenie "no" zawsze stawia się bezpośrednio PRZED odmienionym czasownikiem.', example: 'Ella no habla inglés.', example_pl: 'Ona nie mówi po angielsku.' },
          { heading: 'Szyk w pytaniach', text: 'Pytania najczęściej tworzy się przez inwersję (zamianę miejscami czasownika i podmiotu) lub po prostu przez zmianę intonacji.', example: '¿Vives tú en Madrid? / ¿Tú vives en Madrid?', example_pl: 'Czy mieszkasz w Madrycie?' },
        ],
      },
      questions: {
        title: 'Preguntas',
        content: [
          { heading: 'Pytania przez intonację', text: 'Najprostszym sposobem jest zmiana intonacji zdania oznajmującego na pytającą. W piśmie stosuje się odwrócone znaki zapytania na początku (¿) i normalne na końcu (?).', example: '¿Hablas español?', example_pl: 'Mówisz po hiszpańsku?' },
          { heading: 'Pytania przez inwersję', text: 'Można również zamienić miejscami podmiot i orzeczenie, choć nie jest to tak częste jak w angielskim.', example: '¿Viene Juan a la fiesta?', example_pl: 'Czy Juan przychodzi na imprezę?' },
          { heading: 'Pytania z zaimkami pytającymi', text: 'Pytania szczegółowe zaczynają się od zaimków takich jak Qué, Quién, Dónde, Cuándo, Por qué, Cómo.', example: '¿Dónde vives?', example_pl: 'Gdzie mieszkasz?' },
        ],
      },
      negations: {
        title: 'Negaciones',
        content: [
          { heading: 'Przeczenie "no"', text: 'Przeczenia tworzy się bardzo prosto, stawiając słówko "no" bezpośrednio przed odmienionym czasownikiem.', example: 'No hablo español.', example_pl: 'Nie mówię po hiszpańsku.' },
          { heading: 'Podwójne przeczenie', text: 'W języku hiszpańskim podwójne przeczenie jest poprawne i konieczne, np. przy użyciu "nadie" (nikt), "nada" (nic), "nunca" (nigdy).', example: 'No veo a nadie.', example_pl: 'Nikogo nie widzę (dosł. Nie widzę nikogo).' },
        ],
    },
    'adjectives': {
        title: 'Adjetivos',
        content: [
            { heading: 'Pozycja przymiotnika', text: 'Zazwyczaj przymiotnik stoi po rzeczowniku, który opisuje. Zmiana pozycji może zmienić znaczenie.', example: 'Un coche grande (duży samochód) vs un gran coche (wspaniały samochód).', example_pl: 'Duży samochód vs wspaniały samochód.' },
            { heading: 'Zgodność rodzaju i liczby', text: 'Przymiotniki muszą zgadzać się co do rodzaju (męski/żeński) i liczby (pojedyncza/mnoga) z rzeczownikiem.', example: 'La casa es bonita. Los coches son bonitos.', example_pl: 'Dom jest ładny. Samochody są ładne.' },
        ],
    },
    'adverbs': {
        title: 'Adverbios',
        content: [
            { heading: 'Tworzenie z przymiotników', text: 'Wiele przysłówków tworzy się, dodając końcówkę "-mente" do żeńskiej formy przymiotnika.', example: 'rápido -> rápida -> rápidamente', example_pl: 'szybki -> szybko' },
            { heading: 'Pozycja w zdaniu', text: 'Przysłówki zazwyczaj stoją blisko słowa, które modyfikują (czasownika, przymiotnika lub innego przysłówka).', example: 'Él corre muy rápido.', example_pl: 'On biega bardzo szybko.' },
        ],
    },
    'pronouns': {
        title: 'Pronombres',
        content: [
            { heading: 'Pominięcie zaimka podmiotowego', text: 'Zaimki podmiotowe (yo, tú, él...) są często pomijane, ponieważ forma czasownika jasno wskazuje, o kogo chodzi.', example: '(Yo) hablo español.', example_pl: 'Mówię po hiszpańsku.' },
            { heading: 'Zaimki dopełnienia', text: 'Zaimki dopełnienia bliższego (lo, la, los, las) i dalszego (le, les) stoją przed odmienionym czasownikiem lub są dołączone do bezokolicznika/gerundio.', example: 'Lo veo. / Quiero verlo.', example_pl: 'Widzę go. / Chcę go zobaczyć.' },
        ],
    },
    'articles': {
      title: 'Artículos',
      content: [
          { heading: 'Artículos Determinados (el, la, los, las)', text: 'Rodzajniki określone odnoszą się do konkretnych, znanych rzeczowników.', example: 'El coche es rojo.', example_pl: '(Ten konkretny) samochód jest czerwony.' },
          { heading: 'Artículos Indeterminados (un, una, unos, unas)', text: 'Rodzajniki nieokreślone odnoszą się do niesprecyzowanych, jakichkolwiek rzeczowników.', example: 'Veo un coche.', example_pl: 'Widzę (jakiś) samochód.' },
          { heading: 'Kontrakcje (al, del)', text: 'Przyimki "a" i "de" łączą się z rodzajnikiem "el", tworząc formy "al" (a + el) i "del" (de + el).', example: 'Voy al cine. / Vengo del trabajo.', example_pl: 'Idę do kina. / Wracam z pracy.' },
      ],
  },
  },
  fr: {
    'sentence-structure': {
        title: 'Structure de la Phrase',
        content: [
          { heading: 'Podstawowy szyk zdania (SVO)', text: 'Standardowy szyk zdania to Podmiot (Sujet) + Orzeczenie (Verbe) + Dopełnienie (Objet).', example: 'Le chat mange la souris.', example_pl: 'Kot je mysz.' },
          { heading: 'Szyk przeczenia "ne...pas"', text: 'Cząstki przeczące "ne" i "pas" otaczają odmieniony czasownik w czasach prostych. W potocznej mowie "ne" jest często pomijane.', example: 'Je ne comprends pas. / Je comprends pas.', example_pl: 'Nie rozumiem.' },
          { heading: 'Pozycja zaimków dopełnienia', text: 'Zaimki dopełnienia (np. le, la, lui, leur) zawsze stoją PRZED czasownikiem, którego dotyczą.', example: 'Je le vois. (Widzę go) / Elle lui parle. (Ona do niego/niej mówi).', example_pl: 'Widzę go. / Ona do niego/niej mówi.' },
          { heading: 'Inwersja w pytaniach (formalna)', text: 'W formalnych pytaniach następuje inwersja podmiotu z orzeczeniem, połączona myślnikiem.', example: 'Parlez-vous français?', example_pl: 'Czy mówi Pan/Pani po francusku?' },
        ],
      },
      questions: {
        title: 'Les Questions',
        content: [
          { heading: 'Pytania przez "Est-ce que"', text: 'Najprostszy i najczęstszy sposób tworzenia pytań to dodanie "Est-ce que" na początku zdania oznajmującego.', example: 'Est-ce que tu parles français?', example_pl: 'Czy mówisz po francusku?' },
          { heading: 'Pytania przez inwersję', text: 'Bardziej formalny sposób to inwersja, czyli zamiana miejscami podmiotu i orzeczenia.', example: 'Parles-tu français?', example_pl: 'Czy mówisz po francusku?' },
          { heading: 'Pytania przez intonację', text: 'W mowie potocznej najczęściej zadaje się pytanie po prostu zmieniając intonację zdania oznajmującego na wznoszącą.', example: 'Tu parles français?', example_pl: 'Mówisz po francusku?' },
        ],
      },
      negations: {
        title: 'La Négation',
        content: [
          { heading: 'Konstrukcja "ne ... pas"', text: 'Podstawowe przeczenie tworzy się za pomocą dwóch słów: "ne" i "pas", które otaczają odmieniony czasownik.', example: 'Je ne parle pas français.', example_pl: 'Nie mówię po francusku.' },
          { heading: 'Skracanie w mowie', text: 'W języku mówionym bardzo często pomija się "ne", pozostawiając tylko "pas".', example: 'Je parle pas français.', example_pl: '(Potocznie) Nie mówię po francusku.' },
        ],
    },
    'adjectives': {
        title: 'Adjectifs',
        content: [
            { heading: 'Pozycja przymiotnika', text: 'Większość przymiotników stoi po rzeczowniku. Krótkie i powszechne przymiotniki (jak beau, grand, petit, bon) stoją przed rzeczownikiem.', example: 'Une voiture rouge (czerwony samochód) vs une belle voiture (piękny samochód).', example_pl: 'Czerwony samochód vs piękny samochód.' },
            { heading: 'Zgodność rodzaju i liczby', text: 'Przymiotniki muszą zgadzać się co do rodzaju (męski/żeński) i liczby (pojedyncza/mnoga) z rzeczownikiem, który opisują.', example: 'Un petit garçon, une petite fille, de petits garçons, de petites filles.', example_pl: 'Mały chłopiec, mała dziewczynka, mali chłopcy, małe dziewczynki.' },
        ],
    },
    'adverbs': {
        title: 'Adverbes',
        content: [
            { heading: 'Tworzenie z przymiotników', text: 'Wiele przysłówków tworzy się, dodając końcówkę "-ment" do żeńskiej formy przymiotnika.', example: 'lent -> lente -> lentement', example_pl: 'wolny -> wolno' },
            { heading: 'Pozycja w zdaniu', text: 'W czasach prostych przysłówek stoi po czasowniku. W czasach złożonych (np. Passé Composé) krótki przysłówek stoi między czasownikiem posiłkowym a Participe Passé.', example: 'Il parle lentement. / Il a bien mangé.', example_pl: 'On mówi powoli. / On dobrze zjadł.' },
        ],
    },
    'pronouns': {
        title: 'Pronoms',
        content: [
            { heading: 'Zaimki dopełnienia (COD/COI)', text: 'Stoją zawsze przed czasownikiem (lub czasownikiem posiłkowym w czasach złożonych).', example: 'Je te vois. (Widzę cię) / Je lui parle. (Mówię do niego/niej).', example_pl: 'Widzę cię. / Mówię do niego/niej.' },
            { heading: 'Zaimki "en" i "y"', text: '"En" zastępuje rzeczowniki z "de" (np. de la, du, des), a "y" zastępuje rzeczowniki z "à" lub określenia miejsca.', example: 'Tu as des frères? Oui, j\'en ai. / Tu vas à Paris? Oui, j\'y vais.', example_pl: 'Masz braci? Tak, mam. / Jedziesz do Paryża? Tak, jadę.' },
        ],
    },
    'articles': {
      title: 'Les Articles',
      content: [
          { heading: 'Articles Définis (le, la, l\', les)', text: 'Rodzajniki określone używane są przed rzeczownikami, które są konkretne lub już znane.', example: 'J\'aime le chocolat.', example_pl: 'Lubię (tę konkretną, ogólnie znaną) czekoladę.' },
          { heading: 'Articles Indéfinis (un, une, des)', text: 'Rodzajniki nieokreślone wprowadzają nowy, nieokreślony rzeczownik.', example: 'J\'ai acheté un livre.', example_pl: 'Kupiłem/am (jakąś) książkę.' },
          { heading: 'Articles Partitifs (du, de la, de l\', des)', text: 'Używane do określenia niepoliczalnej ilości czegoś (trochę, część).', example: 'Je voudrais de l\'eau.', example_pl: 'Chciałbym/Chciałabym (trochę) wody.' },
      ],
  },
  },
  it: {
    'sentence-structure': {
        title: 'Struttura della Frase',
        content: [
          { heading: 'Elastyczny szyk SVO', text: 'Podstawowy szyk to Podmiot-Orzeczenie-Dopełnienie (SVO), ale jest bardzo elastyczny. Podmiot jest często pomijany, gdyż forma czasownika go wskazuje.', example: '(Io) mangio la pasta.', example_pl: '(Ja) jem makaron.' },
          { heading: 'Pozycja przymiotnika', text: 'Przymiotniki zazwyczaj umieszcza się PO rzeczowniku, który opisują. Umieszczenie ich przed rzeczownikiem często zmienia znaczenie lub dodaje emfazę.', example: 'una casa grande (duży dom) vs una grande casa (wspaniały dom).', example_pl: 'duży dom vs wspaniały dom.' },
          { heading: 'Szyk zdania przeczącego', text: 'Przeczenie "non" umieszcza się zawsze bezpośrednio PRZED odmienionym czasownikiem.', example: 'Lui non capisce la domanda.', example_pl: 'On nie rozumie pytania.' },
          { heading: 'Pozycja przysłówka', text: 'Przysłówki zazwyczaj stoją po czasowniku, który modyfikują. Mogą też stać na początku lub końcu zdania dla emfazy.', example: 'Parla lentamente. / Lentamente, lui parla.', example_pl: 'On mówi powoli. / Powoli, on mówi.' },
        ],
      },
      questions: {
        title: 'Domande',
        content: [
          { heading: 'Pytania przez intonację', text: 'Najczęstszym sposobem zadawania pytań w mowie jest zmiana intonacji zdania oznajmującego na pytającą (wznoszącą na końcu).', example: 'Parli italiano?', example_pl: 'Mówisz po włosku?' },
          { heading: 'Pytania z zaimkami pytającymi', text: 'Pytania szczegółowe tworzy się za pomocą zaimków pytających, takich jak "Che cosa?", "Chi?", "Dove?", "Quando?", "Perché?".', example: 'Dove abiti?', example_pl: 'Gdzie mieszkasz?' },
        ],
      },
      negations: {
        title: 'Negazioni',
        content: [
          { heading: 'Przeczenie "non"', text: 'Przeczenia tworzy się poprzez umieszczenie słówka "non" bezpośrednio przed odmienionym czasownikiem.', example: 'Non parlo italiano.', example_pl: 'Nie mówię po włosku.' },
          { heading: 'Inne słowa przeczące', text: 'Podobnie jak w hiszpańskim, słowa takie jak "niente" (nic) czy "nessuno" (nikt) wymagają "non" przed czasownikiem, jeśli stoją po nim.', example: 'Non ho visto nessuno.', example_pl: 'Nikogo nie widziałem.' },
        ],
    },
    'adjectives': {
        title: 'Aggettivi',
        content: [
            { heading: 'Pozycja przymiotnika', text: 'Podobnie jak w hiszpańskim, przymiotniki zazwyczaj stoją po rzeczowniku. Niektóre, jak "bello" czy "bravo", mogą stać przed.', example: 'Una macchina rossa (czerwony samochód) vs una bella macchina (piękny samochód).', example_pl: 'Czerwony samochód vs piękny samochód.' },
            { heading: 'Zgodność', text: 'Przymiotniki muszą zgadzać się co do rodzaju i liczby z rzeczownikiem, który opisują. Mają różne końcówki w zależności od grupy.', example: 'un ragazzo alto, una ragazza alta, due ragazzi alti, due ragazze alte.', example_pl: 'wysoki chłopak, wysoka dziewczyna, wysocy chłopcy, wysokie dziewczyny.' },
        ],
    },
    'adverbs': {
        title: 'Avverbi',
        content: [
            { heading: 'Tworzenie z przymiotników', text: 'Podobnie jak w hiszpańskim i francuskim, przysłówki tworzy się dodając końcówkę "-mente" do żeńskiej formy przymiotnika.', example: 'lento -> lenta -> lentamente', example_pl: 'wolny -> wolno' },
            { heading: 'Pozycja w zdaniu', text: 'Przysłówki zazwyczaj umieszcza się po czasowniku, który modyfikują.', example: 'Lui parla lentamente.', example_pl: 'On mówi powoli.' },
        ],
    },
    'pronouns': {
        title: 'Pronomi',
        content: [
            { heading: 'Pominięcie zaimka podmiotowego', text: 'Zaimki podmiotowe (io, tu, lui...) są bardzo często pomijane, ponieważ forma czasownika jest wystarczająca do identyfikacji podmiotu.', example: '(Io) sono polacco.', example_pl: 'Jestem Polakiem.' },
            { heading: 'Połączone zaimki dopełnienia', text: 'Zaimki dopełnienia bliższego i dalszego mogą się łączyć, tworząc jedną formę (np. me lo, te la). Zawsze stoją przed odmienionym czasownikiem.', example: 'Me lo dai?', example_pl: 'Dasz mi to?' },
        ],
    },
    'articles': {
      title: 'Articoli',
      content: [
          { heading: 'Articoli Determinativi (il, lo, la...)', text: 'Rodzajniki określone używane są przed znanymi, specyficznymi rzeczownikami. Ich forma zależy od rodzaju, liczby i pierwszej litery rzeczownika.', example: 'Il cane, lo studente, la casa, l\'amica.', example_pl: 'Pies, student, dom, przyjaciółka.' },
          { heading: 'Articoli Indeterminativi (un, uno, una...)', text: 'Rodzajniki nieokreślone wprowadzają nowy rzeczownik. Ich forma również zależy od rodzaju i pierwszej litery rzeczownika.', example: 'un cane, uno studente, una casa, un\'amica.', example_pl: '(jakiś) pies, (jakiś) student, (jakiś) dom, (jakaś) przyjaciółka.' },
      ],
  },
  },
};
