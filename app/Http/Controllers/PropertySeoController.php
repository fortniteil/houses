<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Property; // ✅ זה חשוב!
use App\Models\cities as City; // ✅ זה חשוב!
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class PropertySeoController extends Controller
{
    public function showCity(string $cityName)
    {
        // בדיקה אם מדובר בעברית
        $isHebrew = preg_match('/[\x{0590}-\x{05FF}]/u', urldecode($cityName));

        if ($isHebrew) {
            // משתמש הקליד בעברית - נמצא את העיר לפי השם בעברית
            $city = City::where('name_he', urldecode($cityName))->first();

            if ($city) {
                // הפניה ל־slug באנגלית ל־SEO תקין
                return redirect("/cities/{$city->slug}", 301);
            }

            abort(404, 'העיר לא נמצאה');
        }

        // אחרת, זה slug אנגלי – טוענים את העיר
        $city = City::where('slug', $cityName)->firstOrFail();

        $properties = Property::where('city', $city->name_he)->paginate(10);

        return inertia('Properties/City', [
            'properties' => $properties,
            'city' => [
                'name_he' => $city->name_he,
                'slug' => $city->slug,
            ],
            'seo' => [
                'title' => "נכסים בעיר {$city->name_he} | נכסים+",
                'description' => "מצא דירות, בתים ונכסים בעיר {$city->name_he} עם המלצות חכמות.",
            ],
        ]);
    }

    public function show(string $city)
    {
        $properties = Property::where('city', $city)->paginate(10);

        $seo = [
            'title' => "נכסים ב-{$city} | נכסים+",
            'description' => "מצא דירות ונכסים ב-{$city} עם המלצות חכמות ו-AI.",
        ];

        return response()->json([
            'properties' => $properties,
            'seo' => $seo,
        ]);
    }

    public function index(Request $request)
    {
        $visitorId = $request->header('X-Visitor-Id');
        $preferredCity = null;

        if ($visitorId) {
            $views = Cache::get("views:{$visitorId}", []);
            $cityViews = [];

            foreach ($views as $view) {
                if (preg_match('@/properties/([^/?]+)@u', $view['url'], $matches)) {
                    $city = urldecode($matches[1]);
                    $cityViews[$city] = ($cityViews[$city] ?? 0) + 1;
                }
            }

            arsort($cityViews);
            $preferredCity = array_key_first($cityViews);
        }

        $query = Property::query();

        if ($preferredCity) {
            $query->where('city', $preferredCity);
        }

        $properties = $query->latest()->take(10)->get();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'seo' => [
                'title' => $preferredCity ? "נכסים ב־$preferredCity" : "כל הנכסים",
                'description' => $preferredCity ? "תוצאות מותאמות עבורך." : "עיין בכל הנכסים הזמינים.",
            ],
        ]);
    }

    public function showProperty(int $id, string $slug = null)
    {
        $cacheKey = "property_show_{$id}";

        $property = Cache::remember($cacheKey, 3600, function () use ($id) {
            return Property::findOrFail($id);
        });
        if ($slug !== $property->slug) {
            // Redirect ל-slug הנכון לשמירת SEO טוב
            return redirect()->route('property.show', ['id' => $id, 'slug' => $property->slug], 301);
        }

        $seo = [
            'title' => "{$property->title} - נכס למכירה | נכסים+",
            'description' => "פרטי הנכס: {$property->title} ב-{$property->city}. מחיר: {$property->price} ₪.",
        ];

        $schemaData = [
            "@context" => "https://schema.org",
            "@type" => "Apartment",
            "name" => $property->title,
            "description" => $property->description,
            "image" => $property->image_url,
            "address" => [
                "@type" => "PostalAddress",
                "addressLocality" => $property->city,
                "postalCode" => $property->zip_code,
            ],
            "numberOfRooms" => $property->bedrooms,
            "floorSize" => [
                "@type" => "QuantitativeValue",
                "value" => $property->size,
                "unitCode" => "M2"
            ],
            "price" => $property->price,
            "priceCurrency" => "ILS",
            "url" => route('property.show', ['id' => $id, 'slug' => $property->slug], 301),
            "petsAllowed" => $property->pets_allowed,
            "yearBuilt" => $property->year_built
        ];

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'seo' => $seo,
            'schemaData' => $schemaData,

        ]);
    }
}
