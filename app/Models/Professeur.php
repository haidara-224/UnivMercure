<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Professeur extends Model
{
    use HasFactory;
    protected $fillable=[
        'matricule',
        'name',
        'prenom',
        'telephone',
        'photo'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
