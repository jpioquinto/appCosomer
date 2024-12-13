<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Http\Libraries\Store\UsuarioStore;

class UsuarioController extends Controller
{
    public function save(Request $request)
    {        
        try {            
            $usuario = new UsuarioStore(array_merge($request->all(), ['ur'=>auth()->user()->ur_id, 'user'=>auth()->user()->id]));            
        } catch (Exception $e) {            
            return response(['message'=>'Error al crear el usuario. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Usuario guardado correctamente.',            
            'user'=>$usuario->getUser(),
        ], 200);
    }

    public function getUsers() 
    {
        try {            
            $usuario = new UsuarioStore();            
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los usuarios registrados en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Listado de usuarios.',            
            'listado'=>$usuario->getUsers(),
        ], 200);
    }
}
