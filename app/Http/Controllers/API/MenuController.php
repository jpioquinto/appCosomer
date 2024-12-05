<?php

namespace App\Http\Controllers\API;

use App\Http\Libraries\Permissions\{Permiso, Menu};
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $menu = new Menu(new Permiso(auth()->user()->perfil_id, auth()->user()->id));

        return response([
            'menu'=>$menu->generarMenu()
        ], 200);
    }
}
