import { Award, BarChart, BrainCircuit, CalendarClock, Clock, Crown, Flame, Sparkles, Star, Trophy, Zap, type LucideIcon } from 'lucide-react';

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

  // Special
  { id: 'flawless', name: 'Flawless Victory', description: 'Get a perfect score (100%) on any quiz.', icon: Award, goal: 1 },
];
