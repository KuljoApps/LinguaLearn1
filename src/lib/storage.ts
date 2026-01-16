'use client';

import { allAchievements, type Achievement } from './achievements';

export interface MasteryProgress {
    [quizName: string]: number[]; // Array of unique question IDs
}

export interface Stats {
    totalAnswers: number;
    totalCorrectAnswers: number;
    totalErrors: number;
    longestStreak: number;
    currentStreak: number;
    lastFiftyAnswers: boolean[];
    longestStreakDate: number | null;
    longestStreakQuiz: string | null;
    perQuizStats: {
        [quizName: string]: {
            totalAnswers: number;
            totalErrors: number;
        };
    };
    totalTimeSpent: number; // in seconds
    lastPlayTimestamp: number | null;
    uniqueDaysPlayed: number;
    playedQuizzes: string[];
    totalPerfectScores: number;
}

export interface ErrorRecord {
    id: number;
    word: string;
    userAnswer: string;
    correctAnswer: string;
    quiz: string;
}

export interface Settings {
    soundsEnabled: boolean;
    vibrationsEnabled: boolean;
    volume: number;
    eyeCareLevel: number;
}

export interface AchievementStatus {
    progress: number;
    unlockedAt: number | null;
}

const STATS_KEY = 'linguaLearnStats_v2';
const ERRORS_KEY = 'linguaLearnErrors_v2';
const SETTINGS_KEY = 'linguaLearnSettings_v2';
const ACHIEVEMENTS_KEY = 'linguaLearnAchievements_v2';
const MASTERY_KEY = 'linguaLearnMastery_v1';


// --- Mastery Functions ---

export const getMasteryProgress = (): MasteryProgress => {
    if (typeof window === 'undefined') return {};
    try {
        const masteryJson = localStorage.getItem(MASTERY_KEY);
        return masteryJson ? JSON.parse(masteryJson) : {};
    } catch (error) {
        console.error("Failed to parse mastery progress from localStorage", error);
        return {};
    }
}

const saveMasteryProgress = (progress: MasteryProgress) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(MASTERY_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save mastery progress to localStorage", error);
    }
}


// --- Achievement Functions ---

export const getAchievements = (): Record<string, AchievementStatus> => {
    if (typeof window === 'undefined') return {};
    try {
        const achievementsJson = localStorage.getItem(ACHIEVEMENTS_KEY);
        return achievementsJson ? JSON.parse(achievementsJson) : {};
    } catch (error) {
        console.error("Failed to parse achievements from localStorage", error);
        return {};
    }
}

const saveAchievements = (achievements: Record<string, AchievementStatus>) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    } catch (error) {
        console.error("Failed to save achievements to localStorage", error);
    }
}

const checkAndUnlockAchievements = (stats: Stats): Achievement[] => {
    const achievements = getAchievements();
    const masteryProgress = getMasteryProgress();
    const newlyUnlocked: Achievement[] = [];

    allAchievements.forEach(achievement => {
        const status = achievements[achievement.id] || { progress: 0, unlockedAt: null };
        if (status.unlockedAt) return; // Already unlocked

        let currentProgress = status.progress;
        switch (achievement.id) {
            case 'novice':
            case 'apprentice':
            case 'master':
                currentProgress = stats.totalCorrectAnswers;
                break;
            case 'streak25':
            case 'streak50':
            case 'streak100':
                currentProgress = stats.longestStreak;
                break;
            case 'time_1h':
            case 'time_3h':
            case 'time_6h':
                currentProgress = stats.totalTimeSpent;
                break;
            case 'daily_7':
            case 'daily_14':
            case 'daily_30':
                currentProgress = stats.uniqueDaysPlayed;
                break;
            case 'perfectionist':
            case 'virtuoso':
            case 'grandmaster':
                currentProgress = stats.totalPerfectScores || 0;
                break;
            case 'mastery_en_pl':
                currentProgress = masteryProgress['English - Polish']?.length || 0;
                break;
            case 'mastery_pl_en':
                currentProgress = masteryProgress['Polish - English']?.length || 0;
                break;
            case 'mastery_irregular':
                currentProgress = masteryProgress['Irregular Verbs']?.length || 0;
                break;
            case 'mastery_phrasal':
                currentProgress = masteryProgress['Phrasal Verbs']?.length || 0;
                break;
            case 'mastery_idioms':
                currentProgress = masteryProgress['Idioms']?.length || 0;
                break;
            default:
                break;
        }

        status.progress = currentProgress;
        
        if (currentProgress >= achievement.goal) {
            if (!status.unlockedAt) { // Ensure we only unlock it once
                status.unlockedAt = Date.now();
                newlyUnlocked.push(achievement);
            }
        }
        achievements[achievement.id] = status;
    });

    // Always save the updated progress and any newly unlocked achievements.
    saveAchievements(achievements);

    return newlyUnlocked;
};

export const checkSessionAchievements = (isPerfect: boolean): Achievement[] => {
    if (!isPerfect || typeof window === 'undefined') {
        return [];
    }

    const stats = getStats();
    stats.totalPerfectScores = (stats.totalPerfectScores || 0) + 1;

    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }

    // Now, check if this new count unlocks any achievements
    return checkAndUnlockAchievements(stats);
}


// --- Settings Functions ---

export const getSettings = (): Settings => {
    const defaultSettings = { soundsEnabled: true, vibrationsEnabled: true, volume: 50, eyeCareLevel: 15 };
    if (typeof window === 'undefined') {
        return defaultSettings;
    }
    try {
        const settingsJson = localStorage.getItem(SETTINGS_KEY);
        if (settingsJson) {
            const settings = JSON.parse(settingsJson);
            return {
                ...defaultSettings,
                ...settings
            };
        }
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
    }
    return defaultSettings;
}

export const saveSettings = (settings: Settings) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        window.dispatchEvent(new CustomEvent('settings-changed', { detail: settings }));
    } catch (error) {
        console.error("Failed to save settings to localStorage", error);
    }
}

export const clearSettings = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SETTINGS_KEY);
    // After clearing, save default settings to trigger update
    saveSettings(getSettings());
};


// --- Stats Functions ---

export const getStats = (): Stats => {
    const defaultStats: Stats = { totalAnswers: 0, totalCorrectAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, longestStreakQuiz: null, perQuizStats: {}, totalTimeSpent: 0, lastPlayTimestamp: null, uniqueDaysPlayed: 0, playedQuizzes: [], totalPerfectScores: 0 };
    if (typeof window === 'undefined') {
        return defaultStats;
    }
    try {
        const statsJson = localStorage.getItem(STATS_KEY);
        if (statsJson) {
            const stats = JSON.parse(statsJson);
            return { ...defaultStats, ...stats };
        }
    } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
    }
    return defaultStats;
};

export const updateStats = (isCorrect: boolean, quizName: string, questionId: number): Achievement[] => {
    if (typeof window === 'undefined') return [];
    const stats = getStats();

    // Mastery progress update
    if (isCorrect) {
        const masteryProgress = getMasteryProgress();
        if (!masteryProgress[quizName]) {
            masteryProgress[quizName] = [];
        }
        // Use a Set to ensure uniqueness before pushing
        const questionSet = new Set(masteryProgress[quizName]);
        if (!questionSet.has(questionId)) {
            masteryProgress[quizName].push(questionId);
            saveMasteryProgress(masteryProgress);
        }
    }

    // Daily play tracking
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    if (!stats.lastPlayTimestamp || stats.lastPlayTimestamp < todayTimestamp) {
        stats.uniqueDaysPlayed += 1;
    }
    stats.lastPlayTimestamp = Date.now();

    // Quiz variety tracking
    if (!stats.playedQuizzes.includes(quizName)) {
        stats.playedQuizzes.push(quizName);
    }
    
    // Global stats
    stats.totalAnswers += 1;
    stats.lastFiftyAnswers.unshift(isCorrect);
    if (stats.lastFiftyAnswers.length > 50) {
        stats.lastFiftyAnswers.pop();
    }

    // Per-quiz stats
    if (!stats.perQuizStats[quizName]) {
        stats.perQuizStats[quizName] = { totalAnswers: 0, totalErrors: 0 };
    }
    stats.perQuizStats[quizName].totalAnswers += 1;

    // Streak and error handling
    if (isCorrect) {
        stats.currentStreak += 1;
        stats.totalCorrectAnswers += 1;
    } else {
        stats.totalErrors += 1;
        stats.perQuizStats[quizName].totalErrors += 1;
        stats.currentStreak = 0;
    }
    
    if (stats.currentStreak > stats.longestStreak) {
        stats.longestStreak = stats.currentStreak;
        stats.longestStreakDate = Date.now();
        stats.longestStreakQuiz = quizName;
    }

    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }

    return checkAndUnlockAchievements(stats);
};

export const updateTimeSpent = (seconds: number): Achievement[] => {
    if (typeof window === 'undefined') return [];
    const stats = getStats();
    stats.totalTimeSpent += seconds;

    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }

    return checkAndUnlockAchievements(stats);
}

export const clearStats = () => {
    if (typeof window === 'undefined') return;
    const defaultStats: Stats = { totalAnswers: 0, totalCorrectAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, longestStreakQuiz: null, perQuizStats: {}, totalTimeSpent: 0, lastPlayTimestamp: null, uniqueDaysPlayed: 0, playedQuizzes: [], totalPerfectScores: 0 };
    localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    localStorage.removeItem(ERRORS_KEY);
    localStorage.removeItem(MASTERY_KEY);
}


// --- Error Functions ---

export const getErrors = (): ErrorRecord[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const errorsJson = localStorage.getItem(ERRORS_KEY);
        return errorsJson ? JSON.parse(errorsJson) : [];
    } catch (error) {
        console.error("Failed to parse errors from localStorage", error);
        return [];
    }
};

export const addError = (error: Omit<ErrorRecord, 'id'>) => {
    if (typeof window === 'undefined') return;
    try {
        const errors = getErrors();
        const newError: ErrorRecord = {
            ...error,
            id: Date.now() + Math.random() // Simple unique ID
        };
        const updatedErrors = [newError, ...errors];
        localStorage.setItem(ERRORS_KEY, JSON.stringify(updatedErrors));
    } catch (error) {
        console.error("Failed to save error to localStorage", error);
    }
};

export const clearErrors = (): Achievement[] => {
    if (typeof window === 'undefined') return [];
    localStorage.removeItem(ERRORS_KEY);
    return [];
}
