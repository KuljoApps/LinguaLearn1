import QuestionBase from '@/components/learning-module';
import { questions as frPlQuestions } from '@/lib/questions-fr-pl';
import { questions as plFrQuestions } from '@/lib/questions-pl-fr';
import { questions as irregularVerbsFrQuestions } from '@/lib/questions-irregular-verbs-fr';
import { questions as fauxAmisFrQuestions } from '@/lib/questions-phrasal-verbs-fr';
import { questions as idiomsFrQuestions } from '@/lib/questions-idioms-fr';
import type { Language } from '@/lib/storage';

export default function LearningFrQuestionsPage() {
    const language: Language = 'fr';
    const uiTexts = {
        title: "Base de Questions",
        searchPlaceholder: "Rechercher des questions...",
        noResults: "Aucun résultat trouvé pour votre recherche.",
        back: "Retour à l'Apprentissage"
    };

    const questionSets = [
        { title: 'Français - Polonais', questions: frPlQuestions },
        { title: 'Polonais - Français', questions: plFrQuestions },
        { title: 'Verbes Irréguliers', questions: irregularVerbsFrQuestions },
        { title: 'Faux Amis', questions: fauxAmisFrQuestions },
        { title: 'Idiomes', questions: idiomsFrQuestions },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <QuestionBase
                language={language}
                uiTexts={uiTexts}
                questionSets={questionSets}
                backHref="/learning/fr"
            />
        </main>
    );
}
