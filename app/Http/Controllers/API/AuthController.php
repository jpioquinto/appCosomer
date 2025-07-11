<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $loginData = $request->validate([
            'nickname' => 'required',
            'password' => 'required'
        ]);

        if(!Auth::attempt($loginData)) {
            return response(['solicitud'=>false,'message'=>'Credenciales invalidas'],401);
        }

        $resultToken = auth()->user()->createToken('authToken');

        if ($request->rememberme) {
           $resultToken->accessToken->expires_at = Carbon::now()->addWeeks(1);
        }

        $mimeType = Storage::disk('avatars')->mimeType(auth()->user()->contacto->foto ?? 'not-found.png');
        $data = base64_encode(Storage::disk('avatars')->get(auth()->user()->contacto->foto ?? 'not-found.png'));
        #$resultToken->token->save();

        return response([
                    'user' => [
                        'username'=> auth()->user()->nickname,
                        'name'=>(auth()->user()->contacto->nombre ?: auth()->user()->nickname),
                        'name_full'=>(auth()->user()->contacto->nombre_completo ?: auth()->user()->nickname),
                        'perfil'=>(auth()->user()->perfil->nombre ?: '...')
                    ],
                    'contact'=>[
                        'nombre'=>auth()->user()->contacto->nombre ?: auth()->user()->nickname,
                        'apPaterno'=>auth()->user()->contacto->ap_paterno,
                        'apMaterno'=>auth()->user()->contacto->ap_materno,
                        'cargo'=>auth()->user()->contacto->cargo,
                        'puestoId'=>auth()->user()->contacto->puesto_id,
                        'munpioId'=>auth()->user()->contacto->municipio_id,
                        'edoId'=>auth()->user()->contacto->municipio->estado_id,
                        'correo'=>auth()->user()->email,
                        'foto'=>Storage::disk('avatars')->exists(auth()->user()->contacto->foto ?? 'not-found.png')
                                ? "data:{$mimeType};base64,{$data}"
                                : null,
                        'mime'=>$mimeType
                    ],                    
                    'token' => $resultToken->plainTextToken,
                    'token_type'   => 'Bearer',
                    'expires_at'   => Carbon::parse($resultToken->accessToken->expires_at)->toDateTimeString(),                    
                ],200);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens...
		$request->user()->tokens()->delete();

		$request->user()->currentAccessToken()->delete();

		return response()->json([
            'solicitud'=>true,
            'message' => 'Sessión cerrada correctamente.'], 
            200);
    }
}
