<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tuto extends Model
{
    protected $fillable=['titre','contenue','fichier','video','professeur_id','departement_id','classes_id'];
}
