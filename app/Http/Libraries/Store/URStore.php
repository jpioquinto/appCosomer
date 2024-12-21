<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaUR;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\Admin\UnidadResponsable AS ModelUR;
use App\Models\Admin\URQueryBuilder;

class URStore extends ValidaUR
{
    protected $ur;

    public function __construct(array $ur = [])
    {        
        parent::__construct($ur);

        count($ur)>0 ? $this->setUR($this->crear(parent::getValidados())) : null;
    }

    public function setUR($ur)
    {
        $this->ur = $ur;
    }

    public function getUR()
    {
        return $this->ur;        
    }

    public function getURs()
    {           
        return URQueryBuilder::obtenerListado();
    }

    protected function crear(array $data)
    {
        $campos = [
            'nombre'=>$data['ur'],
            'sigla'=>$data['sigla'],
            'carpeta'=>$data['sigla'],            
            'creado_por'=>$data['user']            
        ];

        isset($data['calle']) && !is_null($data['calle']) ? $campos['calle'] = $data['calle'] : null;
        isset($data['ext']) &&   !is_null($data['ext'])   ? $campos['ext']   = $data['ext']   : null;
        isset($data['int']) &&   !is_null($data['int'])   ? $campos['int']   = $data['int']   : null;
        isset($data['col']) &&    !is_null($data['col'])  ? $campos['col']   = $data['col']   : null;
        isset($data['cp'])  &&   !is_null($data['cp'])    ? $campos['cp']    = $data['cp']    : null;
        (isset($data['mpio']) && $data['mpio']>0)  ? $campos['municipio_id'] = $data['mpio'] : null;

        return ModelUR::create($campos);
    }
}