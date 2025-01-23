<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Libraries\Store\ConflictoStore;
use Illuminate\Http\Request;

class ConflictoController extends Controller
{
    //
    public function save(Request $request)
    {
        try {            
            $ur = new ConflictoStore($request->all());            
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar guardar la información. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=> 'Información guardada correctamente.',
        ], 200);
    }
}
