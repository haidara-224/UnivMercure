<?php

namespace Database\Factories;

use App\Models\Forum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Forumlikes>
 */
class ForumlikesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'forum_id'=>Forum::inRandomOrder()->first()->id,
            'user_id'=>User::inRandomOrder()->first()->id,
            'likes'=>$this->faker->numberBetween(0,1)
        ];
    }
}
