<?php

namespace Database\Factories;

use App\Models\Forum; // Notez le F majuscule
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumRoleUserFactory extends Factory
{
    public function definition(): array
    {

        $forum = Forum::inRandomOrder()->first() ?? Forum::factory()->create();


        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'forum_id' => $forum->id,
            'user_id' => $user->id, // Ne pas utiliser $forum->user_id sauf si c'est intentionnel
            'role_id' => 8, // Assurez-vous que ce rôle existe
        ];
    }
}
