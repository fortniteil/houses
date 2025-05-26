import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect } from 'react';
import SeoHead from './SeoHead';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    seo?: {
        title?: string;
        description?: string;
    };
}

export default function AppLayout({ children, seo, breadcrumbs, ...props }: AppLayoutProps) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((reg) => {
                    console.log('✅ Service Worker Registered:', reg);
                })
                .catch((err) => {
                    console.error('❌ Service Worker registration failed:', err);
                });
        }
    }, []);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <SeoHead seo={seo} />
            {children}
        </AppLayoutTemplate>
    );
}
