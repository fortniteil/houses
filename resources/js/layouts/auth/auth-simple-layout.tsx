import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-full flex-col py-12 sm:px-6 lg:px-8">
            <Link href={route('home')} className="flex flex-col items-center gap-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <AppLogoIcon className="mx-auto w-16 text-[var(--foreground)] dark:text-white" />
                </div>
            </Link>
            <div className="mt-9 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="border-gray-100 bg-white p-8 sm:rounded-2xl sm:border sm:px-10 sm:shadow">
                    <div className="flex w-full flex-col gap-y-6">
                        <div>
                            <div className="text-center text-xl leading-7 font-medium text-neutral-900">{title}</div>
                            <div className="text-center text-xs leading-none font-normal text-gray-600">{description}</div>
                        </div>
                        <div data-orientation="horizontal" role="none" className="h-[1px] w-full shrink-0 bg-gray-100 dark:bg-gray-800"></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
