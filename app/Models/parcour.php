<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcour extends Model
{
    use HasFactory;
    protected $fillable=['etudiant_id','classes_id','departement_id','annees_scolaire_id'];
    public function classes()
    {
        return $this->belongsTo(Classes::class);
    }
    public function anneesScolaire(){
        return $this->belongsTo(AnneesScolaire::class);
    }
    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
