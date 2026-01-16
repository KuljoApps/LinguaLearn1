
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

type Language = 'en' | 'fr' | 'de' | 'it' | 'es';

const LANGUAGE_KEY = 'linguaLearnLanguage';
const SETTINGS_KEY = 'linguaLearnSettings_v2';
const GLOBAL_STATS_KEY = 'linguaLearnGlobalStats_v1';

interface GlobalStats {
    uniqueDaysPlayed: number;
    lastPlayTimestamp: number | null;
}

const getKey = (baseKey: string): string => {
    const lang = getLanguage();
    return `${baseKey}_${lang}`;
}

// --- Language Functions ---
export const getLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem(LANGUAGE_KEY) as Language) || 'en';
}

export const setLanguage = (lang: Language) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LANGUAGE_KEY, lang);
}

// --- Global Stats Functions ---
const getGlobalStats = (): GlobalStats => {
    const defaultGlobalStats: GlobalStats = { uniqueDaysPlayed: 0, lastPlayTimestamp: null };
    if (typeof window === 'undefined') return defaultGlobalStats;

    try {
        const globalStatsJson = localStorage.getItem(GLOBAL_STATS_KEY);
        if (globalStatsJson) {
            return JSON.parse(globalStatsJson);
        } else {
            // Migration logic for existing users
            const statsEnJson = localStorage.getItem('linguaLearnStats_v2_en');
            const statsFrJson = localStorage.getItem('linguaLearnStats_v2_fr');
            const statsEn = statsEnJson ? JSON.parse(statsEnJson) : null;
            const statsFr = statsFrJson ? JSON.parse(statsFrJson) : null;

            const uniqueDaysEn = statsEn?.uniqueDaysPlayed || 0;
            const uniqueDaysFr = statsFr?.uniqueDaysPlayed || 0;
            const lastPlayEn = statsEn?.lastPlayTimestamp || 0;
            const lastPlayFr = statsFr?.lastPlayTimestamp || 0;

            const migratedStats: GlobalStats = {
                uniqueDaysPlayed: Math.max(uniqueDaysEn, uniqueDaysFr),
                lastPlayTimestamp: Math.max(lastPlayEn, lastPlayFr) || null,
            };
            
            saveGlobalStats(migratedStats);
            return migratedStats;
        }
    } catch (error) {
        console.error("Failed to parse global stats", error);
        return defaultGlobalStats;
    }
}

const saveGlobalStats = (globalStats: GlobalStats) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(globalStats));
    } catch (error) {
        console.error("Failed to save global stats", error);
    }
}


// --- Mastery Functions ---

export const getMasteryProgress = (): MasteryProgress => {
    if (typeof window === 'undefined') return {};
    try {
        const masteryJson = localStorage.getItem(getKey('linguaLearnMastery_v1'));
        return masteryJson ? JSON.parse(masteryJson) : {};
    } catch (error) {
        console.error("Failed to parse mastery progress from localStorage", error);
        return {};
    }
}

const saveMasteryProgress = (progress: MasteryProgress) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(getKey('linguaLearnMastery_v1'), JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save mastery progress to localStorage", error);
    }
}


// --- Achievement Functions ---

export const getAchievements = (): Record<string, AchievementStatus> => {
    if (typeof window === 'undefined') return {};
    try {
        const achievementsJson = localStorage.getItem(getKey('linguaLearnAchievements_v2'));
        return achievementsJson ? JSON.parse(achievementsJson) : {};
    } catch (error) {
        console.error("Failed to parse achievements from localStorage", error);
        return {};
    }
}

const saveAchievements = (achievements: Record<string, AchievementStatus>) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(getKey('linguaLearnAchievements_v2'), JSON.stringify(achievements));
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
            // English Mastery
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
            // French Mastery
            case 'mastery_fr_pl':
                currentProgress = masteryProgress['French - Polish']?.length || 0;
                break;
            case 'mastery_pl_fr':
                currentProgress = masteryProgress['Polish - French']?.length || 0;
                break;
            case 'mastery_irregular_fr':
                currentProgress = masteryProgress['Irregular Verbs (FR)']?.length || 0;
                break;
            case 'mastery_phrasal_fr':
                currentProgress = masteryProgress['Phrasal Verbs (FR)']?.length || 0;
                break;
            case 'mastery_idioms_fr':
                currentProgress = masteryProgress['Idioms (FR)']?.length || 0;
                break;
             // German Mastery
            case 'mastery_de_pl':
                currentProgress = masteryProgress['German - Polish']?.length || 0;
                break;
            case 'mastery_pl_de':
                currentProgress = masteryProgress['Polish - German']?.length || 0;
                break;
            case 'mastery_irregular_de':
                currentProgress = masteryProgress['Irregular Verbs (DE)']?.length || 0;
                break;
            case 'mastery_phrasal_de':
                currentProgress = masteryProgress['Separable Verbs (DE)']?.length || 0;
                break;
            case 'mastery_idioms_de':
                currentProgress = masteryProgress['Idioms (DE)']?.length || 0;
                break;
            // Italian Mastery
            case 'mastery_it_pl':
                currentProgress = masteryProgress['Italiano - Polacco']?.length || 0;
                break;
            case 'mastery_pl_it':
                currentProgress = masteryProgress['Polacco - Italiano']?.length || 0;
                break;
            case 'mastery_irregular_it':
                currentProgress = masteryProgress['Verbi Irregolari (IT)']?.length || 0;
                break;
            case 'mastery_phrasal_it':
                currentProgress = masteryProgress['Verbi Frasali (IT)']?.length || 0;
                break;
            case 'mastery_idioms_it':
                currentProgress = masteryProgress['Modi di dire (IT)']?.length || 0;
                break;
            // Spanish Mastery
            case 'mastery_es_pl':
                currentProgress = masteryProgress['Español - Polaco']?.length || 0;
                break;
            case 'mastery_pl_es':
                currentProgress = masteryProgress['Polaco - Español']?.length || 0;
                break;
            case 'mastery_irregular_es':
                currentProgress = masteryProgress['Verbos Irregulares (ES)']?.length || 0;
                break;
            case 'mastery_phrasal_es':
                currentProgress = masteryProgress['Verbos con Preposición (ES)']?.length || 0;
                break;
            case 'mastery_idioms_es':
                currentProgress = masteryProgress['Modismos (ES)']?.length || 0;
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
        localStorage.setItem(getKey('linguaLearnStats_v2'), JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }

    // Now, check if this new count unlocks any achievements
    return checkAndUnlockAchievements(stats);
}


// --- Settings Functions ---

export const getSettings = (): Settings => {
    const defaultSettings = { soundsEnabled: true, vibrationsEnabled: true, volume: 50, eyeCareLevel: 20 };
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
        const statsJson = localStorage.getItem(getKey('linguaLearnStats_v2'));
        if (statsJson) {
            const stats = JSON.parse(statsJson);
            // On load, sync the global daily play count into the stats object for display purposes
            const globalStats = getGlobalStats();
            stats.uniqueDaysPlayed = globalStats.uniqueDaysPlayed;
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
    const masteryProgress = getMasteryProgress();
    const globalStats = getGlobalStats();

    // Mastery progress update
    if (isCorrect) {
        if (!masteryProgress[quizName]) {
            masteryProgress[quizName] = [];
        }
        const questionSet = new Set(masteryProgress[quizName]);
        if (!questionSet.has(questionId)) {
            masteryProgress[quizName].push(questionId);
            saveMasteryProgress(masteryProgress);
        }
    }

    // Daily play tracking (GLOBAL)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    if (!globalStats.lastPlayTimestamp || globalStats.lastPlayTimestamp < todayTimestamp) {
        globalStats.uniqueDaysPlayed += 1;
    }
    globalStats.lastPlayTimestamp = Date.now();
    
    // Sync global value back to the language-specific stats object for achievement checks
    stats.uniqueDaysPlayed = globalStats.uniqueDaysPlayed;

    // Quiz variety tracking
    if (!stats.playedQuizzes.includes(quizName)) {
        stats.playedQuizzes.push(quizName);
    }
    
    // Global stats for the current language
    stats.totalAnswers += 1;
    stats.lastFiftyAnswers.unshift(isCorrect);
    if (stats.lastFiftyAnswers.length > 50) {
        stats.lastFiftyAnswers.pop();
    }

    // Per-quiz stats for the current language
    if (!stats.perQuizStats[quizName]) {
        stats.perQuizStats[quizName] = { totalAnswers: 0, totalErrors: 0 };
    }
    stats.perQuizStats[quizName].totalAnswers += 1;

    // Streak and error handling for the current language
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
        localStorage.setItem(getKey('linguaLearnStats_v2'), JSON.stringify(stats));
        saveGlobalStats(globalStats);
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
        localStorage.setItem(getKey('linguaLearnStats_v2'), JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }

    return checkAndUnlockAchievements(stats);
}

export const clearStats = () => {
    if (typeof window === 'undefined') return;
    // This only clears language-specific data. Global daily play stats will persist.
    const defaultStats: Stats = { totalAnswers: 0, totalCorrectAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, longestStreakQuiz: null, perQuizStats: {}, totalTimeSpent: 0, lastPlayTimestamp: null, uniqueDaysPlayed: 0, playedQuizzes: [], totalPerfectScores: 0 };
    localStorage.setItem(getKey('linguaLearnStats_v2'), JSON.stringify(defaultStats));
    localStorage.removeItem(getKey('linguaLearnAchievements_v2'));
    localStorage.removeItem(getKey('linguaLearnErrors_v2'));
    localStorage.removeItem(getKey('linguaLearnMastery_v1'));
}


// --- Error Functions ---

export const getErrors = (): ErrorRecord[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const errorsJson = localStorage.getItem(getKey('linguaLearnErrors_v2'));
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
        localStorage.setItem(getKey('linguaLearnErrors_v2'), JSON.stringify(updatedErrors));
    } catch (error) {
        console.error("Failed to save error to localStorage", error);
    }
};

export const clearErrors = (): Achievement[] => {
    if (typeof window === 'undefined') return [];
    localStorage.removeItem(getKey('linguaLearnErrors_v2'));
    return [];
}
