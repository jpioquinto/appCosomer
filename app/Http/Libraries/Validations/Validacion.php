<?php

namespace App\Http\Libraries\Validations;

use Illuminate\Support\Facades\Validator;
use Exception;


abstract class Validacion
{
    protected $validador;

    protected $validados;

    abstract public function rules();

    abstract public function messages();

    abstract public function attributes();

    public function __construct(array $datos = [])
    {        
        $this->validate($datos);
    }

    public function setValidados(array $entradas = [])
    {
        $this->validados = $entradas;
    }

    public function getValidados()
    {
        return $this->validados;
    }


    public function validate(array $datos)
    {
        try {

            $this->validador = Validator::make($datos, $this->rules(), $this->messages(), $this->attributes());

            if ($this->validador->fails()) {
                throw new Exception($this->getFirstError());
            }

            $this->setValidados($this->validador->validated());

        } catch (Exception $e) {
            return response()->json(['message'=>$e->getMessage()], 404);
        }
    }

    public function getFirstError()
    {
        $errors = $this->validador->errors();

        $error  = '';

        foreach ($errors->all() as $message) {
            $error = $message; break;
        }

        return $error;
    }

}
