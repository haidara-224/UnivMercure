<?php

namespace Database\Seeders;

use App\Models\classes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NiveauSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        classes::create(['niveau'=>"Licence 1"]);
        classes::create(['niveau'=>"Licence 2"]);
        classes::create(['niveau'=>"Licence 3"]);
        classes::create(['niveau'=>"Licence 4"]);
        classes::create(['niveau'=>"Licence 5"]);
        classes::create(['niveau'=>"Master 1"]);
        classes::create(['niveau'=>"Master 2"]);

    }
}
