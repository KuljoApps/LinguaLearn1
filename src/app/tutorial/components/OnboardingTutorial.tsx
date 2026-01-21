"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { saveTutorialState, clearTutorialState, getTutorialState, type TutorialState } from '@/lib/storage';
import { ArrowLeft } from 'lucide-react';

interface Step {
    elementId?: string;
    title: string;
    description: string;
    path?: string;
    isModal?: boolean;
    bubblePosition?: 'top' | 'bottom';
    action?: 'open-extras' | 'expand-first-item';
}

const tutorialBubbleOffsets: { [key: string]: number } = {
    'language-switcher': 14,
    'quiz-buttons': 10,
    'learning-button': 36,
    'toolbar': 14,
    'settings-switches': 0,
    'settings-eyecare': 0,
    'stats-cards': 0,
    'last-50-grid': 0,
    'errors-controls': 0,
    'errors-table': 12,
    'achievements-grid': 0,
    'learning-question-base': 0,
    'learning-main-modules': 0,
    'learning-extras': 36,
    'phrases-airport': 0,
    'airport-first-phrases': 0,
    'dictionary-colors': 0,
    'dictionary-word-list': 0,
    'culture-about': 0,
    'culture-places': 0,
    'culture-history': 36,
    'tongue-twisters-first-two': 0,
    'phonetics-alphabet': 0,
    'phonetics-difficult': 36,
    'phonetics-first-item': 0,
    'quiz-timer': 0,
    'quiz-pause-button': 16,
    'quiz-correct-answer': 42,
    'quiz-incorrect-answer': 42,
    'irregular-quiz-part1': 0,
    'irregular-quiz-part2': -340,
    'irregular-quiz-hint': 80,
    'quiz-results-summary': 8,
    'quiz-results-errors': 22,
    'quiz-results-actions': 40,
};


const initialSteps: Step[] = [
    { // Slajd 1
        isModal: true,
        title: 'Witaj w',
        description: 'Pozwól, że w\u00A0kilku krokach pokażę Ci najważniejsze funkcje.',
    },
    { // Slajd 2
        elementId: 'language-switcher',
        title: 'Zmiana języka',
        description: 'Najpierw wybierz język, którego chcesz się uczyć. Możesz to zmienić w\u00A0każdej chwili.',
        path: '/',
    },
    { // Slajd 3
        elementId: 'quiz-buttons',
        title: 'Główne quizy',
        description: 'To serce aplikacji. Wybierz jeden z\u00A0pięciu trybów, aby sprawdzić swoją wiedzę w\u00A0różnych kategoriach.',
        path: '/',
    },
    { // Slajd 4
        elementId: 'learning-button',
        title: 'Baza wiedzy',
        description: 'Potrzebujesz powtórki? Tutaj znajdziesz moduły do nauki, w\u00A0tym gramatykę, słownictwo i\u00A0wiele więcej.',
        path: '/',
    },
    { // Slajd 5
        elementId: 'toolbar',
        title: 'Narzędzia i postępy',
        description: 'Tutaj możesz dostosować ustawienia, śledzić swoje statystyki, przeglądać błędy i\u00A0sprawdzać swoje osiągnięcia.',
        path: '/',
    },
];

const extendedSteps: Step[] = [
    { // Slajd 6
        path: '/tutorial/settings',
        elementId: 'settings-switches',
        title: 'Dźwięki i wibracje',
        description: 'Włącz lub wyłącz efekty dźwiękowe i\u00A0haptyczne. Możesz też dostosować głośność, aby nauka była komfortowa.',
    },
    { // Slajd 7
        path: '/tutorial/settings',
        elementId: 'settings-eyecare',
        title: 'Ochrona wzroku',
        description: 'Uczysz się wieczorem? Użyj tego suwaka, aby nałożyć na aplikację ciepły filtr, który zmniejszy zmęczenie oczu.',
        bubblePosition: 'bottom',
    },
     { // Slajd 8
        path: '/tutorial/stats',
        elementId: 'stats-cards',
        title: 'Ogólne statystyki',
        description: 'Tutaj znajdziesz podsumowanie swoich postępów. Kliknij na każdą kartę, aby zobaczyć szczegółowe dane dla poszczególnych quizów.',
    },
    { // Slajd 9
        path: '/tutorial/stats',
        elementId: 'last-50-grid',
        title: 'Ostatnie odpowiedzi',
        description: 'Ta siatka pokazuje Twoje ostatnie 50\u00A0odpowiedzi. Zielony to sukces, czerwony to błąd. Kliknij na czerwony kwadrat <span class="inline-block h-3 w-3 bg-destructive rounded-sm align-middle mx-1"></span>, aby zobaczyć szczegóły błędu.',
    },
    { // Slajd 10
        path: '/tutorial/errors',
        elementId: 'errors-controls',
        title: 'Filtrowanie i widoki',
        description: 'Możesz filtrować błędy według quizu lub przełączać się między widokiem najnowszych i\u00A0najczęściej popełnianych błędów.',
        bubblePosition: 'bottom',
    },
    { // Slajd 11
        path: '/tutorial/errors',
        elementId: 'errors-table',
        title: 'Interaktywna tabela',
        description: 'Klikaj nagłówki, aby sortować błędy. Jeśli tabela jest za szeroka, możesz ją przewijać w\u00A0poziomie.',
    },
     { // Slajd 12
        path: '/tutorial/achievements',
        elementId: 'achievements-grid',
        title: 'Twoje osiągnięcia',
        description: 'Tutaj znajdziesz wszystkie swoje odznaki. Zdobywaj je za postępy w nauce, regularność i perfekcyjne wyniki w quizach!',
        bubblePosition: 'bottom',
    },
    { // Slajd 13
        path: '/tutorial/learning',
        elementId: 'learning-question-base',
        title: 'Baza pytań',
        description: 'To idealne miejsce na powtórkę i naukę bez presji czasu. Znajdziesz tu wszystkie pytania z quizów.',
    },
    { // Slajd 14
        path: '/tutorial/learning',
        elementId: 'learning-main-modules',
        title: 'Główne moduły nauki',
        description: 'Te kategorie obejmują kluczowe aspekty języka, od gramatyki i czasów po praktyczne zwroty oraz słownictwo.',
    },
    { // Slajd 15
        path: '/tutorial/learning',
        elementId: 'learning-extras',
        title: 'Dodatkowe materiały',
        description: 'Rozwiń tę sekcję, aby odkryć ciekawostki kulturowe, łamańce językowe i zasady fonetyki, które wzbogacą Twoją naukę.',
        action: 'open-extras',
        bubblePosition: 'top',
    },
    { // Slajd 16
        path: '/tutorial/phrases',
        elementId: 'phrases-airport',
        title: 'Praktyczne zwroty',
        description: 'Ten dział to Twój niezbędnik w podróży. Znajdziesz tu gotowe zwroty na każdą sytuację, od lotniska po restaurację. To musisz zobaczyć!',
        bubblePosition: 'bottom'
    },
    { // Slajd 17
        path: '/tutorial/phrases-airport',
        elementId: 'airport-first-phrases',
        title: 'Najważniejsze zwroty',
        description: 'Każda kategoria zaczyna się od kluczowych wyrażeń, które warto znać na pamięć. To Twój szybki start w każdej rozmowie.',
        bubblePosition: 'bottom'
    },
    { // Slajd 18
        path: '/tutorial/dictionary',
        elementId: 'dictionary-colors',
        title: 'Słownik tematyczny',
        description: 'Działa podobnie do zwrotów, ale ma więcej funkcji — o tym opowiemy sobie za chwilę. Kliknij kategorię, aby wejść do środka.',
        bubblePosition: 'bottom',
    },
    { // Slajd 19
        path: '/tutorial/dictionary-colors',
        elementId: 'dictionary-word-list',
        title: 'Nauka i personalizacja',
        description: 'Oprócz listy słówek, możesz oznaczać ulubione pozycje gwiazdką <span class="inline-block h-3 w-3 text-amber fill-amber align-middle mx-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-3 w-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clip-rule="evenodd"></path></svg></span>, aby mieć je zawsze na górze listy!',
        bubblePosition: 'bottom',
    },
    { // Slajd 20
        path: '/tutorial/culture',
        elementId: 'culture-about',
        title: 'Poznawanie kultury',
        description: 'Odkryj fascynujące fakty o\u00A0kraju, którego języka się uczysz. To świetny sposób, by zrozumieć kontekst i\u00A0poszerzyć horyzonty.',
        bubblePosition: 'bottom',
    },
    { // Slajd 21
        path: '/tutorial/culture',
        elementId: 'culture-places',
        title: 'Ważne miejsca',
        description: 'Przeglądaj najważniejsze miasta i\u00A0zabytki. Każdy element zawiera ciekawe opisy, fakty i\u00A0statystyki.',
        bubblePosition: 'bottom',
    },
    { // Slajd 22
        path: '/tutorial/culture',
        elementId: 'culture-history',
        title: 'Tradycje i historia',
        description: 'Zanurz się w\u00A0lokalnych zwyczajach i\u00A0kluczowych wydarzeniach historycznych, aby lepiej zrozumieć duszę narodu.',
        bubblePosition: 'top',
    },
    { // Slajd 23
        path: '/tutorial/tongue-twisters',
        elementId: 'tongue-twisters-first-two',
        title: 'Humorystyczne uzupełnienie',
        description: 'Na koniec odrobina zabawy! Ta sekcja to świetne uzupełnienie nauki o kulturze, które pomoże Ci ćwiczyć wymowę w zabawny sposób.',
        bubblePosition: 'bottom',
    },
    { // Slajd 24
        path: '/tutorial/phonetics',
        elementId: 'phonetics-alphabet',
        title: 'Alfabet i wymowa',
        description: 'Naucz się poprawnej wymowy liter i dźwięków. To podstawa, która ułatwi Ci mówienie i rozumienie.',
        bubblePosition: 'bottom'
    },
    { // Slajd 25
        path: '/tutorial/phonetics',
        elementId: 'phonetics-difficult',
        title: 'Trudne dźwięki',
        description: 'Tutaj znajdziesz przykłady słów i zwrotów, które często sprawiają trudność. Ćwicz je, aby brzmieć jak native speaker!',
        bubblePosition: 'top',
    },
    { // Slajd 26
        path: '/tutorial/phonetics-basics',
        elementId: 'phonetics-first-item',
        title: 'Odsłuchiwanie wymowy',
        description: 'Kliknij na ikonę głośnika <span class="inline-block h-4 w-4 align-middle text-deep-purple mx-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg></span>, aby usłyszeć poprawną wymowę. Możesz też rozwinąć każdy element, aby zobaczyć tłumaczenie i zapis fonetyczny.',
        action: 'expand-first-item',
        bubblePosition: 'bottom',
    },
];

const quizSteps: Step[] = [
    { // Slajd 27
        path: '/tutorial/quiz-correct',
        elementId: 'quiz-timer',
        title: 'Czas na odpowiedź',
        description: 'Masz 15 sekund na każdą odpowiedź. Pasek postępu pokazuje, ile czasu pozostało. Nie marnuj go!',
        bubblePosition: 'bottom',
    },
    { // Slajd 28
        path: '/tutorial/quiz-pause',
        elementId: 'quiz-pause-button',
        title: 'Potrzebujesz przerwy?',
        description: 'Kliknij pauzę, aby zatrzymać czas. Pamiętaj jednak, że wznowienie quizu kosztuje 5 sekund!',
        bubblePosition: 'top'
    },
    { // Slajd 29
        path: '/tutorial/quiz-correct',
        elementId: 'quiz-correct-answer',
        title: 'Poprawna odpowiedź',
        description: 'Świetnie! Poprawna odpowiedź zostanie podświetlona na zielono. Po chwili automatycznie przejdziesz do następnego pytania.',
        bubblePosition: 'top',
    },
    { // Slajd 30
        path: '/tutorial/quiz-incorrect',
        elementId: 'quiz-incorrect-answer',
        title: 'Błędna odpowiedź',
        description: 'Nie martw się! Twoja błędna odpowiedź podświetli się na czerwono, a prawidłowa — na zielono. Każdy błąd to okazja do nauki!',
        bubblePosition: 'top'
    },
    { // Slajd 31
        path: '/tutorial/irregular-question',
        elementId: 'irregular-quiz-part1',
        title: 'Testy z czasowników',
        description: 'Ten typ quizu ma dłuższy czas na odpowiedź (30s) i sprawdza dwie rzeczy: tłumaczenie oraz znajomość form czasowników nieregularnych.',
        bubblePosition: 'bottom',
    },
    { // Slajd 32
        path: '/tutorial/irregular-question',
        elementId: 'irregular-quiz-part2',
        title: 'Wpisywanie odpowiedzi',
        description: 'Po wybraniu poprawnego tłumaczenia, aktywują się pola do wpisania dwóch pozostałych form czasownika. Zobaczmy, jak to działa.',
        bubblePosition: 'bottom',
    },
    { // Slajd 33
        path: '/tutorial/irregular-question',
        elementId: 'irregular-quiz-hint',
        title: 'Dwie poprawne formy',
        description: 'Gdy wpiszesz błędną odpowiedź, system podświetli ją na czerwono i wskaże poprawną formę. Niektóre czasowniki, jak "be", mają dwie opcje (was/were) - obie są zaliczane jako poprawne!',
        bubblePosition: 'top',
    },
    { // Slajd 34
        path: '/tutorial/quiz-results',
        elementId: 'quiz-results-summary',
        title: 'Podsumowanie wyników',
        description: 'Po zakończeniu quizu zobaczysz swoje statystyki. Sprawdź, jak Ci poszło!',
        bubblePosition: 'bottom',
    },
    { // Slajd 35
        path: '/tutorial/quiz-results',
        elementId: 'quiz-results-errors',
        title: 'Przegląd błędów',
        description: 'Wszystkie błędne odpowiedzi z sesji są tutaj. Przeanalizuj je, aby uniknąć ich w przyszłości.',
        bubblePosition: 'top'
    },
    { // Slajd 36
        path: '/tutorial/quiz-results',
        elementId: 'quiz-results-actions',
        title: 'Co dalej?',
        description: 'Możesz zagrać ponownie, wrócić do menu lub przejrzeć wszystkie swoje błędy w dedykowanej sekcji.',
        bubblePosition: 'top'
    },
];


const uiTexts = {
    next: 'Dalej',
    finish: 'Zakończ',
    exit: 'Wyjdź',
    showMore: 'Pokaż więcej',
    start: 'Zacznij naukę',
    startTest: 'Zacznij krótki test',
    finalTitle: 'Wszystko gotowe!',
    finalDesc: 'To wszystko! Jesteś gotów, aby w\u00A0pełni wykorzystać LinguaLearn. Powodzenia w\u00A0nauce!',
    almostDoneTitle: 'Prawie wszystko gotowe!',
    almostDoneDesc: 'Znasz już podstawy i wiesz, jak działają quizy. Chcesz teraz poznać resztę zaawansowanych funkcji, czy od razu zacząć naukę?',
    exploreMore: 'Poznaj więcej!',
};

export default function OnboardingTutorial() {
    const [tutorialState, setTutorialState] = useState<TutorialState | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    
    const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
    const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const updateState = () => {
            setTutorialState(getTutorialState());
        };
        updateState();
        window.addEventListener('tutorial-state-changed', updateState);
        return () => window.removeEventListener('tutorial-state-changed', updateState);
    }, []);

    const stage = tutorialState?.stage || 'initial';
    const currentStepIndex = tutorialState?.step || 0;
    
    const steps: Step[] = stage === 'initial' ? initialSteps : stage === 'extended' ? extendedSteps : quizSteps;
    const currentStep = (stage === 'decision') ? null : steps[currentStepIndex];
    
    useEffect(() => {
        if (currentStep?.path && pathname !== currentStep.path) {
            router.push(currentStep.path);
        }
    }, [currentStep, pathname, router]);

    useEffect(() => {
        if (!currentStep || currentStep.isModal || !currentStep.elementId) {
            setSpotlightStyle({ opacity: 0 });
            setBubbleStyle({ opacity: 0 });
            return;
        }

        if (currentStep.path && pathname !== currentStep.path) {
            setSpotlightStyle({ opacity: 0, transition: 'none' });
            setBubbleStyle({ opacity: 0, transition: 'none' });
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
                });

                const bubbleHeight = 150;
                const bubbleWidth = 256; 
                let bubbleTop;
                let bubbleLeft = rect.left + rect.width / 2 - bubbleWidth / 2;
                
                const isBubbleTop = (currentStep.bubblePosition === 'top') || 
                                    (currentStep.bubblePosition !== 'bottom' && rect.top > bubbleHeight + 40);

                const offset = tutorialBubbleOffsets[currentStep.elementId!] || 0;
                
                if (isBubbleTop) {
                    bubbleTop = rect.top - bubbleHeight - 25 - offset;
                } else {
                    bubbleTop = rect.bottom + 15 + offset;
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
                
                if (currentStep.action === 'expand-first-item') {
                    const triggerButton = document.querySelector<HTMLElement>('[data-tutorial-id="phonetics-first-item"] [data-radix-collection-item]');
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
        
        const timeoutId = setTimeout(findAndPosition, 50);

        window.addEventListener('resize', findAndPosition);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', findAndPosition);
        };
    }, [currentStep, pathname]);


    const handleNext = () => {
        const nextStepIndex = currentStepIndex + 1;

        if (stage === 'initial' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'decision', step: 0, origin: 'decision-0' });
            return;
        }
        
        if (stage === 'extended' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'decision', step: -1, origin: tutorialState?.origin });
            return;
        }
        
        if (stage === 'quiz' && nextStepIndex >= steps.length) {
            saveTutorialState({ isActive: true, stage: 'decision', step: -1, origin: tutorialState?.origin });
            return;
        }

        saveTutorialState({ ...tutorialState!, stage, step: nextStepIndex });
    };

    const handleBack = () => {
        const prevStepIndex = currentStepIndex - 1;
    
        if (stage === 'initial' && prevStepIndex < 1) return;
    
        if (stage === 'extended' && prevStepIndex < 0) {
            if (tutorialState?.origin === 'quiz-decision') {
                saveTutorialState({ isActive: true, stage: 'decision', step: -1, origin: 'decision-0' });
            } else {
                saveTutorialState({ isActive: true, stage: 'decision', step: 0, origin: 'decision-0' });
            }
            return;
        }
    
        if (stage === 'quiz' && prevStepIndex < 0) {
            if (tutorialState?.origin === 'decision-0') {
                saveTutorialState({ isActive: true, stage: 'decision', step: 0, origin: 'decision-0' });
            } else {
                saveTutorialState({ isActive: true, stage: 'decision', step: 1, origin: tutorialState?.origin });
            }
            return;
        }
    
        saveTutorialState({ ...tutorialState!, stage, step: prevStepIndex });
    };


    const handleFinish = () => {
        clearTutorialState();
        if (pathname.startsWith('/tutorial')) {
            router.push('/');
        }
    };
    
    const handleShowMore = () => {
        saveTutorialState({ isActive: true, stage: 'extended', step: 0, origin: tutorialState?.origin });
    }

    const handleStartTest = () => {
        saveTutorialState({ isActive: true, stage: 'quiz', step: 0, origin: tutorialState?.origin });
    }

    const handleExploreExtended = () => {
        saveTutorialState({ isActive: true, stage: 'extended', step: 0, origin: 'quiz-decision' });
    }


    if (!tutorialState || !tutorialState.isActive) {
        return null;
    }
    
    const renderModalContent = () => {
      if (stage === 'initial' && currentStepIndex === 0) {
        return (
          <>
            <div className="flex items-baseline justify-center gap-2 mb-4">
                <h2 className="text-[28px] font-bold tracking-tight">{currentStep!.title}</h2>
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
            <p className="text-muted-foreground my-6" dangerouslySetInnerHTML={{ __html: currentStep!.description.replace(/ ([a-zA-Z]) /g, ' $1\u00A0') }} />
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={handleNext}>{uiTexts.next}</Button>
                <Button variant="secondary" onClick={handleFinish}>{uiTexts.exit}</Button>
            </div>
          </>
        )
      }
      
      if (stage === 'decision') {
          if (currentStepIndex === 0) {
              return (
                   <>
                      <h2 className="text-2xl font-bold">Podstawy za nami!</h2>
                      <p className="text-muted-foreground my-6">Możesz teraz poznać więcej funkcji, wypróbować krótki test lub od razu zacząć naukę.</p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <Button onClick={handleShowMore}>{uiTexts.showMore}</Button>
                          <Button onClick={handleStartTest} variant="outline">{uiTexts.startTest}</Button>
                          <Button variant="secondary" onClick={handleFinish}>{uiTexts.start}</Button>
                      </div>
                  </>
              );
          }
          if (currentStepIndex === 1) {
              return (
                  <>
                      <h2 className="text-2xl font-bold">Wprowadzenie zakończone!</h2>
                      <p className="text-muted-foreground my-6">Wiesz już wszystko, co potrzebne, aby w pełni korzystać z aplikacji. Chcesz teraz wypróbować krótki test, aby zobaczyć jak działa quiz?</p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <Button onClick={handleStartTest}>{uiTexts.startTest}</Button>
                          <Button variant="secondary" onClick={handleFinish}>{uiTexts.exit}</Button>
                      </div>
                  </>
              );
          }
          if (currentStepIndex === -1) {
            if (tutorialState?.origin === 'decision-0') {
                 return (
                    <>
                        <h2 className="text-2xl font-bold">{uiTexts.almostDoneTitle}</h2>
                        <p className="text-muted-foreground my-6">{uiTexts.almostDoneDesc}</p>
                         <div className="flex flex-col sm:flex-row gap-2 justify-center">
                             <Button onClick={handleExploreExtended}>{uiTexts.exploreMore}</Button>
                             <Button variant="secondary" onClick={handleFinish}>{uiTexts.start}</Button>
                        </div>
                    </>
                )
            }
            return (
                <>
                    <h2 className="text-2xl font-bold">{uiTexts.finalTitle}</h2>
                    <p className="text-muted-foreground my-6">{uiTexts.finalDesc}</p>
                     <Button onClick={handleFinish}>{uiTexts.start}</Button>
                </>
            )
        }
      }
      
      return null;
    }

    const modalContent = renderModalContent();
    if(modalContent) {
       return (
            <div className="fixed inset-0 z-[100] animate-in fade-in-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative bg-background p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                    {modalContent}
                </div>
            </div>
        );
    }
    
    if (!currentStep) return null;

    const isFinalStep = stage === 'quiz' && currentStepIndex === steps.length - 1;
    
    const totalInitialBubbleSteps = initialSteps.filter(s => !s.isModal).length;

    let currentStepDisplay = 0;
    let totalStepsDisplay = 0;

    if (stage === 'initial') {
        currentStepDisplay = currentStepIndex;
        totalStepsDisplay = totalInitialBubbleSteps;
    } else if (stage === 'extended') {
        if (tutorialState.origin === 'quiz-decision') {
            currentStepDisplay = currentStepIndex + 1;
            totalStepsDisplay = extendedSteps.length;
        } else {
            currentStepDisplay = totalInitialBubbleSteps + currentStepIndex + 1;
            totalStepsDisplay = totalInitialBubbleSteps + extendedSteps.length;
        }
    } else if (stage === 'quiz') {
        if (tutorialState.origin === 'decision-0') {
            currentStepDisplay = totalInitialBubbleSteps + currentStepIndex + 1;
            totalStepsDisplay = totalInitialBubbleSteps + quizSteps.length;
        } else {
            currentStepDisplay = totalInitialBubbleSteps + extendedSteps.length + currentStepIndex + 1;
            totalStepsDisplay = totalInitialBubbleSteps + extendedSteps.length + quizSteps.length;
        }
    }

    const isBackButtonDisabled = (stage === 'initial' && currentStepIndex === 1) || 
                                 (stage === 'quiz' && currentStepIndex === 0 && tutorialState?.origin === 'decision-0') ||
                                 (stage === 'extended' && currentStepIndex === 0 && tutorialState?.origin === 'quiz-decision');


    return (
        <div className="fixed inset-0 z-[100]">
            <div
                className="absolute rounded-md tutorial-spotlight transition-all duration-300 pointer-events-none"
                style={spotlightStyle}
            />
            <div
                className="fixed bg-background p-4 rounded-lg shadow-xl w-64 z-[101] transition-all duration-300 pointer-events-auto"
                style={bubbleStyle}
            >
                <h3 className="font-bold mb-1 text-lg">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: currentStep.description.replace(/ ([a-zA-Z])\s/g, ' $1\u00A0') }} />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                         <Button
                            onClick={handleBack}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isBackButtonDisabled}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                            {currentStepDisplay}/{totalStepsDisplay}
                        </span>
                    </div>
                    <Button onClick={handleNext} size="sm">
                        {isFinalStep ? uiTexts.finish : uiTexts.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
