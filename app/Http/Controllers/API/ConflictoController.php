<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Libraries\Store\ConflictoStore;
use Illuminate\Http\Request;

class ConflictoController extends Controller
{
    public function getConflictos()
    {
        try {            
            $conflicto = new ConflictoStore();            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los conflictos registrados en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de conflictos.',            
            'listado'=>$conflicto->getConflictos(),
        ], 200);
    }

    public function save(Request $request)
    {
        try {            
            $conflicto = new ConflictoStore( array_merge($request->all(), ['user'=>auth()->user()->id]) );            
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar guardar la información. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'conflicto'=>$conflicto->getConflicto(),
            'message'=> 'Información guardada correctamente.',
        ], 200);
    }
}
