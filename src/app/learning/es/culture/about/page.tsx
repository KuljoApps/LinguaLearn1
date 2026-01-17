import AboutCountryPage, { type AboutCountryData } from '@/components/about-country-page';

const spainData: AboutCountryData = {
  countryName: { pl: 'Hiszpania', native: 'España' },
  countryCode: 'spain',
  nativeLangCode: 'es',
  flag: { pl: '🇵🇱', native: '🇪🇸' },
  backLink: "/learning/es/culture",
  ui: {
    title: { pl: 'O Hiszpanii', native: 'Sobre España' },
    description: {
      pl: 'Hiszpania, położona na Półwyspie Iberyjskim, to kraj słońca, pasji i niezwykłej różnorodności. Od ośnieżonych szczytów Pirenejów po słoneczne plaże Andaluzji, jej geografia jest równie zróżnicowana jak kultura. Hiszpania to ojczyzna flamenco, corridy i fiesty, które odzwierciedlają żywiołowy temperament jej mieszkańców. Dziedzictwo historyczne, ukształtowane przez Rzymian, Wizygotów i Maurów, jest widoczne w architekturze, od Alhambry w Granadzie po Sagrada Familia w Barcelonie. To tutaj tworzyli wielcy artyści tacy jak Picasso, Dalí i Gaudí. Hiszpańska kuchnia, oparta na tapas, paelli i świeżych owocach morza, jest celebracją smaku i życia towarzyskiego. Kraj jest podzielony na 17 wspólnot autonomicznych, z których każda ma własne tradycje, dialekty, a nawet języki. Hiszpania to monarchia parlamentarna i ważny członek Unii Europejskiej. Pasja do piłki nożnej jednoczy cały naród. To kraj, gdzie historia spotyka się z nowoczesnością, a spokojne tempo życia ("mañana") łączy się z energią nocnych fiest.',
      native: 'España, situada en la Península Ibérica, es un país de sol, pasión y una diversidad extraordinaria. Desde las cumbres nevadas de los Pirineos hasta las soleadas playas de Andalucía, su geografía es tan variada como su cultura. España es la cuna del flamenco, las corridas de toros y la fiesta, que reflejan el temperamento vibrante de sus gentes. El legado histórico, moldeado por romanos, visigodos y árabes, es visible en su arquitectura, desde la Alhambra de Granada hasta la Sagrada Familia de Barcelona. Aquí crearon grandes artistas como Picasso, Dalí y Gaudí. La cocina española, basada en tapas, paella y marisco fresco, es una celebración del sabor y la vida social. El país está dividido en 17 comunidades autónomas, cada una con sus propias tradiciones, dialectos e incluso idiomas. España es una monarquía parlamentaria y un miembro importante de la Unión Europea. La pasión por el fútbol une a toda la nación. Es un país donde la historia se encuentra con la modernidad, y el ritmo tranquilo de la vida ("mañana") se combina con la energía de las fiestas nocturnas.'
    },
    factsTitle: { pl: 'Kluczowe Fakty', native: 'Hechos Clave' },
    capital: { pl: 'Stolica', native: 'Capital' },
    population: { pl: 'Populacja', native: 'Población' },
    area: { pl: 'Powierzchnia', native: 'Superficie' },
    currency: { pl: 'Waluta', native: 'Moneda' },
    funFactsTitle: { pl: 'Ciekawostki', native: 'Datos Curiosos' },
    funFacts: {
      pl: [
        'Hiszpania jest jedynym krajem w Europie, który ma fizyczną granicę z krajem afrykańskim (Marokiem).',
        'W Hiszpanii znajduje się najstarsza na świecie restauracja, Sobrino de Botín, działająca od 1725 roku.',
        'Hymn narodowy Hiszpanii, "Marcha Real", nie ma oficjalnych słów.',
        'W kraju tym jest więcej barów na mieszkańca niż w jakimkolwiek innym kraju UE.'
      ],
      native: [
        'España es el único país de Europa que tiene una frontera física con un país africano (Marruecos).',
        'En España se encuentra el restaurante más antiguo del mundo, Sobrino de Botín, que opera desde 1725.',
        'El himno nacional de España, la "Marcha Real", no tiene letra oficial.',
        'El país tiene más bares por habitante que cualquier otro país de la UE.'
      ]
    },
    backButton: { pl: 'Powrót do Kultury', native: 'Volver a Cultura' },
  },
  stats: {
    capital: { pl: 'Madryt', native: 'Madrid' },
    population: '~47.4 miliona',
    area: '505,990 km²',
    currency: { pl: 'Euro (EUR)', native: 'Euro (EUR)' },
  },
};

export default function AboutEsPage() {
    return <AboutCountryPage data={spainData} />;
}