<?php

namespace App\Models\Conflicto;
use Illuminate\Support\Facades\DB;

class ConflictoQueryBuilder
{
    public static function obtenerListado()
    {
        return DB::table('conflictos as c')
                ->leftJoin('adm_municipios as m', 'm.id', '=', 'c.municipio_id')
                ->leftJoin('adm_estados as e', 'e.id', '=', 'm.estado_id')
                ->leftJoin('cat_vertientes as v', 'v.id', '=', 'c.vertiente_id')
                ->leftJoin('cat_regimen_social as rs', 'rs.id', '=', 'c.reg_soc_id')
                ->leftJoin('cat_estatus as es', 'es.id', '=', 'c.estatus_id')
                ->leftJoin('cat_organizaciones as org', 'org.id', '=', 'c.org_inv_id')
                ->select(
                    array_merge(self::campos(), [DB::Raw("CONCAT(c.ha, '-', c.area, '-', c.ca) as supConflicto, CONCAT(c.haa, '-', c.areaa, '-', c.caa) as supAtendida")]) 
                    )
                ->where([
                    ['c.estatus', '!=', 0]
                ])                   
                ->orderBy('c.fecha', 'DESC')
                ->get();
    }

    public static function obtenerConflicto(int $id)
    {
        return DB::table('conflictos as c')
                ->leftJoin('adm_municipios as m', 'm.id', '=', 'c.municipio_id')
                ->leftJoin('adm_estados as e', 'e.id', '=', 'm.estado_id')
                ->leftJoin('cat_vertientes as v', 'v.id', '=', 'c.vertiente_id')
                ->leftJoin('cat_regimen_social as rs', 'rs.id', '=', 'c.reg_soc_id')
                ->leftJoin('cat_estatus as es', 'es.id', '=', 'c.estatus_id')
                ->leftJoin('cat_organizaciones as org', 'org.id', '=', 'c.org_inv_id')
                ->select(
                    array_merge(self::campos(), [DB::Raw("CONCAT(c.ha, '-', c.area, '-', c.ca) as supConflicto, CONCAT(c.haa, '-', c.areaa, '-', c.caa) as supAtendida")]) 
                )
                ->where([
                    ['c.id', '=', $id],
                    ['c.estatus', '!=', 0]
                ])->first();
    }

    protected static function campos()
    {
        return [
            'c.id', 'c.fecha', 'c.folio', 'c.municipio_id as munpioId', 'c.promovente', 'c.contraparte', 'c.vertiente_id as vertienteId', 
            'num_beneficiario as numBeneficiario', 'c.reg_soc_id as regSocialId', 'c.estatus_id as estatusId','sintesis_estatus as sintEstatus',
            'c.problematica', 'c.ha', 'c.area', 'c.ca', 'c.haa', 'c.areaa', 'c.caa',
            'c.org_inv_id as orgInvolucradaId', 'c.estatus', 'm.estado_id as edoId', 'm.municipio', 'e.estado', 'v.vertiente',
            'rs.regimen', 'es.descripcion as descEstatus', 'org.nombre as orgInvolucrada'
        ];
    }

}
