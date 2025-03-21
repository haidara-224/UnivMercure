<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class parcour extends Model
{
    use HasFactory;
    protected $fillable=['etudiant_id','classes_id','departement_id','annees_scolaire_id'];
    public function classes()
    {
        return $this->belongsTo(classes::class);
    }

    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
    public function etudiant()
    {
        return $this->belongsTo(etudiant::class);
    }
}
