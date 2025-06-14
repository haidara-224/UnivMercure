<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class salle extends Model
{
    use HasFactory;
    protected $fillable = [
        'salle',
        'capacite',

    ];


    public function emploies()
    {
        return $this->hasMany(Emploie::class);
    }
    public function scopeSearch($query, $search)
    {
        return $query->where('salle', 'like', "%{$search}%")
            ->orWhere('capacite', 'like', "%{$search}%");
    }
    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $query->search($filters['search']);
        }
    }
    public function scopeSort($query, $sort)
    {
        if ($sort == 'salle') {
            return $query->orderBy('salle', 'asc');
        } elseif ($sort == 'capacite') {
            return $query->orderBy('capacite', 'asc');
        } else {
            return $query->orderBy('created_at', 'desc');
        }
    }
    public function scopeSortDesc($query, $sort)
    {
        if ($sort == 'salle') {
            return $query->orderBy('salle', 'desc');
        } elseif ($sort == 'capacite') {
            return $query->orderBy('capacite', 'desc');
        } else {
            return $query->orderBy('created_at', 'desc');
        }
    }
    public function repartitions()
    {
        return $this->hasMany(ExamsEtudiantsSalle::class);
    }
}
