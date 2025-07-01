<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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


        $keyword = $keywords[array_rand($keywords)];
        $width = rand(600, 800);
        $height = rand(400, 600);
        $cacheBuster = time() . rand(1000, 9999);

        $url = "https://picsum.photos/{$width}/{$height}?random={$cacheBuster}";

        $imageContent = file_get_contents($url);

        $fileName = 'evenement_images/' . uniqid() . '.jpg';

        Storage::disk('public')->put($fileName, $imageContent);

        return [
            'url' => $fileName,
        ];
    }
}
