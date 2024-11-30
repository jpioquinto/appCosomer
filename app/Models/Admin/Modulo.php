<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;

    protected $table = 'adm_modulos';

    public function permisos(): HasMany
    {
        return $this->hasMany(Permiso::class);
    }
}
