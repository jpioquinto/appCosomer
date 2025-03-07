import React, { MouseEvent } from 'react'
import type { Acciones, Accion } from '../../types'
import { changeStatusModulo } from '../../services/ModuloService'
import type { RegistroModulo } from '../../schema/modulo-schema'
import { useModuloStore } from '../../store/modulo'
import useModal from '../../hooks/useModal'
import { notificacion } from '../../utils'

import Swal from 'sweetalert2'

type AccionesProps= {
    acciones:Acciones,
    module:RegistroModulo
}

type AccionProps= {
    module:RegistroModulo,
    id:Accion['id']
}

export default function BtnAccion({acciones, module}:  AccionesProps) {
    const {deleteModulo, setCurrentModulo} = useModuloStore();
    const {showModal} = useModal();

    const showModalEditModulo = (module: RegistroModulo) => {
        setCurrentModulo(module)
        showModal()
    }

    const eliminarModulo = async (id: RegistroModulo['id']) => {
        const result = await changeStatusModulo({id});
            
        if (result.solicitud) {       
          deleteModulo(id)
          notificacion(result.message, 'success')
            
        } else {
          notificacion(result.message, 'error')
        }

        Swal.close()
    }

    const clickEliminar = (module:RegistroModulo) => {
        Swal.fire({
            title: "¿Estás seguro/a?",
            text: `Se eliminará el módulo ${module.nombre}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Sí, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarModulo(module.id);        
            }
        });
    }

    const clickAccion = ({module, id}:AccionProps) => {
        switch(id) {
            case 2:                
                showModalEditModulo(module)
            break;
            case 3:
                clickEliminar(module)
            break;
            default:break;
        }
    }

    const crearAcciones = (acciones:Acciones) => {
        const listado : JSX.Element[] = []
        acciones?.map(accion => {
            switch(accion.id) {
                case 2: case 3:
                    listado.push( 
                        <button 
                            key={accion.id}
                            type="button"
                            data-bs-toggle="tooltip"          
                            className={accion.clase ? accion.clase : 'btn btn-link btn-primary'}
                            data-bs-title={accion.descripcion ? accion.descripcion : '...'}
                            onClick={(e: MouseEvent<HTMLButtonElement>)=>{e.preventDefault(); clickAccion({module, id: accion.id})}}
                        >
                            { accion.icono ? (<i className={accion.icono}></i>) : ''}                                 
                        </button>
                    )  
                break;
            }
        })
        return listado
    }

  return (
    <div className="d-grid gap-1 d-md-flex justify-content-md-start">
      {crearAcciones(acciones)}
    </div>
  )
}
