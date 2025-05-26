<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertySeoController;
use App\Http\Controllers\WebController;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', [WebController::class, 'index'])->name('home');



Route::get('/properties', [PropertySeoController::class, 'index'])->name('properties.index'); // רשימת נכסים
Route::get('/cities/{citySlug}', [PropertySeoController::class, 'showCity'])->name('cities.show'); // נכסים בעיר לפי slug
Route::get('/property/{id}/{slug?}', [PropertySeoController::class, 'showProperty'])->name('property.show');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
