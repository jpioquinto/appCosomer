<?php

namespace App\Http\Controllers\API;

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
            return response(['message'=>'Credenciales invalidas'],401);
        }

        $resultToken = auth()->user()->createToken('authToken');#dd($resultToken->plainTextToken);exit;

        if ($request->rememberme) {
           $resultToken->accessToken->expires_at = Carbon::now()->addWeeks(1);
        }
        #$resultToken->token->save();

        return response([
                    'user' => [
                        'username'=> auth()->user()->nickname,
                        'nombre'=>(auth()->user()->contacto->nombre_completo ?: auth()->user()->nickname),
                        'perfil'=>(auth()->user()->perfil->nombre ?: '...')
                    ],
                    'token' => $resultToken->plainTextToken,
                    'token_type'   => 'Bearer',
                    'expires_at'   => Carbon::parse($resultToken->accessToken->expires_at)->toDateTimeString(),                    
                ],200);
    }
}
