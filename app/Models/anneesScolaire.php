<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class anneesScolaire extends Model
{
    use HasFactory;
    protected $fillable=['annee_scolaire','date_debut','date_fin'];
    public function anneeScolaire()
{
    return $this->belongsTo(anneesScolaire::class);
}

}
