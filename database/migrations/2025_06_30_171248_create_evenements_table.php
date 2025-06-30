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
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('badge');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * À venir', 'en cours', 'terminé', 'Important'
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
