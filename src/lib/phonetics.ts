import type { Language } from './storage';

export interface PhoneticsPhrase {
  phrase: string;
  phonetic: string;
  translation: string;
  audioId: string;
}

export interface PhoneticsPageData {
  lang: Language;
  category: 'basic-expressions' | 'difficult-pronunciation';
  title: string;
  phrases: PhoneticsPhrase[];
  ui: {
    backButton: string;
  };
}

export interface AllPhoneticsData {
  [lang: string]: {
    'basic-expressions': PhoneticsPageData;
    'difficult-pronunciation': PhoneticsPageData;
  };
}

const sanitizeForAudioId = (phrase: string) => phrase.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const basicExpressionsData: { [lang: string]: Omit<PhoneticsPageData, 'lang' | 'category' | 'ui'> } = {
  en: {
    title: 'Basic Expressions',
    phrases: [
      { phrase: 'Hello, how are you?', phonetic: '/həˈloʊ, haʊ ɑːr juː?/', translation: 'Cześć, jak się masz?', audioId: 'hello-how-are-you' },
      { phrase: 'What is your name?', phonetic: '/wʌt ɪz jʊər neɪm?/', translation: 'Jak masz na imię?', audioId: 'what-is-your-name' },
      { phrase: 'My name is...', phonetic: '/maɪ neɪm ɪz.../', translation: 'Nazywam się...', audioId: 'my-name-is' },
      { phrase: 'Thank you very much.', phonetic: '/θæŋk juː ˈvɛri mʌtʃ./', translation: 'Dziękuję bardzo.', audioId: 'thank-you-very-much' },
      { phrase: 'You\'re welcome.', phonetic: '/jʊər ˈwɛlkəm./', translation: 'Nie ma za co.', audioId: 'youre-welcome' },
      { phrase: 'Excuse me / Sorry.', phonetic: '/ɪkˈskjuːs miː / ˈsɔːri./', translation: 'Przepraszam.', audioId: 'excuse-me-sorry' },
      { phrase: 'I don\'t understand.', phonetic: '/aɪ doʊnt ˌʌndərˈstænd./', translation: 'Nie rozumiem.', audioId: 'i-dont-understand' },
      { phrase: 'Can you speak more slowly?', phonetic: '/kæn juː spiːk mɔːr ˈsloʊli?/', translation: 'Czy możesz mówić wolniej?', audioId: 'can-you-speak-more-slowly' },
      { phrase: 'Where is the bathroom?', phonetic: '/wɛər ɪz ðə ˈbæθˌruːm?/', translation: 'Gdzie jest łazienka?', audioId: 'where-is-the-bathroom' },
      { phrase: 'How much does this cost?', phonetic: '/haʊ mʌtʃ dʌz ðɪs kɔːst?/', translation: 'Ile to kosztuje?', audioId: 'how-much-does-this-cost' },
      { phrase: 'Yes / No.', phonetic: '/jɛs / noʊ./', translation: 'Tak / Nie.', audioId: 'yes-no' },
      { phrase: 'Good morning.', phonetic: '/ɡʊd ˈmɔːrnɪŋ./', translation: 'Dzień dobry (rano).', audioId: 'good-morning' },
      { phrase: 'Good evening.', phonetic: '/ɡʊd ˈiːvnɪŋ./', translation: 'Dobry wieczór.', audioId: 'good-evening' },
      { phrase: 'Goodbye.', phonetic: '/ɡʊdˈbaɪ./', translation: 'Do widzenia.', audioId: 'goodbye' },
      { phrase: 'I love you.', phonetic: '/aɪ lʌv juː./', translation: 'Kocham cię.', audioId: 'i-love-you' },
      { phrase: 'What time is it?', phonetic: '/wʌt taɪm ɪz ɪt?/', translation: 'Która jest godzina?', audioId: 'what-time-is-it' },
      { phrase: 'I need help.', phonetic: '/aɪ niːd hɛlp./', translation: 'Potrzebuję pomocy.', audioId: 'i-need-help' },
      { phrase: 'I\'m lost.', phonetic: '/aɪm lɔːst./', translation: 'Zgubiłem/am się.', audioId: 'im-lost' },
      { phrase: 'I am from Poland.', phonetic: '/aɪ æm frʌm ˈpoʊlənd./', translation: 'Jestem z Polski.', audioId: 'i-am-from-poland' },
      { phrase: 'Nice to meet you.', phonetic: '/naɪs tuː miːt juː./', translation: 'Miło cię poznać.', audioId: 'nice-to-meet-you' },
    ]
  },
  de: {
    title: 'Grundlagen',
    phrases: [
      { phrase: 'Guten Tag', phonetic: '/ˌɡuːtn̩ ˈtaːk/', translation: 'Dzień dobry', audioId: 'guten-tag' },
      { phrase: 'Wie geht es Ihnen?', phonetic: '/viː ɡeːt ɛs ˈiːnən?/', translation: 'Jak się Pan/Pani miewa?', audioId: 'wie-geht-es-ihnen' },
      { phrase: 'Mein Name ist...', phonetic: '/maɪ̯n ˈnaːmə ɪst.../', translation: 'Nazywam się...', audioId: 'mein-name-ist' },
      { phrase: 'Danke schön.', phonetic: '/ˈdaŋkə ʃøːn/', translation: 'Dziękuję pięknie.', audioId: 'danke-schoen' },
      { phrase: 'Gern geschehen.', phonetic: '/ɡɛrn ɡəˈʃeːən/', translation: 'Nie ma za co.', audioId: 'gern-geschehen' },
      { phrase: 'Entschuldigung.', phonetic: '/ɛntˈʃʊldɪɡʊŋ/', translation: 'Przepraszam.', audioId: 'entschuldigung' },
      { phrase: 'Ich verstehe nicht.', phonetic: '/ɪç fɛɐ̯ˈʃteːə nɪçt/', translation: 'Nie rozumiem.', audioId: 'ich-verstehe-nicht' },
      { phrase: 'Können Sie langsamer sprechen?', phonetic: '/ˈkœnən ziː ˈlaŋzamɐ ˈʃprɛçn̩?/', translation: 'Czy może Pan/Pani mówić wolniej?', audioId: 'koennen-sie-langsamer-sprechen' },
      { phrase: 'Wo ist die Toilette?', phonetic: '/voː ɪst diː to̯aˈlɛtə?/', translation: 'Gdzie jest toaleta?', audioId: 'wo-ist-die-toilette' },
      { phrase: 'Was kostet das?', phonetic: '/vas ˈkɔstət das?/', translation: 'Ile to kosztuje?', audioId: 'was-kostet-das' },
      { phrase: 'Ja / Nein.', phonetic: '/jaː / naɪ̯n/', translation: 'Tak / Nie.', audioId: 'ja-nein' },
      { phrase: 'Guten Morgen.', phonetic: '/ˌɡuːtn̩ ˈmɔrɡn̩/', translation: 'Dzień dobry (rano).', audioId: 'guten-morgen' },
      { phrase: 'Guten Abend.', phonetic: '/ˌɡuːtn̩ ˈaːbnt/', translation: 'Dobry wieczór.', audioId: 'guten-abend' },
      { phrase: 'Auf Wiedersehen.', phonetic: '/aʊ̯f ˈviːdɐzeːən/', translation: 'Do widzenia.', audioId: 'auf-wiedersehen' },
      { phrase: 'Ich liebe dich.', phonetic: '/ɪç ˈliːbə dɪç/', translation: 'Kocham cię.', audioId: 'ich-liebe-dich' },
      { phrase: 'Wie spät ist es?', phonetic: '/viː ʃpɛːt ɪst ɛs?/', translation: 'Która jest godzina?', audioId: 'wie-spaet-ist-es' },
      { phrase: 'Ich brauche Hilfe.', phonetic: '/ɪç ˈbraʊ̯xə ˈhɪlfə/', translation: 'Potrzebuję pomocy.', audioId: 'ich-brauche-hilfe' },
      { phrase: 'Ich habe mich verlaufen.', phonetic: '/ɪç ˈhaːbə mɪç fɛɐ̯ˈlaʊ̯fn̩/', translation: 'Zgubiłem/am się.', audioId: 'ich-habe-mich-verlaufen' },
      { phrase: 'Ich komme aus Polen.', phonetic: '/ɪç ˈkɔmə aʊ̯s ˈpoːlən/', translation: 'Pochodzę z Polski.', audioId: 'ich-komme-aus-polen' },
      { phrase: 'Sehr erfreut.', phonetic: '/zeːɐ̯ ɛɐ̯ˈfrɔɪ̯t/', translation: 'Miło mi.', audioId: 'sehr-erfreut' },
    ]
  },
  fr: {
    title: 'Expressions de Base',
    phrases: [
        { phrase: 'Bonjour', phonetic: '/bɔ̃.ʒuʁ/', translation: 'Dzień dobry', audioId: 'bonjour' },
        { phrase: 'Comment ça va?', phonetic: '/kɔ.mɑ̃ sa va?/', translation: 'Jak się masz?', audioId: 'comment-ca-va' },
        { phrase: 'Je m\'appelle...', phonetic: '/ʒə ma.pɛl.../', translation: 'Nazywam się...', audioId: 'je-mappelle' },
        { phrase: 'Merci beaucoup.', phonetic: '/mɛʁ.si bo.ku/', translation: 'Dziękuję bardzo.', audioId: 'merci-beaucoup' },
        { phrase: 'De rien.', phonetic: '/də ʁjɛ̃/', translation: 'Nie ma za co.', audioId: 'de-rien' },
        { phrase: 'Excusez-moi / Pardon.', phonetic: '/ɛks.ky.ze.mwa / paʁ.dɔ̃/', translation: 'Przepraszam.', audioId: 'excusez-moi-pardon' },
        { phrase: 'Je ne comprends pas.', phonetic: '/ʒə nə kɔ̃.pʁɑ̃ pa/', translation: 'Nie rozumiem.', audioId: 'je-ne-comprends-pas' },
        { phrase: 'Pouvez-vous parler plus lentement?', phonetic: '/pu.ve.vu paʁ.le ply lɑ̃t.mɑ̃?/', translation: 'Czy może Pan/Pani mówić wolniej?', audioId: 'pouvez-vous-parler-plus-lentement' },
        { phrase: 'Où sont les toilettes?', phonetic: '/u sɔ̃ le twa.lɛt?/', translation: 'Gdzie są toalety?', audioId: 'ou-sont-les-toilettes' },
        { phrase: 'Combien ça coûte?', phonetic: '/kɔ̃.bjɛ̃ sa kut?/', translation: 'Ile to kosztuje?', audioId: 'combien-ca-coute' },
        { phrase: 'Oui / Non.', phonetic: '/wi / nɔ̃/', translation: 'Tak / Nie.', audioId: 'oui-non' },
        { phrase: 'Bonsoir.', phonetic: '/bɔ̃.swaʁ/', translation: 'Dobry wieczór.', audioId: 'bonsoir' },
        { phrase: 'Bonne nuit.', phonetic: '/bɔn nɥi/', translation: 'Dobranoc.', audioId: 'bonne-nuit' },
        { phrase: 'Au revoir.', phonetic: '/o ʁə.vwaʁ/', translation: 'Do widzenia.', audioId: 'au-revoir' },
        { phrase: 'Je t\'aime.', phonetic: '/ʒə tɛm/', translation: 'Kocham cię.', audioId: 'je-taime' },
        { phrase: 'Quelle heure est-il?', phonetic: '/kɛl œʁ ɛ.t‿il?/', translation: 'Która jest godzina?', audioId: 'quelle-heure-est-il' },
        { phrase: 'J\'ai besoin d\'aide.', phonetic: '/ʒe bə.zwɛ̃ dɛd/', translation: 'Potrzebuję pomocy.', audioId: 'jai-besoin-daide' },
        { phrase: 'Je suis perdu(e).', phonetic: '/ʒə sɥi pɛʁ.dy/', translation: 'Zgubiłem/am się.', audioId: 'je-suis-perdu' },
        { phrase: 'Je viens de Pologne.', phonetic: '/ʒə vjɛ̃ də pɔ.lɔɲ/', translation: 'Pochodzę z Polski.', audioId: 'je-viens-de-pologne' },
        { phrase: 'Enchanté(e).', phonetic: '/ɑ̃.ʃɑ̃.te/', translation: 'Miło mi.', audioId: 'enchante' },
    ]
  },
  es: {
    title: 'Expresiones Básicas',
    phrases: [
        { phrase: 'Hola, ¿qué tal?', phonetic: '/ˈola | ˈke ˈtal?/', translation: 'Cześć, jak leci?', audioId: 'hola-que-tal' },
        { phrase: '¿Cómo te llamas?', phonetic: '/ˈkomo te ˈjamas?/', translation: 'Jak masz na imię?', audioId: 'como-te-llamas' },
        { phrase: 'Me llamo...', phonetic: '/me ˈjamo.../', translation: 'Nazywam się...', audioId: 'me-llamo' },
        { phrase: 'Muchas gracias.', phonetic: '/ˈmutʃas ˈɡɾasjas/', translation: 'Dziękuję bardzo.', audioId: 'muchas-gracias' },
        { phrase: 'De nada.', phonetic: '/de ˈnaða/', translation: 'Nie ma za co.', audioId: 'de-nada' },
        { phrase: 'Perdón / Disculpe.', phonetic: '/peɾˈðon / disˈkulpe/', translation: 'Przepraszam.', audioId: 'perdon-disculpe' },
        { phrase: 'No entiendo.', phonetic: '/no enˈtjendo/', translation: 'Nie rozumiem.', audioId: 'no-entiendo' },
        { phrase: '¿Puedes hablar más despacio?', phonetic: '/ˈpweðes aˈβlaɾ mas desˈpasjo?/', translation: 'Czy możesz mówić wolniej?', audioId: 'puedes-hablar-mas-despacio' },
        { phrase: '¿Dónde está el baño?', phonetic: '/ˈdonde esˈta el ˈbaɲo?/', translation: 'Gdzie jest łazienka?', audioId: 'donde-esta-el-bano' },
        { phrase: '¿Cuánto cuesta?', phonetic: '/ˈkwanto ˈkwesta?/', translation: 'Ile to kosztuje?', audioId: 'cuanto-cuesta' },
        { phrase: 'Sí / No.', phonetic: '/ˈsi / ˈno/', translation: 'Tak / Nie.', audioId: 'si-no' },
        { phrase: 'Buenos días.', phonetic: '/ˈbwenos ˈdias/', translation: 'Dzień dobry.', audioId: 'buenos-dias' },
        { phrase: 'Buenas tardes.', phonetic: '/ˈbwenas ˈtaɾðes/', translation: 'Dzień dobry (po południu).', audioId: 'buenas-tardes' },
        { phrase: 'Adiós.', phonetic: '/aˈðjos/', translation: 'Do widzenia.', audioId: 'adios' },
        { phrase: 'Te quiero.', phonetic: '/te ˈkjeɾo/', translation: 'Kocham cię.', audioId: 'te-quiero' },
        { phrase: '¿Qué hora es?', phonetic: '/ˈke ˈoɾa ˈes?/', translation: 'Która jest godzina?', audioId: 'que-hora-es' },
        { phrase: 'Necesito ayuda.', phonetic: '/neseˈsito aˈʝuða/', translation: 'Potrzebuję pomocy.', audioId: 'necesito-ayuda' },
        { phrase: 'Estoy perdido/a.', phonetic: '/esˈtoi peɾˈðiðo(a)/', translation: 'Zgubiłem/am się.', audioId: 'estoy-perdido' },
        { phrase: 'Soy de Polonia.', phonetic: '/soi̯ de poˈlonja/', translation: 'Jestem z Polski.', audioId: 'soy-de-polonia' },
        { phrase: 'Mucho gusto.', phonetic: '/ˈmutʃo ˈɡusto/', translation: 'Miło mi.', audioId: 'mucho-gusto' },
    ]
  },
  it: {
    title: 'Espressioni di Base',
    phrases: [
        { phrase: 'Ciao, come stai?', phonetic: '/tʃao | ˈkome ˈstai?/', translation: 'Cześć, jak się masz?', audioId: 'ciao-come-stai' },
        { phrase: 'Come ti chiami?', phonetic: '/ˈkome ti ˈkjami?/', translation: 'Jak masz na imię?', audioId: 'come-ti-chiami' },
        { phrase: 'Mi chiamo...', phonetic: '/mi ˈkjamo.../', translation: 'Nazywam się...', audioId: 'mi-chiamo' },
        { phrase: 'Grazie mille.', phonetic: '/ˈɡrattsje ˈmille/', translation: 'Dziękuję bardzo.', audioId: 'grazie-mille' },
        { phrase: 'Prego.', phonetic: '/ˈprɛːɡo/', translation: 'Proszę / Nie ma za co.', audioId: 'prego' },
        { phrase: 'Scusi / Scusa.', phonetic: '/ˈskuzi / ˈskuza/', translation: 'Przepraszam (formalnie/nieformalnie).', audioId: 'scusi-scusa' },
        { phrase: 'Non capisco.', phonetic: '/non kaˈpisko/', translation: 'Nie rozumiem.', audioId: 'non-capisco' },
        { phrase: 'Può parlare più lentamente?', phonetic: '/pwɔ parˈlaːre pju lentaˈmente?/', translation: 'Czy może Pan/Pani mówić wolniej?', audioId: 'puo-parlare-piu-lentamente' },
        { phrase: 'Dov\'è il bagno?', phonetic: '/doˈvɛ il ˈbaɲɲo?/', translation: 'Gdzie jest łazienka?', audioId: 'dove-il-bagno' },
        { phrase: 'Quanto costa?', phonetic: '/ˈkwanto ˈkɔsta?/', translation: 'Ile to kosztuje?', audioId: 'quanto-costa' },
        { phrase: 'Sì / No.', phonetic: '/ˈsi / ˈnɔ/', translation: 'Tak / Nie.', audioId: 'si-no' },
        { phrase: 'Buongiorno.', phonetic: '/bwonˈdʒorno/', translation: 'Dzień dobry.', audioId: 'buongiorno' },
        { phrase: 'Buonasera.', phonetic: '/bwonaˈseːra/', translation: 'Dobry wieczór.', audioId: 'buonasera' },
        { phrase: 'Arrivederci.', phonetic: '/arriveˈdertʃi/', translation: 'Do widzenia.', audioId: 'arrivederci' },
        { phrase: 'Ti amo / Ti voglio bene.', phonetic: '/ti ˈaːmo / ti ˈvɔʎʎo ˈbɛːne/', translation: 'Kocham cię (romantycznie / platonicznie).', audioId: 'ti-amo-ti-voglio-bene' },
        { phrase: 'Che ore sono?', phonetic: '/ke ˈoːre ˈsoːno?/', translation: 'Która jest godzina?', audioId: 'che-ore-sono' },
        { phrase: 'Ho bisogno di aiuto.', phonetic: '/ɔ biˈzoɲɲo di aˈjuːto/', translation: 'Potrzebuję pomocy.', audioId: 'ho-bisogno-di-aiuto' },
        { phrase: 'Mi sono perso/a.', phonetic: '/mi ˈsoːno ˈpɛrso(a)/', translation: 'Zgubiłem/am się.', audioId: 'mi-sono-perso' },
        { phrase: 'Sono polacco/a.', phonetic: '/ˈsoːno poˈlakko(a)/', translation: 'Jestem Polakiem/Polką.', audioId: 'sono-polacco' },
        { phrase: 'Piacere di conoscerti.', phonetic: '/pjaˈtʃeːre di koˈnoʃʃerti/', translation: 'Miło cię poznać.', audioId: 'piacere-di-conoscerti' },
    ]
  },
};

const difficultPronunciationData: { [lang: string]: Omit<PhoneticsPageData, 'lang' | 'category' | 'ui'> } = {
  en: {
    title: 'Difficult Pronunciation',
    phrases: [
      { phrase: 'Though', phonetic: '/ðoʊ/', translation: 'Chociaż', audioId: 'though' },
      { phrase: 'Thorough', phonetic: '/ˈθɜːroʊ/', translation: 'Gruntowny, dokładny', audioId: 'thorough' },
      { phrase: 'Throughout', phonetic: '/θruːˈaʊt/', translation: 'Przez cały (czas), wszędzie', audioId: 'throughout' },
      { phrase: 'Worcestershire', phonetic: '/ˈwʊstərʃər/', translation: 'Nazwa hrabstwa i sosu', audioId: 'worcestershire' },
      { phrase: 'Colonel', phonetic: '/ˈkɜːrnl/', translation: 'Pułkownik', audioId: 'colonel' },
      { phrase: 'Squirrel', phonetic: '/ˈskwɜːrəl/', translation: 'Wiewiórka', audioId: 'squirrel' },
      { phrase: 'Rural', phonetic: '/ˈrʊrəl/', translation: 'Wiejski', audioId: 'rural' },
      { phrase: 'Anemone', phonetic: '/əˈnɛməni/', translation: 'Zawilec (kwiat)', audioId: 'anemone' },
      { phrase: 'Choir', phonetic: '/kwaɪər/', translation: 'Chór', audioId: 'choir' },
      { phrase: 'Sixth', phonetic: '/sɪksθ/', translation: 'Szósty', audioId: 'sixth' },
    ]
  },
  de: {
    title: 'Schwierige Aussprache',
    phrases: [
      { phrase: 'Eichhörnchen', phonetic: '/ˈaɪ̯çˌhœʁnçən/', translation: 'Wiewiórka', audioId: 'eichhoernchen' },
      { phrase: 'Brötchen', phonetic: '/ˈbʁøːtçən/', translation: 'Bułeczka', audioId: 'broetchen' },
      { phrase: 'Rührei', phonetic: '/ˈʁyːɐ̯ˌʔaɪ̯/', translation: 'Jajecznica', audioId: 'ruehrei' },
      { phrase: 'Streichholzschächtelchen', phonetic: '/ˈʃtraɪ̯çhɔltsˌʃɛçtɛlçən/', translation: 'Pudełeczko zapałek', audioId: 'streichholzschaechtelchen' },
      { phrase: 'Zwanzig', phonetic: '/ˈtsvantsɪç/', translation: 'Dwadzieścia', audioId: 'zwanzig' },
      { phrase: 'Pflicht', phonetic: '/pflɪçt/', translation: 'Obowiązek', audioId: 'pflicht' },
      { phrase: 'Frucht', phonetic: '/fʁʊxt/', translation: 'Owoc', audioId: 'frucht' },
      { phrase: 'Quatsch', phonetic: '/kvatʃ/', translation: 'Bzdura, nonsens', audioId: 'quatsch' },
      { phrase: 'Tschechien', phonetic: '/ˈtʃɛçi̯ən/', translation: 'Czechy', audioId: 'tschechien' },
      { phrase: 'König', phonetic: '/ˈkøːnɪç/', translation: 'Król', audioId: 'koenig' },
    ]
  },
  fr: {
    title: 'Prononciation Difficile',
    phrases: [
      { phrase: 'Serrurerie', phonetic: '/sɛ.ʁyʁ.ʁi/', translation: 'Ślusarstwo', audioId: 'serrurerie' },
      { phrase: 'Écureuil', phonetic: '/e.ky.ʁœj/', translation: 'Wiewiórka', audioId: 'ecureuil' },
      { phrase: 'Chirurgien', phonetic: '/ʃi.ʁyʁ.ʒjɛ̃/', translation: 'Chirurg', audioId: 'chirurgien' },
      { phrase: 'Œil', phonetic: '/œj/', translation: 'Oko', audioId: 'oeil' },
      { phrase: 'Accueil', phonetic: '/a.kœj/', translation: 'Przyjęcie, recepcja', audioId: 'accueil' },
      { phrase: 'Bouilloire', phonetic: '/bu.jwaʁ/', translation: 'Czajnik', audioId: 'bouilloire' },
      { phrase: 'Grenouille', phonetic: '/ɡʁə.nuj/', translation: 'Żaba', audioId: 'grenouille' },
      { phrase: 'Pneu', phonetic: '/pnø/', translation: 'Opona', audioId: 'pneu' },
      { phrase: 'Quincaillerie', phonetic: '/kɛ̃.kaj.ʁi/', translation: 'Sklep z artykułami żelaznymi', audioId: 'quincaillerie' },
      { phrase: 'Heureux', phonetic: '/ø.ʁø/', translation: 'Szczęśliwy', audioId: 'heureux' },
    ]
  },
  es: {
    title: 'Pronunciación Difícil',
    phrases: [
      { phrase: 'Ferrocarril', phonetic: '/fe.ro.kaˈril/', translation: 'Kolej', audioId: 'ferrocarril' },
      { phrase: 'Desarrollador', phonetic: '/de.sa.ro.ʝaˈðoɾ/', translation: 'Deweloper, programista', audioId: 'desarrollador' },
      { phrase: 'Otorrinolaringólogo', phonetic: '/o.to.ri.no.la.ɾiŋˈɡolo.ɣo/', translation: 'Otolaryngolog', audioId: 'otorrinolaringologo' },
      { phrase: 'Ronronear', phonetic: '/ro.ro.neˈaɾ/', translation: 'Mruczeć (o kocie)', audioId: 'ronronear' },
      { phrase: 'Paralelepípedo', phonetic: '/pa.ɾa.le.leˈpipe.ðo/', translation: 'Równoległościan', audioId: 'paralelepipedo' },
      { phrase: 'Vergüenza', phonetic: '/beɾˈɣwenθa/', translation: 'Wstyd', audioId: 'verguenza' },
      { phrase: 'Ahuehuete', phonetic: '/a.weˈwete/', translation: 'Cypryśnik meksykański', audioId: 'ahuehuete' },
      { phrase: 'Cigüeña', phonetic: '/θiˈɣweɲa/', translation: 'Bocian', audioId: 'ciguena' },
      { phrase: 'Guitarra', phonetic: '/ɡiˈtara/', translation: 'Gitara', audioId: 'guitarra' },
      { phrase: 'Arroyo', phonetic: '/aˈroʝo/', translation: 'Strumień', audioId: 'arroyo' },
    ]
  },
  it: {
    title: 'Pronuncia Difficile',
    phrases: [
      { phrase: 'Ghiaccio', phonetic: '/ˈɡjat.tʃo/', translation: 'Lód', audioId: 'ghiaccio' },
      { phrase: 'Psicologo', phonetic: '/psiˈkɔ.lo.ɡo/', translation: 'Psycholog', audioId: 'psicologo' },
      { phrase: 'Gnocchi', phonetic: '/ˈɲɔk.ki/', translation: 'Kluski gnocchi', audioId: 'gnocchi' },
      { phrase: 'Esercizio', phonetic: '/e.zerˈtʃit.tsjo/', translation: 'Ćwiczenie', audioId: 'esercizio' },
      { phrase: 'Scoiattolo', phonetic: '/skoi̯ˈat.to.lo/', translation: 'Wiewiórka', audioId: 'scoiattolo' },
      { phrase: 'Chiacchierare', phonetic: '/kjak.kjeˈra.re/', translation: 'Gadać, plotkować', audioId: 'chiacchierare' },
      { phrase: 'Aglio', phonetic: '/ˈaʎ.ʎo/', translation: 'Czosnek', audioId: 'aglio' },
      { phrase: 'Figli', phonetic: '/ˈfiʎ.ʎi/', translation: 'Dzieci, synowie', audioId: 'figli' },
      { phrase: 'Sbagliare', phonetic: '/zbaʎˈʎa.re/', translation: 'Mylić się, popełniać błąd', audioId: 'sbagliare' },
      { phrase: 'Circonferenza', phonetic: '/tʃir.kon.feˈrɛn.tsa/', translation: 'Obwód', audioId: 'circonferenza' },
    ]
  },
};

export const allPhoneticsData: AllPhoneticsData = {
    en: {
        'basic-expressions': {
            lang: 'en',
            category: 'basic-expressions',
            ...basicExpressionsData.en,
            ui: { backButton: 'Back to Phonetics' }
        },
        'difficult-pronunciation': {
            lang: 'en',
            category: 'difficult-pronunciation',
            ...difficultPronunciationData.en,
            ui: { backButton: 'Back to Phonetics' }
        }
    },
    de: {
        'basic-expressions': {
            lang: 'de',
            category: 'basic-expressions',
            ...basicExpressionsData.de,
            ui: { backButton: 'Zurück zur Phonetik' }
        },
        'difficult-pronunciation': {
            lang: 'de',
            category: 'difficult-pronunciation',
            ...difficultPronunciationData.de,
            ui: { backButton: 'Zurück zur Phonetik' }
        }
    },
    fr: {
        'basic-expressions': {
            lang: 'fr',
            category: 'basic-expressions',
            ...basicExpressionsData.fr,
            ui: { backButton: 'Retour à la Phonétique' }
        },
        'difficult-pronunciation': {
            lang: 'fr',
            category: 'difficult-pronunciation',
            ...difficultPronunciationData.fr,
            ui: { backButton: 'Retour à la Phonétique' }
        }
    },
    es: {
        'basic-expressions': {
            lang: 'es',
            category: 'basic-expressions',
            ...basicExpressionsData.es,
            ui: { backButton: 'Volver a Fonética' }
        },
        'difficult-pronunciation': {
            lang: 'es',
            category: 'difficult-pronunciation',
            ...difficultPronunciationData.es,
            ui: { backButton: 'Volver a Fonética' }
        }
    },
    it: {
        'basic-expressions': {
            lang: 'it',
            category: 'basic-expressions',
            ...basicExpressionsData.it,
            ui: { backButton: 'Torna a Fonetica' }
        },
        'difficult-pronunciation': {
            lang: 'it',
            category: 'difficult-pronunciation',
            ...difficultPronunciationData.it,
            ui: { backButton: 'Torna a Fonetica' }
        }
    },
};
