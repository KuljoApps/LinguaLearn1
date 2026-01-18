import PhoneticsCategoryPage from '@/components/phonetics-category-page';
import { allPhoneticsData } from '@/lib/phonetics';
import { MessageSquareText } from 'lucide-react';

export default function BasicExpressionsEsPage() {
    const data = allPhoneticsData.es['basic-expressions'];
    return (
        <PhoneticsCategoryPage data={data}>
            <MessageSquareText className="h-8 w-8" />
        </PhoneticsCategoryPage>
    );
}
