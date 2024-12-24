<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            'message'=> $request->id ? 'UR actualizada correctamente' : 'UR guardada correctamente.',            
            'ur'=>$ur->getUR(),
        ], 200);
    }

    public function deleteUR(Request $request)
    {     
        DB::beginTransaction();   
        try {            
            $ur = new URStore(); 
            if (!$ur->deleteUR($request->id)) {
                throw new Exception('Operación fallida.');
            }   
            DB::commit();        
        } catch (Exception $e) {    
            DB::rollback();        
            return response(['message'=>'Error al eliminar la UR. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=> 'UR eliminada correctamente.',            
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
