import { User, Accion } from '../types'
import { changeStatus as changeStatusUser, changeUR as changeURUser, changePerfil as changePerfilUser } from '../services/UserService'
import { useUserStore } from '../store/user'
import { notificacion } from '../utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect, useState } from 'react'
import { useURStore } from '../store/urStore'
import { usePerfilStore } from '../store/perfil'
import type { Option, URSchema } from '../types'

type AccionProps= {
  user:User,
  id:Accion['id']
}

const MySwal = withReactContent(Swal)

export default function useAccionUsuario() {
  const [optionsPerfil, setOptionsPerfil] = useState<Option[]>([])

  const [optionsUR, setOptionsUR] = useState<Option[]>([])

  const {changeStatus, changeUR, changePerfil, urSelected, setUrSelected} = useUserStore()  

  const {perfils} = usePerfilStore()

  const {urs} = useURStore()

  useEffect(() =>{
    let $options: Option[] = [];
    urs.forEach(ur => {
      $options.push({value: ur.id, label: ur.nombre, sigla:ur.sigla})
    })

    setOptionsUR($options)
  }, [urs])

  useEffect(() =>{
    let $options: Option[] = [];
    perfils.forEach(perfil => {
      $options.push({value: perfil.id, label: perfil.nombre, sigla:undefined})
    })

    setOptionsPerfil($options)
  }, [perfils])

  const cambiarPerfil = async (user:User, option:Option) => {
    
    if (option.value === 0) {
      return
    }

    const result = await changePerfilUser({user:user.id, perfil:option.value});
        
    if (result.response) {       
      changePerfil(option, user.id)
      notificacion(result.message, 'success')
        
    } else {
      notificacion(result.message, 'error')
    }
    MySwal.close()
  }

  const cambiarUR = async (user:User, option:Option) => {
    
    if (option.value === 0) {
      return
    }

    const result = await changeURUser({user:user.id, ur:option.value});
        
    if (result.response) {       
      changeUR(option, user.id)
      notificacion(result.message, 'success')
        
    } else {
      notificacion(result.message, 'error')
    }
    MySwal.close()
  }

  const cambiarStatus = async (estatus:number, id:number) => {
    const result = await changeStatusUser({estatus, id});
        
    if (result.response) {       
      changeStatus(estatus, id)
      notificacion(result.message, 'success')
        
    } else {
      notificacion(result.message, 'error')
    }
    Swal.close()
  }

  const clickCambiarEstatus = (user:User) => {
    Swal.fire({
      title: "¿Estás segur@?",
      text: user.estatus === 1 ? `Se desactivará el usuario (${user.nickname}) y no podrá acceder al sistema.` : `Se activará el usuario (${user.nickname}).`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, "+(user.estatus===1 ? "desactivar" : "activar")
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarStatus(user.estatus === 1 ? 2 : 1, user.id)        
      }
    });
  }

  const clickAccion = ({user, id}:AccionProps) => {
      //console.log(user, id)
      switch(id) {
        case 4:
          clickCambiarEstatus(user)
          break;
        default:break;
      }
  }
  return {
    clickAccion,
    setUrSelected,
    cambiarPerfil,
    cambiarUR,
    optionsPerfil,
    optionsUR,
    MySwal
  }
}
