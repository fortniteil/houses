<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Providers\OpenAiSeoService;
use App\Models\SeoDescription;
use App\Models\Property;
use App\Models\cities as City;
use Illuminate\Support\Facades\Cache;

class WebController extends Controller
{
    public function index(Request $request)
    {
        $userCity = $request->input('city', 'תל אביב');
        if (!City::where('name_he', $userCity)->exists()) {
            $userCity = 'תל אביב';
        }

        $featuredProperties = Property::where('city', $userCity)
            ->where('available', true)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        $popularCities = Cache::remember('popular_cities', 3600, function () {
            return City::withCount('properties')
                ->whereHas('properties', function ($q) {
                    $q->where('created_at', '>=', now()->subMonths(3));
                })
                ->orderBy('properties_count', 'desc')
                ->take(8)
                ->get();
        });

        $popularCategories = City::withCount('properties')
            ->orderBy('properties_count', 'desc')

            ->get();

        $citiesIndex = Cache::remember('cities_index', 3600, function () {
            return City::orderBy('name_he')->get();
        });

        return Inertia::render('welcome', [
            'featuredProperties' => $featuredProperties,
            'popularCities' => $popularCities,
            'popularCategories' => $popularCategories,
            'citiesIndex' => $citiesIndex,
        ]);
    }
}
