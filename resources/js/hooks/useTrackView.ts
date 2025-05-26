import { getVisitorId } from '@/lib/fingerprint';
import { useEffect } from 'react';

export function useTrackView(propertyId?: number) {
    useEffect(() => {
        const send = async () => {
            const visitorId = await getVisitorId();

            await fetch('/api/track-property-view', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    visitorId,
                    propertyId,
                    path: window.location.pathname + window.location.search,
                    referrer: document.referrer || null,
                    ts: Date.now(),
                }),
            });
        };

        send().catch(console.error);
    }, [propertyId]);
}
