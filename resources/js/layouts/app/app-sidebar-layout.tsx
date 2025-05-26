import { AppContent } from '@/components/app-content';
import AppLogo from '@/components/app-logo';
import { AppShell } from '@/components/app-shell';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/ui/LoginModal';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Menu, X } from 'lucide-react';
import { useState, type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { url } = usePage();
    const getInitials = useInitials();

    return (
        <AppShell variant="header">
            <div className="flex min-h-full flex-col pb-16 sm:pb-0">
                <header className="sticky top-0 z-30 h-20 shrink-0 border-b border-[#dce4f5] bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-4">
                        {/* צד ימין - לוגו */}
                        <div className="flex items-center">
                            <AppLogo />
                        </div>

                        {/* מרכז - תפריט */}
                        <nav aria-label="Main" className="hidden flex-1 justify-center sm:flex">
                            <ul className="flex space-x-1 rtl:space-x-reverse">
                                {breadcrumbs.map((breadcrumb, index) => {
                                    const isActive = url === breadcrumb.href;
                                    return (
                                        <li key={index}>
                                            <a
                                                href={breadcrumb.href}
                                                className={`group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? 'bg-slate-100 text-slate-900 dark:bg-gray-800 dark:text-slate-50'
                                                        : 'bg-white hover:bg-slate-100 hover:text-slate-900 dark:bg-gray-900 dark:text-slate-400 dark:hover:bg-gray-800 dark:hover:text-slate-50'
                                                }`}
                                            >
                                                {breadcrumb.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* צד שמאל - כניסה/אוואטר/כפתור פוסט */}
                        <div className="flex hidden items-center gap-x-4 md:block">
                            {auth.user ? (
                                <>
                                    <Avatar className="relative flex h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback>
                                            <img
                                                className="aspect-square h-full w-full object-cover"
                                                src={`https://ui-avatars.com/api/?name=${getInitials(auth.user.name)}&color=7F9CF5&background=EBF4FF`}
                                            />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Link
                                        href={route('home')}
                                        className="touchable-opacity inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#052135] to-[#212427] px-4 py-2 text-sm font-medium text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-2 h-4 w-4">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="sm:hidden">פוסט</span>
                                        <span className="hidden sm:inline">פוסט חדש</span>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="h-10 w-full rounded-md border-2 border-[#1cd1a1] bg-white text-[#1cd1a1] hover:text-gray-900"
                                    >
                                        כניסה / הרשמה
                                    </Button>
                                </div>
                            )}
                        </div>
                        <button className="text-gray-700 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isOpen && (
                        <div
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
                            onClick={() => setIsOpen(false)} // סגירה בלחיצה על הרקע
                        >
                            <div
                                onClick={(e) => e.stopPropagation()} // כדי למנוע סגירה כשנלחץ על התפריט
                                className="fixed bottom-0 w-full translate-y-0 rounded-t-2xl bg-white shadow-lg transition-transform duration-300"
                            >
                                {/* Handle bar */}
                                <div className="mx-auto mt-1 h-1.5 w-34 rounded-full bg-gray-300" />
                                <div className="container mx-auto flex flex-col space-y-4 px-4 py-6 text-right">
                                    <div className="flex flex-col space-y-2">
                                        <LinkItem href="/" icon="🏠" label="דף הבית" />
                                        <LinkItem href="/for-sale" icon="💰" label="למכירה" />
                                        <LinkItem href="/for-rent" icon="📦" label="להשכרה" />
                                        <LinkItem href="/projects" icon="🏗️" label="פרויקטים" />
                                        <LinkItem href="/agents" icon="🧑‍💼" label="סוכנים" />
                                        <LinkItem href="/contact" icon="✉️" label="צור קשר" />
                                    </div>

                                    {auth.user ? (
                                        <>
                                            <div className="flex items-center gap-3 pt-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={auth.user.avatar} />
                                                    <AvatarFallback>
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${getInitials(auth.user.name)}&color=7F9CF5&background=EBF4FF`}
                                                            alt={auth.user.name}
                                                            className="h-full w-full rounded-full object-cover"
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">{auth.user.name}</span>
                                            </div>

                                            <Link
                                                href={route('home')}
                                                className="mt-3 inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#052135] to-[#212427] px-4 py-2 text-sm font-medium text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="ml-2 h-4 w-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="sm:hidden">פוסט</span>
                                                <span className="hidden sm:inline">פוסט חדש</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setIsOpen(false);
                                                }}
                                                variant="outline"
                                                className="w-full border-2 border-[#f3f3f3] hover:bg-slate-100"
                                            >
                                                כניסה / הרשמה
                                            </Button>
                                            <Link href={route('register')}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-2 border-[#1cd1a1] bg-white text-[#1cd1a1] hover:text-gray-900"
                                                >
                                                    בעלי עסק ? הצטרפו אלינו
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {showModal && <LoginModal onClose={() => setShowModal(false)} />}
                </header>
                {/*  <div className="w-full bg-gradient-to-r from-[#6DCFF6] to-[#0076C0] py-2 text-center text-white">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:flex-row sm:px-6 lg:px-8">
                        <div className="mb-2 flex items-center sm:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                ></path>
                            </svg>
                            <span className="text-lg font-bold">אתר דירות זמין גם בנייד !</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://apps.apple.com/app/6742006567"
                                target="_blank"
                                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-900"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.0415 12.5008C17.0288 9.68772 19.3647 8.31581 19.4706 8.24324C18.1866 6.30342 16.1395 6.0424 15.4294 6.02612C13.7121 5.85448 12.0519 7.0518 11.1829 7.0518C10.2976 7.0518 8.95248 6.04239 7.50442 6.07496C5.66143 6.10753 3.94472 7.17448 3.00291 8.83772C1.06309 12.2235 2.51115 17.2058 4.37042 19.9677C5.30409 21.3233 6.38732 22.8525 7.81909 22.7972C9.21432 22.7419 9.73378 21.9114 11.4179 21.9114C13.0857 21.9114 13.5725 22.7972 15.0369 22.7663C16.5339 22.7419 17.4594 21.3723 18.3604 20.0004C19.4436 18.4222 19.8894 16.8766 19.9121 16.8051C19.8731 16.7906 17.0578 15.7236 17.0415 12.5008Z"></path>
                                    <path d="M14.4282 4.24342C15.1872 3.30975 15.6903 2.01627 15.5513 0.699951C14.4445 0.748094 13.0656 1.44709 12.2741 2.35447C11.5641 3.15132 10.9517 4.48015 11.1071 5.76549C12.3434 5.85434 13.6395 5.16448 14.4282 4.24342Z"></path>
                                </svg>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm leading-tight font-semibold">App Store</span>
                                </div>
                            </a>
                            <button
                                className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 p-1.5 text-white transition hover:bg-black/20"
                                aria-label="Close banner"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-full w-full"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div> */}
                <AppContent variant="header">{children}</AppContent>
                <Footer />
            </div>
        </AppShell>
    );
}

const LinkItem = ({ href, icon, label }) => (
    <a
        href={href}
        className="flex items-center justify-start gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-800 transition hover:bg-gray-100"
    >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
    </a>
);
