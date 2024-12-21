<?php

namespace App\Http\Libraries\Validations;

class ValidaPerfil extends Validacion
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
            'nombre'=>'required',
            'descripcion'=>'required',
            'creador'=>'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'=>"El :attribute para el perfil es requerido.",
            'descripcion.required'=>"La :attribute para el perfil es requerida.",
            'creador.required'=>"No se recibió el :attribute",
            'creador.numeric'=>"El :attribute debe ser un dato numérico.",
        ];
    }

    public function attributes()
    {
        return [
            'nombre'=>'nombre',
            'descripcion'=>'descripción',
            'creador'=>'identificador del usuario creador',
        ];
    }
}
