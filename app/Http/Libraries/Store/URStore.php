<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaUR;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\Admin\UnidadResponsable AS ModelUR;
use App\Models\Admin\URQueryBuilder;
use App\Models\User AS ModelUser;

class URStore extends ValidaUR
{
    protected $ur;

    public function __construct(array $ur = [])
    {        
        parent::__construct($ur);

        count($ur)>0 ? $this->setUR($this->save(parent::getValidados(), $ur['id'] ?? -1)) : null;
    }

    public function setUR($ur)
    {
        $this->ur = $ur;
    }

    public function getUR()
    {
        return $this->ur;        
    }

    public function getURs()
    {           
        return URQueryBuilder::obtenerListado();
    }

    public function deleteUR(int $id)
    {
        $update = ModelUR::where('id', $id)->update(['estatus'=>0]);

        if ($update) {
            ModelUser::where([
                ['ur_id', '=', $id],
                ['estatus', '!=', 0]
            ])->update(['estatus'=>2]);
        }

        return $update;
    }

    protected function save(array $data, int $id = -1)
    {
        $campos = $this->fillFields($data, $id > 0);

        isset($data['calle']) && !is_null($data['calle']) ? $campos['calle'] = $data['calle'] : null;
        isset($data['ext']) &&   !is_null($data['ext'])   ? $campos['ext']   = $data['ext']   : null;
        isset($data['int']) &&   !is_null($data['int'])   ? $campos['int']   = $data['int']   : null;
        isset($data['col']) &&    !is_null($data['col'])  ? $campos['col']   = $data['col']   : null;
        isset($data['cp'])  &&   !is_null($data['cp'])    ? $campos['cp']    = $data['cp']    : null;
        (isset($data['mpio']) && $data['mpio']>0)  ? $campos['municipio_id'] = $data['mpio'] : null;
        
        $campos['nombre'] = $data['ur'];

        $ur = ModelUR::updateOrCreate(['id'=>$id], $campos);

        return $ur ? URQueryBuilder::obtenerUR($ur->id) : $ur;
    }

    protected function fillFields(array $data, bool $update)
    {
        if (!$update) {
            return [
                'sigla'=>mb_strtoupper($data['sigla']),
                'carpeta'=>mb_strtoupper($data['sigla']),            
                'creado_por'=>$data['user']            
            ];
        }

        return [
            'sigla'=>mb_strtoupper($data['sigla']),
            'actualizado_el'=>'now()',           
            'actualizado_por'=>$data['user']            
        ];
    }
}