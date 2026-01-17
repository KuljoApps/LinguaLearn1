import CitiesPage from '@/components/cities-page';
import { allCitiesData } from '@/lib/cities';

export default function CitiesItPage() {
    const data = allCitiesData.it;
    return <CitiesPage data={data} />;
}
