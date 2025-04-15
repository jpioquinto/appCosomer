<?php

namespace App\Http\Controllers\API;

use App\Http\Libraries\Permissions\Permiso;
use App\Http\Libraries\Store\ModuloStore;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Exception;

class PermisoController extends Controller
{
    public function index(Request $request)
    {
        $permiso = new Permiso(auth()->user()->perfil_id, auth()->user()->id);

        #dd($permiso->obtenerPermisos());
        return response([
            'listado'=>$permiso->obtenerPermisos()
        ], 200);
    }

    public function listarModulos(Request $request)
    {
        $permiso = new Permiso(auth()->user()->perfil_id, auth()->user()->id);

        return response([
            'solicitud'=>true,
            'listado'=>$permiso->listarModulos()
        ], 200);
    }

    public function changeStatus(Request $request)
    {
        try {            
            $modulo = new ModuloStore();   
            if (!$modulo->delete($request->id)) {
                throw new Exception('No se ha logrado realizar la operación.');
            }         
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar eliminar el módulo.'], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=>'Módulo eliminado correctamente.',            
        ], 200);
    }

    public function saveModulo(Request $request)
    {
        try {            
            $modulo = new ModuloStore($request->all());  
            if ($modulo->existsError()) {
                throw new Exception($modulo->getFirstError());
            }          
        } catch (Exception $e) {            
            return response(['message'=>'Error al crear el modulo. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=>'Módulo guardado correctamente.',            
            'modulo'=>$modulo->getModulo(),
        ], 200);

    }
}
