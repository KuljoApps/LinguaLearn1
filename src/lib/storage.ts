'use client';

export interface Stats {
    totalAnswers: number;
    totalErrors: number;
}

export interface ErrorRecord {
    id: number;
    word: string;
    userAnswer: string;
    correctAnswer: string;
    quiz: string;
}

const STATS_KEY = 'linguaLearnStats';
const ERRORS_KEY = 'linguaLearnErrors';

// --- Stats Functions ---

export const getStats = (): Stats => {
    if (typeof window === 'undefined') {
        return { totalAnswers: 0, totalErrors: 0 };
    }
    try {
        const statsJson = localStorage.getItem(STATS_KEY);
        if (statsJson) {
            const stats = JSON.parse(statsJson);
            return {
                totalAnswers: Number(stats.totalAnswers) || 0,
                totalErrors: Number(stats.totalErrors) || 0
            };
        }
    } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
    }
    return { totalAnswers: 0, totalErrors: 0 };
};

export const updateStats = (isCorrect: boolean) => {
    if (typeof window === 'undefined') return;
    const stats = getStats();
    stats.totalAnswers += 1;
    if (!isCorrect) {
        stats.totalErrors += 1;
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
