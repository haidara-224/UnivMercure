<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class etudiant extends Model
{
    use HasFactory;
    protected $fillable = ['matricule', 'name', 'prenom', 'telephone', 'photo', 'sexe', 'user_id'];
    public function departement(): BelongsTo
    {
        return $this->belongsTo(departement::class);
    }
    public function parcours(): HasMany
    {
        return $this->hasMany(parcour::class);
    }
    public function examensstudents()
    {
        $this->belongsToMany(examensstudents::class);
    }
    public function demandes()
    {
        return $this->hasMany(demandedocuments::class, 'etudiant_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function traitementdocuments()
    {
        return $this->hasMany(traitementdocuments::class, 'etudiant_id');
    }
}
