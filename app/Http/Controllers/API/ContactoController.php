<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Libraries\Store\ContactoStore;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Catalog\Puesto;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function getListado()
    {
        return response([
            'solicitud'=>true,
            'message'=>'Listado de puestos.',            
            'listado'=>Puesto::where('estatus', 1)->get(),
        ], 200);
    }

    public function subirFoto(Request $request)
    {
        Validator::validate($request->all(), [
            'foto' => [
                'required',
                File::image()
                    ->max('500kb') 
            ],
        ],[
            'foto.required' => 'No se recibió la imagen a cargar.', 
            'foto.max' => 'La imagen sobre pasa el tamaño permitido de 500 KB.' 
        ]);

        $foto = $request->file('foto')->storeAs('/', "avatar_".auth()->user()->nickname."_".base64_encode(auth()->user()->id), 'avatars');

        if ($foto) {
            auth()->user()->contacto->foto = $foto;# . '.' .  $request->file('foto')->extension();
            auth()->user()->contacto->save();
        }
        
        return response([
            'solicitud'=>true,
            'message'=>'Foto de perfil cargada correctamente.',            
            'url'=>Storage::disk('avatars')->exists($foto) 
                    ? Storage::disk('avatars')->url($foto) . '?hash=' . mt_rand()
                    : Storage::disk('avatars')->url('default.png')
        ], 200);
    }

    public function save(Request $request)
    {
        try {            
            $ur = new ContactoStore($request->all());            
        } catch (Exception $e) {            
            return response(['message'=>'Error al intentar guardar la información de contacto. '.$e->getMessage()], 400);
        }

        return response([
            'solicitud'=>true,
            'message'=> 'Información guardada correctamente.',
        ], 200);
    }
}
