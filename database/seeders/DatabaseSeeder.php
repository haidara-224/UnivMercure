<?php

namespace Database\Seeders;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
use App\Models\parcour;
use App\Models\Professeur;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(facultySeeder::class);
        $this->call(RoleSeeder::class);
        Professeur::factory(50)->create();
        departement::factory(8)->create();
        anneesScolaire::factory(10)->create();
        classes::factory(30)->create();
        etudiant::factory(800)->create();
        parcour::factory(100)->create();
       $user= User::factory()->create([
            'name' => 'haidara',
            'email' => 'sidymohamedcherifhaidara02@gmail.com',
        ]);
        $user2= User::factory()->create([
            'name' => 'Hassane',
            'email' => 'hj224@gmail.con',
        ]);
        $user->assignRole('super admin');
        $user2->assignRole('super admin');
    }
}
