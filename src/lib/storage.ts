'use client';

export interface Stats {
    totalAnswers: number;
    totalErrors: number;
    longestStreak: number;
    currentStreak: number;
    lastFiftyAnswers: boolean[];
    longestStreakDate: number | null;
    perQuizStats: {
        [quizName: string]: {
            totalAnswers: number;
            totalErrors: number;
        };
    };
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

export const clearSettings = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SETTINGS_KEY);
};


// --- Stats Functions ---

export const getStats = (): Stats => {
    const defaultStats: Stats = { totalAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, perQuizStats: {} };
    if (typeof window === 'undefined') {
        return defaultStats;
    }
    try {
        const statsJson = localStorage.getItem(STATS_KEY);
        if (statsJson) {
            const stats = JSON.parse(statsJson);
            // This ensures backward compatibility with old data format
            return {
                totalAnswers: Number(stats.totalAnswers) || 0,
                totalErrors: Number(stats.totalErrors) || 0,
                longestStreak: Number(stats.longestStreak) || 0,
                currentStreak: Number(stats.currentStreak) || 0,
                lastFiftyAnswers: Array.isArray(stats.lastFiftyAnswers) ? stats.lastFiftyAnswers : [],
                longestStreakDate: stats.longestStreakDate || null,
                perQuizStats: stats.perQuizStats || {},
            };
        }
    } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
    }
    return defaultStats;
};

export const updateStats = (isCorrect: boolean, quizName: string) => {
    if (typeof window === 'undefined') return;
    const stats = getStats();

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
    } else {
        stats.totalErrors += 1;
        stats.perQuizStats[quizName].totalErrors += 1;
        stats.currentStreak = 0;
    }
    
    if (stats.currentStreak > stats.longestStreak) {
        stats.longestStreak = stats.currentStreak;
        stats.longestStreakDate = Date.now();
    }

    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage", error);
    }
};

export const clearStats = () => {
    if (typeof window === 'undefined') return;
    const defaultStats: Stats = { totalAnswers: 0, totalErrors: 0, longestStreak: 0, currentStreak: 0, lastFiftyAnswers: [], longestStreakDate: null, perQuizStats: {} };
    localStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
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
