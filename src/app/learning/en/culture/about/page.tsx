import AboutCountryPage, { type AboutCountryData } from '@/components/about-country-page';

const englandData: AboutCountryData = {
  countryName: { pl: 'Anglia', native: 'England' },
  countryCode: 'england',
  nativeLangCode: 'en',
  flag: { pl: '🇵🇱', native: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  backLink: "/learning/en/culture",
  ui: {
    title: { pl: 'O Anglii', native: 'About England' },
    description: {
      pl: 'Anglia, największa i najludniejsza część Zjednoczonego Królestwa, to kraj o bogatej historii, która ukształtowała współczesny świat. To tutaj narodził się język angielski, rewolucja przemysłowa oraz wiele dyscyplin sportowych, takich jak piłka nożna i krykiet. Od prehistorycznego Stonehenge po tętniący życiem Londyn, Anglia oferuje niezwykłą mieszankę tradycji i nowoczesności. Jest kolebką parlamentaryzmu i monarchii konstytucyjnej, a jej wpływ na literaturę, muzykę i naukę jest nie do przecenienia. Charakterystyczne krajobrazy, od zielonych wzgórz Cotswolds po białe klify Dover, zachwycają różnorodnością. Brytyjska kultura pubowa, miłość do herbaty i specyficzne poczucie humoru to nieodłączne elementy tożsamości narodowej. Kraj ten jest również domem dla jednych z najstarszych i najbardziej prestiżowych uniwersytetów na świecie. Anglia to dynamiczne społeczeństwo wielokulturowe, które wciąż odgrywa kluczową rolę na arenie międzynarodowej. Jej dziedzictwo jest widoczne na każdym kroku, czyniąc ją fascynującym celem podróży.',
      native: 'England, the largest and most populous part of the United Kingdom, is a country with a rich history that has shaped the modern world. It is the birthplace of the English language, the Industrial Revolution, and many sports, such as football and cricket. From prehistoric Stonehenge to bustling London, England offers a remarkable blend of tradition and modernity. It is the cradle of parliamentary democracy and constitutional monarchy, and its influence on literature, music, and science is immeasurable. Its distinctive landscapes, from the green hills of the Cotswolds to the white cliffs of Dover, are delightfully diverse. British pub culture, a love for tea, and a specific sense of humour are integral parts of the national identity. The country is also home to some of the oldest and most prestigious universities in the world. England is a dynamic multicultural society that continues to play a key role on the international stage. Its heritage is visible at every turn, making it a fascinating travel destination.'
    },
    factsTitle: { pl: 'Kluczowe Fakty', native: 'Key Facts' },
    capital: { pl: 'Stolica', native: 'Capital' },
    population: { pl: 'Populacja', native: 'Population' },
    area: { pl: 'Powierzchnia', native: 'Area' },
    currency: { pl: 'Waluta', native: 'Currency' },
    funFactsTitle: { pl: 'Ciekawostki', native: 'Fun Facts' },
    funFacts: {
      pl: [
        'W Windsorze znajduje się najstarszy i największy zamieszkany zamek na świecie.',
        'Anglicy wypijają około 100 milionów filiżanek herbaty dziennie.',
        'W Londynie mówi się w ponad 300 językach.',
        'Francuski był oficjalnym językiem Anglii przez około 300 lat.'
      ],
      native: [
        'Windsor is home to the oldest and largest inhabited castle in the world.',
        'The English drink about 100 million cups of tea daily.',
        'Over 300 languages are spoken in London.',
        'French was the official language of England for about 300 years.'
      ]
    },
    backButton: { pl: 'Powrót do Kultury', native: 'Back to Culture' },
  },
  stats: {
    capital: { pl: 'Londyn', native: 'London' },
    population: '~56.5 million',
    area: '130,279 km²',
    currency: { pl: 'Funt szterling (GBP)', native: 'Pound sterling (GBP)' },
  },
};

export default function AboutEnPage() {
    return <AboutCountryPage data={englandData} />;
}