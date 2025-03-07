import React, {MouseEvent} from 'react'
import type { Acciones, Accion, PerfilSchema } from '../../types'
import useModal from '../../hooks/useModal'
import { usePerfilStore } from '../../store/perfil'

type AccionesProps= {
    acciones:Acciones,
    perfil:PerfilSchema
}

type AccionProps= {
    perfil:PerfilSchema,
    id:Accion['id']
}

export default function BtnAccion({acciones, perfil}: AccionesProps) {
    const {showModal} = useModal()

    const setCurrentPerfil = usePerfilStore(state => state.setCurrentPerfil)

    const showModalEdit = (perfil:PerfilSchema) => {
        setCurrentPerfil(perfil)
        showModal()
    }

    const clickAccion = ({perfil, id}:AccionProps) => {
        switch(id) {
            case 2:
                showModalEdit(perfil)
                break;
            case 3:
                //showModalEliminarUR(perfil)
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
                            onClick={(e: MouseEvent<HTMLButtonElement>)=>{e.preventDefault(); clickAccion({perfil, id: accion.id})}}
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
    <div className="d-grid gap-1 d-md-flex justify-content-md-end">
      {crearAcciones(acciones)}
    </div>
  )
}
