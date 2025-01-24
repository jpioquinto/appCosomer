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
                ->leftJoin('cat_unidades as sc', 'sc.id', '=', 'c.sup_conflicto_id')
                ->leftJoin('cat_unidades as sa', 'sa.id', '=', 'c.sup_atendida_id')
                ->leftJoin('cat_regimen_social as rs', 'rs.id', '=', 'c.reg_soc_id')
                ->leftJoin('cat_estatus as es', 'es.id', '=', 'c.estatus_id')
                ->leftJoin('cat_organizaciones as org', 'org.id', '=', 'c.org_inv_id')
                ->select([
                    'c.id', 'c.fecha', 'c.municipio_id as munpioId', 'c.promovente', 'c.contraparte', 'c.vertiente_id as vertienteId', 
                    'c.sup_conflicto_id as supConflictoId', 'c.sup_atendida_id as supAtendidaId', 'num_beneficiario as numBeneficiario',
                    'c.reg_soc_id as regSocialId', 'c.estatus_id as estatusId', 'sintesis_estatus as sintEstatus', 'c.org_inv_id as orgInvolucradaId',
                    'c.problematica', 'c.estatus', 'm.estado_id as edoId', 'm.municipio', 'e.estado', 'v.vertiente', 'sc.descripcion as supConflicto', 
                    'sa.descripcion as supAtendida', 'rs.regimen', 'es.descripcion as descEstatus', 'org.nombre as orgInvolucrada'
                    ])
                ->where([
                    ['c.estatus', '!=', 0]
                ])                   
                ->orderBy('c.fecha', 'DESC')
                ->get();
    }

}
