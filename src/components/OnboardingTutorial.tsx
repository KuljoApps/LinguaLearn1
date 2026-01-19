
"use client";

import React, { useState, useEffect, useRef } from 'react';
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

const quizSteps: Step[] = [
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-timer',
    title: 'Licznik czasu',
    description: 'Na każdą odpowiedź masz określoną ilość czasu. Uważaj, bo szybko ucieka!',
    bubblePosition: 'bottom',
  },
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-pause-button',
    title: 'Pauza',
    description: 'Potrzebujesz chwili? Możesz zatrzymać czas, ale uważaj – wznowienie quizu kosztuje kilka cennych sekund!',
    bubblePosition: 'top',
  },
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-answer-correct',
    title: 'Poprawna odpowiedź',
    description: 'Brawo! Tak wygląda poprawna odpowiedź. Przycisk podświetla się na zielono, aby utrwalić wiedzę.',
    bubblePosition: 'bottom',
  },
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-answer-incorrect',
    title: 'Błędna odpowiedź',
    description: 'Gdy odpowiesz źle, Twój wybór podświetli się na czerwono, a poprawna odpowiedź na zielono, abyś mógł się uczyć na błędach.',
    bubblePosition: 'bottom',
  },
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-results-summary',
    title: 'Podsumowanie wyników',
    description: 'Po każdym quizie zobaczysz swoje statystyki: wynik, skuteczność, liczbę błędów oraz całkowity czas.',
    bubblePosition: 'bottom',
  },
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-results-errors',
    title: 'Przejrzyj swoje błędy',
    description: 'Wszystkie błędne odpowiedzi z sesji są tu zebrane. To świetny sposób, aby szybko powtórzyć materiał.',
    bubblePosition: 'top',
  },
  {
    path: '/quiz/en-pl?tutorial=true',
    elementId: 'quiz-results-buttons',
    title: 'Co dalej?',
    description: 'Możesz zagrać jeszcze raz, wrócić do menu głównego lub przejrzeć wszystkie swoje błędy na dedykowanym ekranie.',
    bubblePosition: 'top',
  }
];

const uiTexts = {
    next: 'Dalej',
    finish: 'Zakończ',
    showMore: 'Pokaż więcej',
    startLearning: 'Zacznij naukę!',
    startQuiz: 'Zacznij test',
    exit: 'Wyjdź',
    restart: 'Rozpocznij ponownie',
    initialSummaryTitle: 'Podstawy za nami!',
    initialSummaryDesc: 'Czy chcesz poznać więcej zaawansowanych funkcji, czy wolisz już zacząć naukę?',
    finalSummaryTitle: 'Wszystko gotowe!',
    finalSummaryDesc: 'To już prawie koniec! Czy jesteś gotów, aby rozpocząć pierwszy, próbny test i zobaczyć, jak to wszystko działa w praktyce?',
    finalTitle: 'Gratulacje!',
    finalDesc: 'Właśnie ukończyłeś pełny samouczek! Jesteś teraz gotów, aby w\u00A0pełni wykorzystać LinguaLearn. Powodzenia w\u00A0nauce!',
};

export default function OnboardingTutorial() {
    const router = useRouter();
    const pathname = usePathname();
    const tutorialState = getTutorialState();
    const bubbleRef = React.useRef<HTMLDivElement>(null);
    
    const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
    const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});

    const stage = tutorialState?.stage || 'initial';
    const currentStepIndex = tutorialState?.step || 0;
    
    const getSteps = () => {
        switch(stage) {
            case 'initial': return initialSteps;
            case 'extended': return extendedSteps;
            case 'quiz': return quizSteps;
            default: return [];
        }
    }
    const steps = getSteps();
    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        if (!currentStep || currentStep.isModal || !currentStep.elementId || ['decision', 'summary', 'final'].includes(stage)) {
            setSpotlightStyle({ opacity: 0 });
            setBubbleStyle({ opacity: 0 });
            return;
        }

        let attempts = 0;
        const maxAttempts = 20;

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

                const bubbleHeight = bubbleRef.current?.offsetHeight || 180;
                const bubbleWidth = 256;
                let bubbleTop;
                let bubbleLeft = rect.left + rect.width / 2 - bubbleWidth / 2;
                
                const isBubbleTop = (currentStep.bubblePosition === 'top') || 
                                    (currentStep.bubblePosition !== 'bottom' && rect.top > bubbleHeight + 40);

                if (isBubbleTop) {
                    const extraOffset = currentStep.elementId === 'quiz-pause-button' ? 60 : 25;
                    bubbleTop = rect.top - bubbleHeight - extraOffset;
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
                } else if (currentStep.action === 'expand-first-item') {
                    const triggerButton = element.querySelector<HTMLElement>('[role="button"]');
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
    }, [currentStep, pathname, stage]);


    const handleNext = () => {
        const nextStepIndex = currentStepIndex + 1;

        if (stage === 'initial' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'decision', step: 0 });
            return;
        }

        if (stage === 'extended' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'summary', step: 0 });
            return;
        }

        if (stage === 'quiz' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'final', step: 0 });
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
        router.push('/');
    };
    
    const handleShowMore = () => {
        const firstExtendedStep = extendedSteps[0];
        if (firstExtendedStep.path !== pathname) {
            router.push(firstExtendedStep.path!);
        }
        saveTutorialState({ isActive: true, stage: 'extended', step: 0 });
    }
    
    const handleStartQuiz = () => {
        router.push('/quiz/en-pl?tutorial=true');
        saveTutorialState({ isActive: true, stage: 'quiz', step: 0 });
    }

    if (!tutorialState?.isActive) return null;

    if (stage === 'decision') {
        return (
             <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold">{uiTexts.initialSummaryTitle}</h2>
                    <p className="text-muted-foreground my-6">{uiTexts.initialSummaryDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button onClick={handleShowMore}>{uiTexts.showMore}</Button>
                        <Button variant="secondary" onClick={handleFinish}>{uiTexts.startLearning}</Button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (stage === 'summary') {
        return (
             <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold">{uiTexts.finalSummaryTitle}</h2>
                    <p className="text-muted-foreground my-6">{uiTexts.finalSummaryDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button onClick={handleStartQuiz}>{uiTexts.startQuiz}</Button>
                        <Button variant="secondary" disabled>{uiTexts.exit}</Button>
                        <Button variant="ghost" disabled>{uiTexts.restart}</Button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (stage === 'final') {
        return (
            <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold">{uiTexts.finalTitle}</h2>
                    <p className="text-muted-foreground my-6">{uiTexts.finalDesc}</p>
                    <Button onClick={handleFinish}>{uiTexts.finish}</Button>
                </div>
            </div>
        )
    }

    if (!currentStep || currentStep.isModal) {
      return null;
    }

    const totalSteps = initialSteps.length + extendedSteps.length + quizSteps.length;
    const getCurrentStepNumber = () => {
        if (stage === 'initial') return currentStepIndex + 1;
        if (stage === 'extended') return initialSteps.length + currentStepIndex + 1;
        if (stage === 'quiz') return initialSteps.length + extendedSteps.length + currentStepIndex + 1;
        return 0;
    }

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            <div
                className="tutorial-spotlight"
                style={spotlightStyle}
            />
            <div
                ref={bubbleRef}
                className="fixed bg-background p-4 rounded-lg shadow-xl w-64 z-[101] transition-all duration-300 pointer-events-auto"
                style={bubbleStyle}
            >
                <h3 className="font-bold mb-1 text-lg">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: currentStep.description.replace(/ ([a-zA-Z])\s/g, ' $1\u00A0') }} />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                        {getCurrentStepNumber()} / {totalSteps}
                    </span>
                    <Button onClick={handleNext} size="sm">
                      {stage === 'quiz' && currentStepIndex === steps.length - 1 ? uiTexts.finish : uiTexts.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}

