<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\anneesScolaire>
 */
class anneesScolaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'annee_scolaire' => $this->faker->year() . '-' . ($this->faker->year() + 1),

            'date_debut' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'date_fin' => $this->faker->dateTimeBetween('now', '+1 year'),
        ];
    }
}
