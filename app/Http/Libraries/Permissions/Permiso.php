<?php 
namespace App\Http\Libraries\Permissions;
use App\Models\Admin\Accion;

class Permiso
{
    protected $listadoModulo;


    public function __construct($perfilId, $usuarioId)
    {
        $this->listadoModulo = new ListadoModulo($perfilId, $usuarioId);
    }
    
    public function obtenerPermisos()
    {
        return $this->procesarPermisos($this->listadoModulo->getModulos());
    }

    protected function procesarPermisos($modulos)
    {   
        $modulos->map(function ($value, $index) {#return $value;
            if ($value->acciones==null || empty($value->acciones)) {
                $value->acciones = [];                
                return $value;
            }

            $acciones = Accion::whereIn('id', explode(',', $value->acciones))->get();

            $value->acciones = $acciones!=null ? $acciones : [];
                
            return $value;
        });           
        return $modulos->all();
    }
}
