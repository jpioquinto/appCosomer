import React, { MouseEvent, type JSX } from 'react';

import { useConflictStore } from '../../../store/conflict/conflictStore'
import useSegundaModal from '../../../hooks/useSegundaModal'
import { Registro } from '../../../types/conflicto'
import { Acciones, Accion } from '../../../types'
import useModal from '../../../hooks/useModal'

type AccionesProps= {
    acciones:Acciones,
    conflicto:Registro,
    prueba:() => void
}

type AccionProps= {
    conflicto:Registro,
    id:Accion['id']
}

export default function BtnAccion({acciones, conflicto, prueba}: AccionesProps) {
    const setCurrentConflicto = useConflictStore(state => state.setCurrentConflicto)

    const {showSecondModal}  = useSegundaModal()

    const {showModal} = useModal()

    const showModalDiagnostico = (conflicto: Registro) => {
        showModal()
    }

    const showModalCedula = (conflicto: Registro) => {
        showSecondModal()
    }

    const clickAccion = ({conflicto, id}: AccionProps) => {
        switch(id) {
            case 9:
                showModalDiagnostico(conflicto)
                break;
            case 10:
                showModalCedula(conflicto)
                break;
            case 11:
                setCurrentConflicto(conflicto)
                prueba();
                break;
              default:break;
          }
    }

    const crearAcciones = (acciones:Acciones) => {
        const listado : JSX.Element[] = []
        acciones?.map(accion => {
            switch(accion.id) {
                case 9: case 10: case 11:
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
    <div className='d-grid gap-1 d-md-flex justify-content-md-start accion-tabla'>
        {crearAcciones(acciones)}
    </div>
  )
}
