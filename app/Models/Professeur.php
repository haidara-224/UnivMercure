<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Professeur extends Model
{
    use HasFactory;
    protected $fillable=[
        'matricule',
        'name',
        'prenom',
        'telephone',
        'photo',
        'user_id'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function departements():BelongsTo
    {
        return $this->belongsTo(departement::class);
    }
    public function classes():BelongsTo
    {
        return $this->belongsTo(classes::class);
    }

}
