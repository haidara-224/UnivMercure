<?php

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\matiere;
use App\Models\Professeur;
use App\Models\salle;
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
        Schema::create('emploies', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(anneesScolaire::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(classes::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(departement::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Professeur::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(salle::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(matiere::class)->constrained()->cascadeOnDelete();
            $table->enum('jour', ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']);
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emploies');
    }
};
