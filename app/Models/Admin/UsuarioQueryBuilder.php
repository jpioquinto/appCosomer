<?php

namespace App\Models\Admin;
use Illuminate\Support\Facades\DB;

class UsuarioQueryBuilder
{
    public static function obtenerListado($urId)
    {
        return DB::table('adm_usuarios as u')
                ->leftJoin('adm_perfiles as p', 'u.perfil_id', '=', 'p.id')
                ->leftJoin('adm_unidades_responsables as ur', 'ur.id', '=', 'u.ur_id')
                ->leftJoin('adm_usuarios as ucreador', 'ucreador.id', '=', 'u.creado_por')
                ->select([
                    'u.id','ur.sigla as ur', 'u.nickname', 'u.estatus', 'u.creado_el', 'u.ultimo_acceso', 
                    'ucreador.nickname as creador', 'p.nombre as perfil', 'u.ur_id', 'u.perfil_id'                   
                    ])
                ->where([
                    ['u.ur_id', '=', $urId],
                    ['u.estatus', '!=', 0],
                    ['u.creado_por', '!=', 0]
                ])                   
                ->orderBy('u.creado_el', 'DESC')
                ->get();
    }
    
}