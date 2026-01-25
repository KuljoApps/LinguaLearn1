export const articlesContent = {
    en: {
        'articles': {
          title: 'Articles',
          content: [
              { 
                  heading: 'Rodzajnik określony (the)', 
                  text: 'Używany, gdy mówimy o\u00A0czymś konkretnym, już znanym lub jedynym w\u00A0swoim rodzaju.',
                  examples: [
                      { original: 'The dog I saw was very friendly.', translation: '(Ten konkretny) pies, którego widziałem, był bardzo przyjazny.' },
                      { original: 'The sun is shining today.', translation: 'Słońce dzisiaj świeci.' }
                  ]
              },
              { 
                  heading: 'Rodzajniki nieokreślone (a/an)', 
                  text: '"A" używamy przed spółgłoskami, "an" przed samogłoskami. Stosujemy je, mówiąc o\u00A0czymś po raz pierwszy lub o\u00A0jednej rzeczy z\u00A0wielu.',
                  examples: [
                      { original: 'I bought a new car.', translation: 'Kupiłem (jakiś) nowy samochód.' },
                      { original: 'She is an excellent student.', translation: 'Ona jest znakomitą studentką.' }
                  ]
              },
              { 
                  heading: 'Rodzajnik zerowy (Zero Article)', 
                  text: 'Nie używamy rodzajnika, mówiąc o\u00A0rzeczach w\u00A0ogólności (rzeczowniki niepoliczalne lub w\u00A0liczbie mnogiej), a\u00A0także przed nazwami własnymi, posiłkami czy sportami.',
                  examples: [
                      { original: 'I like music.', translation: 'Lubię muzykę (ogólnie).' },
                      { original: 'We play tennis every Saturday.', translation: 'Gramy w\u00A0tenisa w\u00A0każdą sobotę.' }
                  ]
              },
              {
                heading: 'Użycie "the" z rzeczownikami ogólnymi',
                text: 'Zazwyczaj nie używamy "the" mówiąc o\u00A0rzeczownikach w\u00A0liczbie mnogiej lub niepoliczalnych w\u00A0sensie ogólnym. Używamy go jednak, gdy odnosimy się do konkretnej, określonej grupy lub ilości.',
                examples: [
                  { original: 'I love horses. (konie ogólnie)', translation: 'Kocham konie.' },
                  { original: 'The horses in that field are beautiful. (konkretne konie)', translation: 'Konie na tamtym polu są piękne.' }
                ]
              }
          ],
      },
    },
    de: {
        'articles': {
            title: 'Artikel',
            content: [
                { 
                    heading: 'Rodzajnik określony (der, die, das)', 
                    text: 'Odnosi się do konkretnych, znanych osób lub rzeczy. Forma zależy od rodzaju gramatycznego (męski, żeński, nijaki), liczby i\u00A0przypadku.',
                    examples: [
                        { original: 'Der Hund ist groß.', translation: '(Ten konkretny) pies jest duży.' },
                        { original: 'Ich gebe der Frau das Buch.', translation: 'Daję (tej konkretnej) kobiecie książkę.' }
                    ]
                },
                { 
                    heading: 'Rodzajnik nieokreślony (ein, eine)', 
                    text: 'Odnosi się do nieokreślonej, jednej osoby lub rzeczy. Odmienia się przez przypadki i\u00A0rodzaje, ale nie ma formy liczby mnogiej.',
                    examples: [
                        { original: 'Ich sehe einen Hund.', translation: 'Widzę (jakiegoś) psa.' },
                        { original: 'Das ist eine interessante Frage.', translation: 'To jest (jakieś) interesujące pytanie.' }
                    ]
                },
                { 
                    heading: 'Rodzajnik zerowy (Nullartikel)', 
                    text: 'Brak rodzajnika stosuje się przed nazwami własnymi, nazwami miast i\u00A0większości krajów, materiałami, a\u00A0także przed rzeczownikami w\u00A0liczbie mnogiej, jeśli mówimy o\u00A0nich w\u00A0sposób ogólny.',
                    examples: [
                        { original: 'Ich trinke gern Milch.', translation: 'Chętnie piję mleko.' },
                        { original: 'Kinder spielen gern.', translation: 'Dzieci chętnie się bawią.' }
                    ]
                },
                {
                    heading: 'Ściągnięcia przyimka z rodzajnikiem',
                    text: 'W języku niemieckim bardzo często łączy się niektóre przyimki z\u00A0rodzajnikami w\u00A0celowniku (Dativ) i\u00A0bierniku (Akkusativ), tworząc jedną formę, np. an + dem = am, in + das = ins.',
                    examples: [
                      { original: 'Am Montag gehe ich ins Kino.', translation: 'W poniedziałek idę do kina. (an dem / in das)' },
                      { original: 'Wir gehen zum Bahnhof.', translation: 'Idziemy na dworzec. (zu dem)' }
                    ]
                }
            ],
        },
    },
    es: {
        'articles': {
            title: 'Artículos',
            content: [
                { 
                    heading: 'Rodzajniki określone (el, la, los, las)', 
                    text: 'Odnoszą się do konkretnych, znanych osób lub rzeczy i\u00A0muszą zgadzać się z\u00A0rzeczownikiem co do rodzaju i\u00A0liczby.',
                    examples: [
                        { original: 'El perro es mi mejor amigo.', translation: '(Ten konkretny) pies jest moim najlepszym przyjacielem.' },
                        { original: 'Las casas en esta calle son muy bonitas.', translation: 'Domy na tej ulicy są bardzo ładne.' }
                    ]
                },
                { 
                    heading: 'Rodzajniki nieokreślone (un, una, unos, unas)', 
                    text: 'Używane, gdy mówimy o\u00A0czymś po raz pierwszy lub o\u00A0jednej rzeczy z\u00A0wielu. Również muszą zgadzać się co do rodzaju i\u00A0liczby.',
                    examples: [
                        { original: 'Necesito un bolígrafo.', translation: 'Potrzebuję (jakiegoś) długopisu.' },
                        { original: 'Compraron unas flores para su madre.', translation: 'Kupili (jakieś) kwiaty dla swojej mamy.' }
                    ]
                },
                { 
                    heading: 'Kontrakcje (al, del)', 
                    text: 'Gdy przyimki "a" lub "de" występują przed rodzajnikiem męskim liczby pojedynczej "el", łączą się, tworząc formy "al" (a\u00A0+ el) i\u00A0"del" (de + el).',
                    examples: [
                        { original: 'Vamos al cine esta noche.', translation: 'Idziemy dziś wieczorem do kina.' },
                        { original: 'El coche del vecino es nuevo.', translation: 'Samochód sąsiada jest nowy.' }
                    ]
                },
                {
                    heading: 'Rodzajnik nijaki "lo"',
                    text: '"Lo" jest używane przed przymiotnikiem, przysłówkiem lub imiesłowem, aby przekształcić je w\u00A0abstrakcyjny rzeczownik. Najczęściej tłumaczy się to jako "to, co jest...".',
                    examples: [
                      { original: 'Lo importante es participar.', translation: 'Ważne jest to, żeby wziąć udział (dosł. to, co ważne, to uczestniczyć).' },
                      { original: 'No sabes lo bien que canta.', translation: 'Nie wiesz, jak dobrze ona śpiewa (dosł. to, jak dobrze śpiewa).' }
                    ]
                }
            ],
        },
    },
    fr: {
        'articles': {
            title: 'Les Articles',
            content: [
                { 
                    heading: 'Rodzajniki określone (le, la, l\', les)', 
                    text: 'Używane przed rzeczownikami znanymi lub określonymi. Forma zależy od rodzaju i\u00A0liczby rzeczownika oraz od tego, czy zaczyna się on od samogłoski.',
                    examples: [
                        { original: 'J\'aime le chocolat.', translation: 'Lubię czekoladę (ogólnie, jako znaną substancję).' },
                        { original: 'Les enfants jouent dans le jardin.', translation: '(Te konkretne) dzieci bawią się w\u00A0ogrodzie.' }
                    ]
                },
                { 
                    heading: 'Rodzajniki nieokreślone (un, une, des)', 
                    text: 'Wprowadzają nowy, nieokreślony rzeczownik. "Des" jest formą liczby mnogiej i\u00A0oznacza "kilka", "jakieś".',
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
                },
                {
                    heading: 'Użycie "de" w przeczeniach',
                    text: 'W zdaniach przeczących rodzajniki nieokreślone (un, une, des) oraz cząstkowe (du, de la, de l\') zazwyczaj zmieniają się na "de" (lub "d\'" przed samogłoską).',
                    examples: [
                      { original: 'J\'ai un chien. -> Je n\'ai pas de chien.', translation: 'Mam psa. -> Nie mam psa.' },
                      { original: 'Je bois de l\'eau. -> Je ne bois pas d\'eau.', translation: 'Piję wodę. -> Nie piję wody.' }
                    ]
                }
            ],
        },
    },
    it: {
        'articles': {
            title: 'Articoli',
            content: [
                { 
                    heading: 'Rodzajniki określone (Determinativi)', 
                    text: 'Ich forma (il, lo, la, l\', i, gli, le) zależy od rodzaju, liczby i\u00A0pierwszej litery rzeczownika. Używane przed konkretnymi, znanymi rzeczownikami.',
                    examples: [
                        { original: 'il cane (pies), lo studente (student), l\'amica (przyjaciółka)', translation: 'Pies, student, przyjaciółka.' },
                        { original: 'Mi piace la pizza che abbiamo mangiato ieri.', translation: 'Smakuje mi ta pizza, którą jedliśmy wczoraj.' }
                    ]
                },
                { 
                    heading: 'Rodzajniki nieokreślone (Indeterminativi)', 
                    text: 'Ich forma (un, uno, una, un\') również zależy od rodzaju i\u00A0pierwszej litery rzeczownika. Używane do wprowadzenia nowej, nieokreślonej rzeczy.',
                    examples: [
                        { original: 'Ho visto un film interessante.', translation: 'Obejrzałem/am interesujący film.' },
                        { original: 'C\'è uno zaino sul tavolo.', translation: 'Na stole jest (jakiś) plecak.' }
                    ]
                },
                { 
                    heading: 'Rodzajniki cząstkowe (Partitivi)', 
                    text: 'Tworzone przez połączenie przyimka "di" z\u00A0rodzajnikiem określonym (del, dello, della...). Używane do określenia niepoliczalnej lub nieokreślonej ilości czegoś.',
                    examples: [
                        { original: 'Vorrei del vino rosso, per favore.', translation: 'Chciałbym/abym trochę czerwonego wina, proszę.' },
                        { original: 'Ho comprato dei libri nuovi.', translation: 'Kupiłem/am (kilka) nowych książek.' }
                    ]
                },
                {
                    heading: 'Przyimki ściągnięte (Preposizioni articolate)',
                    text: 'W języku włoskim przyimki proste (di, a, da, in, su) łączą się z\u00A0rodzajnikami określonymi, tworząc jedną, obowiązkową formę, np. di + il = del, a\u00A0+ lo = allo.',
                    examples: [
                      { original: 'Il libro dello studente è sul tavolo. (di + lo / su + il)', translation: 'Książka studenta jest na stole.' },
                      { original: 'Vado al cinema con gli amici. (a + il / con + gli)', translation: 'Idę do kina z\u00A0przyjaciółmi.' }
                    ]
                }
            ],
        },
    },
};
