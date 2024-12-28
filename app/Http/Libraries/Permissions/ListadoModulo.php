<?php 
namespace App\Http\Libraries\Permissions;
use App\Models\Admin\{PermisoQueryBuilder, Modulo};

class ListadoModulo
{
    protected $modulos;
    protected $listado;

    public function __construct($perfilId, $usuarioId)
    {
        $this->setModulos($this->obtenerPermisos($perfilId, $usuarioId));

        $this->setListado( $this->listadoModulos() );
    }

    public function setListado($listado)
    {
        $this->listado = $listado;
    }

    public function getListado()
    {
        return $this->listado;
    }

    public function setModulos($modulos)
    {
        $this->modulos = $modulos;
    }

    public function getModulos()
    {
        return $this->modulos;
    }

    public function listadoModulos()
    {
        return Modulo::where('estatus', 1)->orderBy('nodo_padre', 'ASC')->orderBy('orden', 'ASC')->get();
    }
    
    protected function obtenerPermisos($perfilId, $usuarioId)
    {
        return $this->obtenerModulosPadre(
            $usuarioId===-1
            ? PermisoQueryBuilder::obtenerPermisos($perfilId)
            : PermisoQueryBuilder::obtenerPermisosModulos($perfilId, $usuarioId));

    }

    protected function obtenerModulosPadre($modulos)
    {
        $listado = collect();  
        $modulos->each(function ($value, $index) use ($modulos, $listado) {
            if ($value->nodo_padre > 0 && !$modulos->contains('id', $value->nodo_padre) && !$listado->contains('id', $value->nodo_padre)) {
                $modPadre = Modulo::where('id', $value->nodo_padre)->first();
                $modPadre!=null ? $listado->push($modPadre) : null;               
            }
            $listado->push($value);
        });      

        #$listado->values()->all();
             
        return $listado->sortBy('nodo_padre', SORT_NUMERIC);
    }    
}

