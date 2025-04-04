<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class departement extends Model
{
    use HasFactory;
    protected $fillable=['name','professeur_id','faculty_id'];
    public function parcours():HasMany
    {
        return $this->hasMany(parcour::class);
    }
    public function professeur():BelongsTo{
        return $this->belongsTo(Professeur::class);
    }
    public function faculty():BelongsTo{
        return $this->belongsTo(faculty::class);
    }
    public function matieres()
    {
        return $this->belongsToMany(matiere::class);
    }
}
