<?php

namespace App\Http\Libraries\Store;

use App\Models\Catalog\{Entidad AS ModelEntidad, Municipio AS ModelMunpio};

class EntidadStore
{
    public function getEdos()
    {           
        return ModelEntidad::where('estatus', 1)->orderBy('id', 'ASC')->get();
    }

    public function getMunpios(int $edoId)
    {           
        return ModelMunpio::where('estado_id', $edoId)->orderBy('id', 'ASC')->get();
    }
}