<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tuto extends Model
{
    protected $fillable=['titre','contenue','fichier','video','professeur_id','departement_id','classes_id'];
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
}
