<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emploie extends Model
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
        'isFirstmodule',
        'isSecondmodule',
        'heure_debut',
        'heure_fin',
    ];
    public function classes()
    {
        return $this->belongsTo(Classes::class);
    }
    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
    public function matiere()
    {
        return $this->belongsTo(Matiere::class);
    }
    public function Professeur()
    {
        return $this->belongsTo(Professeur::class);
    }
    public function salle()
    {
        return $this->belongsTo(Salle::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(AnneesScolaire::class);
    }
}
