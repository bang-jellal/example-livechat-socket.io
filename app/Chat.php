<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'message', 'time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
