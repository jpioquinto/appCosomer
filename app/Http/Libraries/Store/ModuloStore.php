<?php

namespace App\Http\Libraries\Store;

use App\Http\Libraries\Validations\ValidaModulo;
use Illuminate\Support\Facades\Auth;

use App\Models\Admin\{Modulo};

class ModuloStore extends ValidaModulo
{
    protected $modulo;

    public function __construct(array $modulo = [])
    {      
        parent::__construct($modulo);

        count($modulo)>0 && !$this->existsError() ? $this->setModulo( $this->save(parent::getValidados(), $modulo['id'] ?? -1) ) : null;
    }

    public function setModulo($modulo)
    {
        $this->modulo = $modulo;
    }

    public function getModulo()
    {
        return $this->modulo;
    }

    public function getModulos(int $estatus = 1)
    {
        return Modulo::where('estatus', $estatus)->get();
    }

    public function delete(int $id)
    {
        return Modulo::where('id', $id)->update(['estatus'=>0]);
    }

    protected function save(array $data, int $id = -1)
    {
        $campos = [
            'nodo_padre'=>$data['nodo_padre'],
            'nombre'=>$data['nombre'],
            'orden'=>$data['orden'],
        ];
       
        isset($data['controlador']) ? $campos['controlador'] = $data['controlador'] : null;
        isset($data['icono'])       ? $campos['icono'] = $data['icono'] : null;
        isset($data['clase'])       ? $campos['clase'] = $data['clase'] : null;
        isset($data['acciones'])    ? $campos['acciones'] = $data['acciones'] : null;
        isset($data['descripcion']) ? $campos['descripcion'] = $data['descripcion'] : null;
        isset($data['ruta'])        ? $campos['ruta'] = $data['ruta'] : null;        
        isset($data['grupo'])       ? $campos['grupo'] = $data['grupo'] : null;        

        return Modulo::updateOrCreate(['id'=>$id], $campos);        
    }
}