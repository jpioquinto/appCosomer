import React from 'react'
import type { Acciones, User } from '../../types'

/*type AccionProps = {
    clase:string | undefined,
    icono:string | undefined,
    leyenda:string | undefined,
    descripcion:string | null
}*/
type AccionesProps= {
    acciones:Acciones,
    user:User
}

export default function BtnAccion({acciones, user}: AccionesProps) {
    const crearAcciones = (acciones:Acciones) => {
        const listado : JSX.Element[] = []
        acciones?.map(accion => {
            switch(accion.id) {
                case 4:
                    const iconos = JSON.parse(accion.icono);console.log(iconos, user)
                    const icono  = iconos.hasOwnProperty(user.estatus) ? iconos[user.estatus] : undefined;
                    listado.push( 
                        <button 
                            key={accion.id}
                            type="button"
                            data-bs-toggle="tooltip"          
                            className={accion.clase ? accion.clase : 'btn btn-link btn-primary'}
                            data-bs-title={user.estatus===2 ? 'Habilitar usuario' : 'Inhabilitar usuario'}
                        >
                            { icono ? (<i className={icono}></i>) : ''}                                 
                        </button>
                    )
                break;
                case 5: case 6: case 7:
                    listado.push( 
                        <button 
                            key={accion.id}
                            type="button"
                            data-bs-toggle="tooltip"          
                            className={accion.clase ? accion.clase : 'btn btn-link btn-primary'}
                            data-bs-title={accion.descripcion ? accion.descripcion : '...'}
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
    <div className="d-flex">
        {crearAcciones(acciones)}
    </div>
  )
}
