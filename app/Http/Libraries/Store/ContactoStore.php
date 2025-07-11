<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaContacto;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\Admin\Contacto;
use App\Models\User AS ModelUser;

class ContactoStore extends ValidaContacto
{
    protected $contact;

    public function __construct(array $contact = [])
    {        
        parent::__construct($contact);#print_r(parent::getValidados());exit;

        count($contact)>0 ? $this->save(parent::getValidados()) : null;
    }

    protected function save(array $data)
    {
        if (isset($data['correo'])) {
            auth()->user()->email = $data['correo'];
            auth()->user()->save();
        }

        auth()->user()->contacto->nombre       = $data['nombre'];
        auth()->user()->contacto->ap_paterno   = $data['apPaterno'];
        auth()->user()->contacto->cargo        = $data['cargo'];
        auth()->user()->contacto->puesto_id    = $data['puestoId'];
        auth()->user()->contacto->municipio_id = $data['munpioId'];
        
        isset($data['apMaterno']) ? auth()->user()->contacto->ap_materno = $data['apMaterno'] : null; 

        return auth()->user()->contacto->save();
    }
}