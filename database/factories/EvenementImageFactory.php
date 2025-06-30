<?php

namespace Database\Factories;

use App\Models\Evenement;
use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EvenementImage>
 */
class EvenementImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'evenement_id' => Evenement::inRandomOrder()->first()->id,
            'image_id' => Image::inRandomOrder()->first()->id,
        ];
    }
}
