<?php 
namespace App\Http\Libraries\Permissions\Tree;
use App\Models\Admin\{PermisoQueryBuilder, Modulo};
use App\Http\Libraries\Permissions\Permiso;

class PerfilPermiso extends Permiso
{
    protected $pila;

    public function __construct(int $perfilId = -1)
    {
        parent::__construct($perfilId);

        $this->pila = collect();
    }

    public function seleccionado(int $moduloId, $acciones)
    {
        return $acciones->isEmpty() && $this->tienePermisoAmodulo($moduloId);
    }

    protected function cargarModulo($modulo)
    {
        $this->pila->push($modulo);
    }

    protected function moduloCargado(int $id)
    {
        return $this->pila->contains('id', $id);
    }
}