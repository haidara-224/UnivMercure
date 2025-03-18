<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class classes extends Model
{
    use HasFactory;
    protected $fillable=['niveau','departement_id'];
    public function departement():BelongsTo
    {

        return $this->belongsTo(departement::class);
    }
}
