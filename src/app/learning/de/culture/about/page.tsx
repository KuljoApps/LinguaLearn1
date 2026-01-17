import AboutCountryPage, { type AboutCountryData } from '@/components/about-country-page';

const germanyData: AboutCountryData = {
  countryName: { pl: 'Niemcy', native: 'Deutschland' },
  countryCode: 'germany',
  nativeLangCode: 'de',
  flag: { pl: '🇵🇱', native: '🇩🇪' },
  backLink: "/learning/de/culture",
  ui: {
    title: { pl: 'O Niemczech', native: 'Über Deutschland' },
    description: {
      pl: 'Niemcy, położone w sercu Europy, to kraj o fascynującej historii i dynamicznej teraźniejszości. Znane jako "kraj poetów i myślicieli", wydały na świat postacie takie jak Goethe, Beethoven i Einstein, kształtując światową filozofię, muzykę i naukę. Po trudnych okresach XX wieku, zjednoczone Niemcy stały się filarem Unii Europejskiej i globalną potęgą gospodarczą. Kraj ten słynie z inżynierii, precyzji i innowacyjności, będąc liderem w przemyśle motoryzacyjnym i maszynowym. Od Alp na południu, przez malownicze doliny Renu, po wybrzeża Morza Północnego i Bałtyckiego, Niemcy oferują zróżnicowane krajobrazy. Kultura niemiecka to nie tylko piwo i Oktoberfest, ale także bogata tradycja festiwali, sztuki i ponad 6000 muzeów. Jest to kraj federalny, składający się z 16 landów, z których każdy posiada własną, unikalną tożsamość kulturową. Niemcy są również pionierem w dziedzinie odnawialnych źródeł energii. To nowoczesne i otwarte społeczeństwo, które skutecznie łączy poszanowanie dla historii z patrzeniem w przyszłość.',
      native: 'Deutschland, im Herzen Europas gelegen, ist ein Land mit einer faszinierenden Geschichte und einer dynamischen Gegenwart. Bekannt als "Land der Dichter und Denker", brachte es Persönlichkeiten wie Goethe, Beethoven und Einstein hervor und prägte die Weltphilosophie, Musik und Wissenschaft. Nach den schwierigen Perioden des 20. Jahrhunderts wurde das wiedervereinigte Deutschland zu einer Säule der Europäischen Union und einer globalen Wirtschaftsmacht. Das Land ist berühmt für Ingenieurkunst, Präzision und Innovation und führend in der Automobil- und Maschinenbauindustrie. Von den Alpen im Süden über die malerischen Täler des Rheins bis zu den Küsten der Nord- und Ostsee bietet Deutschland abwechslungsreiche Landschaften. Die deutsche Kultur besteht nicht nur aus Bier und Oktoberfest, sondern auch aus einer reichen Tradition von Festivals, Kunst und über 6.000 Museen. Es ist ein Bundesstaat, bestehend aus 16 Ländern, von denen jedes seine eigene, einzigartige kulturelle Identität besitzt. Deutschland ist auch ein Pionier im Bereich der erneuerbaren Energien. Es ist eine moderne und offene Gesellschaft, die den Respekt vor der Geschichte erfolgreich mit dem Blick in die Zukunft verbindet.'
    },
    factsTitle: { pl: 'Kluczowe Fakty', native: 'Schlüsselfakten' },
    capital: { pl: 'Stolica', native: 'Hauptstadt' },
    population: { pl: 'Populacja', native: 'Bevölkerung' },
    area: { pl: 'Powierzchnia', native: 'Fläche' },
    currency: { pl: 'Waluta', native: 'Währung' },
    funFactsTitle: { pl: 'Ciekawostki', native: 'Interessante Fakten' },
    funFacts: {
      pl: [
        'W Niemczech istnieje ponad 1500 rodzajów kiełbasy i 300 rodzajów chleba.',
        'Tradycja choinki bożonarodzeniowej pochodzi z Niemiec.',
        'W kraju znajduje się ponad 20 000 zamków.',
        'Ucieczka z więzienia nie jest w Niemczech nielegalna, ponieważ uznaje się naturalne dążenie człowieka do wolności.',
        'Fanta została wynaleziona w Niemczech podczas II wojny światowej.',
        'Pierwsza drukowana książka na świecie (Biblia Gutenberga) powstała w Niemczech.',
        'Ponad 65% autostrad w Niemczech (Autobahn) nie ma oficjalnego ograniczenia prędkości.'
      ],
      native: [
        'In Deutschland gibt es über 1.500 Wurstsorten und 300 Brotsorten.',
        'Die Tradition des Weihnachtsbaums stammt aus Deutschland.',
        'Im Land gibt es über 20.000 Burgen und Schlösser.',
        'Gefängnisausbruch ist in Deutschland nicht illegal, da das natürliche Streben des Menschen nach Freiheit anerkannt wird.',
        'Fanta wurde während des Zweiten Weltkriegs in Deutschland erfunden.',
        'Das erste gedruckte Buch der Welt (die Gutenberg-Bibel) entstand in Deutschland.',
        'Über 65% der Autobahnen in Deutschland haben keine offizielle Geschwindigkeitsbegrenzung.'
      ]
    },
    backButton: { pl: 'Powrót do Kultury', native: 'Zurück zur Kultur' },
  },
  stats: {
    capital: { pl: 'Berlin', native: 'Berlin' },
    population: '~83.2 million',
    area: '357,022 km²',
    currency: { pl: 'Euro (EUR)', native: 'Euro (EUR)' },
  },
};

export default function AboutDePage() {
    return <AboutCountryPage data={germanyData} />;
}
