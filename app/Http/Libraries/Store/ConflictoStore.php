<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaConflicto;
use Illuminate\Support\Facades\Auth;

use App\Models\Conflicto\{Conflicto, ConflictoQueryBuilder AS QueryBuilder};
use App\Models\User AS ModelUser;

class ConflictoStore extends ValidaConflicto
{
    protected $conflicto;

    public function __construct(array $conflicto = [])
    {      
        parent::__construct($conflicto);#print_r(parent::getValidados());echo '...después';exit;

        count($conflicto)>0 ? $this->setConflicto( $this->save(parent::getValidados(), $conflicto['id'] ?? -1) ) : null;
    }

    public function setConflicto($conflicto)
    {
        $this->conflicto = $conflicto;
    }

    public function getConflicto()
    {
        return $this->conflicto;
    }

    public function getConflictos()
    {
        return QueryBuilder::obtenerListado();
    }

    protected function save(array $data, int $id = -1)
    {
        $campos = [
            'fecha'=>$data['fecha'],
            'municipio_id'=>$data['munpioId'],
            'promovente'=>$data['promovente'],
            'contraparte'=>$data['contraparte'],
            'vertiente_id'=>$data['vertienteId'],
            'sup_conflicto'=>sprintf("%s-%s-%s", $data['ha'], $data['area'], $data['ca']),
            'sup_atendida'=>sprintf("%s-%s-%s", $data['haa'], $data['areaa'], $data['caa']),
            'num_beneficiario'=>$data['numBeneficiario'],
            'reg_soc_id'=>$data['regSocialId'],
            #'estatus_id'=>$data['estatusId'],
            'sintesis_estatus'=>$data['sintEstatus'],
            'org_inv_id'=>$data['orgInvolucradaId'],
            'problematica'=>$data['problematica'],
        ];
       
        $id === -1 ? $campos['estatus_id'] = $data['estatusId'] : null;
        $id === -1 ? $campos['creado_por'] = $data['user'] : null;

        if ($id > 0) {
            $campos['actualizado_el']  = "now()";
            $campos['actualizado_por'] = $data['user'];
        }

        $conflicto = Conflicto::updateOrCreate(['id'=>$id], $campos);
        
        return QueryBuilder::obtenerConflicto($conflicto->id);
    }
}