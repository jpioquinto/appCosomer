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

    public function savePasswd(Request $request)
    {
        try {            
            $usuario = new UsuarioStore(); 
            if ( !$usuario->changePassword($request->id, $request->all()) ) {
                throw new Exception('No se ha logrado realizar la operación.');
            }           
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar actualizar la contraseña del usuario. '.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'La contraseña ha sido actualizada correctamente.'            
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

    public function changeStatus(Request $request)
    {
        try {            
            $usuario = new UsuarioStore();   
            if (!$usuario->changeStatus($request->estatus, $request->id)) {
                throw new Exception('No se ha logrado realizar la operación.');
            }         
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar '.($request->estatus ? 'activar' : 'desactivar').' el usuario.'.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Usuario '.($request->estatus==1 ? 'activado' : 'desactivado').' correctamente.',            
        ], 200);
    }

    public function changeUR(Request $request)
    {
        try {            
            $usuario = new UsuarioStore();   
            if (!$usuario->changeUR($request->user, $request->ur)) {
                throw new Exception('No se ha logrado realizar la operación.');
            }         
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar cambiar la Unidad Responsable.'.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Se ha actualizado la Unidad Responsable del usuario correctamente.',            
        ], 200);
    }

    public function changePerfil(Request $request)
    {
        try {            
            $usuario = new UsuarioStore();   
            if (!$usuario->changePerfil($request->user, $request->perfil)) {
                throw new Exception('No se ha logrado realizar la operación.');
            }         
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar cambiar el perfil.'.$e->getMessage()], 400);
        }

        return response([
            'response'=>true,
            'message'=>'Se ha actualizado el perfil del usuario correctamente.',            
        ], 200);
    }
}
