<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoDescription extends Model
{
    protected $fillable = [
        'url',
        'title',
        'description',
    ];
}
