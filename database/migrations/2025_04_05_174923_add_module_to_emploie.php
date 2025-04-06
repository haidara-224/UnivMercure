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
        Schema::table('emploies', function (Blueprint $table) {
            $table->enum('module', ['Premier Module', 'Deuxieme Module',])->after('jour')->default('Premier Module');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('emploies', function (Blueprint $table) {
            $table->dropColumn('module');
        });
    }
};
