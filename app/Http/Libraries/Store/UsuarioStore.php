<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaUsuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User AS ModelUser;
use App\Models\Admin\UsuarioQueryBuilder;

class UsuarioStore extends ValidaUsuario
{
    protected $usuario;

    public function __construct(array $usuario = [])
    {        
        parent::__construct($usuario);

        count($usuario)>0 ? $this->setUser($this->crear(parent::getValidados())) : null;
    }

    public function setUser(ModelUser $user)
    {
        $this->usuario = $user;
    }

    public function getUser()
    {
        return $this->usuario;
    }

    public function getUsers()
    {
        /*return ModelUser::with(['perfil'])
                ->select(['ur_id', 'nickname', 'perfil_id', 'estatus', 'creado_el', 'ultimo_acceso', 'creado_por'])
                ->where([
                    ['ur_id', '=', auth()->user()->ur_id],
                    ['estatus', '!=', 0]
                ])
                ->orderBy('creado_el', 'DESC')
                ->get();*/
                
        return UsuarioQueryBuilder::obtenerListado(auth()->user()->ur_id);
    }

    protected function crear(array $data)
    {
        $campos = [
            'nickname'=>$data['username'],
            'password'=>Hash::make($data['password']),
            'perfil_id'=>$data['perfil'],
            'ur_id'=>$data['ur'],
            'creado_por'=>$data['user'],
            'id'=>0
        ];

        return ModelUser::create($campos);
    }
}
