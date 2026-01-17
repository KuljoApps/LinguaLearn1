
import LearningModule from '@/components/learning-module';
import { questions as esPlQuestions } from '@/lib/questions-es-pl';
import { questions as plEsQuestions } from '@/lib/questions-pl-es';
import { questions as irregularVerbsEsQuestions } from '@/lib/questions-irregular-verbs-es';
import { questions as falsosAmigosEsQuestions } from '@/lib/questions-phrasal-verbs-es';
import { questions as idiomsEsQuestions } from '@/lib/questions-idioms-es';
import type { Language } from '@/lib/storage';

export default function LearningEsPage() {
    const language: Language = 'es';
    const uiTexts = {
        title: "Aprendizaje",
        searchPlaceholder: "Buscar preguntas...",
        noResults: "No se encontraron resultados para su búsqueda.",
        back: "Volver al Inicio"
    };

    const questionSets = [
        { title: 'Español - Polaco', questions: esPlQuestions },
        { title: 'Polaco - Español', questions: plEsQuestions },
        { title: 'Verbos Irregulares', questions: irregularVerbsEsQuestions },
        { title: 'Falsos Amigos', questions: falsosAmigosEsQuestions },
        { title: 'Modismos', questions: idiomsEsQuestions },
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
