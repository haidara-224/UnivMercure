<?php

namespace Database\Factories;

use App\Models\departement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\classes>
 */
class classesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'niveau' => $this->faker->randomElement(['Licence 1', 'Licence 2', 'Licence 3', 'Licence 4', 'Licence 5', 'Master 1', 'Master 2']),
            'departement_id' => departement::inRandomOrder()->first()->id ?? departement::factory(), // Prend un département existant ou en crée un nouveau
        ];
    }
}
