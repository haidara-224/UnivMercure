<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvenementImage extends Model
{
    use HasFactory;



    protected $fillable = ['evenement_id', 'image_id'];
}
