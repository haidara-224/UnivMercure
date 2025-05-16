<?php

use App\Models\etudiant;
use App\Models\examensclasse;
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
        Schema::create('examensclasseresponses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(examensclasse::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(etudiant::class)->constrained()->cascadeOnDelete();
            $table->text('fichier')->nullable();
            $table->text('reponse')->nullable();
            $table->string('commentaire')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examensclasseresponses');
    }
};
