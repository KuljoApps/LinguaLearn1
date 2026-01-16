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
  icon: LucideIcon;
  goal: number;
}

export const allAchievements: Achievement[] = [
  // Total Correct Answers
  { id: 'novice', name: 'Novice', description: 'Answer 50 questions correctly.', icon: Sparkles, goal: 50 },
  { id: 'apprentice', name: 'Apprentice', description: 'Answer 250 questions correctly.', icon: Star, goal: 250 },
  { id: 'master', name: 'Master', description: 'Answer 1000 questions correctly.', icon: Crown, goal: 1000 },

  // Streaks
  { id: 'streak25', name: 'On Fire', description: 'Get 25 correct answers in a row.', icon: Flame, goal: 25 },
  { id: 'streak50', name: 'Unstoppable', description: 'Get 50 correct answers in a row.', icon: Zap, goal: 50 },
  { id: 'streak100', name: 'Legendary', description: 'Get 100 correct answers in a row.', icon: Trophy, goal: 100 },

  // Time Spent
  { id: 'time_1h', name: 'Time Traveler', description: 'Spend 1 hour learning in total.', icon: Clock, goal: 3600 },
  { id: 'time_3h', name: 'Time Bender', description: 'Spend 3 hours learning in total.', icon: BarChart, goal: 10800 },
  { id: 'time_6h', name: 'Time Lord', description: 'Spend 6 hours learning in total.', icon: BrainCircuit, goal: 21600 },

  // Daily Play
  { id: 'daily_7', name: 'Committed', description: 'Play on 7 separate days.', icon: CalendarClock, goal: 7 },
  { id: 'daily_14', name: 'Devoted', description: 'Play on 14 separate days.', icon: CalendarClock, goal: 14 },
  { id: 'daily_30', name: 'Habituated', description: 'Play on 30 separate days.', icon: CalendarClock, goal: 30 },

  // Perfect Scores
  { id: 'perfectionist', name: 'Perfectionist', description: 'Get a perfect score on 10 quizzes.', icon: Award, goal: 10 },
  { id: 'virtuoso', name: 'Virtuoso', description: 'Get a perfect score on 25 quizzes.', icon: Award, goal: 25 },
  { id: 'grandmaster', name: 'Grand Master', description: 'Get a perfect score on 50 quizzes.', icon: Award, goal: 50 },
  
  // Mastery (English)
  { id: 'mastery_en_pl', name: 'English-Polish Scholar', description: 'Correctly answer every English-Polish question.', icon: BookMarked, goal: enPlQuestions.length },
  { id: 'mastery_pl_en', name: 'Polish-English Scholar', description: 'Correctly answer every Polish-English question.', icon: Globe, goal: plEnQuestions.length },
  { id: 'mastery_irregular', name: 'Verb Virtuoso (EN)', description: 'Correctly answer every irregular verb question.', icon: Webhook, goal: irregularVerbsQuestions.length },
  { id: 'mastery_phrasal', name: 'Phrasal Fanatic (EN)', description: 'Correctly answer every phrasal verb question.', icon: Brain, goal: phrasalVerbsQuestions.length },
  { id: 'mastery_idioms', name: 'Idiom Idol (EN)', description: 'Correctly answer every idiom question.', icon: MessagesSquare, goal: idiomsQuestions.length },

  // Mastery (French)
  { id: 'mastery_fr_pl', name: 'French-Polish Scholar', description: 'Correctly answer every French-Polish question.', icon: BookMarked, goal: frPlQuestions.length },
  { id: 'mastery_pl_fr', name: 'Polish-French Scholar', description: 'Correctly answer every Polish-French question.', icon: Globe, goal: plFrQuestions.length },
  { id: 'mastery_irregular_fr', name: 'Verb Virtuoso (FR)', description: 'Correctly answer every irregular verb question.', icon: Webhook, goal: irregularVerbsFrQuestions.length },
  { id: 'mastery_phrasal_fr', name: 'Phrasal Fanatic (FR)', description: 'Correctly answer every phrasal verb question.', icon: Brain, goal: phrasalVerbsFrQuestions.length },
  { id: 'mastery_idioms_fr', name: 'Idiom Idol (FR)', description: 'Correctly answer every idiom question.', icon: MessagesSquare, goal: idiomsFrQuestions.length },
];
