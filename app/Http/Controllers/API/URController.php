<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Libraries\Store\URStore;

class URController extends Controller
{
    public function save(Request $request)
    {        
        try {            
            $ur = new URStore(array_merge($request->all(), ['user'=>auth()->user()->id]));            
        } catch (Exception $e) {            
            return response(['message'=>'Error al crear la UR. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'UR guardada correctamente.',            
            'user'=>$ur->getUR(),
        ], 200);
    }

    public function getURs() 
    {
        try {            
            $ur = new URStore();            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar las unidades responsables registradas en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de unidades responsables.',            
            'listado'=>$ur->getURs(),
        ], 200);
    }
}
