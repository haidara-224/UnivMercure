<?php

namespace Database\Factories;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\parcour>
 */
class parcourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'etudiant_id' => etudiant::inRandomOrder()->first()->id,
            'classes_id' => classes::inRandomOrder()->first()->id,
            'departement_id' => departement::inRandomOrder()->first()->id,
            'annees_scolaire_id' => anneesScolaire::inRandomOrder()->first()->id,
        ];
    }
}
