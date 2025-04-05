<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class matiere extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
    ];

    public function departements()
    {
        return $this->belongsToMany(departement::class);
    }


}
