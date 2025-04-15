<?php
namespace App\Http\Libraries\Validations;

use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rules\File;
#use Illuminate\Http\Request;

class ValidaUploadEvidence extends Validacion
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
            'archivo'=>['required', FILE::types(['pdf', 'tiff', 'tif'])->max(Config::get('max_size', 30) . 'mb')],
        ];
    }

    public function messages()
    {
        return [
            'parametroId.required'=>"El :attribute es requerido.",
            'parametroId.numeric'=>"El :attribute debe ser un entero.",
            'conflictoId.required'=>"El :attribute es requerido.",
            'conflictoId.numeric'=>"El :attribute debe ser un entero.",            
            'archivo.required'=>"No se recibió el :attribute a cargar.",
            'archivo.max'=>"El :attribute sobre pasa el tamaño permitido de " . Config::get('max_size', 30) . 'MB'
        ];
    }

    public function attributes()
    {
        return [
            'parametroId'=>'identificador del parámetro',
            'conflictoId'=>'identificador del conflicto',
            'archivo'=>'archivo'          
        ];
    }
}
