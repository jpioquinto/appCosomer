<?php

namespace App\Http\Controllers\API;

use App\Http\Libraries\Permissions\Permiso;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

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
}
