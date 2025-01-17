<?php

namespace App\Http\Libraries\Validations;

class ValidaContacto extends Validacion
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
            'apPaterno'=>'required',
            'apMaterno'=>'nullable|string',
            'cargo'=>'nullable|string',
            'puestoId'=>'nullable|string',
            'correo'=>'required|email',
            'munpioId'=>'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'=>"El :attribute es requerido.",
            'apPaterno.required'=>"El :attribute es requerido.",
            'apMaterno.string'=>"El :attribute debe ser una cadena.",
            'cargo.string'=>"El :attribute debe ser una cadena.",
            'puestoId.numeric'=>"No se recibió el :attribute",
            'correo.required'=>"La :attribute es requerida.",
            'correo.email'=>"La :attribute no es valida.",
            'munpioId.numeric'=>"El identificador del :attribute debe ser un dato númerico.",
        ];
    }

    public function attributes()
    {
        return [
            'nombre'=>'nombre del contacto',
            'apPaterno'=>'apellido paterno',
            'apMaterno'=>'apellido materno',
            'cargo'=>'cargo',
            'puestoId'=>'identificador del puesto',
            'correo'=>'dirección de correo electrónico',
            'munpioId'=>'identificador del municipio',
            'user'=>'idetificador del usuario asociado',
        ];
    }
}
