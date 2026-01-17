import TensesPage from '@/components/tenses-page';
import { allTenses } from '@/lib/tenses';

export default function GermanTenses() {
    const tenses = allTenses.filter(t => t.language === 'de');
    const title = "Deutsche Zeiten";
    const backHref = "/learning/de";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <TensesPage title={title} tenses={tenses} backHref={backHref} />
        </main>
    );
}
