export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    return (
        <div class="flex flex-col gap-y-1 border-b border-gray-100 pb-4">
            <div class="text-lg leading-normal font-medium text-neutral-900">{title}</div>
            <div class="text-sm leading-tight font-normal text-gray-600">
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
        </div>
    );
}
