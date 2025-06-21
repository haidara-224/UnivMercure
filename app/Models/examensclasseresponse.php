<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examensclasseresponse extends Model
{
    protected $fillable = [
        'examensclasse_id',
        'etudiant_id',
        'fichier',
        'reponse',
        'commentaire',

    ];

    public function examensclasse()
    {
        return $this->belongsTo(Examensclasse::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
