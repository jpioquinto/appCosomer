import React, {ChangeEvent, MouseEvent, useState} from 'react'
import { notificacion } from '../../utils'
import { cargarFoto } from '../../services/ContactSevice'
import { useUserNav } from '../../hooks/useUserNav'
export default function FotoPerfil() {
    const {getFoto} = useUserNav()

    const [foto, setFoto] = useState<string>(getFoto())
    const [archivo, setArchivo] = useState<File | null>(null)
    const [mostrarBoton, setMostrarBoton] = useState<string>('invisible')

    const config = { limitMB:0.48828125, bytes:1048576 }

    const maxSize = config.bytes * config.limitMB;

    const subirFoto = async (archivo: File) => {
        try {
           const result =await cargarFoto(archivo)
           if (result.response) {
               setFoto(result.url)
                notificacion(result.message, 'success')
           } else {
                notificacion(result.message, 'error')
           }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files && maxSize<e.target.files[0].size) {
            notificacion("El tamaño del archivo supera lo permitido ( 500 kB )", 'error');
            return false;
        }

        e.target.files ? setFoto(URL.createObjectURL(e.target.files[0])) : undefined;
        e.target.files ?  setArchivo(e.target.files[0]) : undefined;
        setMostrarBoton('')
    }

    const handleUpload = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (archivo) {
            subirFoto(archivo)
        }
    }

  return (
      <div className="text-center">                  
        <img src={foto} alt="Foto de perfil" className="img-thumbnail mb-2" />
        <span className='mt-3'>
            <input type="file" accept=".jpg,.png" className="form-control form-control-sm" onChange={handleFileChange}/>
            <button className={`btn btn-primary btn-sm mt-2 ${mostrarBoton}`} onClick={handleUpload}>
                <span className="btn-label">
                    <i className="fa fa-image"/>
                </span>
                Cargar foto de perfil
            </button>                                            
        </span>
    </div>
  )
}
