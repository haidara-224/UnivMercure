<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $fillable = [
        'url',
    ];
    public function evenements()
{
    return $this->belongsToMany(Evenement::class, 'evenement_images');
}

}
