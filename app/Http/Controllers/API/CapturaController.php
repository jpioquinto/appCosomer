<?php

namespace App\Http\Controllers\API;

use App\Http\Libraries\Upload\UploadEvidence;
use App\Http\Libraries\Store\CapturaStore;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;

class CapturaController extends Controller
{
    public function upload(Request $request)
    {
        try {
            $upload = new UploadEvidence($request);
            $move   = $upload->upload();

            if (!$move['solicitud']) {
                throw new Exception('Operación fallida. ' . $move['message']);
            }
        } catch (Exception $e) {
            return response(['solicitud'=>false,'message'=>$e->getMessage()], 400);
        }

        return response($move, 200);
    }
    
    public function save(Request $request)
    {
        DB::beginTransaction();        
        try { #print_r(json_decode($request->capturas, true));exit;                              
            $captura = $this->saveCapture(json_decode($request->capturas, true), $request->conflictoId);
            if (!$captura['solicitud']) {
                throw new Exception($captura['message']);
            }   
            DB::commit();            
        } catch (Exception $e) {  
            DB::rollback();          
            return response(['message'=>$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'total'=>$captura['total'] ?: 0,
            'message'=> 'Información guardada correctamente.',            
        ], 200);
    }

    protected function saveCapture($captures, $conflictoId)
    {
        try {
            $total = 0;
            foreach ($captures as $paramId => $capture) {
                $result = new CapturaStore([
                                'parametroId'=>$paramId, 
                                'user'=>auth()->user()->id, 
                                'conflictoId'=>$conflictoId,
                                'id'=>$capture['id'] ?? null,
                                'captura'=>json_encode($capture),
                            ]);                 
                if ($result->existsError()) {
                    throw new Exception($result->getFirstError());
                }                
                $total += $result->getId() ? 1 : 0;
            }
        } catch(Exception $e) {
            return [
                'solicitud'=>false,
                'message'=>'Error al intentar guardar la información. '.$e->getMessage()
            ];
        }
        
        return ['solicitud'=>true, 'total'=>$total];
    }
}
