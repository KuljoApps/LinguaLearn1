import TensesPage from '@/components/tenses-page';
import { allTenses } from '@/lib/tenses';

export default function SpanishTenses() {
    const tenses = allTenses.filter(t => t.language === 'es');
    const title = "Tiempos Verbales";
    const backHref = "/learning/es";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <TensesPage title={title} tenses={tenses} backHref={backHref} />
        </main>
    );
}
