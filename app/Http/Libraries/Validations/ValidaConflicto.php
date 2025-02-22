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
            'promovente'=>'required|min:7',
            'contraparte'=>'required|min:7',
            'vertienteId'=>'required|numeric',
            'ha'=>'required|integer',
            'area'=>'required|integer',
            'ca'=>'required|numeric',
            'haa'=>'required|integer',
            'areaa'=>'required|integer',
            'caa'=>'required|numeric',
            'numBeneficiario'=>'required|numeric',
            'regSocialId'=>'required|numeric',
            'estatusId'=>'required|numeric',
            'sintEstatus'=>'required|min:20',
            'orgInvolucradaId'=>'required|numeric',
            'problematica'=>'required|min:30',
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
            'haa.required'=>"El campo correspondiente a la :attribute es requerido.",
            'haa.integer'=>"El campo correspondiente a la :attribute debe ser un entero.",
            'areaa.required'=>"El campo correspondiente al :attribute es requerido.",
            'areaa.integer'=>"El campo correspondiente al :attribute debe ser un entero.",
            'caa.required'=>"El campo correspondiente a la :attribute es requerido.",
            'caa.numeric'=>"El campo correspondiente a la :attribute debe ser una cantidad númerica.",            
            'numBeneficiario.required'=>"El :attribute es requerido.",
            'numBeneficiario.numeric'=>"El :attribute debe ser un entero ó 0.",
            'regSocialId.required'=>"El :attribute es requerido.",
            'regSocialId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'estatusId.required'=>"El :attribute es requerido.",
            'estatusId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'sintEstatus.required'=>"La :attribute es requerida.",
            'sintEstatus.min'=>"El campo :attribute debe contener al menos 20 caracteres.",
            'orgInvolucradaId.required'=>"La :attribute es requerida.",
            'orgInvolucradaId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'problematica.required'=>"La :attribute es requerida.",
            'problematica.min'=>"La :attribute debe contener al menos 30 caracteres.",
            'user.numeric'=>"No se recibió el identificador del :attribute",
        ];
    }

    public function attributes()
    {
        return [
            'fecha'=>'fecha',
            'munpioId'=>'municipio',
            'promovente'=>'promovente',
            'contraparte'=>'contraparte',
            'vertienteId'=>'vertiente',
            'ha'=>'hectárea en conflicto',
            'area'=>'área en conflicto',
            'ca'=>'centiárea en conflicto',
            'haa'=>'hectárea atendida',
            'areaa'=>'área atendida',
            'caa'=>'centiárea atendida',
            'numBeneficiario'=>'número de beneficiarios',
            'regSocialId'=>'regímen social',
            'estatusId'=>'estatus',
            'sintEstatus'=>'sintésis del estatus',
            'orgInvolucradaId'=>'organización involucrada',
            'problematica'=>'problemática',
            'user'=>'usuario creador',           
        ];
    }
}
