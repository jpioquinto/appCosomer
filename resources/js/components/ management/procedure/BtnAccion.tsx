import React, {MouseEvent} from 'react'

import useSegundaModal from '../../../hooks/useSegundaModal'
import { Acciones, Accion } from '../../../types'
import { Registro } from '../../../types/conflicto'
import useModal from '../../../hooks/useModal'

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

    const {showSecondModal}  = useSegundaModal();

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
