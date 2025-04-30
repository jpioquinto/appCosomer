<?php

namespace App\Models\Conflicto;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Etapa extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $table = 'etapas';

    public function parametros(): HasMany
    {
        return $this->hasMany(Parametro::class);
    }
}
