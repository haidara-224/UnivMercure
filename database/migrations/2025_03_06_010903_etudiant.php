<?php

use App\Models\classes;
use App\Models\departement;
use App\Models\User;
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
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->string('name');
            $table->string('prenom');
            $table->string('telephone')->nullable();
            $table->string('photo')->nullable();
            $table->enum('sexe',['masculin','feminin']);
            $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
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
        Schema::dropIfExists('etudiants');
    }
};
