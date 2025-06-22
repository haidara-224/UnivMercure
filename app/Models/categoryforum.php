<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoryforum extends Model
{
    protected $fillable=['title','description','user_id','emoji'];
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
