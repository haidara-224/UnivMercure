<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */

class ImageFactory extends Factory
{
    public function definition(): array
    {
        $keywords = [
            'university',
            'students',
            'conference',
            'graduation',
            'school',
            'classroom',
            'library',
            'ceremony',
            'campus',
            'education'
        ];

        $keyword = $this->faker->randomElement($keywords);
        $width = rand(600, 800);
        $height = rand(400, 600);

        $cacheBuster = time() . rand(1000, 9999);

       return [
    'url' => "https://picsum.photos/{$width}/{$height}?random={$cacheBuster}",
];
    }
}
