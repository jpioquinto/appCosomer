<?php

namespace App\Http\Libraries\Validations;

class ValidaModulo extends Validacion
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
            'controlador'=>'nullable|string',
            'icono'=>'nullable|string',
            'clase'=>'nullable|string',
            'orden'=>'required|numeric',
            'nodo_padre'=>'required|integer',
            'acciones'=>'nullable|string',
            'descripcion'=>'nullable|string',
            'ruta'=>'nullable|string',
            'grupo'=>'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'=>"El :attribute es requerido.",
            'controlador.string'=>"El :attribute debe ser una cadena.",
            'icono.string'=>"El :attribute debe ser una cadena.",
            'clase.string'=>"La :attribute debe ser una cadena.",
            'orden.requered'=>"El campo :attribute es requerido.",
            'orden.numeric'=>"El campo :attribute debe ser numérico.",
            'nodo_padre.required'=>"El campo :attribute es requerido.",
            'nodo_padre.numeric'=>"El campo :attribute debe ser numérico.",
            'acciones.string'=>"El campo :attribute debe ser una cadena.",
            'descripcion.string'=>"El campo :attribute debe ser una cadena.",
            'ruta.string'=>"La :attribute debe ser una cadena",
            'grupo.required'=>"El campo :attribute es requerido.",
            'grupo.numeric'=>"El campo :attribute debe ser numérico.",
        ];
    }

    public function attributes()
    {
        return [
            'nombre'=>'nombre del módulo',
            'controlador'=>'controlador',
            'icono'=>'icono',
            'clase'=>'clase',
            'orden'=>'orden',
            'nodo_padre'=>'módulo padre',           
            'acciones'=>'acciones',           
            'descripcion'=>'descripción',           
            'ruta'=>'ruta',           
            'grupo'=>'grupo del módulo',           
        ];
    }
}
