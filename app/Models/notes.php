<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    protected $fillable = [
        'note1',
        'note2',
        'note3',
        'module',
        'matiere_id',
        'annees_scolaire_id',
        'classes_id',
        'departement_id',
        'etudiant_id',
        'moyenne',
        'moyenne_literaire',


    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class);
    }

    public function classes()
    {
        return $this->belongsTo(Classes::class);
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(AnneesScolaire::class);
    }
}
