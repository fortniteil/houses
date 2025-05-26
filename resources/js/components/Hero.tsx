import { Search } from 'lucide-react';
import React, { useCallback, useState } from 'react';

const HeroSection: React.FC = () => {
    const [propertyMode, setPropertyMode] = useState<'sale' | 'rent'>('rent');
    const [selectedCity, setSelectedCity] = useState('');
    const [citySuggestions, setCitySuggestions] = useState<string[]>([]);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLowerCase().trim();
        setSelectedCity(e.target.value);

        if (val.length > 1) {
            const filtered = cities.filter((city) => city.toLowerCase().includes(val));
            setCitySuggestions(filtered.length ? filtered : ['לא נמצאו תוצאות']);
        } else {
            setCitySuggestions([]);
        }
    };

    const handleCitySelect = (city: string) => {
        if (city === 'לא נמצאו תוצאות') return;
        setSelectedCity(city);
        setCitySuggestions([]);
    };

    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            // TODO: כאן להפעיל חיפוש אמיתי או ניווט לדף תוצאות
            console.log('Search:', { mode: propertyMode, city: selectedCity });
        },
        [propertyMode, selectedCity],
    );

    return (
        <section className="relative flex min-h-[30vh] w-full px-4 py-4 md:min-h-[70vh]">
            <div className="relative z-10 flex w-full items-center justify-center rounded-md bg-white/90 p-8 dark:bg-[#1c2432]">
                {/* רקע קבוע מאחור */}
                <div
                    className="absolute inset-0 -z-10 rounded-md bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.trulia.com/images/app-shopping/homePage/extraLarge.webp')",
                    }}
                ></div>

                {/* תוכן ממורכז */}
                <div className="flex h-full w-full flex-col items-center justify-center text-center">
                    {/* טקסט וסלוגן */}
                    <div className="mb-4">
                        <h1 className="font-almoni mb-4 text-center text-4xl font-bold text-white dark:text-white">גלו מקום שתאהבו לגור בו</h1>
                        <p className="text-center text-white/70 dark:text-gray-300">
                            מצאו את הבית הבא שלכם במהירות ובקלות – דירות למכירה ולהשכרה בקריות ובחיפה, בלי תיווך, בלי כאבי ראש.
                        </p>
                    </div>

                    {/* כפתורי טוגל */}
                    <div className="mb-6 flex justify-center gap-4">
                        <button
                            className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
                                propertyMode === 'rent' ? 'bg-blue-400 text-white shadow-md' : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                            onClick={() => setPropertyMode('rent')}
                            aria-pressed={propertyMode === 'rent'}
                        >
                            להשכרה
                        </button>
                        <button
                            className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
                                propertyMode === 'sale' ? 'bg-[#10b981] text-white shadow-md' : 'bg-white text-gray-800 hover:bg-gray-100'
                            }`}
                            onClick={() => setPropertyMode('sale')}
                            aria-pressed={propertyMode === 'sale'}
                        >
                            למכירה
                        </button>
                    </div>

                    {/* תיבת חיפוש */}
                    <div className="relative w-full max-w-md">
                        <label htmlFor="city-search" className="sr-only">
                            חיפוש עיר, שכונה, מיקוד או כתובת
                        </label>
                        <input
                            id="city-search"
                            type="text"
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="חיפוש עיר, שכונה, מיקוד או כתובת"
                            aria-autocomplete="list"
                            aria-controls="city-listbox"
                            aria-expanded={citySuggestions.length > 0}
                            className="w-full rounded-md border border-gray-300 bg-white py-3 pr-12 pl-4 text-right text-sm text-gray-800 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        />
                        <Search
                            size={20}
                            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                            aria-hidden="true"
                        />

                        {citySuggestions.length > 0 && (
                            <ul
                                id="city-listbox"
                                role="listbox"
                                className="ring-opacity-5 absolute top-full z-20 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-[#1c2432]"
                            >
                                {citySuggestions.map((city) =>
                                    city === 'לא נמצאו תוצאות' ? (
                                        <li key="no-results" className="px-4 py-2 text-right text-sm text-gray-500 dark:text-gray-400">
                                            {city}
                                        </li>
                                    ) : (
                                        <li
                                            key={city}
                                            role="option"
                                            onClick={() => handleCitySelect(city)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    handleCitySelect(city);
                                                }
                                            }}
                                            tabIndex={0}
                                            className="cursor-pointer px-4 py-2 text-right text-sm text-gray-800 hover:bg-green-100 dark:text-gray-200 dark:hover:bg-green-700"
                                        >
                                            {city}
                                        </li>
                                    ),
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
