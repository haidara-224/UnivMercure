<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneesScolaire extends Model
{
    use HasFactory;
    protected $fillable=['annee_scolaire','date_debut','date_fin','isActive'];


}
