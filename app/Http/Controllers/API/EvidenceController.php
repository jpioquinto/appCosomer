<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EvidenceController extends Controller
{
    public function getEvidence(Request $request)
    {
       if (!Storage::disk('s3')->exists($request->path)) {
        return response(['message'=>'No se encontró la evidencia documental.'], 400);
       }
       
       $mimeType = Storage::disk('s3')->mimeType($request->path);
       $data = base64_encode(Storage::disk('s3')->get($request->path));

        return response()->json([
            'solicitud'=>true,
            'data'=>"data:{$mimeType};base64,{$data}",
            'mime'=>Storage::disk('s3')->mimeType($request->path)
        ], 200);

    }
}
