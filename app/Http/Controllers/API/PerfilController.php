<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Libraries\Permissions\Tree\ArbolPermiso;
use App\Http\Libraries\Store\PerfilStore;
use App\Http\Controllers\Controller;

class PerfilController extends Controller
{
    public function getPerfils(Request $request)
    {
        try {            
            $perfil = new PerfilStore();            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los perfiles de usuarios registrados en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de perfiles.',            
            'listado'=>$perfil->getPerfils(),
        ], 200);
    }

    public function getArbolPermiso(Request $request)
    {
        try {            
            $arbol = new ArbolPermiso($request->id ?? 0);            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar el árbol de permisos del sistema. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Permisos del sistema.',            
            'listado'=>$arbol->generarArbol(),
        ], 200);
    }
}
