<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Property::create([
            'title' => 'דירת 3 חדרים במרכז תל אביב',
            'description' => 'דירת 3 חדרים מרווחת במיקום מרכזי מאוד, קרוב לתחבורה ציבורית וקניונים.',
            'image_url' => 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'price' => 3500000,
            'property_type' => 'apartment',
            'type' => 'sale',
            'state' => 'תל אביב',
            'city' => 'תל אביב',
            'neighborhood' => 'הצפון הישן',
            'zip_code' => '61000',
            'latitude' => 32.0809,
            'longitude' => 34.7806,
            'size' => 85,
            'bedrooms' => 3,
            'bathrooms' => 2,
            'parking_spaces' => 1,
            'pets_allowed' => true,
            'year_built' => 1998,
            'available' => true,
            'url' => 'https://example.com/property/1',
            'amenities' => ['air condition', 'balcony', 'fire place'],
        ]);

        // תוכל להוסיף כאן עוד נכסים לפי הצורך
    }
}
