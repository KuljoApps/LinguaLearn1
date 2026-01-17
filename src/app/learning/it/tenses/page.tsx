import TensesPage from '@/components/tenses-page';
import { allTenses } from '@/lib/tenses';

export default function ItalianTenses() {
    const tenses = allTenses.filter(t => t.language === 'it');
    const title = "Tempi Verbali";
    const backHref = "/learning/it";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <TensesPage title={title} tenses={tenses} backHref={backHref} />
        </main>
    );
}
