<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examensstudents extends Model
{
    protected $fillable=['titre','sujet_explication','fichier','professeur_id','etudiant_id','date_debut','date_fin','annees_scolaire_id'];

    public function etudiant()
    {
        return $this->belongsTo(etudiant::class);
    }
    public function professeur()
    {
        return $this->belongsTo(professeur::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(anneesScolaire::class);
    }
}
