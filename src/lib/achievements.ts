import { Award, BarChart, Brain, BookMarked, BrainCircuit, CalendarClock, Clock, Crown, Flame, Globe, MessagesSquare, Sparkles, Star, Trophy, Webhook, Zap, type LucideIcon } from 'lucide-react';
import { questions as enPlQuestions } from './questions-en-pl';
import { questions as plEnQuestions } from './questions-pl-en';
import { questions as irregularVerbsQuestions } from './questions-irregular-verbs';
import { questions as phrasalVerbsQuestions } from './questions-phrasal-verbs';
import { questions as idiomsQuestions } from './questions-idioms';
import { questions as frPlQuestions } from './questions-fr-pl';
import { questions as plFrQuestions } from './questions-pl-fr';
import { questions as irregularVerbsFrQuestions } from './questions-irregular-verbs-fr';
import { questions as phrasalVerbsFrQuestions } from './questions-phrasal-verbs-fr';
import { questions as idiomsFrQuestions } from './questions-idioms-fr';


export interface Achievement {
  id: string;
  name: string;
  description: string;
  name_fr?: string;
  description_fr?: string;
  icon: LucideIcon;
  goal: number;
}

export const allAchievements: Achievement[] = [
  // Total Correct Answers
  { id: 'novice', name: 'Novice', name_fr: 'Débutant', description: 'Answer 50 questions correctly.', description_fr: 'Répondre correctement à 50 questions.', icon: Sparkles, goal: 50 },
  { id: 'apprentice', name: 'Apprentice', name_fr: 'Apprenti', description: 'Answer 250 questions correctly.', description_fr: 'Répondre correctement à 250 questions.', icon: Star, goal: 250 },
  { id: 'master', name: 'Master', name_fr: 'Maître', description: 'Answer 1000 questions correctly.', description_fr: 'Répondre correctement à 1000 questions.', icon: Crown, goal: 1000 },

  // Streaks
  { id: 'streak25', name: 'On Fire', name_fr: 'En Feu', description: 'Get 25 correct answers in a row.', description_fr: 'Obtenir 25 bonnes réponses d\'affilée.', icon: Flame, goal: 25 },
  { id: 'streak50', name: 'Unstoppable', name_fr: 'Inarrêtable', description: 'Get 50 correct answers in a row.', description_fr: 'Obtenir 50 bonnes réponses d\'affilée.', icon: Zap, goal: 50 },
  { id: 'streak100', name: 'Legendary', name_fr: 'Légendaire', description: 'Get 100 correct answers in a row.', description_fr: 'Obtenir 100 bonnes réponses d\'affilée.', icon: Trophy, goal: 100 },

  // Time Spent
  { id: 'time_1h', name: 'Time Traveler', name_fr: 'Voyageur Temporel', description: 'Spend 1 hour learning in total.', description_fr: 'Passer 1 heure à apprendre au total.', icon: Clock, goal: 3600 },
  { id: 'time_3h', name: 'Time Bender', name_fr: 'Maître du Temps', description: 'Spend 3 hours learning in total.', description_fr: 'Passer 3 heures à apprendre au total.', icon: BarChart, goal: 10800 },
  { id: 'time_6h', name: 'Time Lord', name_fr: 'Seigneur du Temps', description: 'Spend 6 hours learning in total.', description_fr: 'Passer 6 heures à apprendre au total.', icon: BrainCircuit, goal: 21600 },

  // Daily Play
  { id: 'daily_7', name: 'Committed', name_fr: 'Engagé', description: 'Play on 7 separate days.', description_fr: 'Jouer pendant 7 jours distincts.', icon: CalendarClock, goal: 7 },
  { id: 'daily_14', name: 'Devoted', name_fr: 'Dévoué', description: 'Play on 14 separate days.', description_fr: 'Jouer pendant 14 jours distincts.', icon: CalendarClock, goal: 14 },
  { id: 'daily_30', name: 'Habituated', name_fr: 'Habitué', description: 'Play on 30 separate days.', description_fr: 'Jouer pendant 30 jours distincts.', icon: CalendarClock, goal: 30 },

  // Perfect Scores
  { id: 'perfectionist', name: 'Perfectionist', name_fr: 'Perfectionniste', description: 'Get a perfect score on 10 quizzes.', description_fr: 'Obtenir un score parfait à 10 quiz.', icon: Award, goal: 10 },
  { id: 'virtuoso', name: 'Virtuoso', name_fr: 'Virtuose', description: 'Get a perfect score on 25 quizzes.', description_fr: 'Obtenir un score parfait à 25 quiz.', icon: Award, goal: 25 },
  { id: 'grandmaster', name: 'Grand Master', name_fr: 'Grand Maître', description: 'Get a perfect score on 50 quizzes.', description_fr: 'Obtenir un score parfait à 50 quiz.', icon: Award, goal: 50 },
  
  // Mastery (English)
  { id: 'mastery_en_pl', name: 'English-Polish Scholar', description: 'Correctly answer every English-Polish question.', icon: BookMarked, goal: enPlQuestions.length },
  { id: 'mastery_pl_en', name: 'Polish-English Scholar', description: 'Correctly answer every Polish-English question.', icon: Globe, goal: plEnQuestions.length },
  { id: 'mastery_irregular', name: 'Verb Virtuoso (EN)', description: 'Correctly answer every irregular verb question.', icon: Webhook, goal: irregularVerbsQuestions.length },
  { id: 'mastery_phrasal', name: 'Phrasal Fanatic (EN)', description: 'Correctly answer every phrasal verb question.', icon: Brain, goal: phrasalVerbsQuestions.length },
  { id: 'mastery_idioms', name: 'Idiom Idol (EN)', description: 'Correctly answer every idiom question.', icon: MessagesSquare, goal: idiomsQuestions.length },

  // Mastery (French)
  { id: 'mastery_fr_pl', name: 'French-Polish Scholar', name_fr: 'Érudit Français-Polonais', description: 'Correctly answer every French-Polish question.', description_fr: 'Répondre correctement à chaque question Français-Polonais.', icon: BookMarked, goal: frPlQuestions.length },
  { id: 'mastery_pl_fr', name: 'Polish-French Scholar', name_fr: 'Érudit Polonais-Français', description: 'Correctly answer every Polish-French question.', description_fr: 'Répondre correctement à chaque question Polonais-Français.', icon: Globe, goal: plFrQuestions.length },
  { id: 'mastery_irregular_fr', name: 'Verb Virtuoso (FR)', name_fr: 'Virtuose des Verbes (FR)', description: 'Correctly answer every irregular verb question.', description_fr: 'Répondre correctement à chaque question sur les verbes irréguliers.', icon: Webhook, goal: irregularVerbsFrQuestions.length },
  { id: 'mastery_phrasal_fr', name: 'Phrasal Fanatic (FR)', name_fr: 'Fan de Phrasal Verbs (FR)', description: 'Correctly answer every phrasal verb question.', description_fr: 'Répondre correctement à chaque question sur les verbes à particule.', icon: Brain, goal: phrasalVerbsFrQuestions.length },
  { id: 'mastery_idioms_fr', name: 'Idiom Idol (FR)', name_fr: 'Idole des Idiomes (FR)', description: 'Correctly answer every idiom question.', description_fr: 'Répondre correctement à chaque question sur les idiomes.', icon: MessagesSquare, goal: idiomsFrQuestions.length },
];
