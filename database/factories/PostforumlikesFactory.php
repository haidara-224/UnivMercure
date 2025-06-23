<?php

namespace Database\Factories;

use App\Models\Postforum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Postforumlikes>
 */
class PostforumlikesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'postforum_id'=>Postforum::inRandomOrder()->first()->id,
            'user_id'=>User::inRandomOrder()->first()->id,
            'likes'=>$this->faker->numberBetween(0,1)
        ];
    }
}
