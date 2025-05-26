import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import AppLogo from '@/components/app-logo';
import { Globe, Mail, Phone } from 'lucide-react';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Property } from '../types';

const properties: Property[] = [
    {
        id: 1,
        title: 'דירת 3 חדרים במרכז תל אביב',
        description: 'דירת 3 חדרים מרווחת במיקום מרכזי מאוד, קרוב לתחבורה ציבורית וקניונים.',
        imageUrl: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 3500000,
        propertyType: 'apartment',
        type: 'sale',
        location: {
            state: 'תל אביב',
            city: 'תל אביב',
            neighborhood: 'הצפון הישן',
            zipCode: '61000',
            latitude: 32.0809,
            longitude: 34.7806,
        },
        size: 85,
        bedrooms: 3,
        bathrooms: 2,
        parkingSpaces: 1,
        petsAllowed: true,
        yearBuilt: 1998,
        available: true,
        url: 'https://example.com/property/1',
        amenities: new Set(['air condition', 'balcony', 'fire place']),
    },
    {
        id: 2,
        title: 'בית פרטי עם בריכה בכפר סבא',
        description: 'בית משפחתי מרווח עם חצר גדולה ובריכה פרטית.',
        imageUrl: 'https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 5800000,
        propertyType: 'family house',
        type: 'sale',
        location: {
            state: 'מרכז',
            city: 'כפר סבא',
            neighborhood: 'רמת השרון',
            zipCode: '4464300',
            latitude: 32.1845,
            longitude: 34.9067,
        },
        size: 220,
        bedrooms: 5,
        bathrooms: 3,
        parkingSpaces: 3,
        petsAllowed: true,
        yearBuilt: 2010,
        available: false,
        url: 'https://example.com/property/2',
        amenities: new Set(['swimming pool', 'balcony', 'fire place', 'garden']),
    },
    {
        id: 3,
        title: 'דירת סטודיו להשכרה בהרצליה',
        description: 'דירת סטודיו קטנה ומודרנית להשכרה, מתאימה לזוג או יחיד.',
        imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 4200, // שכר דירה חודשי בשקלים
        propertyType: 'apartment',
        type: 'rent',
        location: {
            state: 'מרכז',
            city: 'הרצליה',
            neighborhood: 'הרצליה פיתוח',
            zipCode: '4673330',
            latitude: 32.1676,
            longitude: 34.8428,
        },
        size: 40,
        bedrooms: 1,
        bathrooms: 1,
        parkingSpaces: 0,
        petsAllowed: false,
        yearBuilt: 2018,
        available: true,
        url: 'https://example.com/property/3',
        amenities: new Set(['air condition', 'balcony']),
    },
    {
        id: 4,
        title: 'דירת סטודיו להשכרה בהרצליה',
        description: 'דירת סטודיו קטנה ומודרנית להשכרה, מתאימה לזוג או יחיד.',
        imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 4200, // שכר דירה חודשי בשקלים
        propertyType: 'apartment',
        type: 'rent',
        location: {
            state: 'מרכז',
            city: 'הרצליה',
            neighborhood: 'הרצליה פיתוח',
            zipCode: '4673330',
            latitude: 32.1676,
            longitude: 34.8428,
        },
        size: 40,
        bedrooms: 1,
        bathrooms: 1,
        parkingSpaces: 0,
        petsAllowed: false,
        yearBuilt: 2018,
        available: true,
        url: 'https://example.com/property/3',
        amenities: new Set(['air condition', 'balcony']),
    },
    {
        id: 5,
        title: 'דירת סטודיו להשכרה בהרצליה',
        description: 'דירת סטודיו קטנה ומודרנית להשכרה, מתאימה לזוג או יחיד.',
        imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 4200, // שכר דירה חודשי בשקלים
        propertyType: 'apartment',
        type: 'rent',
        location: {
            state: 'מרכז',
            city: 'הרצליה',
            neighborhood: 'הרצליה פיתוח',
            zipCode: '4673330',
            latitude: 32.1676,
            longitude: 34.8428,
        },
        size: 40,
        bedrooms: 1,
        bathrooms: 1,
        parkingSpaces: 0,
        petsAllowed: false,
        yearBuilt: 2018,
        available: true,
        url: 'https://example.com/property/3',
        amenities: new Set(['air condition', 'balcony']),
    },
    {
        id: 6,
        title: 'דירת סטודיו להשכרה בהרצליה',
        description: 'דירת סטודיו קטנה ומודרנית להשכרה, מתאימה לזוג או יחיד.',
        imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 4200, // שכר דירה חודשי בשקלים
        propertyType: 'apartment',
        type: 'rent',
        location: {
            state: 'מרכז',
            city: 'הרצליה',
            neighborhood: 'הרצליה פיתוח',
            zipCode: '4673330',
            latitude: 32.1676,
            longitude: 34.8428,
        },
        size: 40,
        bedrooms: 1,
        bathrooms: 1,
        parkingSpaces: 0,
        petsAllowed: false,
        yearBuilt: 2018,
        available: true,
        url: 'https://example.com/property/3',
        amenities: new Set(['air condition', 'balcony']),
    },
];

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

function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}

export default function HomePage({ featuredProperties, popularCities, popularCategories, citiesIndex }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    console.log('Featured Properties:', featuredProperties);
    console.log('Popular Cities:', popularCities);
    console.log('Popular Categories:', popularCategories);
    console.log('Cities Index:', citiesIndex);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Hero />
                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <main className="flex min-h-screen flex-col">
                        <section className="py-4">
                            <div className="mb-5 text-center">
                                <div className="city_filter_wrapper">
                                    <p className="city_tag">תל אביב</p>
                                </div>
                                <h2 className="font-almoni text-5xl text-[#2d3e61]">נכסים מובילים באיזורך</h2>
                            </div>

                            <div className="relative w-full">
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={0}
                                    slidesPerView={1.5}
                                    autoplay={{ delay: 4000 }}
                                    navigation={{
                                        prevEl: prevRef.current,
                                        nextEl: nextRef.current,
                                    }}
                                    loop={true}
                                    className="businesses-container"
                                    breakpoints={{
                                        640: { slidesPerView: 1 },
                                        1024: { slidesPerView: 5 },
                                    }}
                                    dir="rtl" // תמיכה ב־RTL
                                >
                                    {featuredProperties.map((property) => (
                                        <SwiperSlide key={property.id}>
                                            <div className="mb-5 w-full px-1">
                                                <PropertyCard key={property.id} property={property} />
                                            </div>
                                        </SwiperSlide>
                                    ))}

                                    <Button
                                        variant={'link'}
                                        ref={prevRef}
                                        className="absolute top-[22%] left-[-25px] z-[20] h-[60px] w-[60px] rounded-full border border-[#dce4f5] bg-white shadow-[0_5px_30px_rgba(145,155,174,0.5)]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-primary h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M5 12h14" />
                                        </svg>
                                    </Button>

                                    {/* כפתור ימינה */}
                                    <Button
                                        variant={'link'}
                                        ref={nextRef}
                                        className="absolute top-[22%] right-[-25px] z-10 h-[60px] w-[60px] rounded-full border border-[#dce4f5] bg-white shadow-[0_5px_30px_rgba(145,155,174,0.5)]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-primary h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7M5 12h14" />
                                        </svg>
                                    </Button>
                                </Swiper>
                            </div>
                        </section>
                        <section className="py-2">
                            <div className="text-center">
                                <h2 className="font-almoni text-5xl text-[#2d3e61]">אזורים מבוקשים</h2>
                                <p className="mt-2 text-lg text-gray-600">גלו את הנכסים המובילים בערים ובשכונות הפופולריות ביותר</p>
                            </div>
                            {popularCities && popularCities.length > 0 && (
                                <div className="relative w-full py-2">
                                    <Swiper
                                        modules={[Navigation]}
                                        slidesPerView={'auto'}
                                        dir="rtl"
                                        breakpoints={{
                                            640: { slidesPerView: 1 },
                                            1024: { slidesPerView: 2 },
                                        }}
                                        navigation={true}
                                        spaceBetween={30}
                                    >
                                        <SwiperSlide>
                                            <div className="grid h-[500px] grid-cols-3 grid-rows-2 gap-4 lg:grid-cols-4">
                                                {popularCategories.map((city, index) => {
                                                    if (!city || typeof city !== 'object') return null;

                                                    const isLarge = index === 0;

                                                    return (
                                                        <div
                                                            key={city.id}
                                                            className={`relative overflow-hidden rounded-xl bg-cover bg-center shadow ${
                                                                isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                                                            }`}
                                                            style={{
                                                                backgroundImage: `url(${city.image_url || '/default.jpg'})`,
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 flex flex-col justify-between bg-black/30 p-4">
                                                                <h2 className="text-2xl font-bold text-white drop-shadow">
                                                                    {city.name_he || 'ללא עיר'}
                                                                </h2>
                                                                <Link href={`/cities/${city.slug}`}>
                                                                    <Button variant="outline">הצג נכס</Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            )}
                        </section>
                        <section className="py-2">
                            <div className="mb-2 text-center">
                                <h2 className="font-almoni text-4xl text-[#2d3e61]">נכסים שנרשמו לאחרונה בחיפה</h2>
                            </div>

                            <div className="relative w-full">
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={0}
                                    slidesPerView={1.5}
                                    autoplay={{ delay: 4000 }}
                                    navigation={{
                                        prevEl: prevRef.current,
                                        nextEl: nextRef.current,
                                    }}
                                    loop={true}
                                    className="businesses-container"
                                    breakpoints={{
                                        640: { slidesPerView: 1 },
                                        1024: { slidesPerView: 5 },
                                    }}
                                    dir="rtl" // תמיכה ב־RTL
                                >
                                    {featuredProperties.map((property) => (
                                        <SwiperSlide key={property.id}>
                                            <div className="mb-5 w-full px-1">
                                                <PropertyCard property={property} />
                                            </div>
                                        </SwiperSlide>
                                    ))}

                                    <Button
                                        variant={'link'}
                                        ref={prevRef}
                                        className="absolute top-[22%] left-[-25px] z-[20] h-[60px] w-[60px] rounded-full border border-[#dce4f5] bg-white shadow-[0_5px_30px_rgba(145,155,174,0.5)]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-primary h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M5 12h14" />
                                        </svg>
                                    </Button>

                                    {/* כפתור ימינה */}
                                    <Button
                                        variant={'link'}
                                        ref={nextRef}
                                        className="absolute top-[22%] right-[-25px] z-10 h-[60px] w-[60px] rounded-full border border-[#dce4f5] bg-white shadow-[0_5px_30px_rgba(145,155,174,0.5)]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-primary h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7M5 12h14" />
                                        </svg>
                                    </Button>
                                </Swiper>
                            </div>
                        </section>
                        <section className="bg-gray-50 py-16" aria-labelledby="popular-categories-section">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h2 id="popular-categories-section" className="mb-8 text-center text-3xl font-bold text-gray-900">
                                    סיווגים פופולריים
                                </h2>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={16}
                                    slidesPerView={2.1}
                                    breakpoints={{
                                        640: { slidesPerView: 2.2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                    pagination={{ clickable: true }}
                                >
                                    {popularCategories.map((category) => (
                                        <SwiperSlide key={category.id}>
                                            <a
                                                href={category.id}
                                                className="hover:border-primary block h-full rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                                            >
                                                <span className="text-lg font-medium text-gray-800">{category.name_he}</span>
                                            </a>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </section>

                        <section
                            className="relative overflow-hidden bg-white px-6 py-24 sm:px-12 lg:px-20"
                            aria-labelledby="section-smart-real-estate"
                        >
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f0f9ff] via-[#ecfeff] to-[#e0f2fe]" aria-hidden="true" />

                            <div className="mx-auto max-w-7xl">
                                <div className="text-center">
                                    <h2 id="section-smart-real-estate" className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                                        גלו את הדרך החכמה לקנות או לשכור נכס בישראל
                                    </h2>
                                    <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
                                        "נכסים+" משנה את חוקי המשחק עם טכנולוגיות AI מתקדמות, המלצות חכמות והתאמה אישית לצרכים שלכם – הכל במקום אחד,
                                        ידידותי, נגיש ומדויק.
                                    </p>
                                </div>

                                <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src="https://www.trulia.com/images/icons/txl3/illustrations/BuyAHome.svg"
                                            alt="חיפוש חכם לנכסים"
                                            className="mb-4 h-16 w-16"
                                        />
                                        <h3 className="text-xl font-semibold text-gray-800">חיפוש מונע בינה מלאכותית</h3>
                                        <p className="mt-2 text-gray-600">
                                            המערכת שלנו לומדת את ההעדפות שלכם ומציגה לכם נכסים רלוונטיים יותר – תחסכו זמן, תמצאו מהר.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center text-center">
                                        <img src="/icons/data-analytics.svg" alt="ניתוח שוק נדלן מתקדם" className="mb-4 h-16 w-16" />
                                        <h3 className="text-xl font-semibold text-gray-800">נתוני שוק בזמן אמת</h3>
                                        <p className="mt-2 text-gray-600">
                                            ניתוחים מבוססי דאטה על מגמות, מחירים, וביקושים לפי אזורים – תקבלו החלטות מושכלות יותר.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center text-center">
                                        <img src="/icons/community-reviews.svg" alt="ביקורות שכונה ודירוגים" className="mb-4 h-16 w-16" />
                                        <h3 className="text-xl font-semibold text-gray-800">חוות דעת ודירוגים מהשטח</h3>
                                        <p className="mt-2 text-gray-600">
                                            מה אומרים על השכונה? קבלו דירוגים, תמונות אמיתיות ותובנות ישירות מהקהילה – מידע אמיתי מבפנים.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-20 text-center">
                                    <a
                                        href="/properties"
                                        className="bg-primary inline-block rounded-full px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
                                    >
                                        התחילו את החיפוש שלכם עכשיו
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className="bg-muted/10 py-16" aria-labelledby="city-index-section">
                            <div className="mb-8 text-center">
                                <h2 id="city-index-section" className="text-3xl font-bold text-[color:var(--foreground)]">
                                    אינדקס ערים
                                </h2>
                                <p className="mt-2 text-[color:var(--muted-foreground)]">נווטו לפי א'-ב' לעיר הרלוונטית עבורכם.</p>
                            </div>

                            <div className="mx-auto px-4">
                                <Swiper spaceBetween={30} slidesPerView={1}>
                                    {/* Group cities into chunks */}
                                    {chunkArray(citiesIndex, 18).map((cityGroup, groupIndex) => (
                                        <SwiperSlide key={groupIndex}>
                                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                                                {cityGroup.map((city) => (
                                                    <a
                                                        href={`/cities/${encodeURIComponent(city.slug)}`}
                                                        key={city.id}
                                                        className="bg-background hover:bg-muted block rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-[color:var(--foreground)] shadow-sm transition"
                                                    >
                                                        {city.name_he}
                                                    </a>
                                                ))}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </section>
                    </main>
                </div>
                <footer className="hidden bg-gray-900 pt-16 pb-8 text-white lg:block">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Column 1 - Logo and About */}
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <AppLogo className="h-10 w-10" />
                                </div>
                                <p className="mb-4 text-right text-gray-400">
                                    נכסים+ היא הפלטפורמה המובילה למציאת נכסים בישראל. אנו מחברים בין מוכרים, קונים, משכירים ושוכרים באמצעות טכנולוגיה
                                    מתקדמת וממשק ידידותי.
                                </p>
                            </div>

                            {/* Column 2 - Quick Links */}
                            <div>
                                <h3 className="mb-4 text-right text-lg font-bold">קישורים מהירים</h3>
                                <ul className="space-y-2 text-right">
                                    <li>
                                        <a href="/about" className="text-gray-400 transition-colors hover:text-white">
                                            אודות
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/properties" className="text-gray-400 transition-colors hover:text-white">
                                            נכסים
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/agents" className="text-gray-400 transition-colors hover:text-white">
                                            סוכנים
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/blog" className="text-gray-400 transition-colors hover:text-white">
                                            בלוג
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/contact" className="text-gray-400 transition-colors hover:text-white">
                                            צור קשר
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3 - Legal */}
                            <div>
                                <h3 className="mb-4 text-right text-lg font-bold">מידע משפטי</h3>
                                <ul className="space-y-2 text-right">
                                    <li>
                                        <a href="/terms" className="text-gray-400 transition-colors hover:text-white">
                                            תנאי שימוש
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/privacy" className="text-gray-400 transition-colors hover:text-white">
                                            מדיניות פרטיות
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/cookies" className="text-gray-400 transition-colors hover:text-white">
                                            מדיניות עוגיות
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/accessibility" className="text-gray-400 transition-colors hover:text-white">
                                            נגישות
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 4 - Contact */}
                            <div>
                                <h3 className="mb-4 text-right text-lg font-bold">צור קשר</h3>
                                <ul className="space-y-4 text-right">
                                    <li className="flex items-center justify-end gap-2">
                                        <span className="text-gray-400">info@nechasim.plus</span>
                                        <Mail size={18} className="text-gray-400" />
                                    </li>
                                    <li className="flex items-center justify-end gap-2">
                                        <span className="text-gray-400">03-1234567</span>
                                        <Phone size={18} className="text-gray-400" />
                                    </li>
                                    <li className="mt-6 flex items-center justify-end gap-2">
                                        <select
                                            className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-right text-gray-400"
                                            defaultValue="he"
                                        >
                                            <option value="he">עברית</option>
                                            <option value="en">English</option>
                                        </select>
                                        <Globe size={18} className="text-gray-400" />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr className="mb-8 border-gray-700" />

                        <div className="text-center text-sm text-gray-500">
                            <p>© {new Date().getFullYear()} נכסים+ כל הזכויות שמורות</p>
                        </div>
                    </div>
                </footer>
            </AppLayout>
        </>
    );
}
