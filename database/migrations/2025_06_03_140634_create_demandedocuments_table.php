<?php

use App\Models\etudiant;
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
        Schema::create('demandedocuments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(etudiant::class)
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('type_document');
            $table->string('comment')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandedocuments');
    }
};
