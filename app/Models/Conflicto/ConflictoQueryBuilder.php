<?php

namespace App\Models\Conflicto;
use Illuminate\Support\Facades\DB;

class ConflictoQueryBuilder
{
    public static function listarConflictos(array $params = [])
    {
        $consulta = DB::table('conflictos as c')
                ->leftJoin('adm_municipios as m', 'm.id', '=', 'c.municipio_id')
                ->leftJoin('adm_estados as e', 'e.id', '=', 'm.estado_id')
                ->leftJoin('cat_vertientes as v', 'v.id', '=', 'c.vertiente_id')
                ->leftJoin('cat_regimen_social as rs', 'rs.id', '=', 'c.reg_soc_id')
                ->leftJoin('cat_estatus as es', 'es.id', '=', 'c.estatus_id')
                ->leftJoin('cat_organizaciones as org', 'org.id', '=', 'c.org_inv_id')
                ->select(
                    array_merge(self::campos(), self::camposSuperficie()) 
                    )
                ->where([
                    ['c.estatus', '!=', 0]
                ]);
        
        if (isset($params['entidades'])) {
            $consulta->whereIn('e.id', explode(',', $params['entidades']));
        }  
        
        if (isset($params['munpios'])) {
            $consulta->whereIn('c.municipio_id', explode(',', $params['munpios']));
        } 
        
        if (isset($params['vertiente'])) {
            $consulta->whereIn('c.vertiente_id', explode(',', $params['vertiente']));
        } 

        if (isset($params['anio'])) {#print_r(self::filtroAnioFiscal (array_unique(explode(',', $params['anio'])) )); exit;
            $consulta->where('c.anio_fiscal', '~', self::filtroAnioFiscal (array_unique(explode(',', $params['anio'])) ));
        } 

        if (isset($params['estatus'])) {
            $consulta->whereIn('c.estatus_id', explode(',', $params['estatus']));
        }   
        
        if (isset($params['texto'])) {
            $consulta->where('c.folio', 'SIMILAR TO', "{$params['texto']}");
            $consulta->orWhere('c.asunto', '~*', "{$params['texto']}");
            $consulta->orWhere('c.predio', '~*', "{$params['texto']}");
            $consulta->orWhere('c.promovente', '~*', "{$params['texto']}");
            $consulta->orWhere('c.contraparte', '~*', "{$params['texto']}");
            $consulta->orWhere('c.nombre_reg_soc', '~*', "{$params['texto']}");
            $consulta->orWhere('c.pueblo_indigena', '~*', "{$params['texto']}");
            $consulta->orWhere('c.problematica', '~*', "{$params['texto']}");
            $consulta->orWhere('c.observaciones', '~*', "{$params['texto']}");
            $consulta->orWhere('org.nombre', '~*', "{$params['texto']}");
            $consulta->orWhere('org.acronimo', '~*', "{$params['texto']}");
            $consulta->orWhere('rs.regimen', '~*', "{$params['texto']}");
        }  
        
        return $consulta->orderBy('c.fecha', 'DESC')->get();
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
                    array_merge(self::campos(), self::camposSuperficie()) 
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
            'num_beneficiario as numBeneficiario', 'c.reg_soc_id as regSocialId', 'c.estatus_id as estatusId','c.observaciones',
            'c.problematica', 'c.ha', 'c.area', 'c.ca', 'c.asunto', 'c.predio', 'c.anio_fiscal as anioFiscal', 
            'c.pueblo_indigena as puebloIndigena', 'c.nombre_reg_soc as nombreRegSoc', 'c.org_inv_id as orgInvolucradaId', 'c.estatus', 'm.estado_id as edoId',
            'm.municipio', 'e.estado', 'v.vertiente', 'v.acronimo as vertAcronimo', 'rs.regimen', 'es.descripcion as descEstatus', 'org.nombre as orgInvolucrada'
        ];
    }

    protected static function camposSuperficie()
    {
        return [DB::Raw("CONCAT(c.ha, '-', c.area, '-', c.ca) as supConflicto, obtener_superficie(c.id, 11) as supAtendida")];
    }

    protected static function filtroAnioFiscal($anios)
    {
        $filtro = '';
        foreach ($anios as $anio) {
            $filtro .= sprintf("%s|/%s/|/%s|%s/|", $anio, $anio, $anio, $anio);
        }

        return rtrim($filtro, '|');
    }

}
