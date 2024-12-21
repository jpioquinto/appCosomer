<?php

namespace App\Http\Libraries\Validations;

class ValidaUR extends Validacion
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
            'ur'=>'required',
            'sigla'=>'required',
            'calle'=>'nullable|string',
            'ext'=>'nullable|string',
            'int'=>'nullable|string',
            'col'=>'nullable|string',
            'cp'=>'nullable|string',
            'mpio'=>'nullable|numeric',
            'user'=>'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'ur.required'=>"La :attribute es requerida.",
            'sigla.required'=>"El campo :attribute es requerido.",
            'calle.string'=>"El campo :attribute debe ser una cadena.",
            'ext.string'=>"El campo :attribute debe ser una cadena.",
            'int.string'=>"El campo :attribute debe ser una cadena.",
            'col.string'=>"El campo :attribute debe ser una cadena.",
            'cp.string'=>"El campo :attribute debe ser una cadena.",
            'mpio.numeric'=>"El identificador del :attribute debe ser un dato númerico.",
            'user.required'=>"El :attribute es requerido",
            'user.numeric'=>"No se recibió el identificador del :attribute",
        ];
    }

    public function attributes()
    {
        return [
            'ur'=>'unidad responsable',
            'sigla'=>'acrónimo',
            'calle'=>'calle',
            'ext'=>'número exterior',
            'int'=>'número interior',
            'col'=>'colonia',
            'cp'=>'código postal',
            'mpio'=>'municipio',
            'user'=>'usuario creador',
        ];
    }
}
