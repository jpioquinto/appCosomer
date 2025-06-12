<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaConflicto;
use Illuminate\Support\Facades\Auth;

use App\Models\Conflicto\{Conflicto, ConflictoQueryBuilder AS QueryBuilder};
use App\Models\Catalog\Entidad;
use App\Models\User AS ModelUser;

class ConflictoStore extends ValidaConflicto
{
    protected $conflicto;

    public function __construct(array $conflicto = [])
    {      
        parent::__construct($conflicto);#var_dump(parent::getValidados());echo '...después';exit;

        count($conflicto)>0 && !$this->existsError() ? $this->setConflicto( $this->save(parent::getValidados(), $conflicto['id'] ?? -1) ) : null;
    }

    public function setConflicto($conflicto)
    {
        $this->conflicto = $conflicto;
    }

    public function getConflicto()
    {
        return $this->conflicto;
    }

    public function getConflictos(array $params = [])
    {
        return QueryBuilder::listarConflictos($params);
    }

    public function delete(int $id)
    {
        return Conflicto::where('id', $id)->update(['estatus'=>0, 'eliminado_el'=>'now()', 'eliminado_por'=>auth()->user()->id]);
    }

    public function ChangeStatus(int $id, int $estatus)
    {
        return Conflicto::where('id', $id)->update(['estatus_id'=>$estatus]);
    }

    protected function save(array $data, int $id = -1)
    {
        $campos = [
            'municipio_id'=>$data['munpioId'],
            'promovente'=>$data['promovente'],            
            'vertiente_id'=>$data['vertienteId'],
            'ha'=>$data['ha'],
            'area'=>$data['area'],
            'ca'=>$data['ca'],            
            'problematica'=>$data['problematica'],
        ];

        isset($data['orgInvolucradaId']) ? $campos['org_inv_id'] = $data['orgInvolucradaId']      : null;
        isset($data['numBeneficiario'])  ? $campos['num_beneficiario'] = $data['numBeneficiario'] : null;
        isset($data['puebloIndigena'])   ? $campos['pueblo_indigena'] = $data['puebloIndigena']   : null;
        isset($data['observaciones'])    ? $campos['observaciones'] = $data['observaciones']      : null;
        isset($data['nombreRegSoc'])     ? $campos['nombre_reg_soc'] = $data['nombreRegSoc']      : null;
        isset($data['contraparte'])      ? $campos['contraparte'] = $data['contraparte']          : null;
        isset($data['anioFiscal'])       ? $campos['anio_fiscal'] = $data['anioFiscal']           : null;
        isset($data['regSocialId'])      ? $campos['reg_soc_id'] = $data['regSocialId']           : null;
        isset($data['asunto'])           ? $campos['asunto'] = $data['asunto'] : null;
        isset($data['predio'])           ? $campos['predio'] = $data['predio'] : null;
        isset($data['fecha'])            ? $campos['fecha'] = $data['fecha']   : null;
       
        $id === -1 ? $campos['folio'] = $this->generaFolio()    : null;
        $id === -1 ? $campos['estatus_id'] = $data['estatusId'] : null;
        $id === -1 ? $campos['creado_por'] = $data['user'] : null;
        $id === -1 ? $campos['ur_id']      = $data['ur']   : null;

        if ($id > 0) {
            $campos['actualizado_el']  = "now()";
            $campos['actualizado_por'] = $data['user'];
        }

        $conflicto = Conflicto::updateOrCreate(['id'=>$id], $campos);
        
        return QueryBuilder::obtenerConflicto($conflicto->id);
    }

    protected function generaFolio(int $longitud = 4)
    {
        $entidad = Entidad::where('id', $this->getEdoId())->first();

        return $entidad['estado_iso'] . '-' . str_pad(count(Conflicto::get()) + 1, $longitud, "0", STR_PAD_LEFT);
    }
}