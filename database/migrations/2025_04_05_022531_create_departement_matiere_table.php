<?php

use App\Models\departement;
use App\Models\matiere;
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
        Schema::create('departement_matiere', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(departement::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(matiere::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departement_matiere');
    }
};
