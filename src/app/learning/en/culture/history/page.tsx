import HistoryPage from '@/components/history-page';
import { allHistoryData } from '@/lib/history';

export default function HistoryEnPage() {
    const data = allHistoryData.en;
    return <HistoryPage data={data} />;
}
