import AboutCountryPage, { type AboutCountryData } from '@/components/about-country-page';

const franceData: AboutCountryData = {
  countryName: { pl: 'Francja', native: 'France' },
  countryCode: 'france',
  nativeLangCode: 'fr',
  flag: { pl: '🇵🇱', native: '🇫🇷' },
  backLink: "/learning/fr/culture",
  ui: {
    title: { pl: 'O Francji', native: 'À propos de la France' },
    description: {
      pl: 'Francja, kraj o bogatym dziedzictwie kulturowym, jest światowym centrum sztuki, mody i gastronomii. Od ikonicznej Wieży Eiffla w Paryżu po lawendowe pola Prowansji, oferuje niezwykłą różnorodność krajobrazów. Jako kolebka oświecenia i rewolucji, francuskie ideały "Wolności, Równości, Braterstwa" wywarły ogromny wpływ na cały świat. Francja jest dumna ze swojego języka, chronionego przez Akademię Francuską, oraz z kuchni, która jako pierwsza została wpisana na listę niematerialnego dziedzictwa UNESCO. To tutaj narodziło się kino, a postacie takie jak Victor Hugo, Claude Monet czy Coco Chanel zdefiniowały światową literaturę, malarstwo i modę. Kraj ten słynie z produkcji wina i serów, z setkami gatunków dostępnych w całym kraju. Od Alp po Atlantyk, każdy region ma swoją unikalną tożsamość i specjały kulinarne. Francja to także potęga naukowa i technologiczna, lider w dziedzinie energetyki jądrowej i lotnictwa. Francuski styl życia, "art de vivre", celebruje codzienne przyjemności, od porannego croissanta po długie kolacje w gronie przyjaciół.',
      native: 'La France, pays au riche patrimoine culturel, est un centre mondial de l\'art, de la mode et de la gastronomie. De l\'emblématique Tour Eiffel à Paris aux champs de lavande de la Provence, elle offre une extraordinaire diversité de paysages. Berceau des Lumières et de la Révolution, les idéaux français de "Liberté, Égalité, Fraternité" ont eu une influence considérable sur le monde entier. La France est fière de sa langue, protégée par l\'Académie française, et de sa cuisine, la première à être inscrite sur la liste du patrimoine immatériel de l\'UNESCO. C\'est ici qu\'est né le cinéma, et des figures comme Victor Hugo, Claude Monet ou Coco Chanel ont défini la littérature, la peinture et la mode mondiales. Le pays est célèbre pour sa production de vin et de fromages, avec des centaines de variétés disponibles dans tout le pays. Des Alpes à l\'Atlantique, chaque région a son identité unique et ses spécialités culinaires. La France est aussi une puissance scientifique et technologique, leader dans les domaines de l\'énergie nucléaire et de l\'aéronautique. L\'art de vivre à la française célèbre les plaisirs quotidiens, du croissant du matin aux longs dîners entre amis.'
    },
    factsTitle: { pl: 'Kluczowe Fakty', native: 'Faits Clés' },
    capital: { pl: 'Stolica', native: 'Capitale' },
    population: { pl: 'Populacja', native: 'Population' },
    area: { pl: 'Powierzchnia', native: 'Superficie' },
    currency: { pl: 'Waluta', native: 'Monnaie' },
    funFactsTitle: { pl: 'Ciekawostki', native: 'Faits Amusants' },
    funFacts: {
      pl: [
        'Francja jest najczęściej odwiedzanym krajem na świecie.',
        'W kraju tym produkuje się ponad 1600 rodzajów sera.',
        'Legalne jest poślubienie osoby zmarłej, pod pewnymi warunkami.',
        'Louvre w Paryżu jest największym muzeum sztuki na świecie.',
        'Nielegalne jest nazywanie świni imieniem Napoleon we Francji.',
        'Croissant został w rzeczywistości wynaleziony w Wiedniu, w Austrii.',
        'Francja jest największym krajem w Unii Europejskiej pod względem powierzchni.'
      ],
      native: [
        'La France est le pays le plus visité au monde.',
        'Le pays produit plus de 1 600 types de fromage.',
        'Il est légal d\'épouser une personne décédée, sous certaines conditions.',
        'Le Louvre à Paris est le plus grand musée d\'art du monde.',
        'Il est illégal de nommer un cochon Napoléon en France.',
        'Le croissant a en fait été inventé à Vienne, en Autriche.',
        'La France est le plus grand pays de l\'Union européenne par sa superficie.'
      ]
    },
    backButton: { pl: 'Powrót do Kultury', native: 'Retour à la Culture' },
  },
  stats: {
    capital: { pl: 'Paryż', native: 'Paris' },
    population: '~65.5 miliona',
    area: '551,695 km²',
    currency: { pl: 'Euro (EUR)', native: 'Euro (EUR)' },
  },
};

export default function AboutFrPage() {
    return <AboutCountryPage data={franceData} />;
}
