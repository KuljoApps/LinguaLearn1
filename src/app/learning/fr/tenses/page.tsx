import TensesPage from '@/components/tenses-page';
import { allTenses } from '@/lib/tenses';

export default function FrenchTenses() {
    const tenses = allTenses.filter(t => t.language === 'fr');
    const title = "Les Temps Verbaux";
    const backHref = "/learning/fr";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <TensesPage title={title} tenses={tenses} backHref={backHref} />
        </main>
    );
}
