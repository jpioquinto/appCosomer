<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Libraries\Store\ConflictoStore;
use Illuminate\Http\Request;
use Exception;

class ConflictoController extends Controller
{
    public function getConflicts(Request $request)
    {
        try {            
            $conflicto = new ConflictoStore();                   
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los conflictos registrados en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=>'Listado de conflictos.',            
            'listado'=>$conflicto->getConflictos($request->all()),
        ], 200);
    }
    
    public function save(Request $request)
    {        
        try {            
            $conflicto = new ConflictoStore( array_merge($request->all(), ['user'=>auth()->user()->id, 'ur'=>auth()->user()->ur_id]) ); 
            if ($conflicto->existsError()) {
                throw new Exception($conflicto->getFirstError());
            }              
        } catch (Exception $e) {          
            return response(['message'=>'Error al intentar guardar la información. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'conflicto'=>$conflicto->getConflicto(),
            'message'=> 'Información guardada correctamente.',            
        ], 200);
    }

    public function deleteConflicto(Request $request)
    {        
        try {            
            $conflicto = new ConflictoStore(); 

            if (!$conflicto->delete($request->id)) {
                throw new Exception('Operación fallida.');
            }  
                        
        } catch (Exception $e) {                        
            return response(['message'=>'Error al intentar eliminar el registro. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=> 'Registro eliminado correctamente.',
        ], 200);
    }

    public function changeStatus(Request $request)
    {        
        try {            
            $conflicto = new ConflictoStore(); 

            if (!$conflicto->ChangeStatus($request->id, $request->estatus)) {
                throw new Exception('Operación fallida.');
            }  
                        
        } catch (Exception $e) {                        
            return response(['message'=>'Error al intentar cambiar el estatus del asunto. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=> 'Se ha cambiado el estatus del asunto correctamente.',
        ], 200);
    }
}
