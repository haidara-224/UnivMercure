<?php

namespace Database\Factories;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\matiere;
use App\Models\Professeur;
use App\Models\salle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\emploie>
 */
class EmploieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'classes_id' => classes::inRandomOrder()->first()->id,
            'matiere_id' => matiere::inRandomOrder()->first()->id,
            'professeur_id' => Professeur::inRandomOrder()->first()->id,
            'departement_id' => departement::inRandomOrder()->first()->id,
            'annees_scolaire_id' =>  anneesScolaire::inRandomOrder()->first()->id,
            'salle_id' => salle::inRandomOrder()->first()->id,
             'jour' => $this->faker->randomElement(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']),
            'module' => $this->faker->randomElement(['Premier Module', 'Deuxieme Module']),
             'heure_debut' => $this->faker->time(),
            'heure_fin' => $this->faker->time(),
        ];
    }
}
