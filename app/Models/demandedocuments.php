<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class demandedocuments extends Model
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
        return $this->belongsTo(etudiant::class);
    }
    public function traitement()
    {
        return $this->hasOne(traitementdocuments::class);
    }
    public function classes()
    {
        return $this->belongsTo(classes::class);
    }
    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
    public function anneesScolaire()
    {
        return $this->belongsTo(anneesScolaire::class);
    }
}
