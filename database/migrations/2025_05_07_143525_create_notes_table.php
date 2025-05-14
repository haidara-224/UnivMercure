<?php

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(anneesScolaire::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(etudiant::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(matiere::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(departement::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(classes::class)->constrained()->cascadeOnDelete();
            $table->string('module')->nullable();
            $table->float('note1',10,2)->nullable();
            $table->float('note2',10,2)->nullable();
            $table->float('note3',10,2)->nullable();
            $table->float('moyenne',10,2)->nullable();

            $table->enum('moyenne_literaire', ['A+','A-','A', 'B+','B-','B', 'C+','C-','C', 'D+','D-','D', 'E','F'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
