
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
    bubblePosition?: 'top' | 'bottom';
    action?: 'open-extras' | 'expand-first-item';
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
        description: 'To serce aplikacji. Wybierz jeden z\u00A0pięciu trybów, aby sprawdzić swoją wiedzę w\u00A0różnych kategoriach.',
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
        bubblePosition: 'bottom',
    },
    {
        path: '/stats',
        elementId: 'stats-cards',
        title: 'Ogólne statystyki',
        description: 'Tutaj znajdziesz podsumowanie swoich postępów. Kliknij na każdą kartę, aby zobaczyć szczegółowe dane dla poszczególnych quizów.',
    },
    {
        path: '/stats',
        elementId: 'last-50-grid',
        title: 'Ostatnie odpowiedzi',
        description: 'Ta siatka pokazuje Twoje ostatnie 50\u00A0odpowiedzi. Zielony to sukces, czerwony to błąd. Kliknij na czerwony kwadrat <span class="inline-block h-3 w-3 bg-destructive rounded-sm align-middle mx-1"></span>, aby zobaczyć szczegóły błędu.',
    },
    {
        path: '/errors',
        elementId: 'errors-controls',
        title: 'Filtrowanie i widoki',
        description: 'Możesz filtrować błędy według quizu lub przełączać się między widokiem najnowszych i\u00A0najczęściej popełnianych błędów.',
        bubblePosition: 'bottom',
    },
    {
        path: '/errors',
        elementId: 'errors-table',
        title: 'Interaktywna tabela',
        description: 'Klikaj nagłówki, aby sortować błędy. Jeśli tabela jest za szeroka, możesz ją przewijać w\u00A0poziomie.',
    },
     {
        path: '/achievements',
        elementId: 'achievements-grid',
        title: 'Twoje osiągnięcia',
        description: 'Tutaj znajdziesz wszystkie swoje odznaki. Zdobywaj je za postępy w nauce, regularność i perfekcyjne wyniki w quizach!',
        bubblePosition: 'bottom',
    },
    {
        path: '/learning/en',
        elementId: 'learning-question-base',
        title: 'Baza pytań',
        description: 'To idealne miejsce na powtórkę i naukę bez presji czasu. Znajdziesz tu wszystkie pytania z quizów.',
    },
    {
        path: '/learning/en',
        elementId: 'learning-main-modules',
        title: 'Główne moduły nauki',
        description: 'Te kategorie obejmują kluczowe aspekty języka, od gramatyki i czasów po praktyczne zwroty oraz słownictwo.',
    },
    {
        path: '/learning/en',
        elementId: 'learning-extras',
        title: 'Dodatkowe materiały',
        description: 'Rozwiń tę sekcję, aby odkryć ciekawostki kulturowe, łamańce językowe i zasady fonetyki, które wzbogacą Twoją naukę.',
        action: 'open-extras',
        bubblePosition: 'top',
    },
    {
        path: '/learning/en/phrases',
        elementId: 'phrases-airport',
        title: 'Praktyczne Zwroty',
        description: 'Ten dział to Twój niezbędnik w podróży. Znajdziesz tu gotowe zwroty na każdą sytuację, od lotniska po restaurację. To musisz zobaczyć!',
        bubblePosition: 'bottom'
    },
    {
        path: '/learning/en/phrases/airport',
        elementId: 'airport-first-phrases',
        title: 'Najważniejsze Zwroty',
        description: 'Każda kategoria zaczyna się od kluczowych wyrażeń, które warto znać na pamięć. To Twój szybki start w każdej rozmowie.',
        bubblePosition: 'bottom'
    },
    {
        path: '/learning/en/dictionary',
        elementId: 'dictionary-colors',
        title: 'Słownik tematyczny',
        description: 'Działa podobnie do zwrotów, ale ma więcej funkcji — o tym opowiemy sobie za chwilę. Kliknij kategorię, aby wejść do środka.',
        bubblePosition: 'bottom',
    },
    {
        path: '/learning/en/dictionary/colors',
        elementId: 'dictionary-word-list',
        title: 'Ucz się i personalizuj',
        description: 'Oprócz listy słówek, możesz oznaczać ulubione pozycje gwiazdką <span class="inline-block h-3 w-3 text-amber fill-amber align-middle mx-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-3 w-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clip-rule="evenodd"></path></svg></span>, aby mieć je zawsze na górze listy!',
        bubblePosition: 'bottom',
    },
    {
        path: '/learning/en/culture',
        elementId: 'culture-about',
        title: 'Poznaj Kulturę Kraju',
        description: 'Odkryj fascynujące fakty o\u00A0kraju, którego języka się uczysz. To świetny sposób, by zrozumieć kontekst i\u00A0poszerzyć horyzonty.',
        bubblePosition: 'bottom',
    },
    {
        path: '/learning/en/culture',
        elementId: 'culture-places',
        title: 'Ważne Miejsca',
        description: 'Przeglądaj najważniejsze miasta i\u00A0zabytki. Każdy element zawiera ciekawe opisy, fakty i\u00A0statystyki.',
        bubblePosition: 'bottom',
    },
    {
        path: '/learning/en/culture',
        elementId: 'culture-history',
        title: 'Tradycje i Historia',
        description: 'Zanurz się w\u00A0lokalnych zwyczajach i\u00A0kluczowych wydarzeniach historycznych, aby lepiej zrozumieć duszę narodu.',
        bubblePosition: 'top',
    },
    {
        path: '/learning/en/tongue-twisters',
        elementId: 'tongue-twisters-first-two',
        title: 'Humorystyczne uzupełnienie',
        description: 'Na koniec odrobina zabawy! Ta sekcja to świetne uzupełnienie nauki o kulturze, które pomoże Ci ćwiczyć wymowę w zabawny sposób.',
        bubblePosition: 'bottom',
    },
    {
        path: '/learning/en/phonetics',
        elementId: 'phonetics-alphabet',
        title: 'Alfabet i wymowa',
        description: 'Naucz się poprawnej wymowy liter i dźwięków. To podstawa, która ułatwi Ci mówienie i rozumienie.',
        bubblePosition: 'bottom'
    },
    {
        path: '/learning/en/phonetics',
        elementId: 'phonetics-difficult',
        title: 'Trudne Dźwięki',
        description: 'Tutaj znajdziesz przykłady słów i zwrotów, które często sprawiają trudność. Ćwicz je, aby brzmieć jak native speaker!',
        bubblePosition: 'top'
    },
    {
        path: '/learning/en/phonetics/basic-expressions',
        elementId: 'phonetics-first-item',
        title: 'Ćwicz wymowę',
        description: 'Posłuchaj, jak lektor wymawia każdy zwrot, klikając ikonę głośnika. Możesz odtwarzać nagranie tyle razy, ile potrzebujesz, aby doskonalić swój akcent!',
        bubblePosition: 'bottom',
        action: 'expand-first-item'
    },
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
                    position: 'fixed',
                    borderRadius: '0.5rem',
                    transition: 'all 0.3s ease-in-out',
                    pointerEvents: 'auto',
                });

                const bubbleHeight = 150; // Estimation
                const bubbleWidth = 256; // w-64
                let bubbleTop;
                let bubbleLeft = rect.left + rect.width / 2 - bubbleWidth / 2;
                
                const isBubbleTop = (currentStep.bubblePosition === 'top') || 
                                    (currentStep.bubblePosition !== 'bottom' && rect.top > bubbleHeight + 40);

                if (isBubbleTop) {
                    bubbleTop = rect.top - bubbleHeight - 25;
                } else {
                    bubbleTop = rect.bottom + 15;
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
                
                if (currentStep.action === 'open-extras') {
                    const triggerButton = document.querySelector<HTMLElement>('[data-tutorial-id="extras-trigger"]');
                    if (triggerButton && triggerButton.getAttribute('data-state') === 'closed') {
                       triggerButton.click();
                    }
                }

            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(findAndPosition, 100);
                }
            }
        };
        
        setSpotlightStyle({ opacity: 0, transition: 'none' });
        setBubbleStyle({ opacity: 0, transition: 'none' });
        
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
    
    if (stage === 'initial' && currentStep?.isModal) {
        return (
            <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                         <h2 className="text-[28px] font-bold tracking-tight">{currentStep.title}</h2>
                        <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap">
                            Lingua
                            <span className="relative inline-block">
                                Learn
                                <span className="absolute -right-1 -bottom-3.5 text-base font-semibold tracking-normal text-amber">
                                Lite
                                </span>
                            </span>
                        </h1>
                    </div>
                    <p className="text-muted-foreground my-6" dangerouslySetInnerHTML={{ __html: currentStep.description.replace(/ ([a-zA-Z]) /g, ' $1\u00A0') }} />
                    <Button onClick={handleNext}>{uiTexts.next}</Button>
                </div>
            </div>
        );
    }
    
    if (stage === 'decision' && currentStepIndex === 0) {
        return (
             <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
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
    
    if (stage === 'decision' && currentStepIndex === -1) {
        return (
            <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold">{uiTexts.finalTitle}</h2>
                    <p className="text-muted-foreground my-6">{uiTexts.finalDesc}</p>
                    <Button onClick={handleFinish}>{uiTexts.start}</Button>
                </div>
            </div>
        )
    }

    if (!currentStep || currentStep.isModal) {
      return null;
    }

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            <div
                className="tutorial-spotlight"
                style={spotlightStyle}
            />
            <div
                className="fixed bg-background p-4 rounded-lg shadow-xl w-64 z-[101] transition-all duration-300 pointer-events-auto"
                style={bubbleStyle}
            >
                <h3 className="font-bold mb-1 text-lg">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: currentStep.description.replace(/ ([a-zA-Z])\s/g, ' $1\u00A0') }} />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                        {stage === 'initial' ? currentStepIndex + 1 : initialSteps.length + currentStepIndex + 1} / {initialSteps.length + extendedSteps.length}
                    </span>
                        <Button onClick={handleNext} size="sm">
                        {stage === 'extended' && isLastStep ? uiTexts.finish : uiTexts.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
