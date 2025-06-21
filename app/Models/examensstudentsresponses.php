<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examensstudentsresponses extends Model
{
    protected $fillable=['examensstudents_id','etudiant_id','fichier','reponse','commentaire'];
    public function examensstudents()
    {
        return $this->belongsTo(Examensstudents::class);
    }
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
