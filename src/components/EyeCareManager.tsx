"use client";

import { useEffect } from 'react';
import { getSettings } from '@/lib/storage';

// This component is self-contained and manages the eye care overlay effect globally.
export default function EyeCareManager() {
    const updateEffect = () => {
        if (typeof window === 'undefined') return;
        const settings = getSettings();
        const level = settings.eyeCareLevel || 0;
        // Map the 0-100 slider value to a 0-0.3 opacity range.
        const opacity = (level / 100) * 0.3;
        document.documentElement.style.setProperty('--eye-care-opacity', String(opacity));
    };

    useEffect(() => {
        updateEffect(); // Apply on initial load

        window.addEventListener('settings-changed', updateEffect);

        return () => {
            window.removeEventListener('settings-changed', updateEffect);
        };
    }, []);

    return null; // This component does not render anything itself
}
