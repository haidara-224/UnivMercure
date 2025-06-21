<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demandedocuments extends Model
{
    protected $fillable = [
        'etudiant_id',
        'type_document',
        'comment',
        'classes_id',
        'departement_id',
        'annees_scolaire_id',
        'status',
    ];
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
    public function traitement()
    {
        return $this->hasOne(Traitementdocuments::class);
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
