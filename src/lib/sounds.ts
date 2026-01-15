'use client';

export const playSound = (type: 'correct' | 'incorrect') => {
    if (typeof window === 'undefined' || !window.AudioContext) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);

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

    oscillator.start(audioContext.currentTime);
};
