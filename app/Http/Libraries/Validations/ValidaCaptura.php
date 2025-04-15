<?php

namespace App\Http\Libraries\Validations;

class ValidaCaptura extends Validacion
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
            'parametroId'=>'required|numeric',
            'conflictoId'=>'required|numeric',
            'captura'=>'nullable|string|min:5',
            'user'=>'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'parametroId.required'=>"El :attribute es requerido.",
            'parametroId.numeric'=>"El :attribute debe ser un entero.",
            'conflictoId.required'=>"El :attribute es requerido.",
            'conflictoId.numeric'=>"El :attribute debe ser un entero.",            
            'captura.string'=>"La :attribute debe ser una cadena válida.",
            'captura.min'=>"La :attribute debe contener al menos 5 caracteres.",
            'user.numeric'=>"No se recibió el identificador del :attribute",
        ];
    }

    public function attributes()
    {
        return [
            'parametroId'=>'identificador del parámetro',
            'conflictoId'=>'identificador del conflicto',
            'captura'=>'información capturada',
            'user'=>'usuario',           
        ];
    }
}
