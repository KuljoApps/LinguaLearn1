import type { GrammarContent } from './grammar';

export const adverbsContent: GrammarContent = {
    en: {
        'adverbs': {
          title: 'Adverbs',
          content: [
              {
                  heading: 'Tworzenie przysłówków (-ly)',
                  text: 'Większość przysłówków sposobu tworzy się przez dodanie końcówki "-ly" do przymiotnika. Istnieją jednak pewne zasady pisowni, np. gdy przymiotnik kończy się na "-y" lub "-ic".',
                  examples: [
                      { original: 'slow -> slowly', translation: 'wolny -> wolno' },
                      { original: 'happy -> happily', translation: 'szczęśliwy -> szczęśliwie' }
                  ]
              },
              {
                  heading: 'Przysłówki nieregularne',
                  text: 'Niektóre przysłówki mają taką samą formę jak przymiotniki (np. "fast", "hard", "late"), a inne mają zupełnie nieregularną formę (np. "good" -> "well").',
                  examples: [
                      { original: 'He drives very fast.', translation: 'On jeździ bardzo szybko.' },
                      { original: 'You speak English well.', translation: 'Mówisz dobrze po angielsku.' }
                  ]
              },
              {
                  heading: 'Pozycja przysłówków w zdaniu',
                  text: 'Miejsce przysłówka zależy od jego rodzaju. Przysłówki częstotliwości (np. "always", "never") stoją przed głównym czasownikiem, ale po "to be". Przysłówki sposobu stoją zazwyczaj po czasowniku lub dopełnieniu.',
                  examples: [
                      { original: 'She always arrives on time.', translation: 'Ona zawsze przyjeżdża na czas.' },
                      { original: 'He speaks quietly.', translation: 'On mówi cicho.' }
                  ]
              },
              {
                  heading: 'Stopniowanie przysłówków',
                  text: 'Przysłówki stopniuje się podobnie do przymiotników. Krótkie formy dodają "-er" i "-est", a te z końcówką "-ly" używają "more" i "most".',
                  examples: [
                      { original: 'He works harder than anyone else.', translation: 'On pracuje ciężej niż ktokolwiek inny.' },
                      { original: 'She spoke more quietly than before.', translation: 'Mówiła ciszej niż wcześniej.' }
                  ]
              }
          ],
        },
    },
    de: {
        'adverbs': {
          title: 'Adverbien',
          content: [
              {
                  heading: 'Przysłówki a przymiotniki',
                  text: 'Kluczową cechą języka niemieckiego jest to, że przysłówki (opisujące, jak coś jest robione) mają zazwyczaj taką samą formę jak przymiotniki (opisujące rzeczowniki). Nie dodaje się żadnych końcówek.',
                  examples: [
                      { original: 'Das Auto ist schnell. (przymiotnik)', translation: 'Samochód jest szybki.' },
                      { original: 'Er fährt schnell. (przysłówek)', translation: 'On jedzie szybko.' }
                  ]
              },
              {
                  heading: 'Pozycja w zdaniu (TeKaMoLo)',
                  text: 'Przysłówki i okoliczniki w środku zdania często układają się według schematu Te-Ka-Mo-Lo: Temporal (kiedy?), Kausal (dlaczego?), Modal (jak?), Lokal (gdzie?).',
                  examples: [
                      { original: 'Ich fahre heute (Te) wegen des Streiks (Ka) mit dem Bus (Mo) nach Berlin (Lo).', translation: 'Jadę dzisiaj z powodu strajku autobusem do Berlina.' },
                      { original: 'Sie arbeitet gern (Mo) zu Hause (Lo).', translation: 'Ona chętnie pracuje w domu.' }
                  ]
              },
              {
                  heading: 'Przysłówki na początku zdania',
                  text: 'Gdy przysłówek (zwłaszcza czasu lub miejsca) rozpoczyna zdanie, następuje po nim inwersja – odmieniony czasownik zajmuje drugie miejsce, a podmiot przesuwa się za czasownik.',
                  examples: [
                      { original: 'Gestern habe ich meine Freunde getroffen.', translation: 'Wczoraj spotkałem moich przyjaciół.' },
                      { original: 'Dort steht ein altes Haus.', translation: 'Tam stoi stary dom.' }
                  ]
              },
              {
                  heading: 'Stopniowanie przysłówków',
                  text: 'Przysłówki stopniuje się tak samo jak przymiotniki. Do stopnia wyższego dodaje się końcówkę "-er", a do najwyższego "am ...-sten". Istnieją również formy nieregularne.',
                  examples: [
                      { original: 'Er läuft schneller als ich.', translation: 'On biega szybciej niż ja.' },
                      { original: 'Von allen singt sie am schönsten.', translation: 'Ze wszystkich ona śpiewa najpiękniej.' }
                  ]
              }
          ],
        },
    },
    es: {
        'adverbs': {
          title: 'Adverbios',
          content: [
              {
                  heading: 'Tworzenie przysłówków (-mente)',
                  text: 'Wiele przysłówków sposobu tworzy się przez dodanie końcówki "-mente" do żeńskiej formy przymiotnika.',
                  examples: [
                      { original: 'rápido/rápida -> rápidamente', translation: 'szybki/szybka -> szybko' },
                      { original: 'lento/lenta -> lentamente', translation: 'wolny/wolna -> powoli' }
                  ]
              },
              {
                  heading: 'Przysłówki o tej samej formie co przymiotniki',
                  text: 'Niektóre słowa mogą funkcjonować zarówno jako przymiotniki, jak i przysłówki, bez zmiany formy. Dotyczy to np. słów "rápido" czy "duro".',
                  examples: [
                      { original: 'El tren rápido (przymiotnik) llegó. / Él corre rápido (przysłówek).', translation: 'Szybki pociąg przyjechał. / On szybko biega.' },
                      { original: 'Es un trabajo duro (przymiotnik). / Trabaja duro (przysłówek).', translation: 'To ciężka praca. / On ciężko pracuje.' }
                  ]
              },
              {
                  heading: 'Pozycja w zdaniu',
                  text: 'Przysłówki mają dużą swobodę i mogą znajdować się w różnych miejscach zdania, ale najczęściej stoją bezpośrednio po czasowniku, który modyfikują.',
                  examples: [
                      { original: 'Ella siempre habla claramente.', translation: 'Ona zawsze mówi wyraźnie.' },
                      { original: 'Ayer trabajamos mucho.', translation: 'Wczoraj dużo pracowaliśmy.' }
                  ]
              },
              {
                  heading: 'Przysłówki ilości',
                  text: 'Przysłówki takie jak "muy" (bardzo) i "mucho" (dużo) są często mylone. "Muy" modyfikuje przymiotniki i inne przysłówki, podczas gdy "mucho" modyfikuje czasowniki i rzeczowniki.',
                  examples: [
                      { original: 'El café está muy caliente.', translation: 'Kawa jest bardzo gorąca.' },
                      { original: 'No me gusta mucho el café.', translation: 'Nie bardzo lubię kawę.' }
                  ]
              }
          ],
        },
    },
    fr: {
        'adverbs': {
          title: 'Adverbes',
          content: [
              {
                  heading: 'Tworzenie przysłówków (-ment)',
                  text: 'Wiele przysłówków tworzy się, dodając końcówkę "-ment" do żeńskiej formy przymiotnika. Jeśli przymiotnik kończy się na samogłoskę, "-ment" dodaje się do formy męskiej.',
                  examples: [
                      { original: 'lent (m) -> lente (f) -> lentement (wolno)', translation: 'powolny -> wolno' },
                      { original: 'vrai (m/f) -> vraiment (prawdziwie)', translation: 'prawdziwy -> prawdziwie' }
                  ]
              },
              {
                  heading: 'Pozycja w zdaniu',
                  text: 'Krótkie i częste przysłówki (bien, mal, beaucoup, vite) zazwyczaj stoją po odmienionym czasowniku. W czasach złożonych znajdują się między czasownikiem posiłkowym a imiesłowem.',
                  examples: [
                      { original: 'J\'ai bien dormi.', translation: 'Dobrze spałem.' },
                      { original: 'Elle parle rapidement.', translation: 'Ona mówi szybko.' }
                  ]
              },
              {
                  heading: 'Przysłówki nieregularne',
                  text: 'Niektóre przysłówki mają nieregularne formy, których nie tworzy się od przymiotników.',
                  examples: [
                      { original: 'Il conduit très vite. (vite - szybko)', translation: 'On jeździ bardzo szybko.' },
                      { original: 'Tu as bien travaillé. (bon -> bien)', translation: 'Dobrze pracowałeś.' }
                  ]
              },
              {
                  heading: 'Stopniowanie przysłówków',
                  text: 'Przysłówki stopniuje się opisowo za pomocą "plus" (bardziej), "moins" (mniej) i "aussi" (tak... jak).',
                  examples: [
                      { original: 'Il court plus vite que moi.', translation: 'On biega szybciej niż ja.' },
                      { original: 'Elle chante le plus joliment de toutes.', translation: 'Ona śpiewa najpiękniej ze wszystkich.' }
                  ]
              }
          ],
        },
    },
    it: {
        'adverbs': {
          title: 'Avverbi',
          content: [
              {
                  heading: 'Tworzenie przysłówków (-mente)',
                  text: 'Wiele przysłówków tworzy się przez dodanie końcówki "-mente" do żeńskiej formy przymiotnika. Istnieją też wyjątki, np. gdy przymiotnik kończy się na -le lub -re.',
                  examples: [
                      { original: 'lento/lenta -> lentamente (powoli)', translation: 'wolny -> powoli' },
                      { original: 'facile -> facilmente (łatwo)', translation: 'łatwy -> łatwo' }
                  ]
              },
              {
                  heading: 'Pozycja w zdaniu',
                  text: 'Przysłówki zazwyczaj stoją po czasowniku. W czasach złożonych (np. Passato Prossimo) krótkie przysłówki (jak "già", "ancora", "più") umieszcza się między czasownikiem posiłkowym a imiesłowem.',
                  examples: [
                      { original: 'Parla lentamente.', translation: 'On/ona mówi powoli.' },
                      { original: 'Non ho ancora mangiato.', translation: 'Jeszcze nie jadłem.' }
                  ]
              },
              {
                  heading: 'Przysłówki nieregularne',
                  text: 'Podobnie jak w innych językach, istnieją przysłówki o nieregularnych formach, które nie podlegają ogólnym zasadom tworzenia.',
                  examples: [
                      { original: 'Cucina molto bene. (buono -> bene)', translation: 'On/ona gotuje bardzo dobrze.' },
                      { original: 'Sto male oggi. (cattivo -> male)', translation: 'Źle się dzisiaj czuję.' }
                  ]
              },
              {
                  heading: 'Przysłówki miejsca: qui/qua vs lì/là',
                  text: '"Qui" i "qua" oznaczają "tutaj" (blisko mówiącego). "Lì" i "là" oznaczają "tam" (daleko od mówiącego i słuchającego). "Qua" i "là" są nieco mniej precyzyjne.',
                  examples: [
                      { original: 'Vieni qui, per favore.', translation: 'Chodź tutaj, proszę.' },
                      { original: 'La stazione è là, in fondo alla strada.', translation: 'Stacja jest tam, na końcu ulicy.' }
                  ]
              }
          ],
        },
    },
};
