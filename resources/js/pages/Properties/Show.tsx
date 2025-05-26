import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import axios from '@/lib/axios';
import { getVisitorId } from '@/lib/fingerprint';
import { useEffect } from 'react';

let debounceTimeout;

function sendVisitorLog(payload) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        axios.post('/visitor-log', payload).catch(console.error);
    }, 5000); // מחכה 5 שניות לפני שליחה, מבטיח שלא יישלח יותר מדי מהר
}

async function trackVisitor() {
    const visitorId = await getVisitorId();
    const urlParams = new URLSearchParams(window.location.search);

    const payload = {
        visitorId,
        action: 'visit',
        pathname: window.location.pathname,
        ip_address: null, // לא צריך לשלוח, זה מגיע לשרת
        user_agent: navigator.userAgent,
        data: {
            screenWidth: window.innerWidth,
            utm_source: urlParams.get('utm_source'),
            screenHeight: window.innerHeight,
            referrer: document.referrer,
        },
    };

    sendVisitorLog(payload);
}

export default function PropertyShow() {
    const { property, seo, schemaData } = usePage().props;

    useEffect(() => {
        trackVisitor();
    }, []);
    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>
            <AppLayout breadcrumbs={breadcrumbs}>
                <main className="container mx-auto p-4">
                    <h1 className="mb-4 text-3xl font-bold">{property.name}</h1>
                    <p className="mb-2">עיר: {property.city}</p>
                    <p className="mb-2">מחיר: ₪{property.price.toLocaleString()}</p>
                    <p className="mb-2">כתובת: {property.address}</p>

                    {/* תמונה */}
                    {property.image_url && <img src={property.image_url} alt={`תמונה של ${property.name}`} className="w-full max-w-lg rounded-md" />}

                    {/* תיאור */}
                    <p className="mt-4">{property.description}</p>

                    {/* קישור חזרה */}
                    <a href="/properties" className="mt-6 block text-blue-500 hover:underline">
                        חזרה לרשימת הנכסים
                    </a>
                </main>
            </AppLayout>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ציר הזמן',
        href: '/',
    },
    {
        title: 'חיפוש נכסים',
        href: '/messenger',
    },
    {
        title: 'השוואת נכסים',
        href: '/messenger',
    },
    {
        title: 'מאמרים',
        href: '/messenger',
    },
    {
        title: 'צור קשר',
        href: '/messenger',
    },
    {
        title: 'אודות',
        href: '/messenger',
    },
];
