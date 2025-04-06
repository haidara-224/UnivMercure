<?php

namespace Database\Seeders;

use App\Models\emploie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class emploieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        emploie::factory(50)->create();
    }
}
