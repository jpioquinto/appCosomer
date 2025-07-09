<?php

namespace App\Models\Conflicto;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{BelongsTo};
use App\Models\Admin\UnidadResponsable;
use Illuminate\Database\Eloquent\Model;

class Conflicto extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $table = 'conflictos';

    public function ur(): BelongsTo
    {
        return $this->BelongsTo(UnidadResponsable::class, 'ur_id')->withDefault();

    }
}
