export const questionsContent = {
    en: {
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
            },
            {
              heading: 'Pytania o podmiot vs. dopełnienie',
              text: 'W pytaniach o podmiot (kto/co wykonuje czynność) nie używamy operatora "do/does/did". Czasownik występuje w formie twierdzącej. W pytaniach o dopełnienie (na kogo/co skierowana jest czynność) operator jest konieczny.',
              examples: [
                { original: 'Who called you? (podmiot) vs. Who did you call? (dopełnienie)', translation: 'Kto do ciebie dzwonił? vs. Do kogo dzwoniłeś?' },
                { original: 'What happened? (podmiot) vs. What did you see? (dopełnienie)', translation: 'Co się stało? vs. Co zobaczyłeś?' }
              ]
            }
          ],
        },
    },
    de: {
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
              },
              {
                heading: 'Pytania rozłączne (Frageanhängsel)',
                text: 'Są to krótkie zwroty dodawane na końcu zdania, aby poprosić o potwierdzenie, podobnie jak polskie "prawda?". Najczęstsze to "oder?", "nicht wahr?" lub "nicht?".',
                examples: [
                  { original: 'Du kommst aus Polen, oder?', translation: 'Pochodzisz z Polski, prawda?' },
                  { original: 'Das Wetter ist schön, nicht wahr?', translation: 'Pogoda jest piękna, nieprawdaż?' }
                ]
              }
            ],
          },
    },
    es: {
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
                heading: 'Pytania rozłączne (tag questions)',
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
    },
    fr: {
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
    },
    it: {
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
    },
};
