<?php

namespace App\Http\Libraries\Validations;

class ValidaUsuario extends Validacion
{
    protected $datos;

    public function __construct(array $datos = [])
    {
        $this->datos = $datos;
        parent::__construct($datos);
    }

    public function rules()
    {
        return [
            'username'=>'required',
            'password'=>'required',
            'confirmPassword'=>'required',
            'perfil'=>'required|numeric',
            'ur'=>'required|numeric',
            'user'=>'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'username.required'=>"El :attribute es requerido.",
            'password.required'=>"La :attribute es requerida.",
            'confirmPassword.required'=>"La :attribute es requerida.",
            'perfil.required'=>"El :attribute es requerido.",
            'perfil.numeric'=>"No se recibió  el :attribute",
            'ur.required'=>"La :attribute es requerida",
            'ur.numeric'=>"No se recibió el identificador de la :attribute",
            'user.required'=>"El :attribute es requerido",
            'user.numeric'=>"No se recibió el identificador del :attribute",
        ];
    }

    public function attributes()
    {
        return [
            'username'=>'usuario',
            'password'=>'contraseña',
            'confirmPassword'=>'confirmación de contraseña',
            'perfil'=>'perfil de usuario',
            'ur'=>'unidad responsable',
            'user'=>'usuario creador',
        ];
    }
}
