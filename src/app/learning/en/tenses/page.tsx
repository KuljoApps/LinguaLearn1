import TensesPage from '@/components/tenses-page';
import { allTenses } from '@/lib/tenses';

export default function EnglishTenses() {
    const tenses = allTenses.filter(t => t.language === 'en');
    const title = "English Tenses";
    const backHref = "/learning/en";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <TensesPage title={title} tenses={tenses} backHref={backHref} />
        </main>
    );
}
