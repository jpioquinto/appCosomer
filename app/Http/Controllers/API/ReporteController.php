<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReporteController extends Controller
{
    public function getConflictos(Request $request)
    {
        print_r($request->all());exit;
        /*try {            
            $conflicto = new ConflictoStore();                   
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los conflictos registrados en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de conflictos.',            
            'listado'=>$conflicto->getConflictos($request->estatus ? explode(',', $request->estatus) : []),
        ], 200);*/
    }
}
