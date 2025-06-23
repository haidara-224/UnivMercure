<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class Postforum extends Model
{
    use HasFactory;
    protected $fillable = ['forum_id', 'user_id', 'role_id', 'content',];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }
    public function likes()
    {
        return $this->hasMany(Postforumlikes::class);
    }
}
