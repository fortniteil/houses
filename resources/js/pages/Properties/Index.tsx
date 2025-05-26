import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import axios from '@/lib/axios';
import { getVisitorId } from '@/lib/fingerprint';
import { BreadcrumbItem } from '@/types';
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

export default function PropertyIndex() {
    const { properties, seo } = usePage().props as any;

    useEffect(() => {
        trackVisitor();
    }, []);

    return (
        <>
            <Head title={seo.title} />
            <AppLayout breadcrumbs={breadcrumbs}>
                <h1 className="text-2xl font-bold">{seo.title}</h1>
                <p>{seo.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {properties.map((property: any) => (
                        <a href="`{property.id}`" key={property.id} className="rounded border p-4">
                            <h2>{property.title}</h2>
                            <p>{property.city}</p>
                        </a>
                    ))}
                </div>
            </AppLayout>
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
        href: '/properties',
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
