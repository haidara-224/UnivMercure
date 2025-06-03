<?php

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
            $table->enum('statut', ['traité','non traité'])
                ->default('non traité')
                ->after('comment');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('demandedocuments', function (Blueprint $table) {
            $table->dropColumn('statut');
        });
    }
};
