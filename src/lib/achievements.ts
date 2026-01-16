import { Award, CheckSquare, Clock, Crown, Flame, Globe, Sparkles, Star, Trophy, Zap, type LucideIcon } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  goal: number;
}

export const allAchievements: Achievement[] = [
  { id: 'novice', name: 'Novice', description: 'Answer 50 questions correctly.', icon: Sparkles, goal: 50 },
  { id: 'apprentice', name: 'Apprentice', description: 'Answer 250 questions correctly.', icon: Star, goal: 250 },
  { id: 'master', name: 'Master', description: 'Answer 1000 questions correctly.', icon: Crown, goal: 1000 },
  { id: 'streak20', name: 'On Fire', description: 'Get 20 correct answers in a row.', icon: Flame, goal: 20 },
  { id: 'streak50', name: 'Unstoppable', description: 'Get 50 correct answers in a row.', icon: Zap, goal: 50 },
  { id: 'polyglot', name: 'Polyglot in a Nutshell', description: 'Try all available quiz types.', icon: Globe, goal: 5 },
  { id: 'time_traveler', name: 'Time Traveler', description: 'Spend 1 hour learning in total.', icon: Clock, goal: 3600 },
  { id: 'flawless', name: 'Flawless Victory', description: 'Get a perfect score (100%) on any quiz.', icon: Award, goal: 1 },
  { id: 'committed', name: 'Committed', description: 'Play on 7 separate days.', icon: Trophy, goal: 7 },
  { id: 'error_eraser', name: 'Fresh Start', description: 'Clear your error history for the first time.', icon: CheckSquare, goal: 1 },
];
