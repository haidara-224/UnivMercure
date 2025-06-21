<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examensclasse extends Model
{
    protected $fillable=['titre','sujet_explication','fichier','professeur_id','departement_id','classes_id','date_debut','date_fin','annees_scolaire_id'];
    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
    public function classes()
    {
        return $this->belongsTo(Classes::class);
    }
    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(AnneesScolaire::class);
    }
    public function examensclassresponses()
    {
        return $this->hasMany(Examensclasseresponse::class);
    }

}
