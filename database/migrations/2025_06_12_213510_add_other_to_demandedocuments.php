<?php

use App\Models\classes;
use App\Models\departement;
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
            $table->foreignIdFor(departement::class)->nullable()->after('comment')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(classes::class)->nullable()->after('departement_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('demandedocuments', function (Blueprint $table) {
            $table->dropForeign(['departement_id']);
            $table->dropColumn('departement_id');
            $table->dropForeign(['classes_id']);
            $table->dropColumn('classes_id');
        });
    }
};
