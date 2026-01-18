import PhoneticsCategoryPage from '@/components/phonetics-category-page';
import { allPhoneticsData } from '@/lib/phonetics';
import { HelpCircle } from 'lucide-react';

export default function DifficultPronunciationFrPage() {
    const data = allPhoneticsData.fr['difficult-pronunciation'];
    return (
        <PhoneticsCategoryPage data={data}>
            <HelpCircle className="h-8 w-8" />
        </PhoneticsCategoryPage>
    );
}
