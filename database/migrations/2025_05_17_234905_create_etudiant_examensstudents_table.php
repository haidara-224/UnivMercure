<?php

use App\Models\etudiant;
use App\Models\examensstudents;
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
        Schema::create('etudiant_examensstudents', function (Blueprint $table) {
            $table->id();


            $table->foreignIdFor(examensstudents::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(etudiant::class)->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiant_examensstudents');
    }
};
