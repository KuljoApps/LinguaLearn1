import HistoryPage from '@/components/history-page';
import { allHistoryData } from '@/lib/history';

export default function HistoryFrPage() {
    const data = allHistoryData.fr;
    return <HistoryPage data={data} />;
}
