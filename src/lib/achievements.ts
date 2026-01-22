
import { Award, BarChart, Brain, BookMarked, BrainCircuit, CalendarClock, Clock, Crown, Flame, Globe, MessagesSquare, Sparkles, Star, Trophy, Webhook, Zap, type LucideIcon } from 'lucide-react';
import { questions as enPlQuestions } from './questions-en-pl';
import { questions as plEnQuestions } from './questions-pl-en';
import { questions as irregularVerbsQuestions } from './questions-irregular-verbs';
import { questions as phrasalVerbsQuestions } from './questions-phrasal-verbs';
import { questions as idiomsQuestions } from './questions-idioms';
import { questions as frPlQuestions } from './questions-fr-pl';
import { questions as plFrQuestions } from './questions-pl-fr';
import { questions as irregularVerbsFrQuestions } from './questions-irregular-verbs-fr';
import { questions as fauxAmisFrQuestions } from './questions-phrasal-verbs-fr';
import { questions as idiomsFrQuestions } from './questions-idioms-fr';
import { questions as dePlQuestions } from './questions-de-pl';
import { questions as plDeQuestions } from './questions-pl-de';
import { questions as irregularVerbsDeQuestions } from './questions-irregular-verbs-de';
import { questions as phrasalVerbsDeQuestions } from './questions-phrasal-verbs-de';
import { questions as idiomsDeQuestions } from './questions-idioms-de';
import { questions as itPlQuestions } from './questions-it-pl';
import { questions as plItQuestions } from './questions-pl-it';
import { questions as irregularVerbsItQuestions } from './questions-irregular-verbs-it';
import { questions as phrasalVerbsItQuestions } from './questions-phrasal-verbs-it';
import { questions as idiomsItQuestions } from './questions-idioms-it';
import { questions as esPlQuestions } from './questions-es-pl';
import { questions as plEsQuestions } from './questions-pl-es';
import { questions as irregularVerbsEsQuestions } from './questions-irregular-verbs-es';
import { questions as phrasalVerbsEsQuestions } from './questions-phrasal-verbs-es';
import { questions as idiomsEsQuestions } from './questions-idioms-es';


export interface Achievement {
  id: string;
  name: string;
  description: string;
  name_fr?: string;
  description_fr?: string;
  name_de?: string;
  description_de?: string;
  name_it?: string;
  description_it?: string;
  name_es?: string;
  description_es?: string;
  icon: LucideIcon;
  goal: number;
}

export const allAchievements: Achievement[] = [
  // Total Correct Answers
  { id: 'novice', name: 'Novice', name_fr: 'Débutant', name_de: 'Anfänger', name_it: 'Novizio', name_es: 'Novato', description: 'Answer 50 questions correctly.', description_fr: 'Répondre correctly à 50 questions.', description_de: 'Beantworte 50 Fragen richtig.', description_it: 'Rispondi correttamente a 50 domande.', description_es: 'Responde 50 preguntas correctamente.', icon: Sparkles, goal: 50 },
  { id: 'apprentice', name: 'Apprentice', name_fr: 'Apprenti', name_de: 'Lehrling', name_it: 'Apprendista', name_es: 'Aprendiz', description: 'Answer 250 questions correctly.', description_fr: 'Répondre correctly à 250 questions.', description_de: 'Beantworte 250 Fragen richtig.', description_it: 'Rispondi correttamente a 250 domande.', description_es: 'Responde 250 preguntas correctamente.', icon: Star, goal: 250 },
  { id: 'master', name: 'Master', name_fr: 'Maître', name_de: 'Meister', name_it: 'Maestro', name_es: 'Maestro', description: 'Answer 1000 questions correctly.', description_fr: 'Répondre correctly à 1000 questions.', description_de: 'Beantworte 1000 Fragen richtig.', description_it: 'Rispondi correttamente a 1000 domande.', description_es: 'Responde 1000 preguntas correctamente.', icon: Crown, goal: 1000 },

  // Streaks
  { id: 'streak25', name: 'On Fire', name_fr: 'En Feu', name_de: 'Heißgelaufen', name_it: 'Inarrestabile', name_es: 'En racha', description: 'Get 25 correct answers in a row.', description_fr: 'Obtenir 25 bonnes réponses d\'affilée.', description_de: 'Erhalte 25 richtige Antworten in Folge.', description_it: 'Ottieni 25 risposte corrette di fila.', description_es: 'Consigue 25 respuestas correctas seguidas.', icon: Flame, goal: 25 },
  { id: 'streak50', name: 'Unstoppable', name_fr: 'Inarrêtable', name_de: 'Unaufhaltsam', name_it: 'Imbattibile', name_es: 'Imparable', description: 'Get 50 correct answers in a row.', description_fr: 'Obtenir 50 bonnes réponses d\'affilée.', description_de: 'Erhalte 50 richtige Antworten in Folge.', description_it: 'Ottieni 50 risposte corrette di fila.', description_es: 'Consigue 50 respuestas correctas seguidas.', icon: Zap, goal: 50 },
  { id: 'streak100', name: 'Legendary', name_fr: 'Légendaire', name_de: 'Legendär', name_it: 'Leggendario', name_es: 'Legendario', description: 'Get 100 correct answers in a row.', description_fr: 'Obtenir 100 bonnes réponses d\'affilée.', description_de: 'Erhalte 100 richtige Antworten in Folge.', description_it: 'Ottieni 100 risposte corrette di fila.', description_es: 'Consigue 100 respuestas correctas seguidas.', icon: Trophy, goal: 100 },

  // Time Spent
  { id: 'time_1h', name: 'Time Traveler', name_fr: 'Voyageur Temporel', name_de: 'Zeitreisender', name_it: 'Viaggiatore del Tempo', name_es: 'Viajero del Tiempo', description: 'Spend 1 hour learning in total.', description_fr: 'Passer 1 heure à apprendre au total.', description_de: 'Verbringe insgesamt 1 Stunde mit Lernen.', description_it: 'Passa 1 ora a imparare in totale.', description_es: 'Pasa 1 hora aprendiendo en total.', icon: Clock, goal: 3600 },
  { id: 'time_3h', name: 'Time Bender', name_fr: 'Maître du Temps', name_de: 'Zeitbeuger', name_it: 'Padrone del Tempo', name_es: 'Doblador del Tiempo', description: 'Spend 3 hours learning in total.', description_fr: 'Passer 3 heures à apprendre au total.', description_de: 'Verbringe insgesamt 3 Stunden mit Lernen.', description_it: 'Passa 3 ore a imparare in totale.', description_es: 'Pasa 3 horas aprendiendo en total.', icon: BarChart, goal: 10800 },
  { id: 'time_6h', name: 'Time Lord', name_fr: 'Seigneur du Temps', name_de: 'Zeitlord', name_it: 'Signore del Tempo', name_es: 'Señor del Tiempo', description: 'Spend 6 hours learning in total.', description_fr: 'Passer 6 heures à apprendre au total.', description_de: 'Verbringe insgesamt 6 Stunden mit Lernen.', description_it: 'Passa 6 ore a imparare in totale.', description_es: 'Pasa 6 horas aprendiendo en total.', icon: BrainCircuit, goal: 21600 },

  // Daily Play
  { id: 'daily_7', name: 'Committed', name_fr: 'Engagé', name_de: 'Engagiert', name_it: 'Impegnato', name_es: 'Comprometido', description: 'Play on 7 separate days.', description_fr: 'Jouer pendant 7 jours distincts.', description_de: 'Spiele an 7 verschiedenen Tagen.', description_it: 'Gioca per 7 giorni separati.', description_es: 'Juega en 7 días diferentes.', icon: CalendarClock, goal: 7 },
  { id: 'daily_14', name: 'Devoted', name_fr: 'Dévoué', name_de: 'Hingebungsvoll', name_it: 'Devoto', name_es: 'Dedicado', description: 'Play on 14 separate days.', description_fr: 'Jouer pendant 14 jours distincts.', description_de: 'Spiele an 14 verschiedenen Tagen.', description_it: 'Gioca per 14 giorni separati.', description_es: 'Juega en 14 días diferentes.', icon: CalendarClock, goal: 14 },
  { id: 'daily_30', name: 'Habituated', name_fr: 'Habitué', name_de: 'Gewohnheitstier', name_it: 'Abituato', name_es: 'Habituado', description: 'Play on 30 separate days.', description_fr: 'Jouer pendant 30 jours distincts.', description_de: 'Spiele an 30 verschiedenen Tagen.', description_it: 'Gioca per 30 giorni separati.', description_es: 'Juega en 30 días diferentes.', icon: CalendarClock, goal: 30 },

  // Perfect Scores
  { id: 'perfectionist', name: 'Perfectionist', name_fr: 'Perfectionniste', name_de: 'Perfektionist', name_it: 'Perfezionista', name_es: 'Perfeccionista', description: 'Get a perfect score on 10 quizzes.', description_fr: 'Obtenir un score parfait à 10 quiz.', description_de: 'Erziele in 10 Quiz eine perfekte Punktzahl.', description_it: 'Ottieni un punteggio perfetto in 10 quiz.', description_es: 'Obtén una puntuación perfecta en 10 pruebas.', icon: Award, goal: 10 },
  { id: 'virtuoso', name: 'Virtuoso', name_fr: 'Virtuose', name_de: 'Virtuose', name_it: 'Virtuoso', name_es: 'Virtuoso', description: 'Get a perfect score on 25 quizzes.', description_fr: 'Obtenir un score parfait à 25 quiz.', description_de: 'Erziele in 25 Quiz eine perfekte Punktzahl.', description_it: 'Ottieni un punteggio perfetto in 25 quiz.', description_es: 'Obtén una puntuación perfecta en 25 pruebas.', icon: Award, goal: 25 },
  { id: 'grandmaster', name: 'Grand Master', name_fr: 'Grand Maître', name_de: 'Großmeister', name_it: 'Gran Maestro', name_es: 'Gran Maestro', description: 'Get a perfect score on 50 quizzes.', description_fr: 'Obtenir un score parfait à 50 quiz.', description_de: 'Erziele in 50 Quiz eine perfekte Punktzahl.', description_it: 'Ottieni un punteggio perfetto in 50 quiz.', description_es: 'Obtén una puntuación perfecta en 50 pruebas.', icon: Award, goal: 50 },
  
  // Mastery (English)
  { id: 'mastery_en_pl', name: 'English-Polish Scholar', description: 'Correctly answer every English-Polish question.', icon: BookMarked, goal: enPlQuestions.length },
  { id: 'mastery_pl_en', name: 'Polish-English Scholar', description: 'Correctly answer every Polish-English question.', icon: Globe, goal: plEnQuestions.length },
  { id: 'mastery_irregular', name: 'Verb Virtuoso (EN)', description: 'Correctly answer every irregular verb question.', icon: Webhook, goal: irregularVerbsQuestions.length },
  { id: 'mastery_phrasal', name: 'Phrasal Fanatic (EN)', description: 'Correctly answer every phrasal verb question.', icon: Brain, goal: phrasalVerbsQuestions.length },
  { id: 'mastery_idioms', name: 'Idiom Idol (EN)', description: 'Correctly answer every idiom question.', icon: MessagesSquare, goal: idiomsQuestions.length },

  // Mastery (French)
  { id: 'mastery_fr_pl', name: 'French-Polish Scholar', name_fr: 'Érudit Français-Polonais', description: 'Correctly answer every French-Polish question.', description_fr: 'Répondre correctly à chaque question Français-Polonais.', icon: BookMarked, goal: frPlQuestions.length },
  { id: 'mastery_pl_fr', name: 'Polish-French Scholar', name_fr: 'Érudit Polonais-Français', description: 'Correctly answer every Polish-French question.', description_fr: 'Répondre correctly à chaque question Polonais-Français.', icon: Globe, goal: plFrQuestions.length },
  { id: 'mastery_irregular_fr', name: 'Verb Virtuoso (FR)', name_fr: 'Virtuose des Verbes (FR)', description: 'Correctly answer every irregular verb question.', description_fr: 'Répondre correctly à chaque question sur les verbes irréguliers.', icon: Webhook, goal: irregularVerbsFrQuestions.length },
  { id: 'mastery_phrasal_fr', name: 'Faux Amis Expert (FR)', name_fr: 'Expert des Faux Amis (FR)', description: 'Correctly answer every false friend question.', description_fr: 'Répondre correctly à chaque question sur les faux amis.', icon: Brain, goal: fauxAmisFrQuestions.length },
  { id: 'mastery_idioms_fr', name: 'Idiom Idol (FR)', name_fr: 'Idole des Idiomes (FR)', description: 'Correctly answer every idiom question.', description_fr: 'Répondre correctly à chaque question sur les idiomes.', icon: MessagesSquare, goal: idiomsFrQuestions.length },

  // Mastery (German)
  { id: 'mastery_de_pl', name: 'German-Polish Scholar', name_de: 'Deutsch-Polnisch-Gelehrter', description: 'Correctly answer every German-Polish question.', description_de: 'Beantworte jede Deutsch-Polnisch-Frage richtig.', icon: BookMarked, goal: dePlQuestions.length },
  { id: 'mastery_pl_de', name: 'Polish-German Scholar', name_de: 'Polnisch-Deutsch-Gelehrter', description: 'Correctly answer every Polish-German question.', description_de: 'Beantworte jede Polnisch-Deutsch-Frage richtig.', icon: Globe, goal: plDeQuestions.length },
  { id: 'mastery_irregular_de', name: 'Verb Virtuoso (DE)', name_de: 'Verben-Virtuose (DE)', description: 'Correctly answer every irregular verb question.', description_de: 'Beantworte jede Frage zu unregelmäßigen Verben richtig.', icon: Webhook, goal: irregularVerbsDeQuestions.length },
  { id: 'mastery_phrasal_de', name: 'Separable Verb Fanatic (DE)', name_de: 'Fan der trennbaren Verben (DE)', description: 'Correctly answer every separable verb question.', description_de: 'Beantworte jede Frage zu trennbaren Verben richtig.', icon: Brain, goal: phrasalVerbsDeQuestions.length },
  { id: 'mastery_idioms_de', name: 'Idiom Idol (DE)', name_de: 'Redewendungs-Idol (DE)', description: 'Correctly answer every idiom question.', description_de: 'Beantworte jede Frage zu Redewendungen richtig.', icon: MessagesSquare, goal: idiomsDeQuestions.length },

  // Mastery (Italian)
  { id: 'mastery_it_pl', name: 'Italian-Polish Scholar', name_it: 'Studioso Italo-Polacco', description: 'Correctly answer every Italian-Polish question.', description_it: 'Rispondi correttamente a ogni domanda Italiano-Polacco.', icon: BookMarked, goal: itPlQuestions.length },
  { id: 'mastery_pl_it', name: 'Polish-Italian Scholar', name_it: 'Studioso Polacco-Italiano', description: 'Correctly answer every Polish-Italian question.', description_it: 'Rispondi correttamente a ogni domanda Polacco-Italiano.', icon: Globe, goal: plItQuestions.length },
  { id: 'mastery_irregular_it', name: 'Verb Virtuoso (IT)', name_it: 'Virtuoso dei Verbi (IT)', description: 'Correctly answer every irregular verb question.', description_it: 'Rispondi correttamente a ogni domanda sui verbi irregolari.', icon: Webhook, goal: irregularVerbsItQuestions.length },
  { id: 'mastery_phrasal_it', name: 'False Friends Expert (IT)', name_it: 'Esperto di Falsi Amici (IT)', description: 'Correctly answer every false friend question.', description_it: 'Rispondi correttamente a ogni domanda sui falsi amici.', icon: Brain, goal: phrasalVerbsItQuestions.length },
  { id: 'mastery_idioms_it', name: 'Idiom Idol (IT)', name_it: 'Idolo dei Modi di dire (IT)', description: 'Correctly answer every idiom question.', description_it: 'Rispondi correttamente a ogni domanda sui modi di dire.', icon: MessagesSquare, goal: idiomsItQuestions.length },
  
  // Mastery (Spanish)
  { id: 'mastery_es_pl', name: 'Spanish-Polish Scholar', name_es: 'Erudito Español-Polaco', description: 'Correctly answer every Spanish-Polish question.', description_es: 'Responde correctamente a cada pregunta de Español-Polaco.', icon: BookMarked, goal: esPlQuestions.length },
  { id: 'mastery_pl_es', name: 'Polish-Spanish Scholar', name_es: 'Erudito Polaco-Español', description: 'Correctly answer every Polish-Spanish question.', description_es: 'Responde correctamente a cada pregunta de Polaco-Español.', icon: Globe, goal: plEsQuestions.length },
  { id: 'mastery_irregular_es', name: 'Verb Virtuoso (ES)', name_es: 'Virtuoso de los Verbos (ES)', description: 'Correctly answer every irregular verb question.', description_es: 'Responde correctamente a cada pregunta de verbos irregulares.', icon: Webhook, goal: irregularVerbsEsQuestions.length },
  { id: 'mastery_phrasal_es', name: 'False Friends Expert (ES)', name_es: 'Experto en Falsos Amigos (ES)', description: 'Correctly answer every false friend question.', description_es: 'Responde correctamente a cada pregunta sobre falsos amigos.', icon: Brain, goal: phrasalVerbsEsQuestions.length },
  { id: 'mastery_idioms_es', name: 'Idiom Idol (ES)', name_es: 'Ídolo de los Modismos (ES)', description: 'Correctly answer every idiom question.', description_es: 'Responde correctamente a cada pregunta de modismos.', icon: MessagesSquare, goal: idiomsEsQuestions.length },
];

export const devAchievements: Achievement[] = [
  // Total Correct Answers
  { id: 'dev_novice', name: 'Dev Novice', description: 'Answer 1 question correctly.', icon: Sparkles, goal: 1 },
  { id: 'dev_apprentice', name: 'Dev Apprentice', description: 'Answer 2 questions correctly.', icon: Star, goal: 2 },
  { id: 'dev_master', name: 'Dev Master', description: 'Answer 3 questions correctly.', icon: Crown, goal: 3 },

  // Streaks
  { id: 'dev_streak3', name: 'Dev On Fire', description: 'Get 3 correct answers in a row.', icon: Flame, goal: 3 },
  { id: 'dev_streak5', name: 'Dev Unstoppable', description: 'Get 5 correct answers in a row.', icon: Zap, goal: 5 },

  // Time Spent (in seconds for testing)
  { id: 'dev_time_10s', name: 'Dev Time Traveler', description: 'Spend 10 seconds learning.', icon: Clock, goal: 10 },

  // Daily Play
  { id: 'dev_daily_2', name: 'Dev Committed', description: 'Play on 2 separate days.', icon: CalendarClock, goal: 2 },
  
  // Perfect Scores
  { id: 'dev_perfectionist', name: 'Dev Perfectionist', description: 'Get a perfect score on 1 quiz.', icon: Award, goal: 1 },
];
