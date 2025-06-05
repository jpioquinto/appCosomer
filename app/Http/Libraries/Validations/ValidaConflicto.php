<?php

namespace App\Http\Libraries\Validations;

class ValidaConflicto extends Validacion
{
    protected $datos;

    public function __construct(array $datos = [])
    {
        $this->datos = $datos;
        parent::__construct($datos);
    }

    public function getEdoId()
    {
        return $this->datos['edoId'] ?? -1;
    }

    public function rules()
    {
        return [
            'fecha'=>'required|min:10',
            'munpioId'=>'required|numeric',
            'asunto'=>'nullable|string',
            'predio'=>'nullable|string',
            'nombreRegSoc'=>'nullable|string',
            'anioFiscal'=>'nullable|numeric',
            'puebloIndigena'=>'nullable|string',
            'promovente'=>'required|min:7',
            'contraparte'=>'required|min:7',
            'vertienteId'=>'required|numeric',
            'ha'=>'required|integer',
            'area'=>'required|integer',
            'ca'=>'required|numeric',
            'numBeneficiario'=>'required|numeric',
            'regSocialId'=>'required|numeric',
            'estatusId'=>'required|numeric',
            'observaciones'=>'nullable|string|min:20',
            'orgInvolucradaId'=>'nullable|numeric',
            'problematica'=>'nullable|string|min:30',
            'user'=>'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'fecha.required'=>"La :attribute es requerida.",
            'fecha.min'=>"La :attribute debe tener 10 caracteres.",
            'munpioId.required'=>"El :attribute es requerido.",
            'munpioId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'asunto.string'=>'El :attribute debe ser una cadena válida',
            'predio.string'=>'El :attribute debe ser una cadena válida',
            'nombreRegSoc.string'=>'El :attribute debe ser una cadena válida',
            'anioFiscal.numeric'=>'El :attribute debe ser un entero.',
            'puebloIndigena.string'=>'Ingrese un nombre de  :attribute válido.',
            'predio.string'=>'El :attribute debe ser una cadena válida',
            'promovente.required'=>"El :attribute es requerido.",
            'promovente.min'=>"El :attribute debe contener por lo menos 7 caracteres.",
            'contraparte.required'=>"El :attribute es requerido.",
            'contraparte.min'=>"El :attribute debe contener por lo menos 7 caracteres.",
            'vertienteId.required'=>"La :attribute es requerida.",
            'vertienteId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'ha.required'=>"El campo correspondiente a la :attribute es requerido.",
            'ha.integer'=>"El campo correspondiente a la :attribute debe ser un entero.",
            'area.required'=>"El campo correspondiente al :attribute es requerido.",
            'area.integer'=>"El campo correspondiente al :attribute debe ser un entero.",
            'ca.required'=>"El campo correspondiente a la :attribute es requerido.",
            'ca.numeric'=>"El campo correspondiente a la :attribute debe ser una cantidad númerica.",           
            'numBeneficiario.required'=>"El :attribute es requerido.",
            'numBeneficiario.numeric'=>"El :attribute debe ser un entero ó 0.",
            'regSocialId.required'=>"El :attribute es requerido.",
            'regSocialId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'estatusId.required'=>"El :attribute es requerido.",
            'estatusId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'observaciones.string'=>"El campo :attribute debe ser una cadena válida.",
            'observaciones.min'=>"El campo :attribute debe contener al menos 20 caracteres.",
            'orgInvolucradaId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'problematica.string'=>"La :attribute debe ser una cadena válida.",
            'problematica.min'=>"La :attribute debe contener al menos 30 caracteres.",
            'user.numeric'=>"No se recibió el identificador del :attribute",
        ];
    }

    public function attributes()
    {
        return [
            'fecha'=>'fecha',
            'munpioId'=>'municipio',
            'asunto'=>'nombre del asunto',
            'predio'=>'nombre del predio',
            'nombreRegSoc'=>'nombre del régimen social',
            'anioFiscal'=>'ejercicio fiscal',
            'puebloIndigena'=>'pueblo indigena',
            'promovente'=>'promovente',
            'contraparte'=>'contraparte',
            'vertienteId'=>'vertiente',
            'ha'=>'hectárea en conflicto',
            'area'=>'área en conflicto',
            'ca'=>'centiárea en conflicto',
            'numBeneficiario'=>'número de beneficiarios',
            'regSocialId'=>'regímen social',
            'estatusId'=>'estatus',
            'observaciones'=>'observaciones',
            'orgInvolucradaId'=>'organización involucrada',
            'problematica'=>'problemática',
            'user'=>'usuario creador',           
        ];
    }
}
