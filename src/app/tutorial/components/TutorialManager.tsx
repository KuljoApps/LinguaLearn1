"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import OnboardingTutorial from '@/app/tutorial/components/OnboardingTutorial';
import { getTutorialState, type TutorialState } from '@/lib/storage';

export default function TutorialManager() {
    const [state, setState] = useState<TutorialState | null>(null);
    const pathname = usePathname();

    const updateState = () => {
        setState(getTutorialState());
    };

    useEffect(() => {
        updateState(); // Initial check
        window.addEventListener('tutorial-state-changed', updateState);
        return () => {
            window.removeEventListener('tutorial-state-changed', updateState);
        };
    }, []);

    // Also update when path changes, in case the event listener fires before the page component is ready
    useEffect(() => {
        // A small delay to ensure the new page's DOM is available for the tutorial to find elements
        const timeoutId = setTimeout(() => {
            updateState();
        }, 50); 
        return () => clearTimeout(timeoutId);
    }, [pathname]);

    if (!state || !state.isActive) {
        return null;
    }

    return <OnboardingTutorial />;
}
