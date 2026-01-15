export interface IrregularVerbQuestion {
  id: number;
  verb: string; // Base form
  form2: string; // Past simple
  form3: string; // Past participle
  translationOptions: string[];
  correctTranslation: string;
}

export const questions: IrregularVerbQuestion[] = [
  {
    id: 1,
    verb: 'be',
    form2: 'was/were',
    form3: 'been',
    translationOptions: ['być', 'mieć', 'robić'],
    correctTranslation: 'być',
  },
  {
    id: 2,
    verb: 'go',
    form2: 'went',
    form3: 'gone',
    translationOptions: ['przychodzić', 'iść', 'biec'],
    correctTranslation: 'iść',
  },
  {
    id: 3,
    verb: 'do',
    form2: 'did',
    form3: 'done',
    translationOptions: ['robić', 'mówić', 'widzieć'],
    correctTranslation: 'robić',
  },
  {
    id: 4,
    verb: 'have',
    form2: 'had',
    form3: 'had',
    translationOptions: ['dawać', 'brać', 'mieć'],
    correctTranslation: 'mieć',
  },
  {
    id: 5,
    verb: 'make',
    form2: 'made',
    form3: 'made',
    translationOptions: ['tworzyć', 'niszczyć', 'kupować'],
    correctTranslation: 'tworzyć',
  },
  {
    id: 6,
    verb: 'see',
    form2: 'saw',
    form3: 'seen',
    translationOptions: ['słyszeć', 'patrzeć', 'widzieć'],
    correctTranslation: 'widzieć',
  },
  {
    id: 7,
    verb: 'say',
    form2: 'said',
    form3: 'said',
    translationOptions: ['mówić', 'pytać', 'odpowiadać'],
    correctTranslation: 'mówić',
  },
  {
    id: 8,
    verb: 'get',
    form2: 'got',
    form3: 'got/gotten',
    translationOptions: ['dostawać', 'tracić', 'wysyłać'],
    correctTranslation: 'dostawać',
  },
  {
    id: 9,
    verb: 'eat',
    form2: 'ate',
    form3: 'eaten',
    translationOptions: ['pić', 'jeść', 'spać'],
    correctTranslation: 'jeść',
  },
  {
    id: 10,
    verb: 'take',
    form2: 'took',
    form3: 'taken',
    translationOptions: ['dawać', 'brać', 'przynosić'],
    correctTranslation: 'brać',
  },
];
