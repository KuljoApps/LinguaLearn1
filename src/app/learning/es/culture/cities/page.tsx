import CitiesPage from '@/components/cities-page';
import { allCitiesData } from '@/lib/cities';

export default function CitiesEsPage() {
    const data = allCitiesData.es;
    return <CitiesPage data={data} />;
}
