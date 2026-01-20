"use client";

import React, { useState, useEffect } from 'react';
import OnboardingTutorial from '@/app/tutorial/components/OnboardingTutorial';
import { getTutorialState, type TutorialState } from '@/lib/storage';

export default function TutorialManager() {
    // This key is used to force a re-render of the OnboardingTutorial component
    // when the tutorial state changes globally.
    const [, setForceUpdate] = useState(0);

    useEffect(() => {
        const handleStateUpdate = () => {
            setForceUpdate(c => c + 1);
        };

        window.addEventListener('tutorial-state-changed', handleStateUpdate);
        return () => {
            window.removeEventListener('tutorial-state-changed', handleStateUpdate);
        };
    }, []);

    const tutorialState = getTutorialState();

    if (!tutorialState || !tutorialState.isActive) {
        return null;
    }

    return <OnboardingTutorial />;
}
