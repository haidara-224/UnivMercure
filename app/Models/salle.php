<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;
    protected $fillable = [
        'salle',
        'capacite',

    ];


    public function emploies()
    {
        return $this->hasMany(Emploie::class);
    }

    public function repartitions()
    {
        return $this->hasMany(ExamsEtudiantsSalle::class);
    }
}
