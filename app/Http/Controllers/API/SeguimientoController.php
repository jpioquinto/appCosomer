<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;

use App\Models\Conflicto\{Etapa, EtapaQueryBuilder};

class SeguimientoController extends Controller
{
    public function listarEtapas(Request $request)
    {
        $capturas = $this->listarParametros($request->conflictoId);
        $etapas   = [];#print_r($capturas);exit;

        foreach (Etapa::where('estatus', 1)->get()->toArray() as $key => $etapa) {
            $etapas[] = array_merge(
                            $etapa, 
                            [
                                'capturas'=>$capturas[$etapa['id']] ?? [],
                                'expanded'=>$key ==0 ? true : false, 
                                'collapse'=>$key == 0 ? 'collapse show' : 'collapse', 
                                'style'=>[]
                            ]
                        );
        }        

        return response([
            'response'=>true,
            'message'=>'Etapas de seguimiento.',            
            'listado'=>$etapas,
        ], 200);
    }

    protected function listarParametros(int $conflictoId)
    {
        $capturas = [];
        foreach (EtapaQueryBuilder::obtenerCapturas($conflictoId) as $captura) {            
            $captura->captura ? $captura->captura = $this->procesarCaptura($captura) : null;
            $captura->capturando = false;
            $captura->keyParam   = 'param-' . $captura->id;            
            $capturas[$captura->etapaId][] = $captura;
        }

        return $capturas;
    }

    protected function procesarCaptura($registro)
    {
        $registro->captura = json_decode($registro->captura, true);

        if (is_numeric($registro->capturaId) && $registro->capturaId>0) {
            $registro->captura['id'] = $registro->capturaId;
        }

        return $registro->captura;
    }
}
