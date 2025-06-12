<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examensclasseresponse extends Model
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
        return $this->belongsTo(examensclasse::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
