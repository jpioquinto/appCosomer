<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{BelongsTo};
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalog\Municipio;

class Contacto extends Model
{
    use HasFactory;

    protected $table = 'adm_contactos';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function getNombreCompletoAttribute(): string
    {
        $nombre = $this->nombre;
        $nombre .= trim($this->ap_paterno) != '' ? ' '.trim($this->ap_paterno) : '';
        $nombre .= trim($this->ap_materno) != '' ? ' '.trim($this->ap_materno) : '';

        return $nombre;
    }

    public function municipio(): BelongsTo
    {
        return $this->BelongsTo(Municipio::class, 'municipio_id')->withDefault();

    }
}
