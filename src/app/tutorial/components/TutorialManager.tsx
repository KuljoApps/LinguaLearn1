"use client";

import React, { useState, useEffect } from 'react';
import OnboardingTutorial from '@/app/tutorial/components/OnboardingTutorial';
import { getTutorialState, type TutorialState } from '@/lib/storage';

export default function TutorialManager() {
    const [currentState, setCurrentState] = useState<TutorialState | null>(null);

    useEffect(() => {
        const updateState = () => {
            setCurrentState(getTutorialState());
        };

        updateState();
        window.addEventListener('tutorial-state-changed', updateState);

        return () => {
            window.removeEventListener('tutorial-state-changed', updateState);
        };
    }, []);

    if (!currentState || !currentState.isActive) {
        return null;
    }

    return <OnboardingTutorial />;
}
