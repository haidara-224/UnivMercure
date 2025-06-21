<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EtudiantExamensstudents extends Model
{
    protected $fillable=['etudiant_id','examensstudents_id'];
    public function etudiants(){
        $this->belongsToMany(Etudiant::class);
    }
    public function examensstudents()
    {
        $this->belongsToMany(Examensstudents::class);
    }
}
