'use client';

import { allAchievements, type Achievement } from './achievements';

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
}

export interface AchievementStatus {
    progress: number;
    unlockedAt: number | null;
}

const STATS_KEY = 'linguaLearnStats_v2';
const ERRORS_KEY = 'linguaLearnErrors_v2';
const SETTINGS_KEY = 'linguaLearnSettings_v2';
const ACHIEVEMENTS_KEY = 'linguaLearnAchievements_v2';


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
    const newlyUnlocked: Achievement[] = [];

    allAchievements.forEach(achievement => {
        const status = achievements[achievement.id] || { progress: 0, unlockedAt: null };
        if (status.unlockedAt) return; // Already unlocked

        let currentProgress = 0;
        switch (achievement.id) {
            case 'novice':
            case 'apprentice':
            case 'master':
                currentProgress = stats.totalCorrectAnswers;
                break;
            case 'streak20':
            case 'streak50':
                currentProgress = stats.longestStreak;
                break;
            case 'polyglot':
                currentProgress = stats.playedQuizzes.length;
                break;
            case 'time_traveler':
                currentProgress = stats.totalTimeSpent;
                break;
            case 'committed':
                currentProgress = stats.uniqueDaysPlayed;
                break;
            // 'flawless' and 'error_eraser' are handled by specific events
        }

        status.progress = currentProgress;
        if (currentProgress >= achievement.goal) {
            status.unlockedAt = Date.now();
            newlyUnlocked.push(achievement);
        }
        achievements[achievement.id] = status;
    });

    if (newlyUnlocked.length > 0) {
        saveAchievements(achievements);
    }
    return newlyUnlocked;
};

export const checkSessionAchievements = (isPerfect: boolean): Achievement[] => {
    const achievements = getAchievements();
    const newlyUnlocked: Achievement[] = [];
    const flawlessAchievement = allAchievements.find(a => a.id === 'flawless')!;
    const status = achievements[flawlessAchievement.id] || { progress: 0, unlockedAt: null };

    if (!status.unlockedAt && isPerfect) {
        status.progress = 1;
        status.unlockedAt = Date.now();
        achievements[flawlessAchievement.id] = status;
        newlyUnlocked.push(flawlessAchievement);
        saveAchievements(achievements);
    }
    return newlyUnlocked;
}

export const checkClearErrorsAchievement = (): Achievement[] => {
    const achievements = getAchievements();
    const newlyUnlocked: Achievement[] = [];
    const achievement = allAchievements.find(a => a.id === 'error_eraser')!;
    const status = achievements[achievement.id] || { progress: 0, unlockedAt: null };

    if (!status.unlockedAt) {
        status.progress = 1;
        status.unlockedAt = Date.now();
        achievements[achievement.id] = status;
        newlyUnlocked.push(achievement);
        saveAchievements(achievements);
    }
    return newlyUnlocked;
}


// --- Settings Functions ---

export const getSettings = (): Settings => {
    const defaultSettings = { soundsEnabled: true, vibrationsEnabled: true, volume: 50 };
    if (typeof window === 'undefined') {
        return defaultSettings;
    }
    try {
        const settingsJson = localStorage.getItem(SETTINGS_KEY);
        if (settingsJson) {
            const settings = JSON.parse(settingsJson);
            return {
                soundsEnabled: typeof settings.soundsEnabled === 'boolean' ? settings.soundsEnabled : defaultSettings.soundsEnabled,
                vibrationsEnabled: typeof settings.vibrationsEnabled === 'boolean' ? settings.vibrationsEnabled : defaultSettings.vibrationsEnabled,
                volume: typeof settings.volume === 'number' ? settings.volume : defaultSettings.volume,
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
    } catch (error) {
        console.error("Failed to save settings to localStorage", error);
    }
}

export const clearSettings = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SETTINGS_KEY);
};


// --- Stats Functions ---

export const getStats = (): Stats => {
    const defaultStats: Stats = { totalAnswers: 0, totalCorrectAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, longestStreakQuiz: null, perQuizStats: {}, totalTimeSpent: 0, lastPlayTimestamp: null, uniqueDaysPlayed: 0, playedQuizzes: [] };
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

export const updateStats = (isCorrect: boolean, quizName: string): Achievement[] => {
    if (typeof window === 'undefined') return [];
    const stats = getStats();

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
    const defaultStats: Stats = { totalAnswers: 0, totalCorrectAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, longestStreakQuiz: null, perQuizStats: {}, totalTimeSpent: 0, lastPlayTimestamp: null, uniqueDaysPlayed: 0, playedQuizzes: [] };
    localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    localStorage.removeItem(ERRORS_KEY);
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
    return checkClearErrorsAchievement();
}
