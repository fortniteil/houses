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
        Schema::create('visitor_interactions', function (Blueprint $table) {
            $table->id();
            $table->string('visitor_id')->index();
            $table->string('action');
            $table->string('location')->nullable(); // למשל, URL או page name
            $table->json('data')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();

            $table->unsignedInteger('count')->default(1);
            $table->timestamp('first_visited_at')->useCurrent();
            $table->timestamp('last_visited_at')->useCurrent();

            $table->timestamps();

            $table->unique(['visitor_id', 'action', 'location']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitor_interactions');
    }
};
