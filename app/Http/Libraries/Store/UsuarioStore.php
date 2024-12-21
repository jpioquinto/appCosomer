<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\{ValidaUsuario, ValidaPassword};
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
        return UsuarioQueryBuilder::obtenerListado(auth()->user()->ur_id, auth()->user()->perfil_id);
    }

    public function changeStatus(int $estatus, int $id)
    {
        return ModelUser::where('id', $id)->update(['estatus'=>$estatus]);    
    }

    public function changeUR(int $id, int $urId)
    {
        return ModelUser::where('id', $id)->update(['ur_id'=>$urId]);    
    }

    public function changePerfil(int $id, int $perfilId)
    {
        return ModelUser::where('id', $id)->update(['perfil_id'=>$perfilId]);    
    }

    public function changePassword(int $id, array $datos)
    {
        $valida = new ValidaPassword($datos);
        $campos = $valida->getValidados();

        return ModelUser::where('id', $id)->update(['password'=>Hash::make($campos['password'])]);   
    }

    protected function crear(array $data)
    {
        $campos = [
            'nickname'=>$data['username'],
            'password'=>Hash::make($data['password']),
            'perfil_id'=>$data['perfil'],
            'ur_id'=>$data['ur'],
            'creado_por'=>$data['user'],
        ];

        return ModelUser::create($campos);
    }
}
