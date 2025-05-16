<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examensclasse extends Model
{
    protected $fillable=['titre','sujet_explication','fichier','professeur_id','departement_id','classes_id','date_debut','date_fin','annees_scolaire_id'];
    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
    public function classes()
    {
        return $this->belongsTo(classes::class);
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
