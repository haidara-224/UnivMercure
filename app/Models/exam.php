<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exam extends Model
{
    protected $fillable=['module','matiere_id','annees_scolaire_id','date_examen','heure_debut','heure_fin'];
    public function repartitions()
    {
        return $this->hasMany(ExamsEtudiantsSalle::class);
    }
    public function matiere(){
        return $this->belongsTo(Matiere::class);
    }
     public function anneesScolaire(){
        return $this->belongsTo(AnneesScolaire::class);
    }
}
