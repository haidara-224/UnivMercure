<?php

namespace Database\Factories;

use App\Models\classes;
use App\Models\departement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\etudiant>
 */
class etudiantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'matricule' => $this->faker->unique()->numerify('MATETUD#####'),
            'name' => $this->faker->firstName(),
            'prenom' => $this->faker->lastName(),
            'telephone' => $this->faker->unique()->phoneNumber(),
            'sexe' => $this->faker->randomElement(['Masculin', 'Feminin']),
            'departement_id' => departement::inRandomOrder()->first()->id ?? departement::factory(),
            'classes_id' => classes::inRandomOrder()->first()->id ?? classes::factory(),

        ];

    }
}
