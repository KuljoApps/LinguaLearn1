export interface IrregularVerbQuestion {
  id: number;
  verb: string; // Base form
  form2: string; // Passé composé (avec 'avoir' ou 'être')
  form3: string; // Participe passé
  translationOptions: string[];
  correctTranslation: string;
}

// Note: French verb conjugation is more complex. 'form2' will represent a common past tense example.
export const questions: IrregularVerbQuestion[] = [
  {
    id: 1,
    verb: 'être',
    form2: 'j\'ai été',
    form3: 'été',
    translationOptions: ['być', 'mieć', 'robić'],
    correctTranslation: 'być',
  },
  {
    id: 2,
    verb: 'avoir',
    form2: 'j\'ai eu',
    form3: 'eu',
    translationOptions: ['dawać', 'brać', 'mieć'],
    correctTranslation: 'mieć',
  },
  {
    id: 3,
    verb: 'aller',
    form2: 'je suis allé(e)',
    form3: 'allé',
    translationOptions: ['przychodzić', 'iść', 'biec'],
    correctTranslation: 'iść',
  },
  {
    id: 4,
    verb: 'faire',
    form2: 'j\'ai fait',
    form3: 'fait',
    translationOptions: ['robić', 'mówić', 'widzieć'],
    correctTranslation: 'robić',
  },
  {
    id: 5,
    verb: 'pouvoir',
    form2: 'j\'ai pu',
    form3: 'pu',
    translationOptions: ['chcieć', 'móc', 'musieć'],
    correctTranslation: 'móc',
  },
  {
    id: 6,
    verb: 'vouloir',
    form2: 'j\'ai voulu',
    form3: 'voulu',
    translationOptions: ['potrzebować', 'chcieć', 'lubić'],
    correctTranslation: 'chcieć',
  },
  {
    id: 7,
    verb: 'voir',
    form2: 'j\'ai vu',
    form3: 'vu',
    translationOptions: ['słyszeć', 'patrzeć', 'widzieć'],
    correctTranslation: 'widzieć',
  },
  {
    id: 8,
    verb: 'savoir',
    form2: 'j\'ai su',
    form3: 'su',
    translationOptions: ['myśleć', 'wiedzieć', 'ignorować'],
    correctTranslation: 'wiedzieć',
  },
  {
    id: 9,
    verb: 'prendre',
    form2: 'j\'ai pris',
    form3: 'pris',
    translationOptions: ['dawać', 'brać', 'przynosić'],
    correctTranslation: 'brać',
  },
  {
    id: 10,
    verb: 'venir',
    form2: 'je suis venu(e)',
    form3: 'venu',
    translationOptions: ['przychodzić', 'wychodzić', 'zostawać'],
    correctTranslation: 'przychodzić',
  },
];
