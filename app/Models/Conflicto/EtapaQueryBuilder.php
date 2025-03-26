<?php

namespace App\Models\Conflicto;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;

class EtapaQueryBuilder
{
    public static function obtenerCapturas(int $conflictoId)
    {
        return  DB::table('parametros as p')
                ->leftJoin('informacion_conflictos as i', function (JoinClause $join) use ($conflictoId) {
                        $join->on('i.parametro_id', '=', 'p.id')
                        ->where('i.conflicto_id', '=', $conflictoId)
                        ->where('i.estatus', '=', 1);
                    })
                ->select(self::campos())
                ->where('p.estatus', 1)
                ->orderBy('p.etapa_id', 'ASC')
                ->orderBy('p.orden', 'ASC')->get();
    }

    protected static function campos()
    {
        return [
            'p.id', 'p.etapa_id as etapaId', 'p.parametro', 'p.orden', 'p.ponderacion', 'p.calificable', 'p.requiere_doc as requiereDoc', 'p.accion',
            'p.definicion', 'p.premisa_id as premisaId', 'i.dato as captura', 'i.validado' 
        ];
    }
}
