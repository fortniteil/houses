import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'touchable-opacity inline-flex h-10 items-center justify-center rounded-xl px-4 py-2 font-medium whitespace-nowrap text-slate-900 underline-offset-4 ring-offset-white transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
