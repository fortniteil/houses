<?php

namespace App\Models\Concerns;

use App\Models\Otp;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasOtps
{
    /**
     * @return HasMany<Otp>
     */
    public function otps(): HasMany
    {
        return $this->hasMany(Otp::class);
    }
}
