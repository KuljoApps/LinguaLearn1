import HistoryPage from '@/components/history-page';
import { allHistoryData } from '@/lib/history';

export default function HistoryDePage() {
    const data = allHistoryData.de;
    return <HistoryPage data={data} />;
}
