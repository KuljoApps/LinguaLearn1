
import LearningModule from '@/components/learning-module';
import { questions as itPlQuestions } from '@/lib/questions-it-pl';
import { questions as plItQuestions } from '@/lib/questions-pl-it';
import { questions as irregularVerbsItQuestions } from '@/lib/questions-irregular-verbs-it';
import { questions as falsiAmiciItQuestions } from '@/lib/questions-phrasal-verbs-it';
import { questions as idiomsItQuestions } from '@/lib/questions-idioms-it';
import type { Language } from '@/lib/storage';

export default function LearningItPage() {
    const language: Language = 'it';
    const uiTexts = {
        title: "Apprendimento",
        searchPlaceholder: "Cerca domande...",
        noResults: "Nessun risultato trovato per la tua ricerca.",
        back: "Torna alla Home"
    };

    const questionSets = [
        { title: 'Italiano - Polacco', questions: itPlQuestions },
        { title: 'Polacco - Italiano', questions: plItQuestions },
        { title: 'Verbi Irregolari', questions: irregularVerbsItQuestions },
        { title: 'Falsi Amici', questions: falsiAmiciItQuestions },
        { title: 'Modi di dire', questions: idiomsItQuestions },
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
