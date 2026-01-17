
import LearningModule from '@/components/learning-module';
import { questions as enPlQuestions } from '@/lib/questions-en-pl';
import { questions as plEnQuestions } from '@/lib/questions-pl-en';
import { questions as irregularVerbsQuestions } from '@/lib/questions-irregular-verbs';
import { questions as phrasalVerbsQuestions } from '@/lib/questions-phrasal-verbs';
import { questions as idiomsQuestions } from '@/lib/questions-idioms';
import type { Language } from '@/lib/storage';

export default function LearningEnPage() {
    const language: Language = 'en';
    const uiTexts = {
        title: "Learning",
        searchPlaceholder: "Search questions...",
        noResults: "No results found for your search.",
        back: "Back to Home"
    };

    const questionSets = [
        { title: 'English - Polish', questions: enPlQuestions },
        { title: 'Polish - English', questions: plEnQuestions },
        { title: 'Irregular Verbs', questions: irregularVerbsQuestions },
        { title: 'Phrasal Verbs', questions: phrasalVerbsQuestions },
        { title: 'Idioms', questions: idiomsQuestions },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <LearningModule 
                language={language}
                uiTexts={uiTexts}
                questionSets={questionSets}
                backHref="/"
            />
        </main>
    );
}
