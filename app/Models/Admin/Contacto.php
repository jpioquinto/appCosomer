<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;

    protected $table = 'adm_contactos';

    public function getNombreCompletoAttribute(): string
    {
        $nombre = $this->nombre;
        $nombre .= trim($this->ape_paterno) != '' ? ' '.trim($this->ape_paterno) : '';
        $nombre .= trim($this->ape_materno) != '' ? ' '.trim($this->ape_materno) : '';

        return $nombre;
    }
}
