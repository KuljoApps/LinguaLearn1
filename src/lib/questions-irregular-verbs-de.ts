
export interface IrregularVerbQuestion {
  id: number;
  verb: string; // Base form
  form2: string; // Präteritum
  form3: string; // Partizip II
  translationOptions: string[];
  correctTranslation: string;
}

export const questions: IrregularVerbQuestion[] = [
  { id: 1, verb: 'sein', form2: 'war', form3: 'gewesen', translationOptions: ['być', 'mieć', 'robić'], correctTranslation: 'być' },
  { id: 2, verb: 'haben', form2: 'hatte', form3: 'gehabt', translationOptions: ['dawać', 'brać', 'mieć'], correctTranslation: 'mieć' },
  { id: 3, verb: 'werden', form2: 'wurde', form3: 'geworden', translationOptions: ['stawać się', 'chcieć', 'móc'], correctTranslation: 'stawać się' },
  { id: 4, verb: 'gehen', form2: 'ging', form3: 'gegangen', translationOptions: ['przychodzić', 'iść', 'biec'], correctTranslation: 'iść' },
  { id: 5, verb: 'kommen', form2: 'kam', form3: 'gekommen', translationOptions: ['iść', 'przychodzić', 'zostawać'], correctTranslation: 'przychodzić' },
  { id: 6, verb: 'sehen', form2: 'sah', form3: 'gesehen', translationOptions: ['słyszeć', 'patrzeć', 'widzieć'], correctTranslation: 'widzieć' },
  { id: 7, verb: 'sprechen', form2: 'sprach', form3: 'gesprochen', translationOptions: ['słuchać', 'pisać', 'mówić'], correctTranslation: 'mówić' },
  { id: 8, verb: 'nehmen', form2: 'nahm', form3: 'genommen', translationOptions: ['dawać', 'brać', 'przynosić'], correctTranslation: 'brać' },
  { id: 9, verb: 'geben', form2: 'gab', form3: 'gegeben', translationOptions: ['brać', 'dawać', 'otrzymywać'], correctTranslation: 'dawać' },
  { id: 10, verb: 'essen', form2: 'aß', form3: 'gegessen', translationOptions: ['pić', 'jeść', 'spać'], correctTranslation: 'jeść' },
  { id: 11, verb: 'trinken', form2: 'trank', form3: 'getrunken', translationOptions: ['jeść', 'pić', 'gotować'], correctTranslation: 'pić' },
  { id: 12, verb: 'schreiben', form2: 'schrieb', form3: 'geschrieben', translationOptions: ['czytać', 'pisać', 'rysować'], correctTranslation: 'pisać' },
  { id: 13, verb: 'lesen', form2: 'las', form3: 'gelesen', translationOptions: ['pisać', 'czytać', 'słuchać'], correctTranslation: 'czytać' },
  { id: 14, verb: 'fahren', form2: 'fuhr', form3: 'gefahren', translationOptions: ['prowadzić/jechać', 'chodzić', 'latać'], correctTranslation: 'prowadzić/jechać' },
  { id: 15, verb: 'fliegen', form2: 'flog', form3: 'geflogen', translationOptions: ['pływać', 'latać', 'biegać'], correctTranslation: 'latać' },
  { id: 16, verb: 'singen', form2: 'sang', form3: 'gesungen', translationOptions: ['tańczyć', 'śpiewać', 'mówić'], correctTranslation: 'śpiewać' },
  { id: 17, verb: 'beginnen', form2: 'begann', form3: 'begonnen', translationOptions: ['kończyć', 'zaczynać', 'kontynuować'], correctTranslation: 'zaczynać' },
  { id: 18, verb: 'finden', form2: 'fand', form3: 'gefunden', translationOptions: ['gubić', 'szukać', 'znajdować'], correctTranslation: 'znajdować' },
  { id: 19, verb: 'helfen', form2: 'half', form3: 'geholfen', translationOptions: ['przeszkadzać', 'pomagać', 'ignorować'], correctTranslation: 'pomagać' },
  { id: 20, verb: 'kennen', form2: 'kannte', form3: 'gekannt', translationOptions: ['uczyć się', 'znać', 'zapominać'], correctTranslation: 'znać' },
  { id: 21, verb: 'laufen', form2: 'lief', form3: 'gelaufen', translationOptions: ['chodzić', 'biec', 'stać'], correctTranslation: 'biec' },
  { id: 22, verb: 'schlafen', form2: 'schlief', form3: 'geschlafen', translationOptions: ['budzić się', 'spać', 'czuwać'], correctTranslation: 'spać' },
  { id: 23, verb: 'schwimmen', form2: 'schwamm', form3: 'geschwommen', translationOptions: ['pływać', 'nurkować', 'biegać'], correctTranslation: 'pływać' },
  { id: 24, verb: 'sterben', form2: 'starb', form3: 'gestorben', translationOptions: ['żyć', 'rodzić się', 'umierać'], correctTranslation: 'umierać' },
  { id: 25, verb: 'treffen', form2: 'traf', form3: 'getroffen', translationOptions: ['omijać', 'spotykać', 'szukać'], correctTranslation: 'spotykać' },
  { id: 26, verb: 'vergessen', form2: 'vergaß', form3: 'vergessen', translationOptions: ['pamiętać', 'uczyć się', 'zapominać'], correctTranslation: 'zapominać' },
  { id: 27, verb: 'verlieren', form2: 'verlor', form3: 'verloren', translationOptions: ['znajdować', 'wygrywać', 'gubić/tracić'], correctTranslation: 'gubić/tracić' },
  { id: 28, verb: 'waschen', form2: 'wusch', form3: 'gewaschen', translationOptions: ['brudzić', 'myć/prać', 'suszyć'], correctTranslation: 'myć/prać' },
  { id: 29, verb: 'wissen', form2: 'wusste', form3: 'gewusst', translationOptions: ['myśleć', 'wiedzieć', 'ignorować'], correctTranslation: 'wiedzieć' },
  { id: 30, verb: 'ziehen', form2: 'zog', form3: 'gezogen', translationOptions: ['pchać', 'ciągnąć', 'nosić'], correctTranslation: 'ciągnąć' },
];
