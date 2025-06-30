<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'badge',
    ];
// Dans Evenement.php
public function images()
{
    return $this->belongsToMany(Image::class, 'evenement_images');
}
}
