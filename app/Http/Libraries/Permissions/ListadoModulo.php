<?php 
namespace App\Http\Libraries\Permissions;
use App\Models\Admin\{PermisoQueryBuilder, Modulo};

class ListadoModulo
{
    protected $modulos;

    public function __construct($perfilId, $usuarioId)
    {
        $this->setModulos($this->obtenerPermisos($perfilId, $usuarioId));
    }

    public function setModulos($modulos)
    {
        $this->modulos = $modulos;
    }

    public function getModulos()
    {
        return $this->modulos;
    }

    public function ordernarPermisos($permisoA, $permisoB)
    {
       if ($permisoA->nodo_padre != $permisoB->nodo_padre) {
            return $permisoA->nodo_padre > $permisoB->nodo_padre;
        }
        return $permisoA->orden->$permisoB->orden;
    }  
    
    protected function obtenerPermisos($perfilId, $usuarioId)
    {
        return $this->obtenerModulosPadre(PermisoQueryBuilder::obtenerPermisosModulos($perfilId, $usuarioId));

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

