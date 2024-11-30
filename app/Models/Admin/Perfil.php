<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    use HasFactory;

    protected $table = 'adm_perfiles';

    public function permisos(): HasMany
    {
        return $this->hasMany(Permiso::class);
    }
}
