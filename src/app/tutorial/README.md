# Instrukcja Integracji Systemu Samouczka

Ten przewodnik wyjaśnia, jak przenieść i zintegrować system samouczka z nową aplikacją opartą na Next.js, Shadcn UI i Tailwind CSS.

## Wymagania wstępne

Aplikacja docelowa powinna używać:
*   Next.js z App Router
*   Komponentów Shadcn UI
*   Tailwind CSS
*   Lucide React dla ikon

---

## Krok 1: Kopiowanie Plików

Skopiuj następujące pliki i foldery z bieżącego projektu do projektu docelowego:

1.  **Cały folder `src/app/tutorial/`**: Zawiera on wszystkie strony i komponenty specyficzne dla samouczka.
2.  **Funkcje pomocnicze z `src/lib/storage.ts`**: Skopiuj interfejs `TutorialState` oraz funkcje `getTutorialState`, `saveTutorialState`, `clearTutorialState`, `isTutorialCompleted` i `setTutorialCompleted` do odpowiednika pliku `storage.ts` w nowym projekcie.

---

## Krok 2: Konfiguracja Globalna

Aby samouczek mógł działać w całej aplikacji, wykonaj poniższe kroki.

1.  **Zaktualizuj `src/app/layout.tsx`**:
    Zaimportuj `TutorialManager` i umieść go wewnątrz tagu `<body>`.

    ```tsx
    // src/app/layout.tsx
    import TutorialManager from '@/app/tutorial/components/TutorialManager';

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en">
          <body>
            <TutorialManager />
            {children}
          </body>
        </html>
      );
    }
    ```

2.  **Zaktualizuj `src/app/globals.css`**:
    Dodaj poniższy styl, który jest niezbędny do działania podświetlenia elementów.

    ```css
    @layer utilities {
        .tutorial-spotlight {
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
        }
    }
    ```

---

## Krok 3: Oznaczanie Elementów

Samouczek identyfikuje elementy do podświetlenia za pomocą atrybutu `data-tutorial-id="nazwa-elementu"`.

1.  **Dodaj atrybuty**: Przejdź przez pliki komponentów w nowej aplikacji i dodaj atrybuty `data-tutorial-id` do elementów, które mają być częścią samouczka.

    **Przykład:**
    ```tsx
    // W komponencie przycisku quizu
    <Link href="/quiz/en-pl">
      <Button data-tutorial-id="quiz-buttons">
        English - Polish
      </Button>
    </Link>
    ```

2.  **Lista identyfikatorów**: Upewnij się, że używasz tych samych identyfikatorów, które są zdefiniowane w pliku `src/app/tutorial/components/OnboardingTutorial.tsx`. Oto pełna lista używanych `id`:
    *   `language-switcher`
    *   `quiz-buttons`
    *   `learning-button`
    *   `toolbar`
    *   `settings-switches`
    *   `settings-eyecare`
    *   `stats-cards`
    *   `last-50-grid`
    *   `errors-controls`
    *   `errors-table`
    *   `achievements-grid`
    *   `learning-question-base`
    *   `learning-main-modules`
    *   `learning-extras`
    *   `extras-trigger`
    *   `phrases-airport`
    *   `airport-first-phrases`
    *   `dictionary-colors`
    *   `dictionary-word-list`
    *   `culture-about`
    *   `culture-places`
    *   `culture-history`
    *   `tongue-twisters-first-two`
    *   `phonetics-alphabet`
    *   `phonetics-difficult`
    *   `phonetics-first-item`
    *   `quiz-timer`
    *   `quiz-pause-button`
    *   `quiz-correct-answer`
    *   `quiz-incorrect-answer`
    *   `irregular-quiz-part1`
    *   `irregular-quiz-part2`
    *   `irregular-quiz-hint`
    *   `quiz-results-summary`
    *   `quiz-results-errors`
    *   `quiz-results-actions`

---

## Krok 4: Uruchamianie Samouczka

Aby uruchomić samouczek, musisz wywołać funkcję `saveTutorialState`.

1.  **Dla nowych użytkowników**: Sprawdź, czy samouczek został już ukończony. Jeśli nie, uruchom go.

    **Przykład w `src/app/page.tsx`**:
    ```tsx
    useEffect(() => {
      if (!isTutorialCompleted()) {
        saveTutorialState({ isActive: true, stage: 'initial', step: 0 });
      }
    }, []);
    ```

2.  **Uruchamianie z przycisku**: Możesz również dodać przycisk w ustawieniach, który pozwoli użytkownikowi ponownie uruchomić samouczek.

    **Przykład w `src/components/settings.tsx`**:
    ```tsx
    const handleRunTutorial = () => {
      saveTutorialState({ isActive: true, stage: 'initial', step: 0 });
      router.push('/');
    };

    <Button onClick={handleRunTutorial}>Uruchom samouczek</Button>
    ```

---

## Podsumowanie

Integracja wymaga skopiowania plików, konfiguracji globalnej, oznaczenia komponentów atrybutami `data-tutorial-id` oraz dodania logiki uruchamiającej. Po wykonaniu tych kroków system samouczka powinien być w pełni funkcjonalny w nowej aplikacji.