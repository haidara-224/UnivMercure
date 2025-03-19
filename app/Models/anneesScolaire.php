<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class anneesScolaire extends Model
{
    use HasFactory;
    public function anneeScolaire()
{
    return $this->belongsTo(anneesScolaire::class);
}

}
