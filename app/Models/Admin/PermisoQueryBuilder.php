<?php

namespace App\Models\Admin;
use Illuminate\Support\Facades\DB;

class PermisoQueryBuilder
{
    public static function obtenerPermisosModulos($perfilId, $usuarioId)
    {
        return DB::table('adm_permisos')
                ->leftJoin('adm_modulos', 'adm_modulos.id', '=', 'adm_permisos.modulo_id')
                ->select([
                    "adm_modulos.id", "adm_modulos.nombre", "adm_modulos.controlador", "adm_modulos.icono", "adm_modulos.clase", 
                    "adm_modulos.orden", "adm_modulos.nodo_padre", "adm_modulos.descripcion", "adm_permisos.acciones"
                    ])
                ->where([
                    ['adm_permisos.estatus', '=', 1],
                    ['adm_modulos.estatus', '=', 1]
                ])                   
                ->where('adm_permisos.perfil_id', $perfilId)   
                ->orWhere('adm_permisos.usuario_id', $usuarioId)
                ->orderBy('adm_modulos.nodo_padre', 'asc') 
                ->orderBy('adm_modulos.orden', 'asc') 
                ->get();
    }
    
}
