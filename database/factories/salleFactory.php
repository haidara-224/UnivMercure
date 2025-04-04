<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\salle>
 */
class salleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'salle' => 'Salle ' . $this->faker->unique()->numberBetween(1, 100),
            'capacite' => $this->faker->numberBetween(10, 50),
        ];
    }
}
