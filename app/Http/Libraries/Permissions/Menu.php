<?php 
namespace App\Http\Libraries\Permissions;


class Menu
{
    protected $permiso;

    protected $menu;

    protected $items;

    public function __construct(Permiso $permiso)
    {
        $this->permiso = collect($permiso->obtenerPermisos());

        $this->menu  = collect();

        $this->items = collect();
    }
    
    public function generarMenu()
    {
        $this->permiso->each(function($permiso, $key) {
            
            if ($this->items->contains('id', $permiso->id)) {
                return true;
            }
            #dd($permiso);exit;
            $this->items->push($permiso);   
            
            $permiso->activo = '';
            $permiso->items  = $this->obtenerItemsHijos($permiso->id);

            $this->menu->push($permiso);
        });

        return $this->menu;
    }

    protected function obtenerItemsHijos($id)
    {
        $items = collect();

        $this->permiso->each(function($permiso, $key) use ($items, $id) {
            
            if ($permiso->nodo_padre !== $id || $this->items->contains('id', $permiso->id)) {
                return true;
            }
            $this->items->push($permiso);

            $permiso->activo = '';
            $permiso->items  = $this->obtenerItemsHijos($permiso->id);
            
            $items->push($permiso);
        });

        return $items;
    }
}
