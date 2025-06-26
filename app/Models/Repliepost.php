<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Repliepost extends Model
{
     protected $fillable = [
        'postforum_id',
        'user_id',
        'parent_id',
        'content',
    ];

    public function postforum(): BelongsTo
    {
        return $this->belongsTo(Postforum::class);
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
     public function parent(): BelongsTo
    {
        return $this->belongsTo(Repliepost::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Repliepost::class, 'parent_id');
    }
}
