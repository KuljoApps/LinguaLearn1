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
  { id: 1, verb: 'être', form2: 'j\'ai été', form3: 'été', translationOptions: ['być', 'mieć', 'robić'], correctTranslation: 'być' },
  { id: 2, verb: 'avoir', form2: 'j\'ai eu', form3: 'eu', translationOptions: ['dawać', 'brać', 'mieć'], correctTranslation: 'mieć' },
  { id: 3, verb: 'aller', form2: 'je suis allé(e)', form3: 'allé', translationOptions: ['przychodzić', 'iść', 'biec'], correctTranslation: 'iść' },
  { id: 4, verb: 'faire', form2: 'j\'ai fait', form3: 'fait', translationOptions: ['robić', 'mówić', 'widzieć'], correctTranslation: 'robić' },
  { id: 5, verb: 'pouvoir', form2: 'j\'ai pu', form3: 'pu', translationOptions: ['chcieć', 'móc', 'musieć'], correctTranslation: 'móc' },
  { id: 6, verb: 'vouloir', form2: 'j\'ai voulu', form3: 'voulu', translationOptions: ['potrzebować', 'chcieć', 'lubić'], correctTranslation: 'chcieć' },
  { id: 7, verb: 'voir', form2: 'j\'ai vu', form3: 'vu', translationOptions: ['słyszeć', 'patrzeć', 'widzieć'], correctTranslation: 'widzieć' },
  { id: 8, verb: 'savoir', form2: 'j\'ai su', form3: 'su', translationOptions: ['myśleć', 'wiedzieć', 'ignorować'], correctTranslation: 'wiedzieć' },
  { id: 9, verb: 'prendre', form2: 'j\'ai pris', form3: 'pris', translationOptions: ['dawać', 'brać', 'przynosić'], correctTranslation: 'brać' },
  { id: 10, verb: 'venir', form2: 'je suis venu(e)', form3: 'venu', translationOptions: ['przychodzić', 'wychodzić', 'zostawać'], correctTranslation: 'przychodzić' },
  { id: 11, verb: 'boire', form2: 'j\'ai bu', form3: 'bu', translationOptions: ['jeść', 'pić', 'spać'], correctTranslation: 'pić' },
  { id: 12, verb: 'connaître', form2: 'j\'ai connu', form3: 'connu', translationOptions: ['uczyć się', 'znać', 'zapominać'], correctTranslation: 'znać' },
  { id: 13, verb: 'croire', form2: 'j\'ai cru', form3: 'cru', translationOptions: ['wątpić', 'wierzyć', 'wiedzieć'], correctTranslation: 'wierzyć' },
  { id: 14, verb: 'devoir', form2: 'j\'ai dû', form3: 'dû', translationOptions: ['chcieć', 'móc', 'musieć'], correctTranslation: 'musieć' },
  { id: 15, verb: 'dire', form2: 'j\'ai dit', form3: 'dit', translationOptions: ['słuchać', 'pisać', 'mówić'], correctTranslation: 'mówić' },
  { id: 16, verb: 'dormir', form2: 'j\'ai dormi', form3: 'dormi', translationOptions: ['budzić się', 'spać', 'czuwać'], correctTranslation: 'spać' },
  { id: 17, verb: 'écrire', form2: 'j\'ai écrit', form3: 'écrit', translationOptions: ['czytać', 'pisać', 'rysować'], correctTranslation: 'pisać' },
  { id: 18, verb: 'envoyer', form2: 'j\'ai envoyé', form3: 'envoyé', translationOptions: ['odbierać', 'wysyłać', 'przynosić'], correctTranslation: 'wysyłać' },
  { id: 19, verb: 'lire', form2: 'j\'ai lu', form3: 'lu', translationOptions: ['pisać', 'czytać', 'słuchać'], correctTranslation: 'czytać' },
  { id: 20, verb: 'mettre', form2: 'j\'ai mis', form3: 'mis', translationOptions: ['kłaść/wkładać', 'wyjmować', 'przesuwać'], correctTranslation: 'kłaść/wkładać' },
  { id: 21, verb: 'mourir', form2: 'je suis mort(e)', form3: 'mort', translationOptions: ['żyć', 'rodzić się', 'umierać'], correctTranslation: 'umierać' },
  { id: 22, verb: 'naître', form2: 'je suis né(e)', form3: 'né', translationOptions: ['umierać', 'rodzić się', 'rosnąć'], correctTranslation: 'rodzić się' },
  { id: 23, verb: 'ouvrir', form2: 'j\'ai ouvert', form3: 'ouvert', translationOptions: ['zamykać', 'otwierać', 'pukać'], correctTranslation: 'otwierać' },
  { id: 24, verb: 'partir', form2: 'je suis parti(e)', form3: 'parti', translationOptions: ['przyjeżdżać', 'wyjeżdżać', 'zostawać'], correctTranslation: 'wyjeżdżać' },
  { id: 25, verb: 'plaire', form2: 'j\'ai plu', form3: 'plu', translationOptions: ['podobać się', 'nienawidzić', 'irytować'], correctTranslation: 'podobać się' },
  { id: 26, verb: 'recevoir', form2: 'j\'ai reçu', form3: 'reçu', translationOptions: ['wysyłać', 'dawać', 'otrzymywać'], correctTranslation: 'otrzymywać' },
  { id: 27, verb: 'rire', form2: 'j\'ai ri', form3: 'ri', translationOptions: ['śmiać się', 'płakać', 'krzyczeć'], correctTranslation: 'śmiać się' },
  { id: 28, verb: 'sortir', form2: 'je suis sorti(e)', form3: 'sorti', translationOptions: ['wchodzić', 'wychodzić', 'zostawać'], correctTranslation: 'wychodzić' },
  { id: 29, verb: 'suivre', form2: 'j\'ai suivi', form3: 'suivi', translationOptions: ['prowadzić', 'iść za/śledzić', 'poprzedzać'], correctTranslation: 'iść za/śledzić' },
  { id: 30, verb: 'vivre', form2: 'j\'ai vécu', form3: 'vécu', translationOptions: ['umierać', 'żyć', 'przeżyć'], correctTranslation: 'żyć' },
];
