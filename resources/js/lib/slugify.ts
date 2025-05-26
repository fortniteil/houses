// utils/slugify.ts
export function cityToSlug(cityName: string): string {
    const cityMap: Record<string, string> = {
        'תל אביב': 'tel-aviv',
        'תל אביב-יפו': 'tel-aviv-yafo',
        ירושלים: 'jerusalem',
        חיפה: 'haifa',
        'באר שבע': 'beer-sheva',
        'ראשון לציון': 'rishon-lezion',
        'פתח תקווה': 'petah-tikva',
        נתניה: 'netanya',
        אשדוד: 'ashdod',
        רחובות: 'rehovot',
        // ... תוכל להוסיף כאן ערים נוספות
    };

    return (
        cityMap[cityName] ||
        cityName
            .normalize('NFKD')
            .replace(/[\u0590-\u05FF]/g, '') // מחק עברית
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase()
    );
}
