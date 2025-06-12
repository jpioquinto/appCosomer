<?php

namespace App\Http\Libraries\Validations;
use Illuminate\Validation\Rule;

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
            'asunto'=>'nullable|string|max:600',
            'predio'=>'nullable|string|max:360',
            'nombreRegSoc'=>'nullable|string|max:600',
            'anioFiscal'=>'nullable|numeric',
            'puebloIndigena'=>'nullable|string|max:600',
            'promovente'=>'required|min:7|max:600',
            'contraparte'=>'nullable|string|min:7|max:600',
            'vertienteId'=>'required|numeric',
            'ha'=>'required|integer',
            'area'=>'required|integer',
            'ca'=>'required|numeric',
            'numBeneficiario'=>'required|numeric',
            'regSocialId'=>'nullable|numeric',
            'estatusId'=>[Rule::requiredIf(!isset($this->datos['id'])), 'numeric'],
            'observaciones'=>'nullable|string|min:20',
            'orgInvolucradaId'=>'nullable|numeric',
            'problematica'=>'nullable|string|min:30',
            'user'=>[Rule::requiredIf(!isset($this->datos['id'])), 'numeric'],
            'ur'=>[Rule::requiredIf(!isset($this->datos['id'])), 'numeric'],
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
            'asunto.max'=>"El campo :attribute debe contener máximo 600 caracteres.",
            'predio.string'=>'El :attribute debe ser una cadena válida',
            'predio.max'=>"El campo :attribute debe contener máximo 360 caracteres.",
            'nombreRegSoc.string'=>'El :attribute debe ser una cadena válida',
            'nombreRegSoc.max'=>"El campo :attribute no debe exceder los 600 caracteres.",
            'anioFiscal.numeric'=>'El :attribute debe ser un entero.',
            'puebloIndigena.string'=>'Ingrese un nombre de  :attribute válido.',
            'puebloIndigena.max'=>"El campo :attribute no debe exceder los 600 caracteres.",            
            'promovente.required'=>"El campo :attribute es requerido.",
            'promovente.min'=>"El campo :attribute debe contener por lo menos 7 caracteres.",
            'promovente.max'=>"El campo :attribute debe contener máximo 600 caracteres.",
            'contraparte.string'=>"El campo :attribute debe ser una cadena de texto.",
            'contraparte.min'=>"El campo :attribute debe contener por lo menos 7 caracteres.",
            'contraparte.max'=>"El campo :attribute debe contener máximo 600 caracteres.",
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
            'regSocialId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'estatusId.required_if'=>"El :attribute es requerido.",
            'estatusId.numeric'=>"El identificador del :attribute debe ser un entero.",
            'observaciones.string'=>"El campo :attribute debe ser una cadena válida.",
            'observaciones.min'=>"El campo :attribute debe contener al menos 20 caracteres.",
            'orgInvolucradaId.numeric'=>"El identificador de la :attribute debe ser un entero.",
            'problematica.string'=>"La :attribute debe ser una cadena válida.",
            'problematica.min'=>"La :attribute debe contener al menos 30 caracteres.",
            'user.required_if'=>"No se recibió el identificador del :attribute del asunto",
            'user.numeric'=>"El identificador del :attribute del asunto debe ser un entero.",
            'ur.numeric'=>"No se recibió el identificador de la :attribute desde donde se da de alta el asunto.",
            'ur.numeric'=>"El identificador de la :attribute desde donde se da de alta el asunto debe ser un entero.",
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
            'regSocialId'=>'régimen social',
            'estatusId'=>'estatus',
            'observaciones'=>'observaciones',
            'orgInvolucradaId'=>'organización involucrada',
            'problematica'=>'problemática',
            'user'=>'usuario creador', 
            'ur'=>'unidad responsable'          
        ];
    }
}
