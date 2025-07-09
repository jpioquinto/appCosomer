<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaCaptura;
use Illuminate\Support\Facades\Auth;

use App\Models\Conflicto\{Captura};
use App\Models\User AS ModelUser;

class CapturaStore extends ValidaCaptura
{
    protected $captura;

    public function __construct(array $captura = [])
    {      
        parent::__construct($captura);#var_dump(parent::getValidados());echo '...después';exit;

        count($captura)>0 && !$this->existsError() ? $this->setCaptura( $this->save(parent::getValidados(), $captura['id'] ?? -1) ) : null;
    }

    public function setCaptura($captura)
    {
        $this->captura = $captura;
    }

    public function getCaptura()
    {
        return $this->captura;
    }

    public function getId()
    {
        return $this->captura['id'] ?: 0;
    }

    public function deletes(array $captureId)
    {
        return Captura::whereIn('id', $captureId)->update(['estatus'=>0, 'eliminado_el'=>'now()', 'eliminado_por'=>auth()->user()->id]);
    }

    protected function save(array $data, int $id = -1)
    {
        $campos = [
            'conflicto_id'=>$data['conflictoId'],
            'parametro_id'=>$data['parametroId'],
            'dato'=>$data['captura'],
        ];
       
        $id === -1 ? $campos['creado_por'] = $data['user'] : null;
        $id === -1 ? Captura::where([['id', '!=', 0], ['conflicto_id', '=', $data['conflictoId']], ['parametro_id', '=', $data['parametroId']]])->update(['estatus'=>0, 'eliminado_el'=>'now()', 'eliminado_por'=>auth()->user()->id]) : null;

        if ($id > 0) {
            $campos['actualizado_el']  = "now()";
            $campos['actualizado_por'] = $data['user'];
        }

        return Captura::updateOrCreate(['id'=>$id], $campos);
    }
}