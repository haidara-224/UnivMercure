<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EtudiantExamensstudents extends Model
{
    protected $fillable=['etudiant_id','examensstudents_id'];
    public function etudiants(){
        $this->belongsToMany(etudiant::class);
    }
    public function examensstudents()
    {
        $this->belongsToMany(examensstudents::class);
    }
}
