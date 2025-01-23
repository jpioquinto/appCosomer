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

    public function rules()
    {
        return [
            'fecha'=>'required',
            'munpioId'=>'required|numeric',
            'promovente'=>'required|min:7',
            'contraparte'=>'required|min:7',
            'vertienteId'=>'required|numeric',
            'supConflictoId'=>'required|numeric',
            'supAtendidaId'=>'required|numeric',
            'numBeneficiario'=>'required|numeric',
            'regSocialId'=>'required|numeric',
            'estatusId'=>'required|numeric',
            'sintEstatus'=>'required|min:10',
            'orgInvolucradaId'=>'required|numeric',
            'problematica'=>'required|min:10',
            'actualizadoEl'=>'nullable|string',
            'eliminadoEl'=>'nullable|string',
            'creadoPor'=>'nullable|numeric',
            'actualizadoPor'=>'nullable|numeric',
            'eliminadoPor'=>'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'fecha.required'=>"La :attribute es requerida.",
            'fecha.min:10'=>"La :attribute debe tener 10 caracteres.",
            'munpioId.required'=>"El :attribute es requerido.",
            'munpioId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'promovente.required'=>"El :attribute es requerido.",
            'promovente.min:7'=>"El :attribute debe contener por lo menos 7 caracteres.",
            'contraparte.required'=>"El :attribute es requerido.",
            'contraparte.min:7'=>"El :attribute debe contener por lo menos 7 caracteres.",
            'vertienteId.required'=>"La :attribute es requerida.",
            'vertienteId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'supConflictoId.required'=>"La :attribute es requerida.",
            'supConflictoId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'supAtendidaId.required'=>"La :attribute es requerida.",
            'supAtendidaId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'numBeneficiario.required'=>"El :attribute es requerido.",
            'numBeneficiario.numeric'=>"El :attribute debe ser un entero ó 0.",
            'regSocialId.required'=>"El :attribute es requerido.",
            'regSocialId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'estatusId.required'=>"El :attribute es requerido.",
            'estatusId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'sintEstatus.required'=>"La :attribute es requerida.",
            'sintEstatus.min:10'=>"El campo :attribute debe contener al menos 10 caracteres.",
            'orgInvolucradaId.required'=>"La :attribute es requerida.",
            'orgInvolucradaId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'problematica.required'=>"La :attribute es requerida.",
            'problematica.min:10'=>"La :attribute debe contener al menos 10 caracteres.",
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
            'supConflictoId'=>'superficie en conflicto',
            'supAtendidaId'=>'superficie atendida',
            'numBeneficiario'=>'número de beneficiarios',
            'regSocialId'=>'regímen social',
            'estatusId'=>'estatus',
            'sintEstatus'=>'sintésis del estatus',
            'orgInvolucradaId'=>'organización involucrada',
            'problematica'=>'problemática',
            'creadoPor'=>'usuario creador',            
            'actualizadoEl'=>'fecha de actualización',            
            'actualizadoPor'=>'usuario actualizador',            
        ];
    }
}
