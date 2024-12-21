<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

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
}
