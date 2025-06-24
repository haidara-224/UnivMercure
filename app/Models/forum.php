<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class Forum extends Model
{
    use HasFactory;
    protected $fillable = ['categoryforum_id', 'user_id', 'title', 'role_id','comment'];
    public function categoryforum()
    {
        return $this->belongsTo(Categoryforum::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function postforums()
    {
        return $this->hasMany(Postforum::class);
    }
    public function likes()
    {
        return $this->hasMany(Forumlikes::class);
    }

public function likedByAuth()
{
    return $this->hasOne(Forumlikes::class);
}

}
