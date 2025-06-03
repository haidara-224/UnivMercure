<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class demandedocuments extends Model
{
    protected $fillable = [
        'etudiant_id',
        'type_document',
        'comment',
        'status',
    ];
    public function etudiant()
    {
        return $this->belongsTo(etudiant::class);
    }
}
