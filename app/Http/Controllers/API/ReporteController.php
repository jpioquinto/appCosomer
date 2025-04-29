<?php

namespace App\Http\Controllers\API;

use App\Http\Libraries\Report\Conflicto;
use App\Http\Controllers\Controller;
use App\Exports\ConflictsExport;
use Illuminate\Http\Request;
#use Maatwebsite\Excel\Facades\Excel;

class ReporteController extends Controller
{
    public function getConflicts(Request $request)
    {       
        try {            
            $conflicto = new Conflicto();                   
        } catch (Exception $e) {            
            return response(['message'=>'Error al recuperar los conflictos registrados en el sistema. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=>'Listado de conflictos.',            
            'listado'=>$conflicto->listar($request->all()),
        ], 200);
    }

    public function download(Request $request)
    {
        try {            
            $export = new ConflictsExport($request->all());
            if (!$export->export()) {
                throw new Exception('Operación fallida, verifique permisos en directorio.');
            }
                               
        } catch (Exception $e) {            
            return response(['message'=>'Error al generar el reporte xlsx. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=>'Reporte generado correctamente.',            
            'name'=>str_replace('temp/', '', $export->getName()),
            'report'=>$export->getUrlReport(),
        ], 200);

    }
}
