<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Traitementdocuments extends Model
{
    protected $fillable = [
        'demandedocuments_id',
        'document',
    ];
    public function demande()
{
    return $this->belongsTo(Demandedocuments::class, 'demandedocuments_id');
}

}
