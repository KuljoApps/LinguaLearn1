import type { GrammarContent } from './grammar';

export const pronounsContent: GrammarContent = {
    en: {
        'pronouns': {
          title: 'Pronouns',
          content: [
            {
              heading: 'Zaimki osobowe (Subject & Object Pronouns)',
              text: 'Zaimki podmiotowe (I, you, he) występują przed czasownikiem jako wykonawca czynności, a zaimki dopełnienia (me, you, him) po czasowniku lub przyimku.',
              examples: [
                { original: 'She (S) gave me (O) a book.', translation: 'Ona dała mi książkę.' },
                { original: 'They (S) are waiting for us (O).', translation: 'Oni na nas czekają.' }
              ]
            },
            {
              heading: 'Zaimki dzierżawcze (Possessive Pronouns)',
              text: 'Zastępują rzeczownik, wskazując na przynależność (mine, yours, his, hers, ours, theirs). Nie mylić z przymiotnikami dzierżawczymi (my, your), które stoją przed rzeczownikiem.',
              examples: [
                { original: 'This is my car. That one is yours.', translation: 'To jest mój samochód. Tamten jest twój.' },
                { original: 'Her idea is good, but I prefer mine.', translation: 'Jej pomysł jest dobry, ale wolę swój.' }
              ]
            },
            {
              heading: 'Zaimki zwrotne (Reflexive Pronouns)',
              text: 'Używane, gdy podmiot i dopełnienie to ta sama osoba (myself, yourself, himself). Mogą też służyć do podkreślenia, że ktoś zrobił coś sam.',
              examples: [
                { original: 'He hurt himself while cooking.', translation: 'On skaleczył się podczas gotowania.' },
                { original: 'I painted the room myself.', translation: 'Sam/a pomalowałem/am pokój.' }
              ]
            },
            {
              heading: 'Zaimki wskazujące (Demonstrative Pronouns)',
              text: 'Wskazują na konkretne osoby lub rzeczy (this, that, these, those). Ich forma zależy od liczby i odległości od mówiącego.',
              examples: [
                { original: 'This is my favorite song.', translation: 'To jest moja ulubiona piosenka.' },
                { original: 'Can you pass me those books?', translation: 'Czy możesz podać mi tamte książki?' }
              ]
            },
            {
              heading: 'Zaimki względne (Relative Pronouns)',
              text: 'Wprowadzają zdania podrzędne, które opisują rzeczownik. "Who" odnosi się do ludzi, "which" do rzeczy, a "that" można używać zamiennie, zwłaszcza w mowie potocznej.',
              examples: [
                { original: 'The woman who lives next door is a doctor.', translation: 'Kobieta, która mieszka obok, jest lekarką.' },
                { original: 'This is the book which won the prize.', translation: 'To jest książka, która wygrała nagrodę.' }
              ]
            },
            {
              heading: 'Zaimki nieokreślone (Indefinite Pronouns)',
              text: 'Odnoszą się do osób lub rzeczy w sposób ogólny, nieokreślony (np. someone, anything, nobody, everyone). W zdaniu traktowane są jak trzecia osoba liczby pojedynczej.',
              examples: [
                { original: 'Somebody has to clean this mess.', translation: 'Ktoś musi posprzątać ten bałagan.' },
                { original: 'Is there anything I can do for you?', translation: 'Czy jest cokolwiek, co mogę dla ciebie zrobić?' }
              ]
            }
          ]
        }
    },
    de: {
        'pronouns': {
          title: 'Pronomen',
          content: [
            {
              heading: 'Zaimki osobowe w przypadkach (Personalpronomen in Kasus)',
              text: 'Niemiecki wymaga użycia odpowiedniego zaimka w zależności od przypadku: Nominativ (kto? co?), Akkusativ (kogo? co?) oraz Dativ (komu? czemu?). To jedna z podstaw gramatyki.',
              examples: [
                { original: 'Er (N) sieht mich (A).', translation: 'On mnie widzi.' },
                { original: 'Ich (N) gebe dir (D) ein Geschenk.', translation: 'Daję ci prezent.' }
              ]
            },
            {
              heading: 'Zaimki dzierżawcze (Possessivpronomen)',
              text: 'Określają przynależność i odmieniają się jak rodzajnik nieokreślony, przyjmując końcówki zgodne z rodzajem, liczbą i przypadkiem rzeczownika.',
              examples: [
                { original: 'Das ist mein Bruder.', translation: 'To jest mój brat.' },
                { original: 'Ich fahre mit seinem Auto.', translation: 'Jadę jego samochodem.' }
              ]
            },
            {
              heading: 'Zaimki zwrotne (Reflexivpronomen)',
              text: 'Używane z czasownikami zwrotnymi. W Akkusativie i Dativie dla 3. osoby liczby pojedynczej i mnogiej mają formę "sich".',
              examples: [
                { original: 'Ich wasche mich.', translation: 'Myję się.' },
                { original: 'Er kauft sich ein neues Hemd.', translation: 'On kupuje sobie nową koszulę.' }
              ]
            },
            {
              heading: 'Zaimki względne (Relativpronomen)',
              text: 'Wprowadzają zdania podrzędne (Relativsätze), które opisują rzeczownik z zdania głównego. Ich forma (der, die, das...) musi zgadzać się z rodzajem i liczbą tego rzeczownika, a przypadek zależy od ich funkcji w zdaniu podrzędnym.',
              examples: [
                { original: 'Das ist der Mann, der mir geholfen hat.', translation: 'To jest mężczyzna, który mi pomógł.' },
                { original: 'Das Buch, das ich lese, ist sehr interessant.', translation: 'Książka, którą czytam, jest bardzo interesująca.' }
              ]
            },
            {
              heading: 'Zaimki wskazujące (Demonstrativpronomen)',
              text: 'Podkreślają lub wskazują na konkretną osobę lub rzecz. Najczęściej używane to "dieser" (ten) i "jener" (tamten). Rodzajnik określony (der, die, das) również może pełnić tę funkcję z mocniejszym akcentem.',
              examples: [
                { original: 'Dieses Kleid gefällt mir besser als jenes.', translation: 'Ta sukienka podoba mi się bardziej niż tamta.' },
                { original: 'Den kenne ich nicht! (wskazując na kogoś)', translation: 'Tego nie znam!' }
              ]
            },
            {
              heading: 'Zaimek nieokreślony "man"',
              text: 'Jest to bardzo ważny zaimek bezosobowy, odpowiadający polskim formom "się" (mówi się), "człowiek" lub "ludzie". W zdaniu zawsze łączy się z czasownikiem w 3. osobie liczby pojedynczej.',
              examples: [
                { original: 'In Deutschland trinkt man viel Bier.', translation: 'W Niemczech pije się dużo piwa.' },
                { original: 'Man darf hier nicht rauchen.', translation: 'Nie wolno tu palić.' }
              ]
            }
          ]
        }
    },
    es: {
        'pronouns': {
          title: 'Pronombres',
          content: [
            {
              heading: 'Zaimki osobowe (Sujeto y Objeto)',
              text: 'W hiszpańskim często pomija się zaimki podmiotowe (yo, tú, él). Zaimki dopełnienia (me, te, lo, la, le...) wskazują na odbiorcę lub obiekt czynności.',
              examples: [
                { original: 'Lo veo. (Widzę go).', translation: 'Widzę go.' },
                { original: 'Le doy un regalo. (Daję jemu/jej prezent).', translation: 'Daję mu/jej prezent.' }
              ]
            },
            {
              heading: 'Pozycja zaimków dopełnienia',
              text: 'Zaimki dopełnienia stoją zazwyczaj przed odmienionym czasownikiem. Mogą być też "doklejone" na końcu bezokolicznika, formy gerundio lub trybu rozkazującego.',
              examples: [
                { original: 'Te lo quiero decir. / Quiero decírtelo.', translation: 'Chcę ci to powiedzieć.' },
                { original: '¡Dámelo!', translation: 'Daj mi to!' }
              ]
            },
            {
              heading: 'Zaimki dzierżawcze (Pronombres Posesivos)',
              text: 'Zastępują rzeczownik, pokazując przynależność (mío, tuyo, suyo...). Muszą zgadzać się co do rodzaju i liczby z zastępowanym rzeczownikiem.',
              examples: [
                { original: 'Este libro no es mío, es tuyo.', translation: 'Ta książka nie jest moja, jest twoja.' },
                { original: 'Mi casa es grande, pero la suya es enorme.', translation: 'Mój dom jest duży, ale jego/jej jest ogromny.' }
              ]
            },
            {
              heading: 'Zaimki zwrotne (Pronombres Reflexivos)',
              text: 'Używane z czasownikami zwrotnymi (me, te, se, nos, os, se), wskazują, że czynność jest wykonywana "na sobie" lub dotyczy samego podmiotu.',
              examples: [
                { original: 'Yo me levanto a las siete.', translation: 'Wstaję o siódmej.' },
                { original: 'Ella se peina el pelo.', translation: 'Ona czesze sobie włosy.' }
              ]
            },
            {
              heading: 'Zaimki względne (Pronombres Relativos)',
              text: 'Łączą zdania i odnoszą się do wcześniej wspomnianego rzeczownika. Najważniejsze z nich to "que" (który, co), "quien" (kto) i "cuyo" (którego).',
              examples: [
                { original: 'La casa que compramos es muy vieja.', translation: 'Dom, który kupiliśmy, jest bardzo stary.' },
                { original: 'El hombre de quien te hablé es mi profesor.', translation: 'Mężczyzna, o którym ci mówiłem, jest moim profesorem.' }
              ]
            },
            {
              heading: 'Zaimki po przyimkach (Pronombres Preposicionales)',
              text: 'Po przyimkach (np. para, con, sin) używa się specjalnych form zaimków (mí, ti, él, ella...). Istnieją specjalne formy "conmigo" (ze mną) i "contigo" (z tobą).',
              examples: [
                { original: 'Este regalo es para ti.', translation: 'Ten prezent jest dla ciebie.' },
                { original: '¿Quieres venir conmigo al cine?', translation: 'Chcesz iść ze mną do kina?' }
              ]
            }
          ]
        }
    },
    fr: {
        'pronouns': {
          title: 'Pronoms',
          content: [
            {
              heading: 'Zaimki dopełnienia (Pronoms COD et COI)',
              text: 'Zaimki dopełnienia bliższego (COD: me, te, le, la...) i dalszego (COI: me, te, lui...) zawsze stoją przed odmienionym czasownikiem.',
              examples: [
                { original: 'Je la vois.', translation: 'Widzę ją.' },
                { original: 'Il me parle.', translation: 'On do mnie mówi.' }
              ]
            },
            {
              heading: 'Kolejność dwóch zaimków dopełnienia',
              text: 'Gdy w zdaniu występują dwa zaimki, ich kolejność jest ściśle określona (np. "me le", "te la", "lui en").',
              examples: [
                { original: 'Il me le donne.', translation: 'On mi to daje.' },
                { original: 'Je te l\'ai dit.', translation: 'Powiedziałem/am ci to.' }
              ]
            },
            {
              heading: 'Zaimki "en" oraz "y"',
              text: '"En" zastępuje rzeczowniki z rodzajnikiem cząstkowym (de, du, de la) lub ilością. "Y" zastępuje miejsce (odpowiada na pytanie "gdzie?") lub rzeczownik po przyimku "à".',
              examples: [
                { original: 'Tu as de l\'argent? Oui, j\'en ai.', translation: 'Masz pieniądze? Tak, mam (ich trochę).' },
                { original: 'Tu vas à Paris? Oui, j\'y vais.', translation: 'Jedziesz do Paryża? Tak, jadę (tam).' }
              ]
            },
            {
              heading: 'Zaimki akcentowane (Pronoms Toniques)',
              text: 'Używane do podkreślenia podmiotu, po przyimkach lub w krótkich odpowiedziach bez czasownika (moi, toi, lui, elle...).',
              examples: [
                { original: 'Moi, je suis polonais. Et toi?', translation: 'Ja jestem Polakiem. A ty?' },
                { original: 'Il vient avec nous.', translation: 'On idzie z nami.' }
              ]
            },
            {
              heading: 'Zaimki względne (Pronoms Relatifs)',
              text: 'Łączą zdania. "Qui" jest podmiotem, "que" jest dopełnieniem bliższym, "dont" zastępuje "de + rzeczownik", a "où" odnosi się do miejsca lub czasu.',
              examples: [
                { original: 'L\'homme qui parle est mon père.', translation: 'Mężczyzna, który mówi, jest moim ojcem.' },
                { original: 'C\'est le film que je veux voir.', translation: 'To jest film, który chcę zobaczyć.' }
              ]
            },
            {
              heading: 'Zaimki wskazujące (Pronoms Démonstratifs)',
              text: 'Zastępują konkretny, wskazany rzeczownik (celui, celle, ceux, celles). Często występują z dodatkiem "-ci" (ten tutaj) lub "-là" (ten tam).',
              examples: [
                { original: 'Quel pull préfères-tu? Celui-ci ou celui-là?', translation: 'Który sweter wolisz? Ten tutaj czy tamten?' },
                { original: 'Je prends les pommes, mais pas celles-là.', translation: 'Biorę te jabłka, ale nie tamte.' }
              ]
            }
          ]
        }
    },
    it: {
        'pronouns': {
          title: 'Pronomi',
          content: [
            {
              heading: 'Zaimki dopełnienia (Pronomi Diretti e Indiretti)',
              text: 'Wskazują na dopełnienie bliższe (kogo/co? - lo, la...) lub dalsze (komu/czemu? - gli, le...). Ich poprawne użycie jest kluczowe dla płynności wypowiedzi.',
              examples: [
                { original: 'La vedo.', translation: 'Widzę ją.' },
                { original: 'Gli parlo spesso.', translation: 'Często z nim rozmawiam.' }
              ]
            },
            {
              heading: 'Pozycja zaimków nieakcentowanych',
              text: 'Zaimki dopełnienia stoją przed odmienionym czasownikiem lub są dołączane na końcu bezokolicznika, trybu rozkazującego i gerundio, tworząc jedno słowo.',
              examples: [
                { original: 'Lo voglio fare. / Voglio farlo.', translation: 'Chcę to zrobić.' },
                { original: 'Guardami!', translation: 'Spójrz na mnie!' }
              ]
            },
            {
              heading: 'Cząstki "ci" oraz "ne"',
              text: '"Ci" często oznacza "tam" (miejsce) lub zastępuje rzeczownik po przyimku "a". "Ne" zastępuje rzeczownik wprowadzony przez "di" lub określenie ilości.',
              examples: [
                { original: 'Sei mai stato a Roma? Sì, ci sono stato.', translation: 'Byłeś kiedyś w Rzymie? Tak, byłem (tam).' },
                { original: 'Quanti libri hai? Ne ho molti.', translation: 'Ile masz książek? Mam ich wiele.' }
              ]
            },
            {
              heading: 'Zaimki złożone (Pronomi Combinati)',
              text: 'Gdy spotykają się dwa zaimki dopełnienia (np. dopełnienie dalsze + bliższe), tworzą jedną formę, np. "mi" + "lo" -> "me lo".',
              examples: [
                { original: 'Me lo puoi dare?', translation: 'Możesz mi to dać?' },
                { original: 'Glielo dico domani.', translation: 'Powiem mu/jej to jutro.' }
              ]
            },
            {
              heading: 'Zaimki względne (Pronomi Relativi)',
              text: 'Wprowadzają zdania podrzędne. Najważniejsze to "che" (który/która/co - jako podmiot lub dopełnienie bliższe) oraz "cui" (używane z przyimkami).',
              examples: [
                { original: 'Il ragazzo che parla è mio fratello.', translation: 'Chłopak, który mówi, jest moim bratem.' },
                { original: 'La città in cui vivo è molto bella.', translation: 'Miasto, w którym mieszkam, jest bardzo piękne.' }
              ]
            },
            {
              heading: 'Zaimki wskazujące (Pronomi Dimostrativi)',
              text: 'Wskazują na coś lub kogoś. "Questo" oznacza "ten" (blisko), a "quello" oznacza "tamten" (daleko). Odmieniają się przez rodzaj i liczbę.',
              examples: [
                { original: 'Preferisco questa maglia, non quella.', translation: 'Wolę tę koszulkę, nie tamtą.' },
                { original: 'Questi sono i miei amici.', translation: 'To są moi przyjaciele.' }
              ]
            }
          ]
        }
    },
};
