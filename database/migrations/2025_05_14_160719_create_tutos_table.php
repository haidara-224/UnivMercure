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
        Schema::create('tutos', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('contenue')->nullable();
            $table->text('fichier')->nullable();
            $table->text('video')->nullable();
            $table->foreignIdFor(Professeur::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(departement::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(classes::class)->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutos');
    }
};
