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
        { heading: 'Podstawowy szyk zdania (SVO)', text: 'W języku angielskim domyślnym szykiem zdania oznajmującego jest SVO: Podmiot (Subject) + Orzeczenie (Verb) + Dopełnienie (Object).', example: 'The cat (S) sat (V) on the mat (O).', example_pl: 'Kot usiadł na macie.' },
        { heading: 'Przysłówki', text: 'Przysłówki miejsca i czasu zazwyczaj umieszcza się na końcu zdania.', example: 'He reads a book in the library every week.', example_pl: 'On co tydzień czyta książkę w bibliotece.' },
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
  },
  de: {
    'sentence-structure': {
        title: 'Satzbau',
        content: [
          { heading: 'Szyk prosty (V2)', text: 'W niemieckim zdaniu oznajmującym orzeczenie (czasownik odmieniony) zawsze znajduje się na drugiej pozycji.', example: 'Ich (1) lerne (2) heute Deutsch.', example_pl: 'Ja uczę się dzisiaj niemieckiego.' },
          { heading: 'Szyk przestawny', text: 'Jeśli na pierwszym miejscu w zdaniu stanie inny element niż podmiot, podmiot przesuwa się za orzeczenie, które pozostaje na drugim miejscu.', example: 'Heute (1) lerne (2) ich Deutsch.', example_pl: 'Dzisiaj uczę się ja niemieckiego.' },
          { heading: 'Szyk końcowy', text: 'W zdaniach podrzędnych (np. po "dass", "weil", "wenn") orzeczenie wędruje na sam koniec zdania.', example: '..., weil ich Deutsch lerne.', example_pl: '...ponieważ uczę się niemieckiego.' },
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
  },
  es: {
    'sentence-structure': {
        title: 'Estructura de la Oración',
        content: [
          { heading: 'Elastyczny szyk SVO', text: 'Podstawowy szyk to Podmiot-Orzeczenie-Dopełnienie (SVO), ale jest on bardzo elastyczny. Często pomija się zaimek osobowy (ja, ty, on...), ponieważ forma czasownika go wskazuje.', example: '(Yo) hablo español. / Español hablo (yo).', example_pl: '(Ja) mówię po hiszpańsku.' },
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
  },
  fr: {
    'sentence-structure': {
        title: 'Structure de la Phrase',
        content: [
          { heading: 'Podstawowy szyk zdania (SVO)', text: 'W języku francuskim, podobnie jak w angielskim, standardowy szyk zdania to Podmiot (Sujet) + Orzeczenie (Verbe) + Dopełnienie (Objet).', example: 'Le chat (S) mange (V) la souris (O).', example_pl: 'Kot je mysz.' },
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
  },
  it: {
    'sentence-structure': {
        title: 'Struttura della Frase',
        content: [
          { heading: 'Elastyczny szyk SVO', text: 'Podstawowy szyk zdania to Podmiot-Orzeczenie-Dopełnienie (SVO), ale jest on bardzo elastyczny. Często pomija się podmiot, ponieważ forma czasownika jest wystarczająca.', example: '(Io) parlo italiano.', example_pl: '(Ja) mówię po włosku.' },
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
  },
};
