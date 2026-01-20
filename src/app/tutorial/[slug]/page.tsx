"use client";

import { useParams } from 'next/navigation';

import FakeAchievementsPage from '@/app/tutorial/pages/FakeAchievementsPage';
import FakeCulturePage from '@/app/tutorial/pages/FakeCulturePage';
import FakeDictionaryPage from '@/app/tutorial/pages/FakeDictionaryPage';
import FakeDictionaryColorsPage from '@/app/tutorial/pages/FakeDictionaryColorsPage';
import FakeErrorsPage from '@/app/tutorial/pages/FakeErrorsPage';
import FakeLearningPage from '@/app/tutorial/pages/FakeLearningPage';
import FakePhoneticsPage from '@/app/tutorial/pages/FakePhoneticsPage';
import FakePhoneticsBasicsPage from '@/app/tutorial/pages/FakePhoneticsBasicsPage';
import FakePhrasesPage from '@/app/tutorial/pages/FakePhrasesPage';
import FakePhrasesAirportPage from '@/app/tutorial/pages/FakePhrasesAirportPage';
import FakeQuizDemoPage from '@/app/tutorial/pages/FakeQuizDemoPage';
import FakeSettingsPage from '@/app/tutorial/pages/FakeSettingsPage';
import FakeStatsPage from '@/app/tutorial/pages/FakeStatsPage';
import FakeTongueTwistersPage from '@/app/tutorial/pages/FakeTongueTwistersPage';

const pageMap: { [key: string]: React.ComponentType } = {
  achievements: FakeAchievementsPage,
  culture: FakeCulturePage,
  dictionary: FakeDictionaryPage,
  'dictionary-colors': FakeDictionaryColorsPage,
  errors: FakeErrorsPage,
  learning: FakeLearningPage,
  phonetics: FakePhoneticsPage,
  'phonetics-basics': FakePhoneticsBasicsPage,
  phrases: FakePhrasesPage,
  'phrases-airport': FakePhrasesAirportPage,
  'quiz-demo': FakeQuizDemoPage,
  settings: FakeSettingsPage,
  stats: FakeStatsPage,
  'tongue-twisters': FakeTongueTwistersPage,
};

export default function TutorialSlugPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    // All quiz-related slugs will render the same component because demo-quiz handles internal state
    const isQuizSlug = slug.startsWith('quiz-');
    const PageComponent = isQuizSlug ? FakeQuizDemoPage : pageMap[slug];

    if (!PageComponent) {
        // A simple fallback for any slugs that might not be mapped
        return <div>Strona samouczka nie została znaleziona.</div>;
    }

    return <PageComponent />;
}
