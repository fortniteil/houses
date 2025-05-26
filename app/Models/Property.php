<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Property extends Model
{
    protected $table = 'properties';

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($property) {
            if ($property->isDirty('title') || !$property->slug) {
                $baseSlug = Str::slug($property->title);

                // אפשר להוסיף שכונה או עיר ל-baseSlug למקסימום SEO
                if ($property->neighborhood) {
                    $baseSlug .= '-' . Str::slug($property->neighborhood);
                } elseif ($property->city) {
                    $baseSlug .= '-' . Str::slug($property->city);
                }

                $property->slug = static::generateUniqueSlug($baseSlug, $property->id);
            }
        });
    }

    private static function generateUniqueSlug($baseSlug, $propertyId = null)
    {
        $slug = $baseSlug;
        $count = 1;

        while (static::where('slug', $slug)
            ->when($propertyId, function ($query) use ($propertyId) {
                return $query->where('id', '!=', $propertyId);
            })
            ->exists()
        ) {
            $slug = $baseSlug . '-' . $count++;
        }

        return $slug;
    }
    protected $fillable = [
        'title',
        'description',
        'image_url',
        'price',
        'property_type',
        'type',
        'state',
        'city',
        'neighborhood',
        'zip_code',
        'latitude',
        'longitude',
        'size',
        'bedrooms',
        'bathrooms',
        'parking_spaces',
        'pets_allowed',
        'year_built',
        'available',
        'url',
        'amenities',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'price' => 'integer',
        'size' => 'integer',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'parking_spaces' => 'integer',
        'pets_allowed' => 'boolean',
        'available' => 'boolean',
        'amenities' => 'array',
    ];
}
