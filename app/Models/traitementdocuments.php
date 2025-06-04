<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class traitementdocuments extends Model
{
    protected $fillable = [
        'demandedocuments_id',
        'document',
    ];
    public function demande()
{
    return $this->belongsTo(demandedocuments::class, 'demandedocuments_id');
}

}
