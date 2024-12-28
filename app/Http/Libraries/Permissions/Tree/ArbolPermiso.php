<?php 
namespace App\Http\Libraries\Permissions\Tree;
use App\Models\Admin\{PermisoQueryBuilder, Modulo};

class ArbolPermiso extends PerfilPermiso
{
    public function __construct(int $perfilId = 0)
    {
        parent::__construct($perfilId);
    }

    public function generarArbol()
    {   
        $arbol = collect();
        
        $this->listadoModulos()->each(function($modulo) use ($arbol) {
            if ($this->moduloCargado($modulo->id)) {
                return true;
            }

            $arbol->push($this->obtenerModulo($modulo));
            
        });

        return $arbol;
    }

    protected function obtenerModulo($modulo)
    {
        $this->cargarModulo($modulo);

        $acciones = $this->agregarAcciones($modulo);

        $itemModulo = $this->generarElemento(
            $modulo, $modulo->nodo_padre, 
            (!$this->esModuloPadre($modulo->id) && $this->seleccionado($modulo->id, $acciones))
        );

        return !$this->esModuloPadre($modulo->id)
        ? array_merge($itemModulo, ['children' => $acciones])
        : array_merge( $itemModulo, ['children' => $this->obtenerModulosHijos($modulo->id)] );        
    }
 
    protected function obtenerModulosHijos(int $idPadre)
    {
        $items = collect();
        collect($this->listadoModulos())->each(function($modulo) use ($items, $idPadre) {
            if ($modulo->nodo_padre !== $idPadre || $this->moduloCargado($modulo->id)) {
                return true;
            }

            $this->cargarModulo($modulo);

            $acciones = $this->agregarAcciones($modulo);

            $items->push(
                array_merge(
                $this->generarElemento($modulo, $idPadre, (!$this->esModuloPadre($modulo->id) && $this->seleccionado($modulo->id, $acciones))), 
                ['children' => $this->esModuloPadre($modulo->id) ?  $this->obtenerModulosHijos($modulo->id) : $acciones]
            ));

        });

        return $items;
    }

    protected function generarElemento($elemento, $idPadre='#', $selected=false, $iconDefault='fa icon-screen-desktop')
    {
        $elemento= [
            'id'=>$idPadre.'-'.$elemento['id'],             
            'text'=>$elemento['nombre'], 
            'icon'=>!empty($elemento['icono']) ? $elemento['icono'] : $iconDefault,
            'data'=>['elemento_id'=>$elemento['id'],'padre_id'=>$idPadre]
            
        ];

        if ($selected) {
            $elemento['state'] = ['selected' => true];
        }
        return $elemento;
    }

    protected function agregarAcciones($modulo, $iconAccion = 'icon-wrench')
    {   
        $acciones = collect();

        $modulo->acciones->each(function($accion) use ($acciones, $modulo, $iconAccion) {
            $accion->icono  = $iconAccion;
            $accion->nombre = $accion->descripcion;
            $acciones->push(
                $this->generarElemento(
                    $accion, $modulo->id, $this->tienePermiso($modulo->id, $accion->id)
                )
            );
        });

        return $acciones;
    }
}