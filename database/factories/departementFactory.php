<?php

namespace Database\Factories;

use App\Models\faculty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\departement>
 */
class departementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>>numberBetween(1,8),
     *      */
    public function definition(): array
    {
        return [
            'name'=>$this->faker->words(6, true),
            'professeur_id'=>$this->faker->numberBetween(1,8),
            'faculty_id'=>faculty::inRandomOrder()->first()->id ?? faculty::factory(),

        ];
    }
}
