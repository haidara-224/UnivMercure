<?php

namespace Database\Seeders;

use App\Models\faculty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class facultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        faculty::create(['name'=>"Science de L'ingénieur"]);
        faculty::create(['name'=>"Science Econonomique et Gestion"]);
        faculty::create(['name'=>"Gestion Logistique et Transport"]);
        faculty::create(['name'=>"Droit + journalisme et communication"]);
        faculty::create(['name'=>"Business Administration"]);
        faculty::create(['name'=>"Electro Technique"]);
    }
}
