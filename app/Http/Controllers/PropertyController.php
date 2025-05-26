<?php

namespace App\Http\Controllers;

use App\Models\Property; // ✅ זה חשוב!
use Inertia\Inertia;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function showProperty(int $id)
    {
        $property = Property::findOrFail($id);

        $seo = [
            'title' => "{$property->name} - נכס למכירה | נכסים+",
            'description' => "פרטי הנכס: {$property->name} ב-{$property->city}. מחיר: {$property->price} ₪.",

        ];

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'seo' => $seo,
        ]);
    }
}
