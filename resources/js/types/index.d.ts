import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

type PropertyList = Property[];
export interface Property {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    type: 'sale' | 'rent';
    city: string;
    neighborhood: string;
    address: string;
    size: number; // שטח בנוי ברגל מרובעים
    bedrooms: number; // מספר חדרים
    bathrooms: number; // מספר חדרי רחצה
    parkingSpaces: number; // מספר מקומות חניה
    petsAllowed: boolean; // האם מותר להכניס חיות מחמד
    yearBuilt: number; // שנה בניה
    available: boolean; // האם הנכס זמין כרגע
    url: string; // קישור לנכס
    amenities: string[]; // רשימת מתקנים/שירותים
    created_at: string; // תאריך יצירה
    updated_at: string; // תאריך עדכון
    [key: string]: unknown; // This allows for additional properties...
    // Additional properties can be added here
    // if needed, such as 'features', 'floor_plan', etc.
    features?: string[]; // תכונות נוספות של הנכס
    floor_plan?: string; // קישור לתכנית קומה
    video_tour?: string; // קישור לסיור וידאו
    virtual_tour?: string; // קישור לסיור וירטואלי
}
