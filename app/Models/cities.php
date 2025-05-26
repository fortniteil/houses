<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cities extends Model
{
    protected $fillable = ['name_he', 'slug', 'image_url'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cities';
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    public function properties()
    {
        return $this->hasMany(Property::class, 'city', 'name_he', 'image_url'); // אם הקשר הוא לפי שם העיר בעברית
    }
}
