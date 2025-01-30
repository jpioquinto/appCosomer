import React, {MouseEvent} from 'react'
import { deleteConflicto as deleteConflictoService } from '../../../services/ConflictoService'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import type { Registro } from '../../../types/conflicto'
import type { Acciones,Accion } from '../../../types'
import useModal from '../../../hooks/useModal'
import { notificacion } from '../../../utils'
import Swal from 'sweetalert2'

type AccionesProps= {
    acciones:Acciones,
    conflicto:Registro
}

type AccionProps= {
    conflicto:Registro,
    id:Accion['id']
}

export default function BtnAccion({acciones, conflicto}: AccionesProps) {
    const {modal, showModal, closeModal} = useModal();

    const {setCurrentConflicto, deleteConflicto} = useConflictStore();

    const eliminarConflicto = async (id: Registro['id']) => {
        const result = await deleteConflictoService({id});
            
        if (result.solicitud) {       
            deleteConflicto(id)
            notificacion(result.message, 'success')            
        } else {
            notificacion(result.message, 'error')
        }
        Swal.close()
    }

    const showModalEditConflicto = (conflicto: Registro) => {
        setCurrentConflicto(conflicto)
        showModal()
    }

     const showModalEliminarConflicto = (conflicto: Registro) => {
        Swal.fire({
            title: "¿Estás segur@?",
            html:  `Se eliminará este registro del sistema.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarConflicto(conflicto.id)    
            }
        });
    }

    const clickAccion = ({conflicto, id}:AccionProps) => {
        switch(id) {
            case 2:
                showModalEditConflicto(conflicto)
                break;
            case 3:
                showModalEliminarConflicto(conflicto)
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
                            onClick={(e: MouseEvent<HTMLButtonElement>)=>{e.preventDefault(); clickAccion({conflicto, id: accion.id})}}
                        >
                            { accion.icono ? (<i className={accion.icono}></i>) : ''}                                 
                        </button>
                    ) 
                break;
                default:break;

            }
        })
        return listado
    }
  return (
    <div className='d-grid gap-1 d-md-flex justify-content-md-start'>
        {crearAcciones(acciones)}
    </div>
  )
}
