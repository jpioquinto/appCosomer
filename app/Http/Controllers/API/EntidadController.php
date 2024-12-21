<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Libraries\Store\EntidadStore;


class EntidadController extends Controller
{
    public function getEdos() 
    {
        try {            
            $edo = new EntidadStore();            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar las entidades. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de entidades.',            
            'listado'=>$edo->getEdos(),
        ], 200);
    }

    public function getMunpios(Request $request) 
    {
        try {            
            $edo = new EntidadStore();            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los municipio de la entidad. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de municipios de la entidad.',            
            'listado'=>$edo->getMunpios($request->edoId),
        ], 200);
    }
}
