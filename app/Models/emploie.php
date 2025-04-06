<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class emploie extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'classes_id',
        'departement_id',
        'matiere_id',
        'professeur_id',
        'annees_scolaire_id',
        'salle_id',
        'jour',
        'module',
        'heure_debut',
        'heure_fin',
    ];
    public function classes()
    {
        return $this->belongsTo(classes::class);
    }
    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
    public function matiere()
    {
        return $this->belongsTo(matiere::class);
    }
    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }
    public function salle()
    {
        return $this->belongsTo(salle::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(anneesScolaire::class);
    }
}
