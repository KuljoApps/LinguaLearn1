'use client';

import { getSettings } from './storage';

export const playSound = (type: 'correct' | 'incorrect') => {
    const settings = getSettings();
    if (!settings.soundsEnabled || typeof window === 'undefined' || !window.AudioContext) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const maxGain = 0.1;
    const volume = (settings.volume / 100) * maxGain;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);

    oscillator.start(audioContext.currentTime);

    if (type === 'correct') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.1); // G5
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.15);
        oscillator.stop(audioContext.currentTime + 0.15);
    } else { // incorrect
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(220.00, audioContext.currentTime); // A3
        oscillator.frequency.exponentialRampToValueAtTime(110.00, audioContext.currentTime + 0.2); // A2
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
};
