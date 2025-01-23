<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaConflicto;
use Illuminate\Support\Facades\Auth;

use App\Models\Conflicto\Conflicto;
use App\Models\User AS ModelUser;

class ConflictoStore extends ValidaConflicto
{
    protected $conflicto;

    public function __construct(array $conflicto = [])
    {      
        parent::__construct($conflicto);print_r(parent::getValidados());echo '...después';exit;

        #count($conflicto)>0 ? $this->save(parent::getValidados()) : null;
    }

    protected function save(array $data, int $id = -1)
    {
       

        $ur = Conflicto::updateOrCreate(['id'=>$id], $campos);
    }
}