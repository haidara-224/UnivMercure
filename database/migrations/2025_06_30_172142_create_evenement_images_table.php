<?php

use App\Models\Evenement;
use App\Models\Image;
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
        Schema::create('evenement_images', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Evenement::class)->constrained()->onDelete('cascade')->comment('Foreign key referencing the Evenement table');
            $table->foreignIdFor(Image::class)->constrained()->onDelete('cascade')->comment('Foreign key referencing the Image table');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenement_images');
    }
};
