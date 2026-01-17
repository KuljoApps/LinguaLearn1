import CitiesPage from '@/components/cities-page';
import { allCitiesData } from '@/lib/cities';

export default function CitiesDePage() {
    const data = allCitiesData.de;
    return <CitiesPage data={data} />;
}
