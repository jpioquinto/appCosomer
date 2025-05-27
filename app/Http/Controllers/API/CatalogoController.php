<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Catalog\{Vertiente, Unidad, Regimen, Organizacion, Estatus, Valuador};

class CatalogoController extends Controller
{
    public function listarVertientes()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de vertientes.',            
            'listado'=>Vertiente::where('estatus', 1)->orderBy('acronimo', 'ASC')->get(),
        ], 200);
    }

    public function listarUnidades()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de unidades.',            
            'listado'=>Unidad::where('estatus', 1)->get(),
        ], 200);
    }

    public function listarRegimenes()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de regimenes sociales.',            
            'listado'=>Regimen::where('estatus', 1)->get(),
        ], 200);
    }

    public function listarOrganizaciones()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de organizaciones.',            
            'listado'=>Organizacion::where('estatus', 1)->get(),
        ], 200);
    }

    public function listarEstatus()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de estatus.',            
            'listado'=>Estatus::where('estatus', 1)->get(),
        ], 200);
    }

    public function listarValuadores()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de valuadores.',            
            'listado'=>Valuador::where('estatus', 1)->get(),
        ], 200);
    }
}
