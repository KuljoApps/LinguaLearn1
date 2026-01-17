import CitiesPage from '@/components/cities-page';
import { allCitiesData } from '@/lib/cities';

export default function CitiesEnPage() {
    const data = allCitiesData.en;
    return <CitiesPage data={data} />;
}
