import React, {MouseEvent} from 'react'
import type { Acciones, User, Accion, URSchema } from '../../types'
import useModal from '../../hooks/useModal'
import { useURStore } from '../../store/urStore'
import Swal from 'sweetalert2'
import { notificacion } from '../../utils'
import { deleteUR as _deleteUR } from '../../services/UrService'

type AccionesProps= {
    acciones:Acciones,
    ur:URSchema
}

type AccionProps= {
    ur:URSchema,
    id:Accion['id']
}

export default function BtnAccion({acciones, ur}: AccionesProps) {

    const {modal, showModal, closeModal} = useModal()

    const setCurrentUR = useURStore(state => state.setCurrentUR)

    const deleteUR     = useURStore(state => state.deleteUR)

    const eliminarUR = async (id:URSchema['id']) => {
        const result = await _deleteUR({id});
            
        if (result.response) {       
            deleteUR(id)
            notificacion(result.message, 'success')            
        } else {
            notificacion(result.message, 'error')
        }
        Swal.close()
    }
    

    const showModalEditUR = (ur:URSchema) => {
        setCurrentUR(ur)
        showModal()
    }

    const showModalEliminarUR = (ur:URSchema) => {
        Swal.fire({
            title: "¿Estás segur@?",
            html:  `Se eliminará la UR (<strong>${ur.sigla}</strong>), si contiene usuarios asignados no podrán ingresar.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUR(ur.id)    
            }
        });
    }

    const clickAccion = ({ur, id}:AccionProps) => {
        switch(id) {
            case 2:
                showModalEditUR(ur)
                break;
            case 3:
                showModalEliminarUR(ur)
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
                            onClick={(e: MouseEvent<HTMLButtonElement>)=>{e.preventDefault(); clickAccion({ur, id: accion.id})}}
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
