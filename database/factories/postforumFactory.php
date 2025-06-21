<?php

namespace Database\Factories;

use App\Models\forum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Spatie\Permission\Models\Role;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\postforum>
 */
class postforumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'forum_id'=>forum::inRandomOrder()->first()->id,
            'user_id'=>User::inRandomOrder()->first()->id,
            'role_id'=>Role::inRandomOrder()->first()->id,
            'content' => implode(' ', $this->faker->sentences(6)),
            'likes'=>$this->faker->numberBetween(0,10000)
        ];
    }
}
