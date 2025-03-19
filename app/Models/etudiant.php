<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class etudiant extends Model
{
    use HasFactory;
    public function departement():BelongsTo{
        return $this->belongsTo(departement::class);
    }
    public function parcours():HasMany
    {
        return $this->hasMany(parcour::class);
    }
}
