
export interface IrregularVerbQuestion {
  id: number;
  verb: string; // Base form
  form2: string; // Pretérito
  form3: string; // Participio
  translationOptions: string[];
  correctTranslation: string;
}

export const questions: IrregularVerbQuestion[] = [
  { id: 1, verb: 'ser/ir', form2: 'fui', form3: 'sido/ido', translationOptions: ['być/iść', 'mieć', 'robić'], correctTranslation: 'być/iść' },
  { id: 2, verb: 'tener', form2: 'tuve', form3: 'tenido', translationOptions: ['dawać', 'brać', 'mieć'], correctTranslation: 'mieć' },
  { id: 3, verb: 'hacer', form2: 'hice', form3: 'hecho', translationOptions: ['robić', 'mówić', 'widzieć'], correctTranslation: 'robić' },
  { id: 4, verb: 'decir', form2: 'dije', form3: 'dicho', translationOptions: ['słuchać', 'pisać', 'mówić'], correctTranslation: 'mówić' },
  { id: 5, verb: 'ver', form2: 'vi', form3: 'visto', translationOptions: ['słyszeć', 'patrzeć', 'widzieć'], correctTranslation: 'widzieć' },
  { id: 6, verb: 'dar', form2: 'di', form3: 'dado', translationOptions: ['brać', 'dawać', 'otrzymywać'], correctTranslation: 'dawać' },
  { id: 7, verb: 'poder', form2: 'pude', form3: 'podido', translationOptions: ['chcieć', 'móc', 'musieć'], correctTranslation: 'móc' },
  { id: 8, verb: 'querer', form2: 'quise', form3: 'querido', translationOptions: ['potrzebować', 'chcieć', 'lubić'], correctTranslation: 'chcieć' },
  { id: 9, verb: 'saber', form2: 'supe', form3: 'sabido', translationOptions: ['myśleć', 'wiedzieć', 'ignorować'], correctTranslation: 'wiedzieć' },
  { id: 10, verb: 'poner', form2: 'puse', form3: 'puesto', translationOptions: ['kłaść/wkładać', 'wyjmować', 'przesuwać'], correctTranslation: 'kłaść/wkładać' },
  { id: 11, verb: 'venir', form2: 'vine', form3: 'venido', translationOptions: ['przychodzić', 'wychodzić', 'zostawać'], correctTranslation: 'przychodzić' },
  { id: 12, verb: 'conducir', form2: 'conduje', form3: 'conducido', translationOptions: ['prowadzić', 'chodzić', 'latać'], correctTranslation: 'prowadzić' },
  { id: 13, verb: 'traer', form2: 'traje', form3: 'traído', translationOptions: ['dawać', 'brać', 'przynosić'], correctTranslation: 'przynosić' },
  { id: 14, verb: 'escribir', form2: 'escribí', form3: 'escrito', translationOptions: ['czytać', 'pisać', 'rysować'], correctTranslation: 'pisać' },
  { id: 15, verb: 'leer', form2: 'leí', form3: 'leído', translationOptions: ['pisać', 'czytać', 'słuchać'], correctTranslation: 'czytać' },
  { id: 16, verb: 'abrir', form2: 'abrí', form3: 'abierto', translationOptions: ['zamykać', 'otwierać', 'pukać'], correctTranslation: 'otwierać' },
  { id: 17, verb: 'romper', form2: 'rompí', form3: 'roto', translationOptions: ['naprawiać', 'budować', 'łamać'], correctTranslation: 'łamać' },
  { id: 18, verb: 'morir', form2: 'morí', form3: 'muerto', translationOptions: ['żyć', 'rodzić się', 'umierać'], correctTranslation: 'umierać' },
  { id: 19, verb: 'volver', form2: 'volví', form3: 'vuelto', translationOptions: ['iść', 'wracać', 'zostawać'], correctTranslation: 'wracać' },
  { id: 20, verb: 'caber', form2: 'cupe', form3: 'cabido', translationOptions: ['mieścić się', 'wychodzić', 'wchodzić'], correctTranslation: 'mieścić się' },
  { id: 21, verb: 'andar', form2: 'anduve', form3: 'andado', translationOptions: ['biec', 'stać', 'chodzić'], correctTranslation: 'chodzić' },
  { id: 22, verb: 'estar', form2: 'estuve', form3: 'estado', translationOptions: ['być (chwilowo)', 'iść', 'mieć'], correctTranslation: 'być (chwilowo)' },
  { id: 23, verb: 'producir', form2: 'produje', form3: 'producido', translationOptions: ['niszczyć', 'produkować', 'konsumować'], correctTranslation: 'produkować' },
  { id: 24, verb: 'traducir', form2: 'traduje', form3: 'traducido', translationOptions: ['pisać', 'czytać', 'tłumaczyć'], correctTranslation: 'tłumaczyć' },
  { id: 25, verb: 'satisfacer', form2: 'satisfice', form3: 'satisfecho', translationOptions: ['zadowalać', 'denerwować', 'smutzić'], correctTranslation: 'zadowalać' },
  { id: 26, verb: 'oír', form2: 'oí', form3: 'oído', translationOptions: ['widzieć', 'mówić', 'słyszeć'], correctTranslation: 'słyszeć' },
  { id: 27, verb: 'caer', form2: 'caí', form3: 'caído', translationOptions: ['wstawać', 'upadać', 'skakać'], correctTranslation: 'upadać' },
  { id: 28, verb: 'construir', form2: 'construí', form3: 'construido', translationOptions: ['niszczyć', 'budować', 'projektować'], correctTranslation: 'budować' },
  { id: 29, verb: 'huir', form2: 'huí', form3: 'huido', translationOptions: ['zostawać', 'uciekać', 'walczyć'], correctTranslation: 'uciekać' },
  { id: 30, verb: 'reír', form2: 'reí', form3: 'reído', translationOptions: ['płakać', 'śmiać się', 'krzyczeć'], correctTranslation: 'śmiać się' },
];
