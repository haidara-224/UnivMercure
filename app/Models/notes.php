<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class notes extends Model
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
        return $this->belongsTo(etudiant::class);
    }

    public function matiere()
    {
        return $this->belongsTo(matiere::class);
    }

    public function classes()
    {
        return $this->belongsTo(classes::class);
    }

    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
}
