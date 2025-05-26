import { MapPin } from 'lucide-react';
import React from 'react';
import { Property } from '../types';

interface PropertyPreviewProps {
    property: Property;
}

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        maximumFractionDigits: 0,
    }).format(price);
};

const PropertyPreview: React.FC<PropertyPreviewProps> = ({ property }) => {
    return (
        <div className="cursor-pointer border-b p-4 transition-colors duration-200 last:border-b-0 hover:bg-gray-50">
            <div className="flex items-center">
                <img src={property.imageUrl} alt={property.title} className="ml-4 h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{property.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="ml-1 h-4 w-4" />
                        {property.location}
                    </div>
                    <div className="text-primary mt-1 text-lg font-bold">{formatPrice(property.price)}</div>
                </div>
            </div>
        </div>
    );
};

export default PropertyPreview;
