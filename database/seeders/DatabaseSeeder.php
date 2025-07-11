<?php

namespace Database\Seeders;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
use App\Models\Evenement;
use App\Models\EvenementImage;
use App\Models\forum;
use App\Models\Forumlikes;
use App\Models\ForumRoleUser;
use App\Models\Image;
use App\Models\parcour;
use App\Models\postforum;
use App\Models\Postforumlikes;
use App\Models\Professeur;
use App\Models\salle;
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
        /*
           $this->call(facultySeeder::class);
        $this->call(RoleSeeder::class);
        Professeur::factory(50)->create();
        departement::factory(8)->create();
        anneesScolaire::factory(10)->create();
       classes::factory(30)->create();
       $this->call(NiveauSeeder::class);
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
         $this->call(CategoryForumSeeder::class);
        forum::factory(100)->create();
        postforum::factory(400)->create();
           forum::factory(100)->create();
        postforum::factory(400)->create();
        Forumlikes::factory(100)->create();
        Postforumlikes::factory(400)->create();
         *
         */
        Evenement::factory(100)->create();
        Image::factory(100)->create();
        EvenementImage::factory(100)->create();


    }
}
