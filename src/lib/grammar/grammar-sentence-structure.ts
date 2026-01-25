export const sentenceStructureContent = {
    en: {
      'sentence-structure': {
        title: 'Sentence Structure',
        content: [
          { 
            heading: 'Zdanie oznajmujące (SVO)', 
            text: 'Podstawowy szyk zdania w\u00A0języku angielskim to SVO: Podmiot (Subject) + Orzeczenie (Verb) + Dopełnienie (Object). Ten porządek jest stosunkowo sztywny i\u00A0jego zachowanie jest kluczowe dla zrozumiałości.',
            examples: [
              { original: 'She (S) reads (V) books (O).', translation: 'Ona czyta książki.' },
              { original: 'The students (S) finished (V) their homework (O).', translation: 'Uczniowie skończyli swoje zadanie domowe.' }
            ]
          },
          { 
            heading: 'Pytania ogólne (Yes/No Questions) - Podstawy', 
            text: 'Podstawowe pytania tworzy się przez inwersję, czyli postawienie czasownika posiłkowego (do, does, is, are, have) przed podmiotem. To jedna z\u00A0fundamentalnych zasad tworzenia pytań.',
            examples: [
              { original: 'Do you like music?', translation: 'Czy lubisz muzykę?' },
              { original: 'Is he a doctor?', translation: 'Czy on jest lekarzem?' }
            ]
          },
          { 
            heading: 'Przeczenia (z "not") - Podstawy', 
            text: 'Przeczenie tworzy się, dodając "not" po pierwszym czasowniku posiłkowym. W\u00A0czasie Present Simple i\u00A0Past Simple, jeśli nie ma innego czasownika posiłkowego, dodaje się "do not" (don\'t) / "does not" (doesn\'t) lub "did not" (didn\'t).',
            examples: [
              { original: 'They are not from Canada.', translation: 'Oni nie są z\u00A0Kanady.' },
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
            text: 'Określenia miejsca i\u00A0czasu zazwyczaj umieszcza się na końcu zdania. Standardowa kolejność to: sposób (how), miejsce (where), a\u00A0następnie czas (when).',
            examples: [
              { original: 'We went to the cinema (miejsce) yesterday (czas).', translation: 'Poszliśmy wczoraj do kina.' },
              { original: 'She drives her car carefully (sposób) in the city (miejsce).', translation: 'Ona ostrożnie prowadzi samochód w\u00A0mieście.' }
            ]
          },
          {
            heading: 'Pozycja przysłówków częstotliwości',
            text: 'Przysłówki takie jak "always", "often", "sometimes" czy "never" zazwyczaj stoją przed głównym czasownikiem, ale po czasowniku "to be".',
            examples: [
              { original: 'I often drink coffee in the morning.', translation: 'Często piję kawę rano.' },
              { original: 'She is always on time.', translation: 'Ona jest zawsze na czas.' }
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
                text: 'Przeczenie "nicht" neguje czasownik lub całe zdanie i\u00A0zazwyczaj stoi na końcu. Przeczenie "kein" neguje rzeczownik i\u00A0stoi przed nim, odmieniając się jak rodzajnik nieokreślony.',
                examples: [
                  { original: 'Ich spiele nicht gern Tennis.', translation: 'Nie lubię grać w\u00A0tenisa.' },
                  { original: 'Er hat kein Auto.', translation: 'On nie ma samochodu.' }
                ]
              },
              { 
                heading: 'Zdania z dopełnieniem (Akkusativ / Dativ)', 
                text: 'W niemieckim ważny jest przypadek (case). Dopełnienie w\u00A0bierniku (Akkusativ) odpowiada na pytanie "kogo? co?", a\u00A0w celowniku (Dativ) na "komu? czemu?". Standardowa kolejność to: Dativ przed Akkusativ.',
                examples: [
                  { original: 'Der Lehrer gibt dem Schüler (Dativ) ein Buch (Akkusativ).', translation: 'Nauczyciel daje uczniowi książkę.' },
                  { original: 'Ich sehe ihn (Akkusativ) im Park.', translation: 'Widzę go w\u00A0parku.' }
                ]
              },
              { 
                heading: 'Okoliczniki czasu i miejsca (TeKaMoLo)', 
                text: 'Określenia w\u00A0zdaniu często podążają za regułą TeKaMoLo: Temporal (kiedy?), Kausal (dlaczego?), Modal (jak?), Lokal (gdzie?). Czas zazwyczaj występuje przed miejscem.',
                examples: [
                  { original: 'Ich fahre morgen (Zeit) nach Berlin (Ort).', translation: 'Jadę jutro do Berlina.' },
                  { original: 'Wir treffen uns um 18 Uhr (Zeit) vor dem Kino (Ort).', translation: 'Spotykamy się o\u00A018:00 przed kinem.' }
                ]
              },
              {
                heading: 'Szyk w zdaniu podrzędnym (Nebensatz)',
                text: 'W zdaniach podrzędnych, wprowadzanych spójnikami takimi jak "dass" (że), "weil" (ponieważ) czy "wenn" (kiedy/jeśli), odmieniony czasownik zawsze wędruje na sam koniec zdania.',
                examples: [
                  { original: 'Ich weiß, dass er heute kommt.', translation: 'Wiem, że on dzisiaj przyjdzie.' },
                  { original: 'Wir bleiben zu Hause, weil es regnet.', translation: 'Zostajemy w\u00A0domu, ponieważ pada deszcz.' }
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
                  { original: 'Mi amigo lee un libro en la biblioteca.', translation: 'Mój przyjaciel czyta książkę w\u00A0bibliotece.' }
                ]
              },
              { 
                heading: 'Pytania ogólne', 
                text: 'Najprostszym sposobem jest zmiana intonacji zdania twierdzącego na pytającą. W\u00A0piśmie zdanie otacza się znakami zapytania (¿...?). Możliwa jest też inwersja (zamiana miejscami czasownika i\u00A0podmiotu).',
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
                text: 'Mają dużą swobodę w\u00A0zdaniu. Najczęściej umieszcza się je na początku lub na końcu zdania.',
                examples: [
                  { original: 'Ayer fuimos a la playa.', translation: 'Wczoraj poszliśmy na plażę.' },
                  { original: 'Mi hermana vive en Madrid desde hace cinco años.', translation: 'Moja siostra mieszka w\u00A0Madrycie od pięciu lat.' }
                ]
              },
              {
                heading: 'Pozycja przymiotników',
                text: 'W przeciwieństwie do polskiego i\u00A0angielskiego, większość przymiotników w\u00A0języku hiszpańskim umieszcza się po rzeczowniku, który opisują.',
                examples: [
                  { original: 'Tengo un coche rojo.', translation: 'Mam czerwony samochód.' },
                  { original: 'Es una mujer inteligente.', translation: 'To jest inteligentna kobieta.' }
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
                text: 'Standardowy i\u00A0neutralny sposób tworzenia pytań to dodanie "Est-ce que" na początku zdania twierdzącego.',
                examples: [
                  { original: 'Est-ce que tu parles français?', translation: 'Czy mówisz po francusku?' },
                  { original: 'Est-ce qu\'il vient à la fête?', translation: 'Czy on przychodzi na imprezę?' }
                ]
              },
              { 
                heading: 'Przeczenia (ne ... pas)', 
                text: 'Przeczenie tworzy się za pomocą dwóch części: "ne" i\u00A0"pas", które "otaczają" odmieniony czasownik. W\u00A0języku mówionym "ne" jest często pomijane.',
                examples: [
                  { original: 'Je ne comprends pas la question.', translation: 'Nie rozumiem pytania.' },
                  { original: 'Elle n\'est pas ici aujourd\'hui.', translation: 'Jej tu dzisiaj nie ma.' }
                ]
              },
              { 
                heading: 'Zdania z zaimkami dopełnienia', 
                text: 'Zaimki dopełnienia (np. le, la, lui, me, te) zawsze stoją bezpośrednio przed czasownikiem (lub czasownikiem posiłkowym w\u00A0czasach złożonych).',
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
              },
              {
                heading: 'Pozycja przysłówków w czasach złożonych',
                text: 'Krótkie i\u00A0powszechne przysłówki (np. bien, mal, beaucoup, déjà) w\u00A0czasach złożonych, jak Passé Composé, umieszcza się między czasownikiem posiłkowym a\u00A0imiesłowem (participe passé).',
                examples: [
                  { original: 'J\'ai bien dormi.', translation: 'Dobrze spałem.' },
                  { original: 'Nous avons beaucoup mangé.', translation: 'Dużo zjedliśmy.' }
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
                text: 'Najprostszym i\u00A0najczęstszym sposobem tworzenia pytań jest zmiana intonacji zdania twierdzącego na wznoszącą na końcu.',
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
                text: 'Mają dużą swobodę w\u00A0zdaniu, ale najczęściej występują na początku lub na końcu zdania.',
                examples: [
                  { original: 'Domani andiamo al mare.', translation: 'Jutro jedziemy nad morze.' },
                  { original: 'Lavoro in ufficio ogni giorno.', translation: 'Pracuję w\u00A0biurze każdego dnia.' }
                ]
              },
              {
                heading: 'Pozycja przymiotników',
                text: 'Podobnie jak w\u00A0hiszpańskim, większość przymiotników (zwłaszcza tych opisujących kolor, kształt, narodowość) umieszcza się po rzeczowniku.',
                examples: [
                  { original: 'Ho una macchina rossa.', translation: 'Mam czerwony samochód.' },
                  { original: 'È una ragazza intelligente.', translation: 'To jest inteligentna dziewczyna.' }
                ]
              }
            ],
          },
    },
};
