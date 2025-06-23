<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postforumlikes extends Model
{
    use HasFactory;
    protected $fillable=['user_id','postforum_id','likes'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function postforum()
    {
        return $this->belongsTo(Postforum::class);
    }
}
