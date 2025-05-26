import { Head } from '@inertiajs/react';

export default function SeoHead({ seo }) {
    return (
        <Head>
            <title>{seo?.title || 'נכסים+ לא עובד'}</title>
            <meta name="description" content={seo?.description || 'פורטל הנדלן המוביל בישראל'} />
            <link rel="canonical" href={window.location.href} />
            <meta name="theme-color" content="#052135" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            {/* אפשר להוסיף עוד מטא-תגיות כאן */}
        </Head>
    );
}
