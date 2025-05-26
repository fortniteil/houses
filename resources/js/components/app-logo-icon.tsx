import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <polygon points="32,8 8,28 56,28" />
            <rect x="12" y="28" width="40" height="28" rx="3" />
            <path d="M50 12h-4v4h-4v4h4v4h4v-4h4v-4h-4v-4z" fill="white" />
        </svg>
    );
}
