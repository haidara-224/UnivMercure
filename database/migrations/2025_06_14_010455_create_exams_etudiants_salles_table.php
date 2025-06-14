<?php

use App\Models\etudiant;
use App\Models\exam;
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
        Schema::create('exams_etudiants_salles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(exam::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(etudiant::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(salle::class)->constrained()->cascadeOnDelete();
            $table->unique(['exam_id', 'etudiant_id']);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams_etudiants_salles');
    }
};
