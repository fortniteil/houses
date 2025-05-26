<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('property_views', function (Blueprint $table) {
            $table->id();
            $table->string('visitor_id')->index();
            $table->string('session_id')->index();
            $table->foreignId('property_id')->nullable();
            $table->string('path');
            $table->string('referrer')->nullable();
            $table->string('device')->nullable();
            $table->string('browser')->nullable();
            $table->string('os')->nullable();
            $table->string('lang')->nullable();
            $table->string('screen')->nullable();
            $table->json('utm')->nullable();
            $table->boolean('is_returning_visitor')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_views');
    }
};
