import React, { MouseEvent, type JSX } from 'react';

import type { Acciones, User, Accion } from '../../types'
import useAccionUsuario from '../../hooks/useAccionUsuario'
import CambiarPassword from './CambiarPassword'
import { useUserStore } from '../../store/user'
import CambiarPerfil from './CambiarPerfil'
import CambiarUR from './CambiarUR'

type AccionesProps= {
    acciones:Acciones,
    user:User
}

type AccionProps= {
    user:User,
    id:Accion['id']
  }

export default function BtnAccion({acciones, user}: AccionesProps) {
    const {clickAccion, MySwal, optionsUR, optionsPerfil, cambiarUR, cambiarPerfil} = useAccionUsuario();

    const getURSelected = useUserStore(state => state.getURSelected)

    const getPerfilSelected = useUserStore(state => state.getPerfilSelected)

    const showModalChangePassword = (user:User) => {
        MySwal.fire({
            title:"Cambiar contraseña",
            text: `Se cambiará la contraseña para ${user.nickname}`,
            icon: "info",
            html:<CambiarPassword user={user} />,
            showConfirmButton:false
        });
      }

    const showModalChangePerfil = (user:User) => {
        MySwal.fire({
            title: "Cambiar Perfil de Usuario",
            text: `Se cambiará el perfil para ${user.nickname}`,
            icon: "info",
            html:<CambiarPerfil options={optionsPerfil} />,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Actualizar"
        }).then((result) => {
          if (result.isConfirmed) {
            cambiarPerfil(user, getPerfilSelected())
          }
        });
    }

    const showModalChangeUR = (user:User) => {
        MySwal.fire({
            title: `Cambiar UR a ${user.nickname}`,
            html:<CambiarUR options={optionsUR} />,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                cambiarUR(user, getURSelected())
            }
        })
    }

    const clickAccionInput = ({user, id}:AccionProps) => {
        switch(id) {
            case 5:
                showModalChangeUR(user)
                break;
            case 6:
                showModalChangePassword(user)
                break;
            case 7:
                showModalChangePerfil(user)
                break;
              default:break;
          }
    }

    const crearAcciones = (acciones:Acciones) => {
        const listado : JSX.Element[] = []
        acciones?.map(accion => {
            switch(accion.id) {
                case 4:
                    const iconos = JSON.parse(accion.icono);
                    const icono  = iconos.hasOwnProperty(user.estatus) ? iconos[user.estatus] : undefined;
                    listado.push( 
                        <button 
                            key={accion.id}
                            type="button"
                            data-bs-toggle="tooltip"          
                            className={accion.clase ? accion.clase : 'btn btn-link btn-primary'}
                            data-bs-title={user.estatus===2 ? 'Habilitar usuario' : 'Inhabilitar usuario'}
                            onClick={(e: MouseEvent<HTMLButtonElement>)=>{e.preventDefault(); clickAccion({user, id: accion.id})}}
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
                            onClick={(e: MouseEvent<HTMLButtonElement>)=>{e.preventDefault(); clickAccionInput({user, id: accion.id})}}
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
