<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\forum>
 */
class forumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'categoryforum_id'=>$this->faker->numberBetween(1,8),
            'user_id'=>$this->faker->numberBetween(1,20),
            'title'=>$this->faker->words(6,true),
        ];
    }
}
