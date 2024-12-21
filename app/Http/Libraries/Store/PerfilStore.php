<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaPerfil;
use Illuminate\Support\Facades\Auth;

use App\Models\Admin\Perfil AS ModelPerfil;

class PerfilStore extends ValidaPerfil
{
    protected $perfil;

    public function __construct(array $perfil = [])
    {        
        parent::__construct($perfil);

        count($perfil)>0 ? $this->setPerfil($this->crear(parent::getValidados())) : null;
    }

    public function setPerfil($perfil)
    {
        $this->perfil = $perfil;
    }

    public function getPerfil()
    {
        return $this->perfil;
    }


    public function getPerfils()
    {           
        return ModelPerfil::query()
            ->select(['id', 'nombre', 'descripcion'])
            ->orderBy('nombre', 'ASC')
            ->get();
    }


    protected function crear(array $data)
    {
        $campos = [
            'nombre'=>$data['ur'],
            'descripcion'=>$data['sigla'],
            'creado_por'=>$data['user']            
        ];

        return ModelPerfil::create($campos);
    }
}