import PhoneticsCategoryPage from '@/components/phonetics-category-page';
import { allPhoneticsData } from '@/lib/phonetics';
import { MessageSquareText } from 'lucide-react';

export default function BasicExpressionsDePage() {
    const data = allPhoneticsData.de['basic-expressions'];
    return (
        <PhoneticsCategoryPage data={data}>
            <MessageSquareText className="h-8 w-8" />
        </PhoneticsCategoryPage>
    );
}
