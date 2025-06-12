<?php

use App\Models\anneesScolaire;
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
        Schema::table('demandedocuments', function (Blueprint $table) {
            $table->foreignIdFor(anneesScolaire::class)->nullable()->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('demandedocuments', function (Blueprint $table) {
            $table->dropForeign(['annees_scolaire_id']);
            $table->dropColumn('annees_scolaire_id');
        });
    }
};
