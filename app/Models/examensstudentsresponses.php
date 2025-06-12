<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examensstudentsresponses extends Model
{
    protected $fillable=['examensstudents_id','etudiant_id','fichier','reponse','commentaire'];
    public function examensstudents()
    {
        return $this->belongsTo(examensstudents::class);
    }
    public function etudiant()
    {
        return $this->belongsTo(etudiant::class);
    }
}
