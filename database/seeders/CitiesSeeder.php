<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            ['name_he' => 'תל אביב', 'slug' => 'tel-aviv'],
            ['name_he' => 'ירושלים', 'slug' => 'jerusalem'],
            ['name_he' => 'חיפה', 'slug' => 'haifa'],
            ['name_he' => 'באר שבע', 'slug' => 'beer-sheva'],
            ['name_he' => 'ראשון לציון', 'slug' => 'rishon-lezion'],
            // ועוד...
        ];

        foreach ($cities as $city) {
            \App\Models\cities::firstOrCreate($city);
        }
    }
}
