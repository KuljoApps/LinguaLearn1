import QuestionBase from '@/components/learning-module';
import { questions as itPlQuestions } from '@/lib/questions-it-pl';
import { questions as plItQuestions } from '@/lib/questions-pl-it';
import { questions as irregularVerbsItQuestions } from '@/lib/questions-irregular-verbs-it';
import { questions as falsiAmiciItQuestions } from '@/lib/questions-phrasal-verbs-it';
import { questions as idiomsItQuestions } from '@/lib/questions-idioms-it';
import type { Language } from '@/lib/storage';

export default function LearningItQuestionsPage() {
    const language: Language = 'it';
    const uiTexts = {
        title: "Base di Domande",
        searchPlaceholder: "Cerca domande...",
        noResults: "Nessun risultato trovato per la tua ricerca.",
        back: "Torna ad Apprendimento"
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
            <QuestionBase
                language={language}
                uiTexts={uiTexts}
                questionSets={questionSets}
                backHref="/learning/it"
            />
        </main>
    );
}
