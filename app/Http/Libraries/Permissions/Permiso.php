<?php 
namespace App\Http\Libraries\Permissions;
use App\Models\Admin\Accion;
use Illuminate\Support\Facades\DB;

class Permiso
{
    protected $listado;
    protected $permisos;
    protected $modulos;


    public function __construct(int $perfilId, int $usuarioId = -1)
    {
        $this->listado = new ListadoModulo($perfilId, $usuarioId);

        $this->setPermisos( $this->procesarPermisos( $this->listado->getModulos()) );

        $this->setModulos($this->listadoModulos());
    }
    
    public function setModulos($modulos)
    {
        $this->modulos = $modulos;
    }

    public function getModulos()
    {
        return $this->modulos;
    }

    public function listarModulos()
    {
        return $this->listado->listadoModulos(); 
    }

    public function setPermisos($permisos)
    {
        $this->permisos = $permisos;
    }

    public function obtenerPermisos()
    {
        return $this->permisos;
    }

    public function listadoModulos()
    {
        return $this->procesarPermisos($this->listado->getListado());
    }

    public function esModuloPadre(int $moduloId)
    {
        $modulo = $this->getModulos()->whereStrict('nodo_padre', $moduloId)->first();

        return $modulo ?? false;
    }

    public function tienePermiso(int $moduloId, int $accionId) 
    {
        if (!$this->tienePermisoAmodulo($moduloId)) {
            return false;
        }

        $permiso = $this->permisos->whereStrict('id', $muduloId)->first();

        return $permiso ? $permiso->acciones->whereStrict('id', $accionId)->first() : false;
    }

    public function tienePermisoAmodulo(int $muduloId)
    {
        $permiso = $this->permisos->whereStrict('id', $muduloId)->first();

        return $permiso ? $permiso->acciones->isNotEmpty() : false;
    }

    protected function procesarPermisos($modulos)
    {   
        return $modulos->map(function ($value, $index) {#return $value;
            if ($value->acciones==null || empty($value->acciones)) {
                $value->acciones = collect();                
                return $value;
            }
            
            $acciones = gettype($value->acciones) == 'string'
                        ? Accion::whereIn('id', explode(',', $value->acciones))->orderBy('orden')->get()
                        : $value->acciones;

            $value->acciones = $acciones ?? collect();
                
            return $value;
        });           
        //return $modulos->all();
    }
}
