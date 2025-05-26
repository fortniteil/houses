import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function PropertiesCity() {
    const { properties, seo, city, city_slug } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'ציר הזמן', href: '/' },
        { title: `נכסים בעיר ${city.name_he}`, href: `/cities/${city.slug}` },
        { title: 'השוואת נכסים', href: '/compare' },
        { title: 'מאמרים', href: '/articles' },
        { title: 'צור קשר', href: '/contact' },
        { title: 'אודות', href: '/about' },
    ];

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>
            <AppLayout breadcrumbs={breadcrumbs}>
                <h1 className="text-2xl font-bold">{seo.title}</h1>
                <p>{seo.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {properties.data.map((property: any) => (
                        <a href={`/property/${property.id}`} key={property.id} className="rounded border p-4 hover:bg-gray-100">
                            <p>{property.title}</p>
                        </a>
                    ))}
                </div>
            </AppLayout>
        </>
    );
}
