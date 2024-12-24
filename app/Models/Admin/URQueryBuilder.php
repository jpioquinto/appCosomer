<?php

namespace App\Models\Admin;
use Illuminate\Support\Facades\DB;

class URQueryBuilder
{
    public static function obtenerListado()
    {
        return DB::table('adm_unidades_responsables as ur')
                ->leftJoin('adm_municipios as m', 'm.id', '=', 'ur.municipio_id')
                ->leftJoin('adm_estados as e', 'e.id', '=', 'm.estado_id')
                ->select([
                    'ur.id', 'ur.nombre', 'ur.estatus', 'sigla', 'calle', 'ext', 'int', 'col', 'cp', 'e.estado as edo', 
                    'm.municipio as mpio', 'e.id as edoId', 'ur.municipio_id as mpioId'                 
                    ])
                ->where([
                    ['ur.estatus', '!=', 0]
                ])                   
                ->orderBy('ur.nombre', 'ASC')
                ->get();
    }

    public static function obtenerUR(int $id)
    {
        return DB::table('adm_unidades_responsables as ur')
                ->leftJoin('adm_municipios as m', 'm.id', '=', 'ur.municipio_id')
                ->leftJoin('adm_estados as e', 'e.id', '=', 'm.estado_id')
                ->select([
                    'ur.id', 'ur.nombre', 'ur.estatus', 'sigla', 'calle', 'ext', 'int', 'col', 'cp', 'e.estado as edo', 
                    'm.municipio as mpio', 'e.id as edoId', 'ur.municipio_id as mpioId'                 
                    ])
                ->where([
                    ['ur.id', '=', $id],
                    ['ur.estatus', '!=', 0]
                ])->first();
    }
    
}
