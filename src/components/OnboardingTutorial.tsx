"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { saveTutorialState, clearTutorialState, getTutorialState } from '@/lib/storage';

interface Step {
    elementId?: string;
    title: string;
    description: string;
    path?: string;
    isModal?: boolean;
}

const initialSteps: Step[] = [
    {
        isModal: true,
        title: 'Witaj w',
        description: 'Pozwól, że w\u00A0kilku krokach pokażę Ci najważniejsze funkcje.',
    },
    {
        elementId: 'language-switcher',
        title: 'Zmiana języka',
        description: 'Najpierw wybierz język, którego chcesz się uczyć. Możesz to zmienić w\u00A0każdej chwili.',
        path: '/',
    },
    {
        elementId: 'quiz-buttons',
        title: 'Główne quizy',
        description: 'To serce aplikacji! Wybierz jeden z\u00A0pięciu trybów, aby sprawdzić swoją wiedzę w\u00A0różnych kategoriach.',
        path: '/',
    },
    {
        elementId: 'learning-button',
        title: 'Baza wiedzy',
        description: 'Potrzebujesz powtórki? Tutaj znajdziesz moduły do nauki, w\u00A0tym gramatykę, słownictwo i\u00A0wiele więcej.',
        path: '/',
    },
    {
        elementId: 'toolbar',
        title: 'Narzędzia i\u00A0postępy',
        description: 'Tutaj możesz dostosować ustawienia, śledzić swoje statystyki, przeglądać błędy i\u00A0sprawdzać swoje osiągnięcia.',
        path: '/',
    },
];

const extendedSteps: Step[] = [
    {
        path: '/settings',
        elementId: 'settings-switches',
        title: 'Dźwięki i\u00A0Wibracje',
        description: 'Włącz lub wyłącz efekty dźwiękowe i\u00A0haptyczne. Możesz też dostosować głośność, aby nauka była komfortowa.',
    },
    {
        path: '/settings',
        elementId: 'settings-eyecare',
        title: 'Ochrona Wzroku',
        description: 'Uczysz się wieczorem? Użyj tego suwaka, aby nałożyć na aplikację ciepły filtr, który zmniejszy zmęczenie oczu.',
    },
    {
        path: '/stats',
        elementId: 'stats-main-cards',
        title: 'Główne statystyki',
        description: 'Tutaj znajdziesz podsumowanie swoich postępów, w\u00A0tym ogólną skuteczność i\u00A0najdłuższą serię poprawnych odpowiedzi.',
    },
    {
        path: '/stats',
        elementId: 'stats-last-50',
        title: 'Historia odpowiedzi',
        description: 'Ta siatka pokazuje Twoje ostatnie 50 odpowiedzi. Zielony to sukces, a\u00A0czerwony to błąd. Najedź na czerwone pole, aby zobaczyć szczegóły.',
    },
    {
        path: '/stats',
        elementId: 'stats-streak',
        title: 'Najdłuższa seria',
        description: 'Kliknij tutaj, aby zobaczyć, kiedy i\u00A0w\u00A0którym quizie udało Ci się osiągnąć najdłuższą passę bezbłędnych odpowiedzi. Powodzenia!',
    },
    {
        path: '/errors',
        elementId: 'errors-filters',
        title: 'Filtrowanie błędów',
        description: 'Możesz przeglądać swoje błędy z\u00A0konkretnych quizów lub przełączać się między widokiem najczęstszych i\u00A0najnowszych pomyłek.',
    },
    {
        path: '/errors',
        elementId: 'errors-table',
        title: 'Analiza błędów',
        description: 'Kliknij na dowolny wiersz w\u00A0tabeli, aby rozwinąć szczegóły i\u00A0sprawdzić, gdzie popełniłeś/aś błąd. To świetny sposób na naukę!',
    },
    {
        path: '/achievements',
        elementId: 'achievements-grid',
        title: 'Osiągnięcia',
        description: 'Tutaj znajdziesz wszystkie zdobyte i\u00A0dostępne osiągnięcia. Każde z\u00A0nich to dowód Twoich postępów w\u00A0nauce!',
    },
    {
        path: '/achievements',
        elementId: 'achievements-reset',
        title: 'Resetowanie postępów',
        description: 'Jeśli chcesz zacząć od nowa w\u00A0danym języku, możesz tutaj zresetować swoje osiągnięcia, statystyki i\u00A0błędy.',
    },
    {
        path: '/learning/en',
        elementId: 'learning-top-buttons',
        title: 'Główne moduły nauki',
        description: 'Te moduły to podstawa wiedzy. Znajdziesz tu bazę pytań, wyjaśnienie czasów gramatycznych oraz ogólne zasady gramatyki.',
    },
    {
        path: '/learning/en',
        elementId: 'learning-bottom-buttons',
        title: 'Słownictwo i\u00A0frazy',
        description: 'W tych sekcjach możesz przeglądać przydatne zwroty z\u00A0codziennych sytuacji oraz tematyczne słownictwo, aby poszerzyć zasób słów.',
    },
    {
        path: '/learning/en/dictionary',
        elementId: 'dictionary-categories',
        title: 'Kategorie słownictwa',
        description: 'Słownictwo jest podzielone na kategorie, aby ułatwić naukę. Wybierz interesujący Cię temat, np. jedzenie.',
    },
    {
        path: '/learning/en/dictionary/food',
        elementId: 'dictionary-word-list',
        title: 'Lista słówek',
        description: 'Przeglądaj słówka i\u00A0ich tłumaczenia. Listę możesz przewijać, aby zobaczyć wszystkie pozycje w\u00A0danej kategorii.',
    },
    {
        path: '/learning/en/dictionary/food',
        elementId: 'dictionary-favorites-star',
        title: 'Ulubione słówka',
        description: 'Kliknij gwiazdkę, aby dodać słówko do ulubionych. Zostanie ono przypięte na górze listy, co ułatwi szybkie powtórki.',
    }
];

const uiTexts = {
    next: 'Dalej',
    finish: 'Zakończ',
    showMore: 'Pokaż więcej',
    start: 'Zacznij naukę!',
    finalTitle: 'Wszystko gotowe!',
    finalDesc: 'To wszystko! Jesteś gotów, aby w\u00A0pełni wykorzystać LinguaLearn. Powodzenia w\u00A0nauce!',
};

export default function OnboardingTutorial() {
    const router = useRouter();
    const pathname = usePathname();
    const tutorialState = getTutorialState();
    
    const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
    const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});

    const stage = tutorialState?.stage || 'initial';
    const currentStepIndex = tutorialState?.step || 0;
    
    const steps = stage === 'initial' ? initialSteps : extendedSteps;
    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        if (!currentStep || currentStep.isModal || stage === 'decision' || !currentStep.elementId) {
            setSpotlightStyle({ opacity: 0 });
            setBubbleStyle({ opacity: 0 });
            return;
        }

        let attempts = 0;
        const maxAttempts = 20; // Try for 2 seconds

        const findAndPosition = () => {
            const element = document.querySelector<HTMLElement>(`[data-tutorial-id="${currentStep.elementId}"]`);

            if (element) {
                const rect = element.getBoundingClientRect();
                const padding = 10;
                
                setSpotlightStyle({
                    width: `${rect.width + padding}px`,
                    height: `${rect.height + padding}px`,
                    top: `${rect.top - padding / 2}px`,
                    left: `${rect.left - padding / 2}px`,
                    opacity: 1,
                    position: 'fixed'
                });

                const bubbleHeight = 150; // Estimation
                const bubbleWidth = 256; // w-64
                let bubbleTop;
                let bubbleLeft = rect.left + rect.width / 2 - bubbleWidth / 2;

                if (window.innerHeight - rect.bottom > bubbleHeight + 40) {
                    bubbleTop = rect.bottom + 15;
                } else {
                    bubbleTop = rect.top - bubbleHeight - 25;
                }
                
                if (bubbleLeft < 16) bubbleLeft = 16;
                if (bubbleLeft + bubbleWidth > window.innerWidth - 16) {
                    bubbleLeft = window.innerWidth - bubbleWidth - 16;
                }

                setBubbleStyle({
                    top: `${bubbleTop}px`,
                    left: `${bubbleLeft}px`,
                    opacity: 1,
                    position: 'fixed',
                });

            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(findAndPosition, 100);
                }
            }
        };
        
        // Hide elements before finding the new position to avoid flickering
        setSpotlightStyle({ opacity: 0, transition: 'none' });
        setBubbleStyle({ opacity: 0, transition: 'none' });
        
        // Delay finding to ensure DOM is ready after potential navigation
        const timeoutId = setTimeout(findAndPosition, 150);

        window.addEventListener('resize', findAndPosition);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', findAndPosition);
        };
    }, [currentStep, pathname]);


    const handleNext = () => {
        const nextStepIndex = currentStepIndex + 1;
        if (stage === 'initial' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'decision', step: 0 });
            return;
        }
        
        if (stage === 'extended' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'decision', step: -1 }); // Final modal
            return;
        }

        const nextStep = steps[nextStepIndex];
        if (nextStep?.path && nextStep.path !== pathname) {
            router.push(nextStep.path);
        }
        saveTutorialState({ isActive: true, stage, step: nextStepIndex });
    };

    const handleFinish = () => {
        clearTutorialState();
    };
    
    const handleShowMore = () => {
        const firstExtendedStep = extendedSteps[0];
        if (firstExtendedStep.path !== pathname) {
            router.push(firstExtendedStep.path!);
        }
        saveTutorialState({ isActive: true, stage: 'extended', step: 0 });
    }

    if (!tutorialState?.isActive) return null;

    const isLastStep = currentStepIndex === steps.length - 1;

    // ----- RENDER LOGIC -----
    
    // Initial welcome modal
    if (stage === 'initial' && currentStep?.isModal) {
        return (
            <div className="fixed inset-0 z-50 animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                     <h2 className="text-2xl font-bold">{currentStep.title}</h2>
                    <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap mt-2">
                        Lingua
                        <span className="relative inline-block">
                            Learn
                            <span className="absolute -right-1 -bottom-4 text-lg font-semibold tracking-normal text-amber">
                            Lite
                            </span>
                        </span>
                    </h1>
                    <p className="text-muted-foreground my-6">{currentStep.description}</p>
                    <Button onClick={handleNext}>{uiTexts.next}</Button>
                </div>
            </div>
        );
    }
    
    // Decision modal
    if (stage === 'decision' && currentStepIndex === 0) {
        return (
             <div className="fixed inset-0 z-50 animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold">Podstawy za nami!</h2>
                    <p className="text-muted-foreground my-6">Czy chcesz poznać więcej zaawansowanych funkcji, czy wolisz już zacząć naukę?</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button onClick={handleShowMore}>{uiTexts.showMore}</Button>
                        <Button variant="secondary" onClick={handleFinish}>{uiTexts.start}</Button>
                    </div>
                </div>
            </div>
        );
    }
    
    // Final modal
    if (stage === 'decision' && currentStepIndex === -1) {
        return (
            <div className="fixed inset-0 z-50 animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold">{uiTexts.finalTitle}</h2>
                    <p className="text-muted-foreground my-6">{uiTexts.finalDesc}</p>
                    <Button onClick={handleFinish}>{uiTexts.start}</Button>
                </div>
            </div>
        )
    }

    // Step-by-step overlay
    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/70" onClick={handleFinish} />
            
            {currentStep && !currentStep.isModal && (
                <>
                    <div 
                        className="tutorial-spotlight fixed rounded-lg pointer-events-none transition-all duration-300" 
                        style={spotlightStyle}
                    />
                    <div
                        className="fixed bg-background p-4 rounded-lg shadow-xl w-64 z-50 transition-all duration-300"
                        style={bubbleStyle}
                    >
                        <h3 className="font-bold mb-1 text-lg">{currentStep.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{currentStep.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                                {stage === 'initial' ? currentStepIndex + 1 : initialSteps.length + currentStepIndex + 1} / {initialSteps.length + extendedSteps.length}
                            </span>
                             <Button onClick={handleNext} size="sm">
                                {stage === 'extended' && isLastStep ? uiTexts.finish : uiTexts.next}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
