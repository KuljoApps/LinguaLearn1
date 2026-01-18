import HistoryPage from '@/components/history-page';
import { allHistoryData } from '@/lib/history';

export default function HistoryEsPage() {
    const data = allHistoryData.es;
    return <HistoryPage data={data} />;
}
