<?php

namespace App\Models\Admin;
use Illuminate\Support\Facades\DB;

class PermisoQueryBuilder
{
    public static function obtenerPermisosModulos($perfilId, $usuarioId, $grupo=1)
    {
        return DB::table('adm_permisos as p')
                ->leftJoin('adm_modulos as m', 'm.id', '=', 'p.modulo_id')
                ->select([
                    "m.id", "m.nombre", "m.controlador", "m.icono", "m.clase", 
                    "m.orden", "m.nodo_padre", "m.descripcion", "m.ruta", "p.acciones"                    
                    ])
                ->where([
                    ['m.grupo', '=', $grupo],
                    ['p.estatus', '=', 1],
                    ['m.estatus', '=', 1]
                ])                   
                ->where('p.perfil_id', $perfilId)   
                ->orWhere('p.usuario_id', $usuarioId)
                ->orderBy('m.nodo_padre', 'asc') 
                ->orderBy('m.orden', 'asc') 
                ->get();
    }
    
    public static function obtenerPermisos($perfilId)
    {
        return DB::table('adm_permisos as p')
                ->leftJoin('adm_modulos as m', 'm.id', '=', 'p.modulo_id')
                ->select([
                    "m.id", "m.nombre", "m.controlador", "m.icono", "m.clase", 
                    "m.orden", "m.nodo_padre", "m.descripcion", "m.ruta", "p.acciones"                    
                    ])
                ->where([
                    ['p.estatus', '=', 1],
                    ['m.estatus', '=', 1]
                ])                   
                ->where('p.perfil_id', $perfilId)   
                ->orderBy('m.nodo_padre', 'asc') 
                ->orderBy('m.orden', 'asc') 
                ->get();
    }
}
