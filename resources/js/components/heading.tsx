export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <div class="flex flex-col items-start gap-1 border-b border-gray-100 py-5">
            <div class="text-lg leading-normal font-medium text-neutral-900 dark:text-white">{title}</div>
            <div class="text-sm leading-tight font-normal text-gray-600 dark:text-slate-400">
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
        </div>
    );
}
