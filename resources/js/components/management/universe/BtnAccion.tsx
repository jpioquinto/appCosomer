import React, { MouseEvent, type JSX } from 'react';

import { deleteConflicto as deleteConflictoService, changeStatusConflicto } from '../../../services/ConflictoService'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import type { Acciones,Accion, Option } from '../../../types'
import type { Registro } from '../../../types/conflicto'
import CambiarEstatus from '../universe/CambiarEstatus'
import useModal from '../../../hooks/useModal'
import { notificacion } from '../../../utils'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type AccionesProps= {
    acciones:Acciones,
    conflicto:Registro,
    seguimiento:() => void
}

type AccionProps= {
    conflicto:Registro,
    id:Accion['id']
}

const MySwal = withReactContent(Swal)

export default function BtnAccion({acciones, conflicto, seguimiento}: AccionesProps) {
    const {showModal} = useModal();

    const {setCurrentConflicto, deleteConflicto, getEstatus, updateStatusConflicto} = useConflictStore();

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

    const cambiarConflicto = async (id: Registro['id'], estatus:Option) => {
        const result = await changeStatusConflicto({id, estatus});
            
        if (result.solicitud) {       
            updateStatusConflicto({id, estatus})
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

    const showModalChangeEstatus = (conflicto: Registro) => {
        MySwal.fire({
            title: "Cambiar el estatus del Asunto",
            html: <CambiarEstatus/>,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Actualizar"
        }).then((result) => {
            if (result.isConfirmed) {
                cambiarConflicto(conflicto.id, getEstatus())    
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
            case 11:
                setCurrentConflicto(conflicto)
                seguimiento()
                break;
            case 12:
                showModalChangeEstatus(conflicto)
                break;
              default:break;
          }
    }

    const crearAcciones = (acciones:Acciones) => {
        const listado : JSX.Element[] = []
        acciones?.map(accion => {
            switch(accion.id) {
                case 2: case 3: case 11: case 12:
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
