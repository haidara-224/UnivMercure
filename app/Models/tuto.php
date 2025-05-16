<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tuto extends Model
{
    protected $fillable=['titre','contenue','fichier','video','professeur_id','departement_id','classes_id'];
    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
    public function classes()
    {
        return $this->belongsTo(classes::class);
    }
    public function professeur()
    {
        return $this->belongsTo(professeur::class);
    }
}
