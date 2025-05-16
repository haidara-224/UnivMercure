<?php

use App\Models\classes;
use App\Models\departement;
use App\Models\Professeur;
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
        Schema::create('examensclasses', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('fichier')->nullable();
            $table->dateTime('date_debut');
            $table->dateTime('date_fin');
            $table->text('sujet_explication')->nullable();
            $table->foreignIdFor(Professeur::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(departement::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(classes::class)->constrained()->cascadeOnDelete();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examensclasses');
    }
};
