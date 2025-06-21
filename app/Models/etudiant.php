<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Etudiant extends Model
{
    use HasFactory;
    protected $fillable = ['matricule', 'name', 'prenom', 'telephone', 'photo', 'sexe', 'user_id'];
    public function departement(): BelongsTo
    {
        return $this->belongsTo(Departement::class);
    }
    public function parcours(): HasMany
    {
        return $this->hasMany(Parcour::class);
    }
    public function examensstudents()
    {
        $this->belongsToMany(Examensstudents::class);
    }
    public function demandes()
    {
        return $this->hasMany(Demandedocuments::class, 'etudiant_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function traitementdocuments()
    {
        return $this->hasMany(Traitementdocuments::class, 'etudiant_id');
    }
    public function repartitions()
    {
        return $this->hasMany(ExamsEtudiantsSalle::class);
    }
}
