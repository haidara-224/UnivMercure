<?php

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
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
        Schema::create('parcours', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(etudiant::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(classes::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(departement::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(anneesScolaire::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parcours');
    }
};
