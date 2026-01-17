import AboutCountryPage, { type AboutCountryData } from '@/components/about-country-page';

const italyData: AboutCountryData = {
  countryName: { pl: 'Włochy', native: 'Italia' },
  countryCode: 'italy',
  nativeLangCode: 'it',
  flag: { pl: '🇵🇱', native: '🇮🇹' },
  backLink: "/learning/it/culture",
  ui: {
    title: { pl: 'O Włoszech', native: 'Sull\'Italia' },
    description: {
      pl: 'Włochy, kolebka Cesarstwa Rzymskiego i renesansu, to kraj o nieporównywalnym wpływie na zachodnią cywilizację. Od starożytnych ruin Rzymu po romantyczne kanały Wenecji, historia jest tu żywa na każdym kroku. Włochy szczycą się największą liczbą obiektów na liście światowego dziedzictwa UNESCO. Kraj ten jest synonimem sztuki, z arcydziełami Michała Anioła, Leonarda da Vinci i Rafaela. Włoska kuchnia, celebrowana na całym świecie, opiera się na prostocie, jakości składników i regionalnej różnorodności. To ojczyzna pizzy, makaronu, espresso i gelato. Od ośnieżonych Alp na północy po słoneczne wybrzeża Sycylii, Włochy oferują spektakularne krajobrazy. "La dolce vita", czyli słodkie życie, to filozofia celebrowania piękna, jedzenia, rodziny i przyjaciół. Włochy są również światowym liderem w dziedzinie mody, z Mediolanem jako jedną z jej stolic. To kraj pełen pasji, co widać zarówno w operze, jak i w zapale kibiców piłkarskich. Każdy z 20 regionów ma swoją unikalną kulturę, dialekt i tradycje kulinarne, tworząc fascynującą mozaikę.',
      native: 'L\'Italia, culla dell\'Impero Romano e del Rinascimento, è un paese con un\'influenza incomparabile sulla civiltà occidentale. Dalle antiche rovine di Roma ai romantici canali di Venezia, la storia è viva ad ogni angolo. L\'Italia vanta il maggior numero di siti del patrimonio mondiale dell\'UNESCO. Questo paese è sinonimo di arte, con i capolavori di Michelangelo, Leonardo da Vinci e Raffaello. La cucina italiana, celebrata in tutto il mondo, si basa sulla semplicità, la qualità degli ingredienti e la diversità regionale. È la patria della pizza, della pasta, dell\'espresso e del gelato. Dalle Alpi innevate a nord alle coste assolate della Sicilia, l\'Italia offre paesaggi spettacolari. "La dolce vita" è una filosofia che celebra la bellezza, il cibo, la famiglia e gli amici. L\'Italia è anche un leader mondiale nel campo della moda, con Milano come una delle sue capitali. È un paese pieno di passione, visibile sia nell\'opera lirica che nell\'entusiasmo dei tifosi di calcio. Ognuna delle 20 regioni ha la sua cultura, il suo dialetto e le sue tradizioni culinarie uniche, creando un affascinante mosaico.'
    },
    factsTitle: { pl: 'Kluczowe Fakty', native: 'Fatti Chiave' },
    capital: { pl: 'Stolica', native: 'Capitale' },
    population: { pl: 'Populacja', native: 'Popolazione' },
    area: { pl: 'Powierzchnia', native: 'Superficie' },
    currency: { pl: 'Waluta', native: 'Moneta' },
    funFactsTitle: { pl: 'Ciekawostki', native: 'Curiosità' },
    funFacts: {
      pl: [
        'We Włoszech znajduje się ponad 1500 jezior.',
        'Włosi stworzyli termometr, fortepian i maszynę do pisania.',
        'Każdego dnia do Fontanny di Trevi w Rzymie wrzucanych jest około 3000 euro.',
        'W całych Włoszech istnieje ponad 140 rodzajów makaronu.',
        'Włochy otaczają dwa niezależne państwa: San Marino i Watykan.',
        'Włosi jedzą ponad 23 kg makaronu na osobę rocznie.',
        'Pizza, w swojej nowoczesnej formie, została wynaleziona w Neapolu.'
      ],
      native: [
        'In Italia ci sono più di 1.500 laghi.',
        'Gli italiani hanno inventato il termometro, il pianoforte e la macchina da scrivere.',
        'Ogni giorno vengono lanciati circa 3.000 euro nella Fontana di Trevi a Roma.',
        'Esistono oltre 140 tipi di pasta in tutto il paese.',
        'L\'Italia circonda due stati indipendenti: San Marino e Città del Vaticano.',
        'Gli italiani mangiano oltre 23 kg di pasta a persona all\'anno.',
        'La pizza, nella sua forma moderna, è stata inventata a Napoli.'
      ]
    },
    backButton: { pl: 'Powrót do Kultury', native: 'Torna a Cultura' },
  },
  stats: {
    capital: { pl: 'Rzym', native: 'Roma' },
    population: '~59.1 miliona',
    area: '301,340 km²',
    currency: { pl: 'Euro (EUR)', native: 'Euro (EUR)' },
  },
};

export default function AboutItPage() {
    return <AboutCountryPage data={italyData} />;
}
