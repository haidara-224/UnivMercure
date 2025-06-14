<?php

use App\Models\anneesScolaire;
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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('module');
            $table->foreignIdFor(matiere::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(anneesScolaire::class)->constrained()->cascadeOnDelete();
            $table->date('date_examen');
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
        Schema::dropIfExists('exams');
    }
};
