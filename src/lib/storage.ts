'use client';

export interface Stats {
    totalAnswers: number;
    totalErrors: number;
    longestStreak: number;
    currentStreak: number;
    lastFiftyAnswers: boolean[];
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

const STATS_KEY = 'linguaLearnStats';
const ERRORS_KEY = 'linguaLearnErrors';
const SETTINGS_KEY = 'linguaLearnSettings';

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

// --- Stats Functions ---

export const getStats = (): Stats => {
    const defaultStats = { totalAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [] };
    if (typeof window === 'undefined') {
        return defaultStats;
    }
    try {
        const statsJson = localStorage.getItem(STATS_KEY);
        if (statsJson) {
            const stats = JSON.parse(statsJson);
            return {
                totalAnswers: Number(stats.totalAnswers) || 0,
                totalErrors: Number(stats.totalErrors) || 0,
                longestStreak: Number(stats.longestStreak) || 0,
                currentStreak: Number(stats.currentStreak) || 0,
                lastFiftyAnswers: Array.isArray(stats.lastFiftyAnswers) ? stats.lastFiftyAnswers : [],
            };
        }
    } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
    }
    return defaultStats;
};

export const updateStats = (isCorrect: boolean) => {
    if (typeof window === 'undefined') return;
    const stats = getStats();
    stats.totalAnswers += 1;

    if (isCorrect) {
        stats.currentStreak += 1;
    } else {
        stats.totalErrors += 1;
        stats.currentStreak = 0;
    }
    
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    
    stats.lastFiftyAnswers.unshift(isCorrect);
    if (stats.lastFiftyAnswers.length > 50) {
        stats.lastFiftyAnswers.pop();
    }

    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }
};

export const clearStats = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STATS_KEY);
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

export const clearErrors = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ERRORS_KEY);
}
