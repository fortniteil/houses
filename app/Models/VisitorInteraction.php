<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorInteraction extends Model
{
    protected $fillable = [
        'visitor_id',
        'action',
        'data',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'data' => 'array', // JSON
    ];
}
