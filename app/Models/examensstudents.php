<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examensstudents extends Model
{
    protected $fillable=['titre','sujet_explication','fichier','professeur_id','etudiant_id','date_debut','date_fin','annees_scolaire_id'];

    public function etudiants()
    {
        return $this->belongsToMany(Etudiant::class);
    }
    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(AnneesScolaire::class);
    }
    public function examensstudentsresponses()
    {
        return $this->hasMany(Examensstudentsresponses::class);
    }
}
