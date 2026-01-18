"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Language, getLanguage, setTutorialCompleted } from '@/lib/storage';

interface OnboardingTutorialProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Step {
    elementId: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        elementId: 'language-switcher',
        title: 'Zmiana języka',
        description: 'Najpierw wybierz język, którego chcesz się uczyć. Możesz to zmienić w\u00A0każdej chwili.',
    },
    {
        elementId: 'quiz-buttons',
        title: 'Główne quizy',
        description: 'To serce aplikacji! Wybierz jeden z\u00A0pięciu trybów, aby sprawdzić swoją wiedzę w\u00A0różnych kategoriach.',
    },
    {
        elementId: 'learning-button',
        title: 'Baza wiedzy',
        description: 'Potrzebujesz powtórki? Tutaj znajdziesz moduły do nauki, w\u00A0tym gramatykę, słownictwo i\u00A0wiele więcej.',
    },
    {
        elementId: 'toolbar',
        title: 'Narzędzia i postępy',
        description: 'Tutaj możesz dostosować ustawienia, śledzić swoje statystyki, przeglądać błędy i\u00A0sprawdzać swoje osiągnięcia.',
    },
];

const uiTexts = {
    next: 'Dalej',
    finish: 'Zakończ',
    welcomeTitle: 'Witaj w',
    welcomeDesc: 'Pozwól, że w\u00A0kilku krokach pokażę Ci najważniejsze funkcje.'
}

export default function OnboardingTutorial({ open, onOpenChange }: OnboardingTutorialProps) {
    const [currentStep, setCurrentStep] = useState(-1); // -1 for welcome screen
    const [spotlightStyle, setSpotlightStyle] = useState({});
    const [bubbleStyle, setBubbleStyle] = useState({});
    
    useEffect(() => {
        if (!open || currentStep < 0 || currentStep >= steps.length) {
            setSpotlightStyle({ opacity: 0 });
            return;
        }

        const updatePosition = () => {
            const element = document.querySelector(`[data-tutorial-id="${steps[currentStep].elementId}"]`);
            if (element) {
                const rect = element.getBoundingClientRect();
                const padding = 10;
                setSpotlightStyle({
                    width: `${rect.width + padding}px`,
                    height: `${rect.height + padding}px`,
                    top: `${rect.top - padding / 2}px`,
                    left: `${rect.left - padding / 2}px`,
                    opacity: 1,
                });

                // Position bubble
                const bubbleHeight = 150; // Approximate height
                const spaceBelow = window.innerHeight - rect.bottom;
                if (spaceBelow > bubbleHeight + 20) {
                    setBubbleStyle({ top: `${rect.bottom + 15}px`, left: `${rect.left}px`, right: 'auto', bottom: 'auto' });
                } else {
                    setBubbleStyle({ bottom: `${window.innerHeight - rect.top + 15}px`, left: `${rect.left}px`, right: 'auto', top: 'auto' });
                }
            }
        };

        // Delay to allow layout to settle
        const timeoutId = setTimeout(updatePosition, 50);
        window.addEventListener('resize', updatePosition);
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updatePosition);
        }

    }, [currentStep, open]);

    if (!open) return null;

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleFinish = () => {
        // setTutorialCompleted(); // For production, uncomment this.
        onOpenChange(false);
    };

    const isLastStep = currentStep === steps.length - 1;

    const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

    return (
        <div className="fixed inset-0 z-50 animate-in fade-in-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" onClick={handleFinish} />
            
            {/* Spotlight */}
            {currentStepData && (
                <div 
                    className="tutorial-spotlight absolute rounded-lg transition-all duration-300 pointer-events-none" 
                    style={spotlightStyle}
                />
            )}
            
            {/* Content */}
            {currentStep === -1 ? (
                 <div className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                        <h2 className="text-2xl font-bold">{uiTexts.welcomeTitle}</h2>
                        <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap mt-2">
                            Lingua
                            <span className="relative inline-block">
                                Learn
                                <span className="absolute -right-1 -bottom-4 text-lg font-semibold tracking-normal text-amber">
                                Lite
                                </span>
                            </span>
                        </h1>
                        <p className="text-muted-foreground my-6">{uiTexts.welcomeDesc}</p>
                        <Button onClick={handleNext}>{uiTexts.next}</Button>
                    </div>
                </div>
            ) : (
                currentStepData && (
                    <div
                        className="fixed bg-background p-4 rounded-lg shadow-xl w-64 transition-all duration-300 z-50"
                        style={bubbleStyle}
                    >
                        <h3 className="font-bold mb-1 text-lg">{currentStepData.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{currentStepData.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{currentStep + 1} / {steps.length}</span>
                            <Button onClick={isLastStep ? handleFinish : handleNext} size="sm">
                                {isLastStep ? uiTexts.finish : uiTexts.next}
                            </Button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
