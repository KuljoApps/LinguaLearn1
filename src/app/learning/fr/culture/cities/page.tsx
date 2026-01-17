import CitiesPage from '@/components/cities-page';
import { allCitiesData } from '@/lib/cities';

export default function CitiesFrPage() {
    const data = allCitiesData.fr;
    return <CitiesPage data={data} />;
}
