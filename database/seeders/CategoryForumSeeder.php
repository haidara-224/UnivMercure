<?php

namespace Database\Seeders;

use App\Models\categoryforum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryForumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        categoryforum::create(['title'=>'informatique']);
        categoryforum::create(['title'=>'medecine']);
        categoryforum::create(['title'=>'droit']);
        categoryforum::create(['title'=>'Annonces']);
        categoryforum::create(['title'=>'Examens']);
        categoryforum::create(['title'=>'Vie étudiante']);
        categoryforum::create(['title'=>'Cyber Sécurité']);
        categoryforum::create(['title'=>'Intelligence Artificielle']);
    }
}
