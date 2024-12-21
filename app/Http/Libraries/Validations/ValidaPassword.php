<?php

namespace App\Http\Libraries\Validations;

class ValidaPassword extends Validacion
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
            'password'=>'required',
            'confirmPassword'=>'required',
        ];
    }

    public function messages()
    {
        return [
            'password.required'=>"La nueva :attribute es requerida.",
            'confirmPassword.required'=>"La :attribute es requerida.",
        ];
    }

    public function attributes()
    {
        return [
            'password'=>'contraseña',
            'confirmPassword'=>'confirmación de contraseña',
        ];
    }
}
