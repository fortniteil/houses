<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertySeoController;
use App\Http\Controllers\TrackingController;

Route::middleware('/')->post('track-interaction', [TrackingController::class, 'store']);

Route::post('/api/visitor-log', [TrackingController::class, 'store']);
Route::post('/api/recommendations?visitor_id=xxx', [TrackingController::class, 'store']);

Route::get('api/properties/{city}', [PropertySeoController::class, 'show']);
