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
        try { #print_r($request->removes);exit; #print_r(json_decode($request->captures, true));exit;                              
            $captura = $this->saveCapture(json_decode($request->captures, true), $request->conflictoId, $request->removes ?? []);
            if (!$captura['solicitud']) {
                throw new Exception($captura['message']);
            }   
            DB::commit();            
        } catch (Exception $e) {  
            DB::rollback();          
            return response(['solicitud'=>false, 'message'=>$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>$captura['solicitud'],
            'total'=>$captura['total'],
            'message'=> $captura['onlyRemove'] ? 'Captura(s) removida(s) correctamente.' : ($captura['total'] >0 ? 'Información guardada correctamente.' : 'No se guardó la información captura.'),            
        ], 200);
    }

    protected function saveCapture($captures, $conflictoId, array $captureId = [])
    {
        try {
            $removes = count($captureId) > 0 ? $this->removes($captureId) : [];

            if (isset($removes['solicitud']) && !$removes['solicitud']) {
                throw new Exception($removes['message']);
            }

            $insert = $this->insert($captures, $conflictoId);

            if (!$insert['solicitud']) {
                throw new Exception($insert['message']);
            }

        } catch(Exception $e) {
            return [
                'solicitud'=>false,
                'message'=>$e->getMessage()
            ];
        }
        
        return ['solicitud'=>true, 'total'=>$insert['total'], 'onlyRemove'=>(isset($removes['solicitud']) && $removes['total']>0 && $insert['total']==0)];
    }

    protected function insert($captures, $conflictoId)
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
                $total += $result->getId() > 0 ? 1 : 0;
            }
        } catch(Exception $e) {
            return [
                'solicitud'=>false,
                'message'=>'Error al intentar guardar la información. '.$e->getMessage()
            ];
        }        
        return ['solicitud'=>true, 'total'=>$total];
    }

    protected function removes(array $captureId)
    {
        try {
            $capture = new CapturaStore();                 
            if (($affected = $capture->deletes($captureId)) == 0) {
                throw new Exception('No se logró remover la(s) captura(s).');
            } 
        } catch(Exception $e) {
            return [
                'solicitud'=>false,
                'message'=>$e->getMessage()
            ];
        }
        
        return ['solicitud'=>true, 'total'=>$affected, 'message'=>'Capturas removidas correctamente.'];
    }
}
