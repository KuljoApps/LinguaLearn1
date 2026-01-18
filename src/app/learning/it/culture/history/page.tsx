import HistoryPage from '@/components/history-page';
import { allHistoryData } from '@/lib/history';

export default function HistoryItPage() {
    const data = allHistoryData.it;
    return <HistoryPage data={data} />;
}
