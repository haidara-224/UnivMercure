<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\evenement>
 */
class evenementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'start_date' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'badge'=> $this->faker->randomElement(['À venir', 'en cours', 'terminé', 'Important', 'Annulé', 'Reporté', 'En attente', 'Prévu', 'Confirmé', 'En cours de planification', 'En cours de préparation', 'En cours de réalisation', 'En cours de suivi']),
        ];
    }
}
