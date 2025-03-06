<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\professeur>
 */
class professeurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'matricule' => $this->faker->unique()->numerify('MATPROF#####'),
            'name' => $this->faker->firstName(),
            'prenom' => $this->faker->lastName(),
            'telephone' => $this->faker->unique()->phoneNumber()
        ];

    }
}
