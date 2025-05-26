import { Bath, Bed, MapPin, Ruler } from 'lucide-react';
import React from 'react';
import { PropertyList } from '../types';

interface PropertyCardProps {
    property: PropertyList;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    // Format price with commas
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#1c2432]">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={property.image_url}
                    alt={property.title}
                    className="h-full w-full rounded-xl object-cover transition-transform duration-500 hover:scale-110"
                />
                <div
                    className={`absolute top-3 left-3 rounded px-2 py-1 text-xs font-bold text-white ${property.type === 'sale' ? 'bg-[#10b981]' : ''} ${property.type === 'rent' ? 'bg-blue-400' : ''} `}
                >
                    {property.type === 'sale' ? 'למכירה' : 'להשכרה'}
                </div>
            </div>

            <div className="p-1">
                <h2 className="text-primary-dark font-almoni text-2xl">₪{formatPrice(property.price)}</h2>

                <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Ruler size={16} className="ml-1 text-[green]" />
                        <span className="text-primary-dark">{property.size} מ"ר</span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Bed size={16} className="ml-1 text-[green]" />
                        <span className="text-primary-dark">{property.bedrooms} חדרים</span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Bath size={16} className="ml-1 text-[green]" />
                        <span className="text-primary-dark">{property.bathrooms}</span>
                    </div>
                </div>

                <div className="mb-2 flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="ml-1 text-[red]" />
                    <span className="text-primary-dark text-lg">
                        {property.city}, {property.neighborhood}, {property.zip_code}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
